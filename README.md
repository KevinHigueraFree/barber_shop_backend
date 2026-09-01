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

### Development

```bash
# Build the development image and start the container
docker compose -f docker-compose.dev.yml up --build
```

The development configuration uses `.env`, mounts the source code, and reloads the app when files change.

### Production

Create a `.env.production` file in the project root with the production database values, then run:

```bash
# Build the production image and run the container in the background
docker compose -f docker-compose.prod.yml up --build -d
```

The production configuration uses [Dockerfile.prod](Dockerfile.prod) and `.env.production`.

For Render, configure the service to use `Dockerfile.prod` as the Dockerfile path. Add the variables from `.env.production` manually in Render's environment settings.

### Verify it is running

```bash
# Check running containers
docker compose -f docker-compose.dev.yml ps

# Follow logs
docker compose -f docker-compose.dev.yml logs -f app
```

For production, replace `docker-compose.dev.yml` with `docker-compose.prod.yml` in these commands.

The backend runs on:

```text
http://localhost:3000
```

### Restart after code changes

```bash
docker compose -f docker-compose.dev.yml restart app
```

If you change the Docker configuration or dependencies, rebuild:

```bash
docker compose -f docker-compose.dev.yml up --build
```

### When the `.env` file changes

Restart the container so the app loads the new values:

```bash
docker compose -f docker-compose.dev.yml restart app
```

If you want to recreate everything from scratch:

```bash
docker compose -f docker-compose.dev.yml down
docker compose -f docker-compose.dev.yml up --build
```

### Stop and remove containers

```bash
# Stop without deleting
docker compose -f docker-compose.dev.yml stop

# Stop and remove containers
docker compose -f docker-compose.dev.yml down

# Stop and remove containers + volumes
docker compose -f docker-compose.dev.yml down --volumes --remove-orphans
```

Use `docker-compose.prod.yml` instead when managing the production container.

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

- Development Docker uses [Dockerfile.dev](Dockerfile.dev) and `.env` via [docker-compose.dev.yml](docker-compose.dev.yml), while production uses [Dockerfile.prod](Dockerfile.prod) and `.env.production` via [docker-compose.prod.yml](docker-compose.prod.yml).
- The app is configured with NestJS + TypeORM and PostgreSQL via [src/app.module.ts](src/app.module.ts).
- For a clean development reset after env or dependency changes, use `docker compose -f docker-compose.dev.yml down --volumes --remove-orphans` followed by `docker compose -f docker-compose.dev.yml up --build`.
