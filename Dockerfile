FROM node:18.17.0

WORKDIR /app

COPY package*.json ./
COPY next.config.mjs ./
COPY tsconfig.json ./

RUN npm install

COPY . .

RUN npm run build

CMD ["npm", "start"]