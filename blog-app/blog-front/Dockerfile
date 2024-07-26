FROM node:20 AS build-stage

WORKDIR /usr/src/app

COPY ./package.json ./package.json
COPY ./package-lock.json ./package-lock.json

RUN npm ci

COPY ./dist ./dist
COPY ./public ./public
COPY ./src ./src
COPY ./.env ./.env
COPY ./.eslintrc.cjs ./.eslintrc.cjs
COPY ./index.html ./index.html
COPY ./README.md ./README.md
COPY ./vite.config.js ./vite.config.js
COPY ./Dockerfile ./Dockerfile


RUN npm run build

FROM nginx:1.25-alpine

COPY --from=build-stage /usr/src/app/dist /usr/share/nginx/html