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
ARG BUN_VERSION
USER root

# Configuração do ambiente Bun
ENV BUN_INSTALL="/opt/bun"
ENV BUN_INSTALL_CACHE_DIR="/tmp/bun-cache"
ENV TMPDIR=/tmp/bun-tmp
ENV PATH="${BUN_INSTALL}/bin:$PATH"

# Cria diretórios necessários
RUN mkdir -p "${BUN_INSTALL}/bin" "${BUN_INSTALL_CACHE_DIR}" "${TMPDIR}" \
    && chmod -R 777 "${BUN_INSTALL_CACHE_DIR}" "${TMPDIR}"

RUN curl -fsSL "https://github.com/oven-sh/bun/releases/download/bun-v${BUN_VERSION}/bun-linux-x64-baseline.zip" -o bun.zip \
    && unzip bun.zip \
    && mv bun-linux-x64-baseline/bun "${BUN_INSTALL}/bin/bun" \
    && chmod +x "${BUN_INSTALL}/bin/bun" \
    && rm -rf bun.zip bun-linux-x64-baseline

RUN bun --version

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
WORKDIR "/ladesa/management-service/src/app"

# ==========================================
# IMAGEM PARA AMBIENTE DE DESENVOLVIMENTO
# ==========================================

FROM os-development AS devcontainer

USER root

RUN --mount=type=cache,target=/var/cache/apt,sharing=locked \
    --mount=type=cache,target=/var/lib/apt,sharing=locked \
    apt-get update -y && apt-get install -y git vim zsh && \
    rm -rf /var/lib/apt/lists/*

# Instalação do mermerd (gerador de ERD a partir do banco)
RUN curl -fsSL "https://github.com/KarnerTh/mermerd/releases/download/v0.13.0/mermerd_0.13.0_linux_amd64.tar.gz" -o mermerd.tar.gz \
    && tar -xzf mermerd.tar.gz mermerd \
    && mv mermerd /usr/local/bin/mermerd \
    && chmod +x /usr/local/bin/mermerd \
    && rm -f mermerd.tar.gz

USER 1000:1000
RUN sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
RUN sed -i 's/^ZSH_THEME=.*/ZSH_THEME="josh"/' ~/.zshrc

# ==========================================
# INSTALAÇÃO DE DEPENDÊNCIAS DE PRODUÇÃO
# ==========================================

FROM os-development AS source-with-production-dependencies

USER 1000:1000

WORKDIR "/ladesa/management-service/src"

COPY --chown=1000:1000 . .

WORKDIR "/ladesa/management-service/src/app"

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
RUN bun --bun run typecheck

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

COPY --from=service-build --chown=1000:1000 /ladesa/management-service/src /ladesa/management-service/src

WORKDIR "/ladesa/management-service/src/app"

CMD bun run migration:run && bun run start
