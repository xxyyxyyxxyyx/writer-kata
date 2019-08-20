FROM node:alpine AS builder
WORKDIR /app
COPY package.json .
RUN apk add --no-cache git python g++ make
RUN npm install
COPY . .
RUN npm run build
RUN npm run export

FROM nginx
EXPOSE 80
COPY --from=builder /app/out /usr/share/nginx/html