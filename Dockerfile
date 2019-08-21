FROM node:alpine AS builder
WORKDIR /app
COPY package.json .
RUN apk add --no-cache git python g++ make
RUN npm install
COPY . .
RUN npm run build
RUN npm start

FROM nginx
EXPOSE 80