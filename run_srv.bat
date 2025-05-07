@echo off;
REM docker build -t mcp-rag-chat-app .

npm run build && node dist/index.js