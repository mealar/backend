# development stage
FROM node:14-alpine as base

ENV NODE_ENV=production

WORKDIR /usr/src/app

COPY package.json package-lock.json ./

COPY . .

RUN npm install

EXPOSE 5000

CMD ["npm", "start"]
