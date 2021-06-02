#!/bin/sh
export http_proxy="http://127.0.0.1:7890"
export https_proxy=$http_proxy
export no_proxy="localhost,127.0.0.1,192.168.100.0/24,192.168.110.0/24,localaddress,.localdomain.com"
echo -e "Proxy Off"
docker start 1dc5ef2e225f &&
cd /home/blog/app/ &&
git pull &&
yarn install --production=false &&
yarn build &&
git apply migrate.patch &&
yarn typeorm:build &&
yarn m:run &&
git reset --hard HEAD &&
docker build . -t zhuang/node-web-app &&
docker kill blog-app
docker rm blog-app &&
docker run --name blog-app --network host -d zhuang/node-web-app &&
echo 'OK!'
