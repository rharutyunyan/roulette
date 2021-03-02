# build environment
FROM node:14-alpine as build
WORKDIR /app
COPY package.json .
COPY yarn.lock .
COPY common/*.json ./common/
COPY services/main/*.json ./services/main/
RUN yarn install

COPY . /app
#RUN yarn lint
RUN yarn build:common
RUN yarn build:main

EXPOSE 3000
