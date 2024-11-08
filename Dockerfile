# Etapa 1: Construir a aplicação
FROM node:18-alpine AS builder

WORKDIR /app

# Instalar dependências
COPY package*.json ./
RUN npm install

# Copiar o código-fonte
COPY . .

# Construir a aplicação
RUN npm run build

# Etapa 2: Servir a aplicação
FROM nginx:stable-alpine  # Usa a versão estável do Nginx com base no Alpine

# Instalar pacotes extras, se necessário, para a versão completa do Nginx
RUN apk update && \
    apk add --no-cache bash curl vim # Exemplo de pacotes adicionais

# Copiar os arquivos build para o diretório padrão do Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Expor a porta 80
EXPOSE 80

# Iniciar o Nginx
CMD ["nginx", "-g", "daemon off;"]
