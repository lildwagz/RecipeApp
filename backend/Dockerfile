# Gunakan image resmi PHP 8.2 dengan Apache
FROM php:8.2-apache

# Set direktori kerja
WORKDIR /var/www/html

# Install dependensi sistem dan ekstensi PHP yang dibutuhkan
RUN apt-get update && apt-get install -y \
    libzip-dev \
    unzip \
    libcurl4-openssl-dev \
    && docker-php-ext-install zip pdo pdo_mysql curl

# Install Composer secara global
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Konfigurasi Apache agar menunjuk ke direktori /public
RUN echo "<VirtualHost *:80>\n\
    DocumentRoot /var/www/html/public\n\
    <Directory /var/www/html/public>\n\
        AllowOverride All\n\
        Require all granted\n\
    </Directory>\n\
    ErrorLog ${APACHE_LOG_DIR}/error.log\n\
    CustomLog ${APACHE_LOG_DIR}/access.log combined\n\
</VirtualHost>" > /etc/apache2/sites-available/000-default.conf

RUN a2enmod rewrite

# Salin file composer dan install dependensi.
COPY composer.json composer.lock* ./
RUN composer install --no-interaction --no-plugins --no-scripts --prefer-dist

# Salin sisa file aplikasi
COPY . .

# Ubah kepemilikan file agar sesuai dengan user Apache
RUN chown -R www-data:www-data /var/www/html