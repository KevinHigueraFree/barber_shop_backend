# Barber Shop Backend

Backend para la gestión de una barbería, construido con NestJS, TypeORM y PostgreSQL. La API centraliza la administración de usuarios, servicios, roles, permisos, horarios, ausencias, citas y servicios asociados a cada reserva.

## ¿Qué es este proyecto?

Este backend permite gestionar la operación diaria de un negocio de barbería, incluyendo:

- Registro y administración de usuarios, con roles y permisos.
- Catálogo de servicios con precio, duración y descripción.
- Configuración de disponibilidad y horarios del personal.
- Control de ausencias y tiempos no laborables.
- Creación de citas y asociación de múltiples servicios por cita.
- Cambio de estados de una reserva, como pendiente, confirmada, cancelada o completada.
- Seguridad de acceso por módulos y permisos.

La solución está pensada para integrarse con un frontend o aplicación móvil, y también expone documentación interactiva con Swagger y una colección de Postman lista para pruebas.

## Arquitectura

El proyecto sigue una estructura modular basada en NestJS, con una separación clara de responsabilidades por dominio y capas.

### 1. Capa de aplicación

Cada módulo del sistema está organizado en subcarpetas que suelen incluir:

- domain: entidades, repositorios y reglas del negocio.
- application: casos de uso, DTOs, validaciones y lógica de negocio.
- infrastructure: implementación con TypeORM y persistencia.
- interfaces/http: controladores y endpoints HTTP.

Esto permite mantener un diseño más mantenible y escalable, con lógica desacoplada de la infraestructura.

### 2. NestJS + módulos

La aplicación inicia desde [src/app.module.ts](src/app.module.ts), donde se registran todos los módulos principales del sistema:

- users
- services
- roles y permissions
- staff schedules
- time offs
- time slots
- appointment status
- appointments
- appointment-services
- staff-services
- scheduling settings

Cada módulo encapsula un conjunto de funcionalidad concreta.

### 3. Persistencia con TypeORM

El proyecto usa TypeORM para conectarse a PostgreSQL. La configuración se encuentra en:

- [src/config/database.config.ts](src/config/database.config.ts)
- [src/config/typeorm.config.ts](src/config/typeorm.config.ts)

Se usa un patrón de repositorios con entidades de TypeORM, lo que facilita la persistencia y la migración del esquema.

### 4. Validación y control de respuestas

La app activa validación global con `class-validator` y `ValidationPipe` en [src/main.ts](src/main.ts), para asegurar que los DTOs recibidos cumplen con las reglas definidas.

También se aplican:

- `TransformInterceptor` para normalizar respuestas exitosas.
- `HttpExceptionFilter` para estructurar errores HTTP.
- Swagger para documentación automática de endpoints.

## Stack tecnológico

- Node.js
- NestJS
- TypeScript
- PostgreSQL
- TypeORM
- Docker / Docker Compose
- Swagger
- Jest

## Estructura principal del proyecto

```text
src/
├─ app.module.ts
├─ main.ts
├─ config/
├─ database/
├─ migrations/
├─ modules/
│  ├─ action/
│  ├─ appointment/
│  ├─ appointment-service/
│  ├─ appointment-status/
│  ├─ module/
│  ├─ permission/
│  ├─ role/
│  ├─ role-permission/
│  ├─ scheduling-setting/
│  ├─ service/
│  ├─ staff-schedule/
│  ├─ staff-service/
│  ├─ time-off/
│  ├─ time-slot/
│  └─ user/
├─ shared/
└─ test/
```

## Requisitos

- Node.js 20 o superior
- npm
- PostgreSQL
- Docker y Docker Compose

## Variables de entorno

