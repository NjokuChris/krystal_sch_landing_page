#!/bin/bash
DEPLOYPATH="/home2/krystals/public_html/krystal_landing"
cd "$DEPLOYPATH" || exit 1

# Prevent chmod changes from showing up as uncommitted Git changes in cPanel
git config core.fileMode false

# 1. Run Composer install
if [ -x /opt/cpanel/composer/bin/composer ]; then
    php /opt/cpanel/composer/bin/composer install --no-dev --optimize-autoloader --no-interaction
elif [ -x /usr/local/bin/composer ]; then
    php /usr/local/bin/composer install --no-dev --optimize-autoloader --no-interaction
else
    if [ ! -f composer.phar ]; then
        curl -sS https://getcomposer.org/installer | php
    fi
    php composer.phar install --no-dev --optimize-autoloader --no-interaction
fi

# 2. Configure .env and APP_KEY if missing
if [ ! -f .env ]; then
    cp .env.example .env
fi

if ! grep -q "^APP_KEY=base64:" .env; then
    php artisan key:generate --force
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

