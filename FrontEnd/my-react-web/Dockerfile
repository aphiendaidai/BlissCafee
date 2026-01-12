# Giai đoạn 1: Build
FROM node:20-alpine AS build

WORKDIR /app
COPY package*.json ./
RUN npm config set registry https://registry.npmjs.org/
RUN npm install
COPY . .
RUN npm run build

# Giai đoạn 2: Serve bằng Nginx
FROM nginx:alpine

# SỬA Ở ĐÂY: Copy file cấu hình Nginx của ông vào đúng chỗ để nó nhận diện được /api
COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]