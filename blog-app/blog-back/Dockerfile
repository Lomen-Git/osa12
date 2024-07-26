FROM node:20

WORKDIR /usr/src/app

COPY ./package-lock.json ./package-lock.json
COPY ./package.json ./package.json

RUN npm ci

COPY ./controllers ./controllers
COPY ./customMW ./customMW
COPY ./migrations ./migrations
COPY ./models ./models
COPY ./util ./util
COPY ./.env ./.env
COPY ./cli.js ./cli.js
COPY ./index.js ./index.js
COPY ./README.md ./README.md

# --omit=dev jättää dev riippuvuudet pois
RUN npm ci --omit=dev

#ENV DEBUG=playground:*

#USER node

CMD npm start
