FROM node:18-alpine3.15

WORKDIR /home/node/app

COPY package*.json ./
RUN npm install --production

# Bundle app source code
COPY --chown=node . .


CMD ["node", "index.js"]

# docker build -t migutak/dailychecksemail:4.3 .
