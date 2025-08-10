# ==========================================
# IMAGEM BASE DO SISTEMA OPERACIONAL
# ==========================================

FROM debian:12-slim AS os-core

RUN useradd -m -u 1000 -s /bin/bash happy
ENV HOME=/home/happy

RUN --mount=type=cache,target=/var/cache/apt,sharing=locked \
    --mount=type=cache,target=/var/lib/apt,sharing=locked \
    apt-get update -y && apt-get install -y --no-install-recommends \
    curl \
    ca-certificates \
    unzip \
    && rm -rf /var/lib/apt/lists/*

# ==========================================
# IMAGEM DE RUNTIME DO SISTEMA
# ==========================================

FROM os-core AS os-runtime
USER root

# Configuração do ambiente Bun
ENV BUN_INSTALL="/opt/bun"
ENV BUN_INSTALL_CACHE_DIR="/home/happy/.bun/tmp"
ENV PATH="/opt/bun/bin:$PATH"

# Instalação do Bun na versão específica para garantir consistência
RUN curl -fsSL https://bun.sh/install | bash -s "bun-v1.2.20"

# Instalação de dependências com cache eficiente
RUN --mount=type=cache,id=bun,target=${BUN_INSTALL_CACHE_DIR} \
    mkdir -p "${BUN_INSTALL_CACHE_DIR}" && chmod -R 777 "${BUN_INSTALL_CACHE_DIR}"

# Retorna ao usuário não privilegiado após instalação
USER 1000:1000

# ==========================================
# IMAGEM DE DESENVOLVIMENTO DO SISTEMA
# ==========================================

FROM os-runtime AS os-development

USER 1000:1000
WORKDIR "/source/packages/service"

# ==========================================
# IMAGEM PARA AMBIENTE DE DESENVOLVIMENTO
# ==========================================

FROM os-development AS devcontainer
USER 1000:1000

# ==========================================
# INSTALAÇÃO DE DEPENDÊNCIAS DE PRODUÇÃO
# ==========================================

FROM os-development AS source-with-production-dependencies

USER 1000:1000
COPY --chown=1000:1000 package.json bun.lock* bun.toml* ./

# Instalação de dependências com cache eficiente
RUN --mount=type=cache,id=bun,target=${BUN_INSTALL_CACHE_DIR} \
    bun install --frozen-lockfile --production

COPY --chown=1000:1000 . .

# ==========================================
# INSTALAÇÃO DE DEPENDÊNCIAS DE DESENVOLVIMENTO
# ==========================================

FROM source-with-production-dependencies AS source-with-dev-dependencies
USER 1000:1000
RUN --mount=type=cache,id=bun,target=${BUN_INSTALL_CACHE_DIR} bun install --frozen-lockfile

# ==========================================
# ETAPA DE COMPILAÇÃO DA APLICAÇÃO
# ==========================================

FROM source-with-dev-dependencies AS build
USER 1000:1000
RUN bun run build

# ==========================================
# IMAGEM FINAL DE EXECUÇÃO
# ==========================================

FROM os-runtime AS runtime

# Metadados da imagem para documentação e rastreabilidade
LABEL maintainer="Equipe de Desenvolvimento"
LABEL version="1.0"
LABEL description="Serviço de gerenciamento da aplicação"

# Configurações de ambiente para produção
ENV NODE_ENV=production
ENV PORT=3000

# Expõe a porta da aplicação
EXPOSE $PORT

# Mantém consistência utilizando o mesmo usuário em toda a aplicação
USER happy

# Copia apenas os arquivos necessários da etapa de build para a imagem final
# Corrigido: usa o estágio 'build' em vez de 'builder' inexistente
COPY --from=build --chown=1000:1000 /source/packages/service /app/packages/service

# Define o diretório de trabalho para a aplicação
WORKDIR "/app/packages/service"

# Configuração de healthcheck para monitoramento da aplicação
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:$PORT/health || exit 1

# Comando de inicialização: executa as migrações e inicia a aplicação
CMD bun run migration:run && bun run start
