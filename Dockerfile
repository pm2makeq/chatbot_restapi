FROM node:22.12-alpine AS builder

COPY ./ /app
COPY tsconfig.json /tsconfig.json

WORKDIR /app

RUN --mount=type=cache,target=/root/.npm npm install

# RUN echo '{"compilerOptions":{"moduleResolution":"node"}}' > tsconfig.json

RUN rm -rf node_modules
RUN npm cache clean --force
RUN npm install

RUN npm install -g typescript
RUN tsc

RUN --mount=type=cache,target=/root/.npm-production npm ci --ignore-scripts --omit-dev

FROM node:22-alpine AS release

COPY --from=builder /app/dist /app/dist
COPY --from=builder /app/public /app/public
COPY --from=builder /app/package.json /app/package.json
COPY --from=builder /app/package-lock.json /app/package-lock.json

ENV NODE_ENV=production

ENV PORT=3000

WORKDIR /app

RUN npm ci --ignore-scripts --omit-dev

ENTRYPOINT ["node", "dist/index.js"]