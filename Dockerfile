FROM node:12.13-alpine

WORKDIR /app

COPY package.json .

RUN npm install

COPY ./dist ./dist

# COPY ./src/views ./views

# COPY ./src/mail/templates ./dist/mail/templates

# COPY ./ormconfig.js ./ormconfig.js

CMD ["node", "dist/main"]