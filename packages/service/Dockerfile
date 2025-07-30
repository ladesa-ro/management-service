# ========================================
# CORE IMAGE
# ========================================

FROM docker.io/oven/bun:1.2.19 AS core

# ========================================
# BASE IMAGE
# ========================================

FROM core AS base

ENV BUN_INSTALL_CACHE_DIR="/home/bun/.bun/install/cache"
ENV BUN_TMPDIR="/home/bun/.bun/tmp"

RUN mkdir -p /ladesa/.sources
RUN chown -R 1000:1000 /ladesa/.sources

WORKDIR "/ladesa/.sources/management-service/service"

FROM base AS devcontainer

# ========================================
# DEVELOPMENT AND BUILD DEPENDENCIES
# ========================================

FROM base AS dev-dependencies
RUN mkdir -p /ladesa/.builds

COPY . "/ladesa/.sources/management-service/service"

RUN --mount=type=cache,id=bun,target=${BUN_INSTALL_CACHE_DIR} bun install --frozen-lockfile

# ========================================
# MANAGEMENT-SERVICE - BUILD
# ========================================

FROM dev-dependencies AS management-service-builder

RUN cp -r /ladesa/.sources/management-service/service /ladesa/.builds/management-service

WORKDIR /ladesa/.builds/management-service
RUN --mount=type=cache,id=bun,target=${BUN_INSTALL_CACHE_DIR} bun install

## ========================================
## NPM / API-CLIENT-FETCH / DOCS -- BUILD
## ========================================
#
#FROM dev-dependencies AS docs-npm-api-client-fetch-builder
#
#RUN bun run --filter "@ladesa-ro/api-client-fetch.docs" build
#RUN cp -r /ladesa/.sources/api/docs/docs-npm-api-client-fetch "/ladesa/.builds/npm-api-client-fetch-docs"
#
## ========================================
## NPM / API-CLIENT-FETCH / DOCS -- RUNTIME
## ========================================
#
#FROM nginx:alpine AS docs-npm-api-client-fetch-runtime
#
#COPY packages/integrations/npm/api-client-fetch/docs-npm-api-client-fetch/nginx.conf /etc/nginx/nginx.conf
#
#COPY --from=docs-npm-api-client-fetch-builder  "/ladesa/.builds/npm-api-client-fetch-docs"  "/ladesa/services/npm-api-client-fetch-docs"
#EXPOSE 80

# ========================================
# MANAGEMENT-SERVICE -- RUNTIME
# ========================================

FROM core AS management-service-runtime

USER bun
COPY --from=management-service-builder \
  "/ladesa/.builds/management-service" \
  "/ladesa/services/management-service"

WORKDIR "/ladesa/services/management-service/packages/service"

CMD bun run migration:run && bun run start
