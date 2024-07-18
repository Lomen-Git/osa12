FROM node:20

WORKDIR /usr/src/app

COPY ./app.js ./app.js
COPY ./mongo ./mongo
COPY ./package.json ./package.json
COPY ./README.md ./README.md
COPY ./routes ./routes
COPY ./bin ./bin
COPY ./package-lock.json ./package-lock.json
COPY ./redis ./redis
COPY ./util ./util

# Development modessa käytetään npm install, ei npm ci !
RUN npm install

ENV DEBUG=playground:*

USER node

# npm run dev käynnistää soveluksen development tilassa
# extra viivat -- --host tarvitaan että server on näkyvissä konti ulkopuolella
CMD ["npm", "run", "dev", "--", "--host"]