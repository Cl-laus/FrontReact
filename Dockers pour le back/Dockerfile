# Dockerfile
FROM php:8.2-cli-alpine

# Installer les extensions PHP nécessaires
RUN docker-php-ext-install pdo pdo_mysql

# Installer Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /app


EXPOSE 8000


CMD ["php", "-S", "0.0.0.0:8000", "-t", "public"]
