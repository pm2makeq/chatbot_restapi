// index.ts
import 'dotenv/config';
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { Pool, QueryResult } from "pg";
import express, { Request, Response, RequestHandler } from "express";
import path from "path";
import { fileURLToPath } from "url";
import { GoogleGenerativeAI } from "@google/generative-ai";


// ESM에서 __dirname 대체
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Gemini API 키 확인
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
if (!GEMINI_API_KEY) {
  console.error("[ERROR] GEMINI_API_KEY is not defined");
  process.exit(1);
}
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

const DATA_BASE_URL = process.env.DATA_BASE_URL;
const databaseUrl = DATA_BASE_URL;
if (!databaseUrl) {
  console.error("[ERROR] databaseUrl is not defined");
  process.exit(1);
}
// 서버 및 DB Pool 설정
const server = new Server(
  { name: "example-servers/postgres", version: "0.1.0" },
  { capabilities: { resources: {}, tools: {} } }
);


// PG Pool 생성
const pool = new Pool({ connectionString: databaseUrl });

// 리소스 URI 생성용 상수
const SCHEMA_PATH = "schema";
const resourceBaseUrl = new URL(databaseUrl);
resourceBaseUrl.protocol = "postgres:";
resourceBaseUrl.password = "";

console.log("[" + new Date().toISOString() + "] to have accessed to database URL ");

// SQL 생성
async function generateSQL(question: string, tables: string[]): Promise<string> {
	const schema = `
		enrollment_year int4 NULL, -- 입학년도
		grade int4 NULL, -- 학년
		"class" int4 NULL, -- 반
		student_number int4 NULL, -- 번호
		"name" text NULL, -- 성명
		gender bpchar(1) NULL, -- 성별 (남/여)로 구성되어 있어
		korean int4 NULL, -- 국어
		math int4 NULL, -- 수학
		english int4 NULL, -- 영어
		science int4 NULL, -- 과학
		social int4 NULL, -- 사회
		pe int4 NULL, -- 체육
		art int4 NULL -- 미술
	`.trim();

  const prompt =
    "▶ 너는 학생을 성적을 관리하는 챗봇이야. 학생 정보와 성적외의 질문은 다 대답하면 안돼." +
	"▶ 디비컬럼과 컬럼들의 조합이 관련 되지 않은 어떠한 질문도 답변을 하지마." +
	"▶ 디비는 POSTGRESQL 이니까 다른 벤더의 펑션을 쓰지말고 그냥 일반적인 ANSI-SQL로만 구성해 줘."+
	"▶  질문에 포함된 과목이 (국어, 수학, 영어, 과학, 사회, 체육, 미술)에 해당하지 않는다면, “못하겠습니다.” 라고만 응답하세요."+
    "다음 테이블: " + tables.join(", ") + "\n" +
	"컬럼: " + schema + "\n" +
    "질문: " + question + "\n" +
    "▶ 순수 SQL SELECT 문만, 마크다운\`\\`\\`\\`나 코드 블록 없이 반환하세요. " +
	"▶ 다른 SELECT 문이 아닌 모든 문장(예: DELETE, UPDATE, INSERT) 문을 요구하면 ‘못하겠습니다’만 출력하세요. " +
    "만약 답변할 수 없으면 ‘못하겠습니다’만 출력하세요.";
  
  console.log(prompt);

  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});
  
  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = (await response.text()).trim();
  
  // AI가 '못하겠습니다'만 반환한 경우
  if (text === '못하겠습니다') {
    console.log('AI가 답변 불가를 표시하여 클라이언트로 대신 전송합니다.');
    return '답변을 할 수 없습니다.';
  }
  
  // 정상적인 SQL 응답인 경우
  console.log(text);
  return text;
}

// 결과 요약
async function generateSummary(question: string, rows: any[]): Promise<string> {

 // 1) 사용할 모델
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

  // 2) 프롬프트: 질문과 실제 쿼리 결과를 함께 제공합니다.
  const prompt = [
    `아래는 SQL 실행 결과입니다.`,
    `질문: ${question}`,
    `결과: ${JSON.stringify(rows, null, 2)}`,
    ``,
    `위 결과를 한국어 자연어로 간결하게 요약해 주세요.`
  ].join("\n");

  // 3) LLM 호출
  const res = await model.generateContent([prompt]);
  let summary = (await res.response.text()).trim();

  // 4) 혹시 코드 블록이 섞여 나올 경우 제거
  summary = summary.replace(/^```(?:\w+)?\s*/, "").replace(/```$/, "").trim();

  console.log("[generateSummary] 요약:", summary);
  return summary;
}

// 서버 실행
async function runServer(): Promise<void> {
  const app = express();
  const publicPath = path.resolve(__dirname, "../public");
  app.use(express.static(publicPath));
  app.use(express.json());

  app.post("/ask", async (req: Request, res: Response): Promise<void> => {
  const { question, tables } = req.body as { question: string; tables?: string[] };
  // students 테이블을 항상 추가
  const updatedTables = [...(tables || []), "students"];

  try {
    // 1) 자연어 → SQL 생성
    const sql = await generateSQL(question, updatedTables);
    if (sql.trim() === "답변을 할 수 없습니다.") {
      // SQL 생성 자체가 불가하다는 의미이므로 예외로 처리
      throw new Error("CannotGenerateSQL");
    }
    console.log("[ASK] Generated SQL:", sql);

    // 2) SQL 실행
    const client = await pool.connect();
    let rows: any[];
    try {
      console.log("[ASK] Executing SQL…");
      const result = await client.query(sql);
      rows = result.rows;
    } catch (execErr) {
      // SQL 실행 중 에러도 예외로 통일
      console.error("[ASK] SQL execution error:", execErr);
      throw execErr;
    } finally {
      client.release();
    }

    // 3) 결과 요약
    const summary = await generateSummary(question, rows);
    console.log("[ASK] Summary:", summary);

    // 4) 정상 응답
    res.json({ sql, rows, summary });
  } catch (err: any) {
    // 한 곳에서만 에러 메시지를 조정
    console.error("[ASK ERROR]", err);

    // 에러 발생 시 500 상태코드로 응답
    res.status(500).send(
`죄송합니다. 요청을 처리할 수 없습니다. 
다른 질문을 해주세요.`
    );
  }
});


  const PORT = 3000;
  app.listen(PORT, () => console.log("Server listening on port " + PORT));
}

runServer().catch(console.error);