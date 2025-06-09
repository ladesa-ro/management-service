# ========================================
# CORE IMAGE
# ========================================

FROM oven/bun:1 AS core

# ========================================
# BASE IMAGE
# ========================================

FROM core AS base
ENV BUN_INSTALL_CACHE_DIR="/bun/install/cache"

RUN mkdir -p /var/lib/ladesa/.sources
RUN chown -R 1000:1000 /var/lib/ladesa/.sources

WORKDIR "/var/lib/ladesa/.sources/management-service/"

# ========================================
# DEVELOPMENT AND BUILD DEPENDENCIES
# ========================================

FROM base AS dev-dependencies
RUN mkdir -p /var/lib/ladesa/.builds
COPY . "/var/lib/ladesa/.sources/management-service"
RUN --mount=type=cache,id=bun,target=/bun/install/cache bun install --frozen-lockfile 

# ========================================
# API-SERVICE - BUILD
# ========================================

FROM dev-dependencies AS management-api-service-builder
RUN cp -r /var/lib/ladesa/.sources/management-service/services/api /var/lib/ladesa/.builds/management-api-service
WORKDIR /var/lib/ladesa/.builds/management-api-service
RUN --mount=type=cache,id=bun,target=/bun/install/cache bun install

# ========================================
# NPM / API-CLIENT-FETCH / DOCS -- BUILD
# ========================================

FROM dev-dependencies AS management-docs-npm-api-client-fetch-builder

RUN bun run --filter "@ladesa-ro/api-client-fetch.docs" build
RUN cp -r /var/lib/ladesa/.sources/management-service/services/docs/docs-npm-api-client-fetch "/var/lib/ladesa/.builds/management-docs-npm-api-client-fetch"

# ========================================
# NPM / API-CLIENT-FETCH / DOCS -- RUNTIME
# ========================================

FROM nginx:alpine AS management-docs-npm-api-client-fetch-runtime

COPY \
  ./services/docs/docs-npm-api-client-fetch/nginx.conf \
  /etc/nginx/nginx.conf

COPY --from=management-docs-npm-api-client-fetch-builder  "/var/lib/ladesa/.builds/npm-api-client-fetch-docs"  "/usr/local/ladesa-ro/services/npm-api-client-fetch-docs"
EXPOSE 80

# ========================================
# API-SERVICE -- RUNTIME
# ========================================

FROM core AS api-service-runtime
USER bun

COPY --from=api-service-builder \
  "/var/lib/ladesa/.builds/api-service" \
  "/usr/local/ladesa-ro/services/api-service"
WORKDIR "/usr/local/ladesa-ro/services/api-service"

CMD bun run migration:run && bun run start:prod
