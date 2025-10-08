# ==========================================
# IMAGEM BASE DO SISTEMA OPERACIONAL
# ==========================================

FROM docker.io/debian:13-slim AS os-core

ENV DEBIAN_FRONTEND=noninteractive

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
ENV BUN_INSTALL_CACHE_DIR="/tmp/bun-cache"
ENV TMPDIR=/tmp/bun-tmp
ENV PATH="${BUN_INSTALL}/bin:$PATH"

# Instalação do Bun na versão específica para garantir consistência
RUN curl -fsSL https://bun.sh/install | bash -s "bun-v1.2.20"

# Cria o diretório de cache em /tmp e garante permissões
RUN --mount=type=cache,id=bun,target=${BUN_INSTALL_CACHE_DIR},uid=1000,gid=1000 mkdir -p "${BUN_INSTALL_CACHE_DIR}" && chmod -R 777 "${BUN_INSTALL_CACHE_DIR}"
RUN mkdir -p "${TMPDIR}" && chmod -R 777 "${TMPDIR}"

# Retorna ao usuário não privilegiado após instalação
USER 1000:1000

# ==========================================
# IMAGEM DE DESENVOLVIMENTO DO SISTEMA
# ==========================================

FROM os-runtime AS os-development

USER 1000:1000
WORKDIR "/ladesa/management-service"

# ==========================================
# IMAGEM PARA AMBIENTE DE DESENVOLVIMENTO
# ==========================================

FROM os-development AS devcontainer

USER root

RUN --mount=type=cache,target=/var/cache/apt,sharing=locked \
    --mount=type=cache,target=/var/lib/apt,sharing=locked \
    apt-get update -y && apt-get install -y git vim zsh && \
    rm -rf /var/lib/apt/lists/*

USER 1000:1000
RUN sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
RUN sed -i 's/^ZSH_THEME=.*/ZSH_THEME="josh"/' ~/.zshrc

# ==========================================
# INSTALAÇÃO DE DEPENDÊNCIAS DE PRODUÇÃO
# ==========================================

FROM os-development AS source-with-production-dependencies

USER 1000:1000

COPY --chown=1000:1000 . .

# Instalação de dependências com cache eficiente
RUN --mount=type=cache,id=bun,uid=1000,gid=1000,target=${BUN_INSTALL_CACHE_DIR} \
    bun install --frozen-lockfile --production

# ==========================================
# INSTALAÇÃO DE DEPENDÊNCIAS DE DESENVOLVIMENTO
# ==========================================

FROM source-with-production-dependencies AS source-with-dev-dependencies
USER 1000:1000
RUN --mount=type=cache,id=bun,uid=1000,gid=1000,target=${BUN_INSTALL_CACHE_DIR} \
    bun install --frozen-lockfile

# ==========================================
# ETAPA DE COMPILAÇÃO DA APLICAÇÃO
# ==========================================

FROM source-with-dev-dependencies AS service-build
USER 1000:1000
RUN bun run --filter "@ladesa-ro/management-service" build

# ==========================================
# IMAGEM FINAL DE EXECUÇÃO
# ==========================================

FROM os-runtime AS service-runtime

LABEL maintainer="Equipe de Desenvolvimento do Ladesa"
LABEL version="1.0"
LABEL description="Serviço de gerenciamento da aplicação"

ENV NODE_ENV=production
ENV PORT=3000

EXPOSE $PORT

USER happy

COPY --from=service-build --chown=1000:1000 /ladesa/management-service /ladesa/management-service

WORKDIR "/ladesa/management-service/packages/service"

HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:$PORT/health || exit 1

CMD bun run migration:run && bun run start
