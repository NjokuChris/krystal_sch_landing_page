#!/bin/bash
DEPLOYPATH="/home2/krystals/public_html/krystal_landing"
cd "$DEPLOYPATH" || exit 1

# Prevent chmod changes from showing up as uncommitted Git changes in cPanel
git config core.fileMode false
export COMPOSER_MEMORY_LIMIT=-1
export COMPOSER_MAX_PARALLEL_HTTP=3

# 1. Run Composer install (extract composer.phar to ~/composer_extracted to avoid cPanel phar stream limits)
if [ -x /opt/cpanel/composer/bin/composer ]; then
    php -d display_errors=1 /opt/cpanel/composer/bin/composer install --no-dev --optimize-autoloader --no-interaction
elif [ -x /usr/local/bin/composer ]; then
    php -d display_errors=1 /usr/local/bin/composer install --no-dev --optimize-autoloader --no-interaction
else
    if [ ! -f /home2/krystals/composer_extracted/bin/composer ]; then
        [ ! -f composer.phar ] && curl -sS https://getcomposer.org/installer | php -d display_errors=1
        php -d display_errors=1 -r '$p = new Phar("composer.phar"); $p->extractTo("/home2/krystals/composer_extracted", null, true);'
        rm -f composer.phar
    fi
    php -d display_errors=1 /home2/krystals/composer_extracted/bin/composer install --no-dev --optimize-autoloader --no-interaction
fi

# 2. Clear any stale cached config first, then configure .env and APP_KEY
rm -f bootstrap/cache/*.php

if [ ! -f .env ]; then
    cp .env.example .env
fi

if ! grep -q "^APP_KEY=base64:" .env; then
    sed -i "s|^APP_KEY=.*|APP_KEY=base64:$(openssl rand -base64 32)|" .env
fi

# 3. Create SQLite DB and run migrations
touch database/database.sqlite
php artisan migrate --force

# 4. Set standard web permissions
find "$DEPLOYPATH" -type d -exec chmod 755 {} \;
find "$DEPLOYPATH" -type f -exec chmod 644 {} \;
chmod -R 775 "$DEPLOYPATH/storage" "$DEPLOYPATH/bootstrap/cache" "$DEPLOYPATH/database"

# 5. Clear and rebuild Laravel caches
php artisan optimize:clear
php artisan optimize

