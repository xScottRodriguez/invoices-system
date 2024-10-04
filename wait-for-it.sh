#!/bin/bash
set -e

until sqlcmd -S sqlserver -U ${DB_USER} -P ${DB_PASSWORD} -Q "SELECT 1" > /dev/null 2>&1; do
    echo "Esperando que la base de datos esté lista..."
    sleep 5
done

echo "La base de datos está lista. Iniciando la API..."
exec "$@"
