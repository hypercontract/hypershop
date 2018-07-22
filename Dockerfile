FROM node:8-alpine
WORKDIR /usr/src/app
RUN apk add --no-cache --virtual .build-deps alpine-sdk python
RUN npm install npm@latest -g
COPY ./package*.json ./
RUN npm install
RUN apk del .build-deps
COPY ./ ./
CMD ["npm", "start"]