# ===============================
# Etapa 1: Construcción
# ===============================
FROM node:20 AS build

WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar TODAS las dependencias (incluye dev)
RUN npm ci

# Copiar todo el código
COPY . .

# Construir el proyecto
RUN npm run build


# ===============================
# Etapa 2: Producción
# ===============================
FROM node:20-alpine AS production

WORKDIR /app

# Instalar PM2 globalmente
RUN npm install -g pm2

# Copiar solo archivos necesarios
COPY --from=build /app/package*.json ./
COPY --from=build /app/dist ./dist
COPY --from=build /app/ecosystem.config.cjs ./
COPY --from=build /app/.env .env

# Instalar SOLO dependencias de producción
RUN npm ci --omit=dev

# Exponer el puerto
EXPOSE 3000

# Comando final
CMD ["pm2-runtime", "start", "ecosystem.config.cjs"]