FROM node:20-alpine AS builder 

WORKDIR /app
RUN npm install -g pnpm typescript 
COPY package.json pnpm-lock.yaml ./
COPY prisma ./prisma 
RUN  pnpm install --frozen-lockfile
COPY . .
RUN pnpm run build

FROM node:20-alpine AS dev
WORKDIR /app  
RUN npm i -g pnpm nodemon ts-node
COPY package.json pnpm-lock.yaml ./ 
COPY prisma ./prisma 
RUN pnpm install --frozen-lockfile
COPY . .
ARG DATABASE_URL
ENV DATABASE_URL=${DATABASE_URL}
EXPOSE 3002
RUN pnpm prisma generate
CMD ["sh", "-c", "pnpm prisma migrate deploy && nodemon src/bin.ts"]

FROM node:20-alpine AS production
RUN npm install -g pnpm 
WORKDIR /app 
COPY package.json pnpm-lock.yaml ./ 
COPY prisma ./prisma 
RUN pnpm install --frozen-lockfile --prod 
COPY --from=builder /app/dist ./dist 
ARG DATABASE_URL
ENV DATABASE_URL=${DATABASE_URL}
EXPOSE 3002
CMD ["node", "dist/bin.js"]
