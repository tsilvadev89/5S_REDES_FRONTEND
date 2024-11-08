# Etapa 1: Construir a aplicação (usando Node.js)
FROM node:22.11.0 AS builder

WORKDIR /app

# Instalar dependências
COPY package*.json ./
RUN npm install

# Copiar o código-fonte
COPY . .

# Construir a aplicação
RUN npm run build

# Etapa 2: Servir a aplicação (com Nginx completo)
FROM nginx:stable  # Versão mais completa do Nginx baseada em Debian/Ubuntu

# Instalar pacotes extras se necessário
RUN apt-get update && \
    apt-get install -y bash curl vim # Exemplos de pacotes adicionais

# Copiar os arquivos build para o diretório do Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Expor a porta 80
EXPOSE 80

# Iniciar o Nginx
CMD ["nginx", "-g", "daemon off;"]
