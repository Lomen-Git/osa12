FROM node:20

WORKDIR /usr/src/app

COPY ./dist ./dist
# npm install in docker so no need for copy npm_modules. same for dist?
COPY ./public ./public
COPY ./src ./src

COPY ./.env ./.env
COPY ./.eslintrc.cjs ./.eslintrc.cjs

COPY ./index.html ./index.html
COPY ./package-lock.json ./package-lock.json
COPY ./package.json ./package.json
COPY ./README.md ./README.md
COPY ./vite.config.js ./vite.config.js
#COPY ./Dockerfile ./Dockerfile ??


# Development modessa käytetään npm install, ei npm ci !
RUN npm install

# npm run dev käynnistää soveluksen development tilassa
# extra viivat -- --host tarvitaan että server on näkyvissä konti ulkopuolella
CMD ["npm", "run", "dev", "--", "--host"]