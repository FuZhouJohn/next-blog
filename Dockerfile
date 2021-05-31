FROM node:14
# Create app directory
WORKDIR /usr/src/app
COPY package.json ./
COPY yarn.lock ./

RUN yarn install --registry https://registry.npm.taobao.org/

COPY . .

EXPOSE 8082

CMD [ "yarn", "start", "-p", "8082" ]
