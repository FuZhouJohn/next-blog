## 运行数据库
```bash
mkdir blog-data
docker run -v "${PWD}/blog-data:/var/lib/postgresql/data" -p 5432:5432 -e POSTGRES_USER=blog -e POSTGRES_HOST_AUTH_METHOD=trust -d postgres:12.2
```
## 开发

```bash
npm run dev
# or
yarn dev
```

## 本地预览

```
yarn build
yarn start
```
