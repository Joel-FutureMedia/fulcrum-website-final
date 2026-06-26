# syntax=docker/dockerfile:1

FROM node:22-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM node:22-alpine AS production

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3014

ENV SMTP_HOST=mail.fulcrum.com.na
ENV SMTP_PORT=465
ENV SMTP_SECURE=true
ENV SMTP_USER=build@fulcrum.com.na
ENV SMTP_PASS=Build@fulcrum12
ENV SMTP_FROM=build@fulcrum.com.na
ENV SMTP_TO=build@fulcrum.com.na

COPY package.json package-lock.json ./
RUN npm ci --omit=dev

COPY --from=builder /app/dist ./dist
COPY server ./server
COPY src/utils ./src/utils

EXPOSE 3014

CMD ["node", "server/index.js"]
