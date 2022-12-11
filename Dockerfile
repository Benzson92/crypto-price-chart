FROM node:lts-alpine

WORKDIR /app

COPY package.json ./

COPY yarn.lock ./

RUN yarn install --frozen-lockfile

ENV BASE_API_URL = "https://api.coingecko.com/api/v3/"

COPY . .

EXPOSE 3000

CMD ["yarn", "dev"]
