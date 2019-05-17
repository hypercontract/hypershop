FROM node:8
WORKDIR /usr/src/app
ENV NODE_ENV production
COPY package*.json ./
RUN npm ci
COPY ./config ./config
COPY ./dist ./dist
EXPOSE 80
CMD npm start
