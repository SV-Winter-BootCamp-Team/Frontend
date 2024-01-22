FROM node:18

WORKDIR /frontend
COPY package.json yarn.lock ./
RUN yarn install
COPY . ./
RUN yarn build

EXPOSE 3000

CMD ["yarn", "dev"]
