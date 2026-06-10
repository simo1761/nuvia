FROM node:20-alpine
WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/
RUN npm install

COPY tsconfig.json ./
COPY src ./src/
RUN npx prisma generate && npm run build

EXPOSE 3001
CMD ["node", "dist/index.js"]
