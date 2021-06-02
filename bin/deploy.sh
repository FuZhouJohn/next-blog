#!/bin/sh
function proxy_on(){
  export http_proxy="http://127.0.0.1:7890"
  export https_proxy=$http_proxy
  export no_proxy="localhost,127.0.0.1,192.168.100.0/24,192.168.110.0/24,localaddress,.localdomain.com"
  echo -e "Proxy On"
}
proxy_on &&
docker start 1dc5ef2e225f &&
cd /home/blog/app/ &&
git pull &&
yarn install --production=false &&
yarn build &&
docker kill blog-app
docker rm blog-app &&
docker build . -t zhuang/node-web-app &&
docker run --name blog-app --network host -d zhuang/node-web-app &&
echo 'OK!'
