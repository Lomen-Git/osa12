FROM node:20

WORKDIR /usr/src/app

COPY --chown=node:node . .

COPY ./app.js ./app.js
COPY ./mongo ./mongo
COPY ./package.json ./package.json
COPY ./README.md ./README.md
COPY ./routes ./routes
COPY ./bin ./bin
COPY ./package-lock.json ./package-lock.json
COPY ./redis ./redis
COPY ./util ./util

RUN npm ci --omit=dev

ENV DEBUG=playground:*

USER node

CMD npm start
