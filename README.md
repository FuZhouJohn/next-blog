### 运行 postgreSQL 容器
```bash
docker run -v "${PWD}/blog-data:/var/lib/postgresql/data" -p 5432:5432 -e POSTGRES_USER=blog -e POSTGRES_HOST_AUTH_METHOD=trust -d postgres:12.2
```
