FROM node:18

WORKDIR /app
COPY . .

RUN npm install

EXPOSE 3000
CMD ["npx", "nuxt", "dev", "--host", "0.0.0.0", "--port", "3000"]
