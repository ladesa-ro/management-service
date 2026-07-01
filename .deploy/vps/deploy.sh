#!/usr/bin/env bash
set -e

# Altera para o diretório do script
cd "$(dirname "$0")"

# Garante que o arquivo .env existe
if [ ! -f .env ]; then
  echo "❌ Arquivo .env não encontrado!"
  echo "Criando um novo arquivo .env a partir de .env.example..."
  cp .env.example .env
  echo "⚠️ Por favor, edite o arquivo .env com suas configurações/senhas e execute novamente."
  exit 1
fi

echo "🚀 Baixando as últimas imagens de contêiner..."
docker compose pull

echo "📦 Construindo a imagem customizada do OpenWA..."
docker compose build openwa

echo "🆙 Iniciando os serviços na VPS..."
docker compose up -d --remove-orphans

echo "✅ Serviços iniciados com sucesso!"
echo "Use 'docker compose logs -f' para acompanhar a execução."
