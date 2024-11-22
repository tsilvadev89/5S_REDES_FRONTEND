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

# Instalar Node.js e npm para rodar comandos (caso o frontend precise)
# RUN apk add --no-cache nodejs npm

# Copiar os arquivos construídos para o diretório padrão do Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Certifique-se de que o caminho do nginx.conf está correto
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

# Expor apenas a porta 80 (o Nginx vai rodar nessa porta no contêiner)
EXPOSE 80

# Iniciar o Nginx no primeiro plano
CMD ["nginx", "-g", "daemon off;"]
