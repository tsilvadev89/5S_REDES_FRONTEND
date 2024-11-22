# Etapa 1: Construir a aplicação
FROM node:18-alpine AS builder
WORKDIR /app

# Copiar os arquivos necessários para o build
COPY package*.json ./
RUN npm install

# Copiar o restante dos arquivos da aplicação
COPY . .

# Construir a aplicação
RUN npm run build

# Etapa 2: Servir a aplicação com Nginx
FROM nginx:stable-alpine
WORKDIR /usr/share/nginx/html

# Copiar os arquivos construídos da etapa anterior
COPY --from=builder /app/dist .

# Copiar a configuração personalizada do Nginx
COPY nginx/nginx.conf /etc/nginx/nginx.conf

# Expor a porta padrão do Nginx
EXPOSE 80

# Executar o Nginx em primeiro plano
CMD ["nginx", "-g", "daemon off;"]
