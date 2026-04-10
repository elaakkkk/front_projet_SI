# Build Angular
FROM node:20-slim AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build -- --configuration production

# Serve avec nginx
FROM nginx:alpine

RUN rm -rf /usr/share/nginx/html/*

# ⚠️ adapte si besoin (très important)
COPY --from=build /app/dist/front-projet-si/browser /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]