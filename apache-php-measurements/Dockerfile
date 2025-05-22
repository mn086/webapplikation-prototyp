# Basis-Image: PHP 8.2 mit vorinstalliertem Apache Webserver
FROM php:8.2-apache

# Aktiviere das Apache Rewrite-Modul für saubere URLs
# (ermöglicht URL-Umschreibung ohne sichtbare .php Endungen)
RUN a2enmod rewrite

# Setze das Arbeitsverzeichnis im Container
# (hier werden die Webdateien abgelegt)
WORKDIR /var/www/html

# Apache Konfiguration für Sicherheit und CORS (Cross-Origin Resource Sharing)
# - Deaktiviert Directory Listing (-Indexes)
# - Erlaubt Symlinks (+FollowSymLinks)
# - Ermöglicht .htaccess Nutzung (AllowOverride All)
# - Erlaubt Zugriff von allen Domains auf die API (CORS Header)
RUN echo '\
<Directory /var/www/html>\n\
    Options -Indexes +FollowSymLinks\n\
    AllowOverride All\n\
    Header set Access-Control-Allow-Origin "*"\n\
</Directory>' > /etc/apache2/conf-available/cors.conf \
    && a2enconf cors \
    && a2enmod headers

# Öffne Port 80 für HTTP-Zugriff
EXPOSE 80

# Starte den Apache Webserver im Vordergrund
CMD ["apache2-foreground"]