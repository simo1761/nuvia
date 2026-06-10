FROM node:20-slim
WORKDIR /app

# OpenSSL needed by Prisma on Debian slim
RUN apt-get update -y && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*

COPY package*.json ./
COPY prisma ./prisma/
RUN npm install

COPY tsconfig.json ./
COPY src ./src/
RUN npx prisma generate && npm run build

EXPOSE 3001
CMD ["node", "dist/index.js"]
