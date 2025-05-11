# Chatbot REST API

이 프로젝트는 Express.js와 TypeScript를 사용하여 구축된 간단한 RESTful API 서버로, 클라이언트로부터의 요청을 처리하고 응답을 반환하는 기능을 제공합니다.

## 📁 프로젝트 구조

- `index.ts`: Express 서버의 진입점으로, 라우팅 및 요청 처리를 담당합니다.
- `Dockerfile`: Docker 이미지를 빌드하기 위한 설정 파일입니다.
- `docker-compose.yml`: Docker 컨테이너를 구성하는 파일입니다.
- `package.json`: 프로젝트의 메타데이터 및 의존성 정보를 포함합니다.
- `tsconfig.json`: TypeScript 컴파일러 설정 파일입니다.

## ✅ 주요 기능

- Express.js를 활용한 RESTful API 서버 구현
- 클라이언트로부터의 POST 요청을 처리하고, 요청 본문(message)을 기반으로 OpenAI 응답 반환
- TypeScript를 사용하여 정적 타입 검사 및 코드 품질 향상

## ⚙️ 설치 및 실행

1. 레포지토리 클론:
   ```bash
   git clone https://github.com/pm2makeq/chatbot_restapi.git
   cd chatbot_restapi
   ```

2. 의존성 설치:
   ```bash
   npm install
   ```

3. OpenAI API 키 설정:
   `.env` 파일을 생성하고 다음 내용을 추가합니다.
   ```env
     GEMINI_API_KEY=본인의 제미나이 API KEY
     DATA_BASE_URL=postgresql://id:pw@0.0.0.0:port/database
   ```

4. 서버 실행:
   ```bash
  run_srv.bat
   ```


## 📄 라이선스

이 프로젝트는 MIT 라이선스를 따릅니다. 자세한 내용은 [LICENSE](LICENSE) 파일을 참조하세요.
