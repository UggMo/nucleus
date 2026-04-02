FROM node:23-alpine3.21

WORKDIR /app

COPY . .

EXPOSE 3000

CMD ["node", "server.js"]