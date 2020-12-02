FROM node:14.15.0-alpine3.10

WORKDIR /app

ENV NEXT_TELEMETRY_DISABLED 1

COPY package.json package.lock*.json ./
RUN npm i --quiet && npm cache clean --force

COPY . .

EXPOSE 3000
EXPOSE 6006
EXPOSE 80

CMD "npm" "run" "dev"