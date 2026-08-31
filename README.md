# Barber Shop

## Description

Barber Shop backend built with NestJS, TypeORM, and PostgreSQL. This microservice manages salon appointments and staff service administration.

## Requirements

- Node.js 20+
- npm
- Docker and Docker Compose
- PostgreSQL

## Environment variables

Create a `.env` file in the project root:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASS=postgres
DB_NAME=barbershop
```

The app reads these values in [src/config/database.config.ts](src/config/database.config.ts).

## Docker setup

### Start the app

```bash
# Build the image and run the container in the background
docker compose up --build -d
```

### Verify it is running

```bash
# Check running containers
docker compose ps

# Follow logs
docker compose logs -f app
```

The backend runs on:

```text
http://localhost:3000
```

### Restart after code changes

```bash
docker compose restart app
```

If you change the Docker configuration or dependencies, rebuild:

```bash
docker compose up --build -d
```

### When the `.env` file changes

Restart the container so the app loads the new values:

```bash
docker compose restart app
```

If you want to recreate everything from scratch:

```bash
docker compose down
docker compose up --build -d
```

### Stop and remove containers

```bash
# Stop without deleting
docker compose stop

# Stop and remove containers
docker compose down

# Stop and remove containers + volumes
docker compose down --volumes --remove-orphans
```

## Run the app locally without Docker

```bash
# Install dependencies
npm install

# Start in normal mode
npm run start

# Start in watch mode
npm run start:dev

# Start in production mode
npm run start:prod
```

## Database migrations

```bash
# Generate a migration after changing an entity
npm run migration:generate -- src/migrations/NombreDeLaMigracion

# Run pending migrations
npm run migration:run

# Revert the last migration
npm run migration:revert
```

## Format and lint

```bash
# Format TypeScript files with Prettier
npm run format

# Run ESLint and auto-fix problems
npm run lint

# Check unused exports, imports, and dependencies with Knip
npm run knip
```

## Run tests

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov
```

## Notes

- Docker uses the `.env` file from the project root via [docker-compose.yml](docker-compose.yml).
- The app is configured with NestJS + TypeORM and PostgreSQL via [src/app.module.ts](src/app.module.ts).
- For a clean reset after env or dependency changes, use `docker compose down --volumes --remove-orphans` followed by `docker compose up --build -d`.
