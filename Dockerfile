# 1. Build stage
FROM node:22-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

# 2. Production stage
FROM node:22-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# Копируем только необходимые файлы
COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.ts ./

CMD ["npm", "start"]

EXPOSE 3456