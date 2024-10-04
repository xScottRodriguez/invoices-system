# Prueba Técnica de Integral

## Descripción

Este proyecto está diseñado para resolver la prueba técnica de Integral. Se centra en la gestión de usuarios y la gestión de tareas por parte de los usuarios.

## Características

- Gestión de usuarios
- Gestión de tareas por usuarios

## Requisitos Previos

- [Node.js](https://nodejs.org/) (versión 21.X.X)
- [pnpm](https://pnpm.io/) (versión 9.5.0)
- [Docker](https://www.docker.com/) (versión 27.2.1)

## Instalación

1. Clona el repositorio:
    ```bash
    git clone https://github.com/xScottRodriguez/prueba-tecnica-integral prueba-tecnica
    cd prueba-tecnica
    ```

2. Instala las dependencias:
    ```bash
    pnpm install
    ```

3. Crea un archivo `.env` en el directorio raíz a partir del archivo `.env.example`

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

1. Crea un archivo `.env` en el directorio raíz a partir del archivo `.env.example`

2. Inicia el entorno de desarrollo:
    ```bash
    docker compose -f docker-compose.dev.yml up --build
    ```

3. Abre tu navegador y navega a `http://localhost:3000/api/v1/docs`.

### Producción

Para ejecutar el proyecto en modo producción usando Docker:

1. Crea un archivo `.env` en el directorio raíz a partir del archivo `.env.example`

2. Inicia el entorno de producción:
    ```bash
    docker compose -f docker-compose.yml up --build
    ```

3. Abre tu navegador y navega a `http://localhost:3000/api/v1/docs`.

## Licencia

Nest está licenciado bajo [MIT](LICENSE).
