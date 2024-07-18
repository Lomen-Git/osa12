FROM node:20

WORKDIR /usr/src/app

COPY ./package.json ./package.json
COPY ./package-lock.json ./package-lock.json
COPY ./Dockerfile ./Dockerfile
COPY ./README.md ./README.md
COPY ./dist ./dist
COPY ./index.html ./index.html
COPY ./public ./public
COPY ./src ./src
COPY ./vite.config.js ./vite.config.js
COPY ./.env ./.env

# Development modessa käytetään npm install, ei npm ci !
RUN npm install

# npm run dev käynnistää soveluksen development tilassa
# extra viivat -- --host tarvitaan että server on näkyvissä konti ulkopuolella
CMD ["npm", "run", "dev", "--", "--host"]