FROM node:18

WORKDIR /app
COPY . .

ARG MODE=production
ENV NODE_ENV=$MODE

RUN npm install

RUN if [ "$NODE_ENV" = "production" ]; then npm run build; fi

EXPOSE 3000

CMD if [ "$NODE_ENV" = "production" ]; then npm run preview; else npx nuxt dev --host 0.0.0.0 --port 3000; fi
