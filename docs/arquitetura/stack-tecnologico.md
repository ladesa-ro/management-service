# Stack tecnológico

**TLDR**: Bun + TypeScript + NestJS 11 + TypeORM 0.3 + PostgreSQL 15, Apollo Server 5 pro GraphQL, Zod 4 pra validação, Vitest 4 pros testes. Por que NestJS sobre Bun, especificamente, ver [ADR-002](decisoes-de-plataforma.md#adr-002-nestjs-e-bun).

| Categoria | Tecnologia | Versão |
|---|---|---|
| Runtime | [Bun](https://bun.sh/) | latest |
| Linguagem | [TypeScript](https://www.typescriptlang.org/) | 5.9.3 |
| Framework | [NestJS](https://nestjs.com/) | 11.1.17 |
| ORM | [TypeORM](https://typeorm.io/) | 0.3.28 |
| Banco de dados | [PostgreSQL](https://www.postgresql.org/) | 15 (bitnamilegacy) |
| Documentação de API | Swagger/OpenAPI + [Scalar](https://scalar.com/) | NestJS Swagger 11.2 |
| GraphQL | [Apollo Server](https://www.apollographql.com/docs/apollo-server/) | 5.4.0 |
| Validação | [Zod](https://zod.dev/) | 4.3.6 |
| Autenticação | [Keycloak](https://www.keycloak.org/) + OAuth2/OIDC | Admin Client 26.5 |
| JWT/JWKS | jsonwebtoken + jwks-rsa | 9.0.3 / 4.0.1 |
| Passport | `@nestjs/passport` | 11.0.5 |
| Message broker | [BullMQ](https://docs.bullmq.io/) sobre PostgreSQL (`createPostgresBackend`) | 6.2.0 |
| Processamento de imagem | [Sharp](https://sharp.pixelplumbing.com/) | 0.34.5 |
| Paginação | [nestjs-paginate](https://github.com/ppetzold/nestjs-paginate) | 12.9.0 |
| Eventos | `@nestjs/event-emitter` | 3.0.1 |
| Rate limiting | `@nestjs/throttler` | 6.5.0 |
| Agendamento | `@nestjs/schedule` | 6.1.1 |
| Segurança HTTP | [Helmet](https://helmetjs.github.io/) | 8.1.0 |
| Compressão | compression | 1.8.1 |
| Mixins | [ts-mixer](https://github.com/tannerntannern/ts-mixer) | 6.0.4 |
| Containerização | Docker (recomendado) / Podman | n/d |
| Task runner | [just](https://github.com/casey/just) | n/d |
| Monorepo | [Nx](https://nx.dev/) | 22.6.0 |
| Lint/formatação | [Biome](https://biomejs.dev/) | 2.4.8 |
| Testes | [Vitest](https://vitest.dev/) + Supertest | 4.1.0 / 7.2.2 |
| Cobertura | `@vitest/coverage-v8` | 4.1.0 |
