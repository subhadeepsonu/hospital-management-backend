FROM node:18-alpine

WORKDIR /app

copy . .

RUN npm install
RUN npx prisma generate
RUN npx tsc

expose 4000

cmd ["node", "dist/index.js"]