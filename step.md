要使用 Dockerfile 部署 MySQL 和 Redis，并将 MySQL 的配置和数据保存在宿主机的指定目录，可以按照以下步骤进行操作：

## 1. 创建目录结构
首先，创建一个目录来存放Dockerfile和相关文件：

```sh
mkdir my_docker_setup
cd my_docker_setup
```
## 2. 创建Dockerfile
在该目录中创建一个名为 Dockerfile 的文件，并编写如下内容：

```Dockerfile
# Use a multi-stage build to create separate containers for MySQL and Redis
# Stage 1: MySQL
FROM mysql:8.0 as mysql

# Set environment variables
ENV MYSQL_ROOT_PASSWORD=root_password
ENV MYSQL_DATABASE=my_database
ENV MYSQL_USER=my_user
ENV MYSQL_PASSWORD=my_password

# Copy MySQL configuration file from the host
COPY ./mysql/my.cnf /etc/mysql/my.cnf

# Expose MySQL port
EXPOSE 3306

# Stage 2: Redis
FROM redis:6.2 as redis

# Expose Redis port
EXPOSE 6379
```
## 3. 创建MySQL配置文件和数据目录
在 my_docker_setup 目录中创建 mysql 目录，并在其中创建 my.cnf 配置文件。例如：

```sh
mkdir mysql
touch mysql/my.cnf
```
在 mysql/my.cnf 中，您可以添加MySQL的配置，例如：

```ini
[mysqld]
user = mysql
pid-file = /var/run/mysqld/mysqld.pid
socket = /var/run/mysqld/mysqld.sock
datadir = /var/lib/mysql
symbolic-links = 0
log-error = /var/log/mysql/error.log
!includedir /etc/mysql/conf.d/
```
## 4. 创建docker-compose.yml文件
为了方便管理多个容器，可以创建一个 docker-compose.yml 文件：

```yaml
version: '3.8'

services:
  mysql:
    image: mysql:8.0
    container_name: mysql_container
    restart: always
    environment:
      MYSQL_ROOT_PASSWORD: root@123
      MYSQL_DATABASE: test_db
      MYSQL_USER: sv
      MYSQL_PASSWORD: root@123
    volumes:
      - ./mysql/my.cnf:/etc/mysql/my.cnf
      - ./mysql/data:/var/lib/mysql
    ports:
      - "3306:3306"

  redis:
    image: redis:6.2
    container_name: redis_container
    restart: always
    ports:
      - "6379:6379"
```
5. 创建数据目录
创建一个用于存放MySQL数据的目录：

```sh
mkdir -p mysql/data
```
6. 启动服务
在 my_docker_setup 目录中，运行以下命令来启动容器：

```sh
docker-compose up -d
```
这将启动MySQL和Redis容器，并将MySQL的配置和数据保存在宿主机的指定目录中。

## 总结
通过以上步骤，您可以使用 Docker 和 Docker Compose 来部署MySQL和Redis，并将MySQL的配置和数据保存在宿主机的指定目录中。这种方法便于管理和备份数据库数据，同时也简化了容器的配置和部署过程。