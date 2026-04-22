# Frontend

## File includes

- React 19
- Vite
- Tailwind CSS
- Dockerfile
- docker-compose.yml

## Prerequisites

- Node.js 24
- npm
- Docker

## Installation

Create an `.env` file based on `.env.example`.

Run the app locally:

```bash
npm install
npm run dev
```

Run the app with Docker:

```bash
docker compose up --build
```

## Description

The frontend connects to `product-service` through `VITE_API_URL`.

If you run the frontend in the browser on your host machine, use:

```bash
VITE_API_URL=http://localhost:8080
```
