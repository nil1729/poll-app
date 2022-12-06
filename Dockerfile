FROM node:14.21.1-alpine

WORKDIR /app

COPY . /app/

RUN npm install

CMD [ "npm", "run", "start:prod" ]