FROM node as node
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
EXPOSE 4200
RUN npm run build

FROM nginx:latest
COPY --from=node /usr/src/app/dist/projeto-http /usr/share/nginx/html
COPY ./nginx-custom.conf /etc/nginx/conf.d/default.conf
