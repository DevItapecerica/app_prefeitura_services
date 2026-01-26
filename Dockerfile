FROM node:lts-alpine

WORKDIR /app

COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --production --silent && mv node_modules ../
COPY . .
EXPOSE 3000

RUN chown -R node /app

USER node
CMD sh -c "npx sequelize db:migrate --env $NODE_ENV && npm start"