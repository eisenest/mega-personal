FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN mkdir -p /app/public/uploads

EXPOSE 5050

CMD ["node", "--no-warnings", "server.js"]

