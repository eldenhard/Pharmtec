FROM node:latest as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install vue-select@beta
RUN npm install --save vue-toastification@next
RUN npm install pinia
RUN npm install
COPY ./ .
RUN npm run build

FROM nginx as production-stage
RUN mkdir /app
COPY --from=build-stage /app/dist /app
COPY nginx.conf /etc/nginx/nginx.conf
