# Etapa 1: base
FROM node:20-alpine as base
WORKDIR /usr/src/app

# Etapa 2: development (Hot-Reloading)
FROM base AS development
ENV NODE_ENV=development

# Copy the package first
COPY package*.json ./

# Install all dependencies, including devDependencies to TS and CLI from Nest
RUN npm install

# Copy the rest of code from project
COPY . .

# Expose the Nest's port
EXPOSE 3000

# Execute the NestJS's watch mood ("nest start --watch")
CMD ["npm", "run", "start:dev"]

# ETAPA 3 Builder (compilation to JS for future prod)
FROM base as builder
ENV NODE_ENV=development
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
# Delete dependencies from development to have only the production
RUN npm prune --production


# ETAPA 4: Production (Last Image ultra ligera)
FROM node:20-alpine AS production
ENV NODE_ENV=production
WORKDIR /usr/src/app

COPY package*.json ./
COPY --from=builder /usr/src/app_modules ./node_modules
COPY --from=builder /usr/src/app/dist ./dist

USER node
EXPOSE 3000
CMD ["node", "dist/main"]
