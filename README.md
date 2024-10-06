# Sistema de Inventario

## Descripción

Este proyecto está diseñado para gestionar un sistema de inventario. Se centra en la gestión de productos, categorías y proveedores.

## Características

- Gestión de productos
- Gestion de usuarios
- Gestion de Roles y Permisos
- Gestión de categorías
- Gestión de proveedores

## Requisitos Previos

- [Node.js](https://nodejs.org/) (versión 21.X.X)
- [pnpm](https://pnpm.io/) (versión 9.5.0)
- [Docker](https://www.docker.com/) (versión 27.2.1)

## Instalación

1. Clona el repositorio:

   ```bash
   git clone https://github.com/xScottRodriguez/sistema-de-inventario inventario
   cd inventario
   ```

2. Instala las dependencias:

   ```bash
   pnpm install
   ```

3. Crea un archivo [`.env`](command:_github.copilot.openRelativePath?%5B%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2Fhome%2Fmichael%2Fdevelopment%2Fprueba-tecnica-integral%2F.env%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22679e7990-7879-4985-b038-bcc20675aa2f%22%5D '/home/michael/development/prueba-tecnica-integral/.env') en el directorio raíz a partir del archivo [`.env.example`](command:_github.copilot.openRelativePath?%5B%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2Fhome%2Fmichael%2Fdevelopment%2Fprueba-tecnica-integral%2F.env.example%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22679e7990-7879-4985-b038-bcc20675aa2f%22%5D '/home/michael/development/prueba-tecnica-integral/.env.example')

## Ejecutando el Proyecto

### Desarrollo

Para ejecutar el proyecto en modo desarrollo:

1. Inicia el servidor de desarrollo:

   ```bash
   pnpm start:dev
   ```

2. Abre tu navegador y navega a `http://localhost:3000/api/v1/docs`.

### Producción

Para ejecutar el proyecto en modo producción:

1. Compila el proyecto:

   ```bash
   pnpm build
   ```

2. Inicia el servidor de producción:

   ```bash
   pnpm start:prod
   ```

3. Abre tu navegador y navega a `http://localhost:3000/api/v1/docs`.

## Usando Docker

### Desarrollo

Para ejecutar el proyecto en modo desarrollo usando Docker:

1. Crea un archivo [`.env`](command:_github.copilot.openRelativePath?%5B%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2Fhome%2Fmichael%2Fdevelopment%2Fprueba-tecnica-integral%2F.env%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22679e7990-7879-4985-b038-bcc20675aa2f%22%5D '/home/michael/development/prueba-tecnica-integral/.env') en el directorio raíz a partir del archivo [`.env.example`](command:_github.copilot.openRelativePath?%5B%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2Fhome%2Fmichael%2Fdevelopment%2Fprueba-tecnica-integral%2F.env.example%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22679e7990-7879-4985-b038-bcc20675aa2f%22%5D '/home/michael/development/prueba-tecnica-integral/.env.example')

2. Inicia el entorno de desarrollo:

   ```bash
   docker compose -f docker-compose.dev.yml up --build
   ```

3. Abre tu navegador y navega a `http://localhost:3000/api/v1/docs`.

### Producción

Para ejecutar el proyecto en modo producción usando Docker:

1. Crea un archivo [`.env`](command:_github.copilot.openRelativePath?%5B%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2Fhome%2Fmichael%2Fdevelopment%2Fprueba-tecnica-integral%2F.env%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22679e7990-7879-4985-b038-bcc20675aa2f%22%5D '/home/michael/development/prueba-tecnica-integral/.env') en el directorio raíz a partir del archivo [`.env.example`](command:_github.copilot.openRelativePath?%5B%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2Fhome%2Fmichael%2Fdevelopment%2Fprueba-tecnica-integral%2F.env.example%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22679e7990-7879-4985-b038-bcc20675aa2f%22%5D '/home/michael/development/prueba-tecnica-integral/.env.example')

2. Inicia el entorno de producción:

   ```bash
   docker compose -f docker-compose.yml up --build
   ```

3. Abre tu navegador y navega a `http://localhost:3000/api/v1/docs`.

## Licencia

Este proyecto está licenciado bajo MIT.
