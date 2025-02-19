# README.md

# News API

Este proyecto es una API desarrollada en Node.js que permite acceder a información de noticias a través de tres endpoints: "fuentes" (sources), "titulares" (top headlines) y "noticias" (everything). Utiliza la API de NewsAPI para obtener los datos y está configurada para autenticar las solicitudes mediante un API Key.

## Estructura del Proyecto

```
news-api
├── src
│   ├── controllers
│   │   ├── auth.js
│   │   ├── headlines.js
│   │   ├── news.js
│   │   └── sources.js
│   ├── routes
│   │   └── index.js
│   ├── app.js
│   └── config
│       └── index.js
├── .env
├── package.json
├── README.md
└── server.js
```

## Endpoints

### 1. Fuentes (Sources)

- **Ruta:** `/sources`
- **Método:** GET
- **Descripción:** Devuelve la lista de fuentes disponibles desde NewsAPI.

### 2. Titulares (Top Headlines)

- **Ruta:** `/headlines`
- **Método:** GET
- **Parámetros:**
  - `term`: Término de búsqueda.
  - `source`: Fuente de noticias.
  - `category`: Categoría de noticias.
  - `country`: País de origen de las noticias.
- **Descripción:** Devuelve los titulares de noticias según los parámetros proporcionados.

### 3. Noticias (Everything)

- **Ruta:** `/news`
- **Método:** GET
- **Parámetro:**
  - `query`: Término de búsqueda.
- **Descripción:** Devuelve noticias que coinciden con el término de búsqueda proporcionado.

## Configuración

1. Clona el repositorio.
2. Instala las dependencias con `npm install`.
3. Crea un archivo `.env` en la raíz del proyecto y añade tu API Key de NewsAPI:

```
API_KEY=f9a49b687dc440d18a31145423e44013
```

4. Inicia el servidor con `node server.js`.

## Uso

Una vez que el servidor esté en funcionamiento, puedes realizar solicitudes a los endpoints mencionados utilizando herramientas como Postman o cURL.

## Contribuciones

Las contribuciones son bienvenidas. Si deseas mejorar este proyecto, por favor abre un issue o envía un pull request.