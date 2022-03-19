FROM node:14-alpine AS build

ENV NODE_ENV=production

WORKDIR /app

COPY [".", "./"]

RUN npm i
RUN npm i typescript --global
RUN npm run build

EXPOSE 5050

CMD [ "npm", "start" ]

