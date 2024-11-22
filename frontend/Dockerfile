# Etapa 1: Construir a aplicação
FROM node:18-alpine AS builder
WORKDIR /app

# Copiar apenas os arquivos necessários para o build
COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Etapa 2: Configurar o servidor Nginx
FROM nginx:stable-alpine

# Copiar os arquivos construídos para o diretório padrão do Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Copiar o arquivo de configuração do Nginx para o container
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

# Expor as portas 8001, 8002, 8003
EXPOSE 8001 8002 8003

# Iniciar o Nginx no primeiro plano
CMD ["nginx", "-g", "daemon off;"]
