FROM node:12

WORKDIR /usr/src/app

RUN apt-get update
RUN apt-get install -y pdftk

COPY package*.json ./
RUN npm install
# RUN npm ci --only=production
COPY . .

CMD ["node", "."]
