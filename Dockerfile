# Use a multi-stage build to create separate containers for MySQL and Redis
# Stage 1: MySQL
FROM mysql:8.0 as mysql

# Set environment variables
ENV MYSQL_ROOT_PASSWORD=root@123
ENV MYSQL_DATABASE=sv_db
ENV MYSQL_USER=root
ENV MYSQL_PASSWORD=root@123

# Copy MySQL configuration file from the host
COPY ./mysql/my.cnf /etc/mysql/my.cnf

# Expose MySQL port
EXPOSE 3306

# Stage 2: Redis
FROM redis:6.2 as redis

# Expose Redis port
EXPOSE 6379
