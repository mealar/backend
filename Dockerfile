# development stage
FROM node:20.10-alpine as base

ENV NODE_ENV=production

WORKDIR /usr/src/app

COPY package.json package-lock.json ./

COPY . .

RUN npm install --pure-lockfile && npm compile

EXPOSE 5000

CMD ["npm", "start"]
