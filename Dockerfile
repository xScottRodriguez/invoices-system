FROM node:21-alpine AS builder

WORKDIR /usr/src/app

COPY package*.json ./
COPY pnpm-lock.yaml ./
RUN npm install -g pnpm
RUN npm install -g @nestjs/cli
RUN pnpm install 
COPY . .

RUN pnpm build
FROM node:21-alpine

WORKDIR /usr/src/app

RUN npm install -g pnpm

COPY --from=builder /usr/src/app/package*.json ./
COPY --from=builder /usr/src/app/pnpm-lock.yaml ./
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/.sequelizerc ./
COPY --from=builder /usr/src/app/config/config.js ./config/config.js
COPY --from=builder /usr/src/app/migrations ./migrations
RUN pnpm install --production
RUN cat ./config/config.js
CMD ["sh", "-c", "npx wait-port db:1433 && pnpm migration:up && pnpm start:prod"]