Crear un archivo `.env` en la raíz del proyecto:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASS=postgres
DB_NAME=barbershop
PORT=3000
```

La aplicación lee estas variables desde [src/config/database.config.ts](src/config/database.config.ts).

## Ejecutar con Docker

### 1. Levantar el proyecto desde cero (desarrollo)

```bash
# Ajusta o crea el archivo .env con tus variables locales
# Luego levanta la app y la base de datos en desarrollo
docker compose -f docker-compose.dev.yml up --build
```

Esto levanta la app en modo desarrollo, montando el código fuente y conectándola con PostgreSQL.

### 2. Dejarlo corriendo en segundo plano

```bash
# Levanta los contenedores en background para que sigan ejecutándose
# sin bloquear la terminal
docker compose -f docker-compose.dev.yml up -d --build
```

### 3. Reiniciar el backend sin volver a crear todo

```bash
# Reinicia el contenedor de la API sin borrar la base de datos ni los datos previos
docker compose -f docker-compose.dev.yml restart app
```

### 4. Bajar el proyecto

```bash
# Detiene y elimina los contenedores del entorno de desarrollo
docker compose -f docker-compose.dev.yml down
```

### 5. Bajarlo y eliminar volúmenes (reset completo)

```bash
# Detiene los contenedores y borra también los volúmenes de la base de datos
# útil para reiniciar desde cero
docker compose -f docker-compose.dev.yml down --volumes --remove-orphans
```

Este comando borra también los datos persistidos de PostgreSQL, útil cuando quieres resetear totalmente la base de datos.

### 6. Ver logs

```bash
# Muestra la salida en tiempo real del contenedor de la API
docker compose -f docker-compose.dev.yml logs -f app
```

### 7. Ver estado de contenedores

```bash
# Revisa qué contenedores están activos y su estado
docker compose -f docker-compose.dev.yml ps
```

### 8. Si cambian las variables de entorno

Cuando modifiques `.env` o cambien las variables del entorno, debes reiniciar el contenedor para que NestJS las lea de nuevo:

```bash
# Apaga los contenedores y vuelve a levantarlos con la nueva configuración
docker compose -f docker-compose.dev.yml down
docker compose -f docker-compose.dev.yml up --build
```

O, si solo quieres recargar sin borrar datos:

```bash
# Reinicia la API para que tome las nuevas variables sin perder la BD
docker compose -f docker-compose.dev.yml restart app
```

### 9. Producción

```bash
# Levanta la versión de producción en segundo plano
docker compose -f docker-compose.prod.yml up --build -d
```

Si necesitas detener producción:

```bash
# Apaga los contenedores de producción
docker compose -f docker-compose.prod.yml down
```

## Ejecutar localmente sin Docker

```bash
# Instala todas las dependencias del proyecto
npm install

# Inicia la aplicación en modo normal
npm run start

# Inicia la aplicación en modo watch para recarga automática
npm run start:dev
```

La API quedará disponible en:

```text
http://localhost:3000
```

La documentación Swagger está en:

```text
http://localhost:3000/api-docs
```

## Migraciones de base de datos

```bash
# Genera una nueva migración después de cambiar entidades o columnas
npm run migration:generate -- src/migrations/NombreDeLaMigracion

# Ejecuta las migraciones pendientes para actualizar la base de datos
npm run migration:run

# Revierte la última migración aplicada
npm run migration:revert
```

## Casos de uso principales

### 1. Gestión de usuarios

- Crear usuario con rol asociado.
- Listar usuarios activos e inactivos.
- Consultar perfil por ID.
- Actualizar datos del usuario.
- Eliminar usuario.

### 2. Catálogo de servicios

- Registrar un nuevo servicio.
- Ver servicios disponibles.
- Editar precio/duración/descripcion.
- Eliminar un servicio.

### 3. Administración de roles y permisos

- Crear roles para clientes, empleados o administradores.
- Vincular permisos por módulo o acción.
- Consultar permisos de un role específico.

### 4. Agenda y disponibilidad

- Definir horarios del personal.
- Registrar tiempos fuera de servicio.
- Generar disponibilidad por franjas horarias.
- Configurar duración del slot de atención.

### 5. Reserva de cita

- Crear una cita con fecha, barbero y cliente.
- Añadir servicios a la cita.
- Consultar servicios asociados a una cita.
- Actualizar estado de la cita.
- Eliminar o corregir una reserva.

## Colección Postman

La colección de Postman se encuentra en:

- [postman/BarberShop.postman_collection.json](postman/BarberShop.postman_collection.json)
- [postman/BarberShop_Environment.postman_environment.json](postman/BarberShop_Environment.postman_environment.json)

Incluye ejemplos de uso real para:

- usuarios
- servicios
- citas
- servicios de cita
- roles y permisos
- horarios y ausencias
- administración general del sistema

Para usarla:

1. Importa la colección y el environment en Postman.
2. Asegúrate de que el valor `baseUrl` apunte a `http://localhost:3000`.
3. Ejecuta primero los casos de configuración e inicialización.
4. Luego prosigue con los flujos principales de negocio, como creación de usuario, servicios y citas.

## Scripts útiles

```bash
# Compila el proyecto para producción
npm run build

# Ejecuta los tests unitarios
npm run test

# Ejecuta los tests end-to-end
npm run test:e2e

# Revisa y corrige errores de lint
npm run lint

# Verifica dependencias y exports no usados
npm run knip
```

## Notas finales

Este backend está pensado como una API de negocio para una barbería con lógica de reservas y administración operativa. Su arquitectura modular permite crecer agregando nuevos módulos sin romper la estructura base del sistema.

Si se va a presentar el proyecto en público o en una demo, lo ideal es acompañar la explicación con:

- Swagger en `/api-docs`
- colección Postman con casos reales
- flujo de negocio principal: crear usuario → crear servicios → programar horario → reservar cita → cambiar estado
