# build environment
FROM node:14-alpine as build
WORKDIR /app
COPY *.json ./
COPY yarn.lock ./
# ADD https://path-to-ssl-com ./
COPY common ./common
COPY database ./database
RUN yarn install

#COPY . /app
#RUN yarn lint

