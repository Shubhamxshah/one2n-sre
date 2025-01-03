FROM node:20-alpine AS base

WORKDIR /app
COPY package.json pnpm-lock.yaml /app 
RUN npm install -g pnpm && pnpm install
COPY . .

FROM node:20-alpine AS dev
WORKDIR /app 
COPY --from=base /app /app 
RUN npm i -g nodemon ts-node
EXPOSE 3002 
CMD ["nodemon", "src/bin.ts"]

FROM node:20-alpine AS production
WORKDIR /app 
COPY --from=base /app /app
RUN npm i -g ts-node typescript
EXPOSE 3002
RUN npm run build
CMD ["npm", "run", "start"]
