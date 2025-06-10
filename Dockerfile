# ========================================
# Management Service / Core Image
# ========================================
FROM docker.io/oven/bun:1 AS core

USER root
RUN mkdir -p /ladesa
RUN chown -R 1000:1000 /ladesa

USER 1000:1000
ENV HOME=/home/bun

ENV BUN_INSTALL_BIN="${HOME}/.local/bin"
ENV BUN_INSTALL_CACHE_DIR="${HOME}/bun/install/cache"

ENV PATH="$BUN_INSTALL_BIN:$PATH"
RUN mkdir -p ${BUN_INSTALL_BIN}

USER root
RUN --mount=type=cache,id=ldsa-management-service-bun,target=${BUN_INSTALL_CACHE_DIR} \
  chown -R 1000:1000 ${BUN_INSTALL_CACHE_DIR} && \
  chmod -R 0755 ${BUN_INSTALL_CACHE_DIR}
USER 1000:1000

# ==============================================
# Management Service / Development Tools Vendors
# ==============================================
FROM core AS development-vendors

ENV PNPM_HOME="${HOME}/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

USER root
RUN --mount=type=cache,id=ldsa-management-service-bun,target=${PNPM_HOME} \
  chown -R 1000:1000 ${PNPM_HOME} && \
  chmod -R 0755 ${PNPM_HOME}
USER 1000:1000

RUN --mount=type=cache,id=ldsa-management-service-bun,target=${BUN_INSTALL_CACHE_DIR} bun install --global @pnpm/exe

# ==========================================================
# Management Service / Source with All Dependencies
# ==========================================================
FROM development-vendors AS source-with-dependencies
COPY --chown=1000:1000 . "/ladesa/.sources/management-service"
WORKDIR "/ladesa/.sources/management-service/"
RUN --mount=type=cache,id=ldsa-management-service-pnpm,target=${PNPM_HOME} pnpm install --frozen-lockfile

# ========================================
# Management Service / API Builder
# ========================================
FROM source-with-dependencies AS management-service-api-builder

RUN mkdir -p /ladesa/.builds
RUN --mount=type=cache,id=ldsa-management-service-pnpm,target=${PNPM_HOME} pnpm deploy --filter=@ladesa-ro/api.service --prod /ladesa/.builds/management-service-api

WORKDIR /ladesa/.builds/management-service-api

# ==========================================================
# Management Service / API / Docs / NPM Client Fetch Build
# ==========================================================
FROM source-with-dependencies AS management-service-api-client-npm-docs-builder

RUN pnpm run --filter "@ladesa-ro/api-client-fetch.docs" build
RUN --mount=type=cache,id=ldsa-management-service-pnpm,target=${PNPM_HOME} pnpm deploy --filter "@ladesa-ro/api-client-fetch.docs" "/ladesa/.builds/management-service-api-client-npm-docs"

# ==========================================================
# Management Service / API / Docs / NPM Client Fetch Runtime
# ==========================================================
FROM docker.io/nginx:alpine AS management-service-api-client-npm-docs-runtime

COPY ./services/docs/npm-api-client-fetch/nginx.conf /etc/nginx/nginx.conf
COPY --from=management-service-api-client-npm-docs-builder "/ladesa/.builds/management-service-api-client-npm-docs" "/ladesa/.builds/management-service-api-client-npm-docs"

EXPOSE 80

# ========================================
# Management Service / API Runtime
# ========================================

FROM core AS management-service-api-runtime

COPY --chown=1000:1000 --from=management-service-api-builder "/ladesa/.builds/management-service-api" "/ladesa/.builds/management-service-api"

USER 1000:1000
WORKDIR "/ladesa/.builds/management-service-api"
CMD bun run migration:run && bun run start:prod
