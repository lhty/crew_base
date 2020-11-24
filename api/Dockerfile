FROM node:14.15.0-alpine3.10

WORKDIR /app

COPY package.json package.lock*.json ./

RUN npm i --quiet && npm cache clean --force

COPY . .

EXPOSE 3000

CMD ["npm", "run", "start:debug"]