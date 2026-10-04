FROM node:20-bookworm-slim

# OpenSSL est requis par le moteur Prisma
RUN apt-get update && apt-get install -y --no-install-recommends openssl && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY tsconfig.json ./
COPY prisma ./prisma
COPY src ./src
RUN npx prisma generate && npm run build && mkdir -p public/uploads

ENV NODE_ENV=production
EXPOSE 8082

# Applique les migrations en attente puis démarre l'API
CMD ["sh", "-c", "npx prisma migrate deploy && node dist/server.js"]
