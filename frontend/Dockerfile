# Etapa 1: Construir a aplicação
FROM node:18-alpine AS builder
WORKDIR /app

# Copiar apenas os arquivos necessários para o build
COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Etapa 2: Servir a aplicação com Nginx
FROM nginx:stable-alpine
WORKDIR /usr/share/nginx/html

# Copiar os arquivos construídos
COPY --from=builder /app/dist .

# Copiar a configuração personalizada do Nginx
COPY nginx/nginx.conf /etc/nginx/nginx.conf

# Expor a porta padrão
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
