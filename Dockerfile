# build Angular
FROM node:20-slim AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

# nginx
FROM nginx:alpine

RUN rm -rf /usr/share/nginx/html/*

COPY --from=build /app/dist/front_projet_SI/browser /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf