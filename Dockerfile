FROM node:16.13.2-buster
LABEL org.opencontainers.image.source='https://github.com/shin6949/ms2-ox-bot-js'

WORKDIR /usr/src/app
COPY package*.json ./

RUN npm install
COPY . .

CMD [ "node", "./src/app.mjs", "&" ]