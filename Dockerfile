# FROM node:20-alpine AS base
FROM nikolaik/python-nodejs:python3.9-nodejs20 AS base

FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm install

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules /app/node_modules
COPY . .
ENV NODE_ENV=production
ENV SSR_MODE=1
ENV NODE_OPTIONS=--max-old-space-size=2048
RUN npm run build
# RUN npm run build && npm prune --production && rm -rf .next/cache

FROM base AS runner
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/package.json ./
ENV NODE_ENV=production
ENV SSR_MODE=1
ENV NODE_OPTIONS=--max-old-space-size=2048
EXPOSE 3000
CMD ["npm", "start"]