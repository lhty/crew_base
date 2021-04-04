FROM node:15.6.0-alpine3.10

EXPOSE 3000
WORKDIR /app

ADD . /app
RUN npm i --quiet && npm cache clean --force

