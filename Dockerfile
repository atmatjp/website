FROM node:lts AS build
WORKDIR /app


RUN npm install -g pnpm
COPY package*.json pnpm-lock.yaml ./
RUN pnpm install
COPY . .
RUN pnpm run build

FROM nginx:alpine

#distの中身だけをNginxの公開フォルダにコピー
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80