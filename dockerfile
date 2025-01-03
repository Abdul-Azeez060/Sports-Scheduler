FROM node:18-alpine

RUN apk add --no-cache openssl

WORKDIR /app

COPY package* .

RUN npm install

COPY . .

EXPOSE  8000

RUN npm run db:generate

CMD ["npm", "run", "start"]




    