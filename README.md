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
- 클라이언트로부터의 POST 요청을 처리하고, 요청 본문(message)을 기반으로 제미나이로 응답 반환(gemini-1.5-flash)
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

# 📚 MCP를 활용한 챗봇 구축기 시리즈 목차

아래는 본 블로그 시리즈의 전체 구성입니다. 각 편은 단계적으로 MCP 기반 챗봇을 구현해가는 여정을 설명합니다:

---

### 1️⃣ [MCP를 활용한 챗봇 구축기 - 장대한 서막 (1/6)](https://pm2makeq.tistory.com/manage/posts/#:~:text=MCP%EB%A5%BC%20%ED%99%9C%EC%9A%A9%ED%95%9C%20%EC%B1%97%EB%B4%87%20%EA%B5%AC%EC%B6%95%EA%B8%B0%20%2D%20%EC%9E%A5%EB%8C%80%ED%95%9C%20%EC%84%9C%EB%A7%89%20(1/6))

### 2️⃣ [MCP를 활용한 챗봇 구축기 - RestAPI를 적용 (2/6)](https://pm2makeq.tistory.com/manage/posts/#:~:text=MCP%EB%A5%BC%20%ED%99%9C%EC%9A%A9%ED%95%9C%20%EC%B1%97%EB%B4%87%20%EA%B5%AC%EC%B6%95%EA%B8%B0%20%2D%20RestAPI%EB%A5%BC%20%EC%A0%81%EC%9A%A9%20(2/6))

### 3️⃣ [MCP를 활용한 챗봇 구축기 - MCP 툴 기반으로 확장해보기 개요 (3/6)](https://pm2makeq.tistory.com/manage/posts/#:~:text=MCP%EB%A5%BC%20%ED%99%9C%EC%9A%A9%ED%95%9C%20%EC%B1%97%EB%B4%87%20%EA%B5%AC%EC%B6%95%EA%B8%B0%20%2D%20MCP%20%ED%88%B4%20%EA%B8%B0%EB%B0%98%EC%9C%BC%EB%A1%9C%20%ED%99%95%EC%9E%A5%ED%95%B4%EB%B3%B4%EA%B8%B0%20%EA%B0%9C%EC%9A%94%20(3/6))

### 4️⃣ [MCP를 활용한 챗봇 구축기 - 클라이언트 편 (4/6)](https://pm2makeq.tistory.com/manage/posts/#:~:text=MCP%EB%A5%BC%20%ED%99%9C%EC%9A%A9%ED%95%9C%20%EC%B1%97%EB%B4%87%20%EA%B5%AC%EC%B6%95%EA%B8%B0%20%2D%20%ED%81%B4%EB%9D%BC%EC%9D%B4%EC%96%B8%ED%8A%B8%20%ED%8E%B8%20(4/6))

### 5️⃣ [MCP를 활용한 챗봇 구축기 - REST API 서버 편 (5/6)](https://pm2makeq.tistory.com/manage/posts/#:~:text=MCP%EB%A5%BC%20%ED%99%9C%EC%9A%A9%ED%95%9C%20%EC%B1%97%EB%B4%87%20%EA%B5%AC%EC%B6%95%EA%B8%B0%20%2D%20REST%20API%20%EC%84%9C%EB%B2%84%20%ED%8E%B8%20(5/6))

### 6️⃣ [MCP를 활용한 챗봇 구축기 - MCP 서버 편 (6/6)](https://pm2makeq.tistory.com/manage/posts/#:~:text=MCP%EB%A5%BC%20%ED%99%9C%EC%9A%A9%ED%95%9C%20%EC%B1%97%EB%B4%87%20%EA%B5%AC%EC%B6%95%EA%B8%B0%20%2D%20MCP%20%EC%84%9C%EB%B2%84%20%ED%8E%B8%20(6/6))

---
