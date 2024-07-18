FROM node:20 AS build-stage

WORKDIR /usr/src/app

# Kopioi package-tiedostot ja asenna riippuvuudet
COPY ./package.json ./package.json
COPY ./package-lock.json ./package-lock.json

RUN npm ci

# Kopioi kaikki muut tiedostot
COPY ./Dockerfile ./Dockerfile
COPY ./README.md ./README.md
COPY ./dist ./dist
COPY ./index.html ./index.html
COPY ./public ./public
COPY ./src ./src
COPY ./vite.config.js ./vite.config.js
COPY ./.env ./.env

# Suorita testit
RUN npm test

# Rakenna projekti
RUN npm run build

FROM nginx:1.25-alpine

COPY --from=build-stage /usr/src/app/dist /usr/share/nginx/html

