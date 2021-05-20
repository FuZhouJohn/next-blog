## 初始化数据库

### 运行容器

```bash
mkdir blog-data
docker run -v "${PWD}/blog-data:/var/lib/postgresql/data" -p 5432:5432 -e POSTGRES_USER=blog -e POSTGRES_HOST_AUTH_METHOD=trust -d postgres:12.2
```
###新建数据库

```bash
# 执行容器 bash
docker exec -it DOCKER_ID bash
# 登录 postgreSQL
psql -U blog -W
# 创建数据库
CREATE DATABASE blog_development ENCODING 'UTF8' LC_COLLATE 'en_US.utf8' LC_CTYPE 'en_US.utf8';
```

###新建数据表并填充数据

```bash
# 初始化 ORM
yarn typeorm:build
# 新建数据表
yarn migration:run
# 填充初始数据
yarn seed
```

## 开发

```bash
npm run dev
# or
yarn dev
```

## 本地预览

```bash
yarn build
yarn start
```
