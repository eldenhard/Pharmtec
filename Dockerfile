FROM node:latest as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install vue-select@beta
RUN npm install --save vue-toastification@next
RUN npm install pinia
RUN npm install @kangc/v-md-editor@next -S
RUN npm install --save @fullcalendar/core 
RUN npm install --save @fullcalendar/vue3
# RUN npm install --save @fullcalendar/daygrid
# RUN npm install --save @fullcalendar/timegrid
# RUN npm install --save @fullcalendar/list
# RUN npm install --save @fullcalendar/resource-timeline
# RUN npm install --save @fullcalendar/interaction
RUN npm install @fullcalendar/core @fullcalendar/resource @fullcalendar/resource-timegrid
RUN npm install
COPY ./ .
RUN npm run build

FROM nginx as production-stage
RUN mkdir /app
COPY --from=build-stage /app/dist /app
COPY nginx.conf /etc/nginx/nginx.conf
