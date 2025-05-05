FROM node:18

WORKDIR /app

ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}

COPY package*.json ./

RUN npm install

COPY . .

COPY .adminjs /app/.adminjs

#RUN mkdir -p /app/public/uploads

EXPOSE 5050

CMD ["sh", "-c", "if [ \"$NODE_ENV\" = \"development\" ]; then npm run dev; else node server.js; fi"]
