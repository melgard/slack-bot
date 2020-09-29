FROM node:lts-alpine3.9

WORKDIR /usr/src/app

ARG PORT=8000
ARG NODE_ENV

COPY . /usr/src/app/

RUN npm install

RUN npm run build

RUN yarn global add pm2

CMD [ "pm2-runtime", "npm", "--", "start" ]

EXPOSE $PORT
