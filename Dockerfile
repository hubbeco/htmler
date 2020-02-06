FROM node:12

WORKDIR /usr/src/app

COPY . .

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production
RUN npm run build

ENV NODE_ENV=production

EXPOSE 5000
CMD [ "node", "dist/server.js"]
