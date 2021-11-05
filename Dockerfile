FROM node:17-buster-slim

RUN usermod -aG sudo node
WORKDIR /home/node/app

COPY package*.json ./
RUN npm install --production

# Bundle app source code
COPY --chown=node . .


CMD ["node", "index.js"]

# docker build -t migutak/dailychecksemail:4.0 .