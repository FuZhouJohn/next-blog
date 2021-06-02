#!/bin/sh
docker start 1dc5ef2e225f &&
cd /home/blog/app/ &&
git pull &&
yarn install --production=false &&
yarn build &&
git apply migrate.patch &&
yarn m:run &&
git reset --hard HEAD &&
docker build . -t zhuang/node-web-app &&
docker kill blog-app
docker rm blog-app &&
docker run --name blog-app --network host -d zhuang/node-web-app &&
echo 'OK!'
