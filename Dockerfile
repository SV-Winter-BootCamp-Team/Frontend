FROM node:18

WORKDIR /frontend

COPY package.json yarn.lock ./

RUN yarn install

COPY . ./

ENV NODE_OPTIONS=--max-old-space-size=4096

RUN yarn build

EXPOSE 3000