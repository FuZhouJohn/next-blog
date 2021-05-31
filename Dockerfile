FROM node:14
# Create app directory
WORKDIR /usr/src/app
COPY package.json ./
COPY yarn.lock ./

RUN yarn install --registry https://registry.npm.taobao.org/

COPY . .

EXPOSE 3000

CMD [ "yarn", "start", "-p", "8080" ]
