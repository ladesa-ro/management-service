# Management Service

API de gerenciamento acadêmico desenvolvida com NestJS, TypeORM e PostgreSQL, seguindo princípios de arquitetura hexagonal.

[![CI/CD - Management Service][action-build-deploy-dev-src]][action-build-deploy-dev-href]

---

## Sumário

- [Sobre o Projeto](#sobre-o-projeto)
- [Stack Tecnológico](#stack-tecnológico)
- [Requisitos](#requisitos)
- [Quick Start](#quick-start)
- [Desenvolvimento](#desenvolvimento)
  - [Estrutura do Projeto](#estrutura-do-projeto)
  - [Scripts Disponíveis](#scripts-disponíveis)
  - [Workflow de Desenvolvimento](#workflow-de-desenvolvimento)
- [Arquitetura](#arquitetura)
- [Docker e Infraestrutura](#docker-e-infraestrutura)
- [Migrations e Banco de Dados](#migrations-e-banco-de-dados)
- [Integrações](#integrações)
- [Testes](#testes)
- [Code Quality](#code-quality)
- [Troubleshooting](#troubleshooting)
- [Licença](#licença)

---

## Sobre o Projeto

O **Management Service** é uma API REST/GraphQL para gestão de instituições acadêmicas, cobrindo desde estrutura organizacional (campus, blocos, ambientes) até gestão de cursos, disciplinas, turmas, diários e horários.

**Ambiente de desenvolvimento público**: <https://dev.ladesa.com.br/api/v1/docs/>

### Principais Funcionalidades

- Gestão de estrutura física (campus, blocos, ambientes)
- Gestão acadêmica (cursos, disciplinas, turmas, etapas)
- Gestão de calendários e horários
- Sistema de diários e aulas
- Controle de acesso e autenticação
- Integração com Keycloak
- Geração automática de horários

---

## Stack Tecnológico

- **Runtime**: [Bun](https://bun.sh/) - JavaScript runtime ultrarrápido
- **Framework**: [NestJS](https://nestjs.com/) - Framework Node.js progressivo
- **ORM**: [TypeORM](https://typeorm.io/) - Mapeamento objeto-relacional
- **Banco de Dados**: [PostgreSQL 15](https://www.postgresql.org/)
- **Documentação**: [Swagger/OpenAPI](https://swagger.io/) + [Scalar](https://scalar.com/)
- **GraphQL**: Apollo Server
- **Autenticação**: Keycloak + OAuth2/OIDC
- **Containerização**: Docker + Docker Compose
- **Linting/Formatting**: [Biome](https://biomejs.dev/)
- **Testes**: [Vitest](https://vitest.dev/)

---

## Requisitos

### Para Iniciantes

Tudo que você precisa para começar:

- **Docker** (versão 20+)
- **Docker Compose** (versão 2+)
- **Git**
- **Make** (opcional, facilita comandos)

Não precisa instalar Node.js, Bun ou PostgreSQL - tudo roda dentro do Docker.

### Para Desenvolvedores Experientes

Se preferir rodar localmente sem Docker:

- **Bun** 1.3.6+
- **Node.js** 22+ (alternativa ao Bun)
- **PostgreSQL** 15+
- **Make** (GNU Make)

---

## Quick Start

### 1. Clonar o repositório

```bash
git clone https://github.com/ladesa-ro/management-service.git
cd management-service
```

### 2. Configurar ambiente

```bash
make setup
```

Isso vai:
- Criar arquivos `.env` e `.db.env` a partir dos exemplos
- Criar rede Docker `ladesa-net`
- Baixar e buildar as imagens dos containers

### 3. Subir a aplicação

```bash
make up
```

Isso vai:
- Iniciar containers da aplicação e banco de dados
- Instalar dependências
- Abrir shell dentro do container

### 4. Iniciar servidor de desenvolvimento

Dentro do container:

```bash
bun run dev
```

### 5. Acessar a aplicação

- **API**: http://localhost:3701
- **Documentação Swagger**: http://localhost:3701/api/v1/docs
- **GraphQL Playground**: http://localhost:3701/graphql

Pronto! A aplicação está rodando.

---

## Desenvolvimento

### Estrutura do Projeto

```
management-service/
├── app/                          # Código-fonte da aplicação
│   ├── lib/
│   │   └── v2/                   # Versão 2 da API (arquitetura hexagonal)
│   │       ├── core/             # Lógica de negócio (core domain)
│   │       │   ├── {modulo}/
│   │       │   │   ├── domain/           # Entidades de domínio
│   │       │   │   ├── application/      # Casos de uso
│   │       │   │   │   ├── ports/        # Interfaces (contratos)
│   │       │   │   │   │   ├── in/       # Use Case Ports
│   │       │   │   │   │   └── out/      # Repository Ports
│   │       │   │   │   ├── dto/          # Data Transfer Objects
│   │       │   │   │   └── use-cases/    # Implementação dos casos de uso
│   │       │   │   └── {modulo}.module.ts
│   │       │
│   │       ├── adapters/         # Adaptadores (infraestrutura)
│   │       │   ├── in/           # Adaptadores de entrada
│   │       │   │   └── http/     # Controllers REST
│   │       │   └── out/          # Adaptadores de saída
│   │       │       └── persistence/
│   │       │           └── typeorm/
│   │       │               ├── adapters/     # Repository Adapters
│   │       │               └── entities/     # Entidades TypeORM
│   │       │
│   │       └── server/           # Camada de apresentação
│   │           ├── main.ts       # Bootstrap da aplicação
│   │           └── ...
│   │
│   ├── package.json
│   ├── biome.json                # Configuração Biome
│   ├── tsconfig.json
│   └── vitest.config.mts
│
├── compose.yml                   # Docker Compose
├── Makefile                      # Comandos úteis
├── .env.example                  # Exemplo de variáveis de ambiente
├── .db.env.example               # Exemplo de variáveis do banco
├── PLANO_REFATORACAO.md          # Plano de migração arquitetural
└── README.md
```

### Sobre a Arquitetura Hexagonal

O projeto está sendo migrado para **arquitetura hexagonal (Ports & Adapters)**. Veja [PLANO_REFATORACAO.md](./PLANO_REFATORACAO.md) para detalhes completos.

**Princípios:**
- **Core independente**: Lógica de negócio não depende de frameworks
- **Portas e Adaptadores**: Interfaces claras entre camadas
- **Testabilidade**: Fácil mockar dependências
- **Inversão de Dependência**: Core define contratos, adapters implementam

### Scripts Disponíveis

#### Dentro do container (após `make up`):

```bash
# Desenvolvimento
bun run dev              # Inicia servidor em modo watch
bun run debug            # Inicia servidor com debugger
bun run start            # Inicia servidor em produção

# Build e Type Check
bun run build            # Build do projeto
bun run check:static     # Verifica tipos TypeScript

# Testes
bun run test             # Executa testes unitários
bun run test:cov         # Testes com cobertura
bun run test:e2e         # Testes end-to-end
bun run test:watch       # Testes em modo watch

# Migrations
bun run migration:run    # Executa migrations pendentes
bun run migration:revert # Reverte última migration
bun run typeorm:generate # Gera migration baseada nas entidades
bun run typeorm:create   # Cria migration vazia

# Code Quality
bun run code:check       # Verifica código (lint + format)
bun run code:fix         # Corrige código automaticamente
```

#### Fora do container (comandos Make):

```bash
make setup          # Configura ambiente inicial
make up             # Sobe containers e abre shell
make up-no-recreate # Sobe sem recriar containers
make down           # Para containers
make cleanup        # Para e remove containers + volumes
make logs           # Mostra logs dos containers
make shell-1000     # Abre shell como usuário happy (uid 1000)
make shell-root     # Abre shell como root
```

### Workflow de Desenvolvimento

1. **Inicie o ambiente:**
   ```bash
   make up
   ```

2. **Rode o servidor de desenvolvimento:**
   ```bash
   bun run dev
   ```

3. **Faça suas alterações** - O servidor recarrega automaticamente

4. **Execute testes:**
   ```bash
   bun run test
   ```

5. **Verifique o código:**
   ```bash
   bun run code:check
   ```

6. **Crie/rode migrations se necessário:**
   ```bash
   bun run typeorm:generate -- lib/v2/adapters/out/persistence/typeorm/typeorm/migrations/NomeDaMigration
   bun run migration:run
   ```

7. **Commite suas alterações**

---

## Arquitetura

### Modelo Hexagonal

```
┌─────────────────────────────────────────────────────┐
│              ADAPTERS IN (Drivers)                  │
│  ┌───────────┐  ┌───────────┐  ┌───────────┐      │
│  │   REST    │  │  GraphQL  │  │  gRPC     │      │
│  │Controllers│  │ Resolvers │  │   ...     │      │
│  └─────┬─────┘  └─────┬─────┘  └─────┬─────┘      │
│        │              │              │              │
│        └──────────────┴──────────────┘              │
│                       │                              │
│            ┌──────────▼──────────┐                  │
│            │   USE CASE PORTS    │                  │
│            │    (Interfaces)     │                  │
│            └──────────┬──────────┘                  │
│                       │                              │
│        ┌──────────────▼──────────────┐              │
│        │        APPLICATION           │              │
│        │  ┌────────────────────────┐ │              │
│        │  │    Use Cases/Services  │ │              │
│        │  └────────────────────────┘ │              │
│        │  ┌────────────────────────┐ │              │
│        │  │    Domain Models       │ │   CORE       │
│        │  └────────────────────────┘ │              │
│        └──────────────┬──────────────┘              │
│                       │                              │
│            ┌──────────▼──────────┐                  │
│            │  REPOSITORY PORTS   │                  │
│            │    (Interfaces)     │                  │
│            └──────────┬──────────┘                  │
│                       │                              │
│        ┌──────────────┴──────────────┐              │
│        │              │               │              │
│  ┌─────▼─────┐  ┌────▼────┐  ┌──────▼──────┐      │
│  │  TypeORM  │  │  Cache  │  │  External   │      │
│  │ Adapters  │  │ Adapters│  │  APIs       │      │
│  └───────────┘  └─────────┘  └─────────────┘      │
│              ADAPTERS OUT (Driven)                  │
└─────────────────────────────────────────────────────┘
```

### Camadas

1. **Core (core/)**: Lógica de negócio pura
   - Domain: Entidades com regras de domínio
   - Application: Casos de uso e DTOs
   - Ports: Interfaces (contratos entre camadas)

2. **Adapters (adapters/)**: Infraestrutura
   - In: HTTP/REST, GraphQL, eventos
   - Out: Bancos de dados, APIs externas, cache

3. **Server (server/)**: Bootstrap e configuração

---

## Docker e Infraestrutura

### Serviços

| Serviço | Container | Porta Host | Porta Container | Descrição |
|---------|-----------|------------|-----------------|-----------|
| API | `ladesa-management-service` | 3701 | 3701 | Aplicação NestJS |
| Debugger | `ladesa-management-service` | 9229 | 9229 | Node Inspector |
| Banco de Dados | `ladesa-management-service-db` | 5432 | 5432 | PostgreSQL 15 |

### Volumes Persistentes

- `ladesa-management-service-db-data`: Dados do PostgreSQL
- `ladesa-management-service-uploaded-files`: Arquivos enviados
- `./volumes/history/`: Histórico de comandos (bash/zsh)

### Variáveis de Ambiente

#### `.env` (Aplicação)

```env
PORT=3701
NODE_ENV=development

# Database
DATABASE_URL=postgresql://postgres:senha@ladesa-management-service-db:5432/main
DATABASE_USE_SSL=false
TYPEORM_LOGGING=true

# OAuth2/Keycloak
OAUTH2_CLIENT_PROVIDER_OIDC_ISSUER=https://sso.ladesa.com.br/realms/sisgea-playground
OAUTH2_CLIENT_REGISTRATION_LOGIN_CLIENT_ID=seu-client-id
OAUTH2_CLIENT_REGISTRATION_LOGIN_CLIENT_SECRET=seu-secret
OAUTH2_CLIENT_REGISTRATION_LOGIN_SCOPE=openid profile

KC_BASE_URL=https://sso.ladesa.com.br
```

#### `.db.env` (PostgreSQL)

```env
POSTGRESQL_USERNAME=postgres
POSTGRESQL_PASSWORD=sua-senha-segura
POSTGRESQL_DATABASE=main
```

---

## Migrations e Banco de Dados

### Comandos de Migration

```bash
# Criar migration vazia
bun run typeorm:create -- lib/v2/adapters/out/persistence/typeorm/typeorm/migrations/NomeDaMigration

# Gerar migration automaticamente baseada nas entidades
bun run typeorm:generate -- lib/v2/adapters/out/persistence/typeorm/typeorm/migrations/NomeDaMigration

# Executar migrations pendentes
bun run migration:run

# Reverter última migration
bun run migration:revert
```

### Trabalhando com Entidades TypeORM

As entidades ficam em: `app/lib/v2/adapters/out/persistence/typeorm/typeorm/entities/`

Após criar/modificar entidades:

1. Gere a migration: `bun run typeorm:generate -- lib/v2/adapters/out/persistence/typeorm/typeorm/migrations/AddNovaTabela`
2. Revise a migration gerada
3. Execute: `bun run migration:run`

---

## Integrações

### Cliente JavaScript/TypeScript

O projeto gera automaticamente um cliente NPM para consumir a API.

```bash
npm install @ladesa-ro/management-service-client@latest
```

```typescript
import { ManagementServiceClient } from '@ladesa-ro/management-service-client';

const client = new ManagementServiceClient({
  baseURL: 'https://dev.ladesa.com.br/api/v1',
  token: 'seu-bearer-token'
});

const campus = await client.campus.findAll();
```

### GraphQL

Endpoint GraphQL: `http://localhost:3701/graphql`

Exemplo de query:

```graphql
query {
  campus {
    id
    nome
    cnpj
  }
}
```

---

## Testes

### Executando Testes

```bash
# Testes unitários
bun run test

# Testes com cobertura
bun run test:cov

# Testes end-to-end
bun run test:e2e

# Testes em modo watch
bun run test:watch

# Testes com debug
bun run test:debug
```

### Estrutura de Testes

```
app/
├── lib/v2/core/{modulo}/
│   ├── application/
│   │   └── use-cases/
│   │       ├── {modulo}.service.ts
│   │       └── {modulo}.service.spec.ts    # Testes unitários
│   └── ...
└── test/
    └── app.e2e-spec.ts                      # Testes E2E
```

---

## Code Quality

### Linting e Formatação

O projeto usa **Biome** para linting e formatação de código.

```bash
# Verificar código
bun run code:check

# Corrigir automaticamente
bun run code:fix

# Apenas formatação
bun run code:check:format
bun run code:fix:format

# Apenas linting
bun run code:check:lint
bun run code:fix:lint
```

### Type Checking

```bash
# Verificar tipos TypeScript
bun run check:static
```

### Pre-commit Hooks

Recomenda-se configurar hooks de pre-commit para garantir qualidade:

```bash
# .git/hooks/pre-commit
#!/bin/bash
bun run code:fix
bun run check:static
bun run test
```

---

## Troubleshooting

### Problemas Comuns

#### 1. Erro ao conectar no banco de dados

**Sintoma:** `ECONNREFUSED` ou `Connection refused`

**Solução:**
```bash
# Verifique se o container do banco está rodando
docker ps | grep ladesa-management-service-db

# Se não estiver, suba novamente
make down && make up
```

#### 2. Porta 3701 já está em uso

**Sintoma:** `Error: listen EADDRINUSE: address already in use :::3701`

**Solução:**
```bash
# Encontre o processo usando a porta
lsof -i :3701

# Mate o processo
kill -9 <PID>

# Ou use outra porta (altere no .env)
PORT=3702
```

#### 3. Dependências desatualizadas

**Sintoma:** Erros de import ou módulos não encontrados

**Solução:**
```bash
# Dentro do container
bun install

# Ou recrie o container
make cleanup && make up
```

#### 4. Migration falhou

**Sintoma:** Erro ao executar migration

**Solução:**
```bash
# Reverta a última migration
bun run migration:revert

# Corrija o arquivo de migration
# Re-execute
bun run migration:run
```

#### 5. Container não inicia

**Sintoma:** Container para imediatamente após iniciar

**Solução:**
```bash
# Veja os logs
make logs

# Reconstrua as imagens
make cleanup
docker system prune -a  # Cuidado: remove todas imagens não usadas
make setup
```

### Logs e Debug

```bash
# Ver logs em tempo real
make logs

# Ver logs de um serviço específico
docker compose logs -f ladesa-management-service

# Entrar no container como root (para debug de sistema)
make shell-root

# Verificar saúde dos containers
docker compose ps
```

### Resetar Ambiente Completamente

Se nada funcionar:

```bash
make cleanup           # Remove containers e volumes
docker system prune -a # Remove imagens não usadas
rm -rf app/node_modules
rm .env .db.env
make setup             # Reconfigure
make up                # Suba novamente
```

---

## Contribuindo

### Guidelines

1. **Siga a arquitetura hexagonal** - Veja [PLANO_REFATORACAO.md](./PLANO_REFATORACAO.md)
2. **Escreva testes** para novos recursos
3. **Use Biome** para formatar código (`bun run code:fix`)
4. **Valide tipos** antes de comitar (`bun run check:static`)
5. **Documente** mudanças significativas
6. **Commits semânticos**: `feat:`, `fix:`, `chore:`, `docs:`, etc.

### Processo de Pull Request

1. Crie uma branch: `git checkout -b feat/minha-feature`
2. Faça suas alterações
3. Execute testes: `bun run test`
4. Verifique código: `bun run code:fix && bun run check:static`
5. Commit: `git commit -m "feat: adiciona funcionalidade X"`
6. Push: `git push origin feat/minha-feature`
7. Abra Pull Request no GitHub

---

## Recursos Adicionais

- **Documentação da API**: <https://dev.ladesa.com.br/api/v1/docs/>
- **Repositório**: <https://github.com/ladesa-ro/management-service>
- **Cliente NPM**: <https://www.npmjs.com/package/@ladesa-ro/management-service-client>
- **Plano de Refatoração**: [PLANO_REFATORACAO.md](./PLANO_REFATORACAO.md)
- **Issues**: <https://github.com/ladesa-ro/management-service/issues>

---

## Licença

[MIT](./LICENSE) © 2024 – presente, Ladesa.

---

<!-- Links dos Badges -->

[action-build-deploy-dev-src]: https://img.shields.io/github/actions/workflow/status/ladesa-ro/management-service/build-deploy.dev.yml?style=flat&logo=github&logoColor=white&label=Deploy&branch=main&labelColor=18181B
[action-build-deploy-dev-href]: https://github.com/ladesa-ro/management-service/actions/workflows/build-deploy.dev.yml?query=branch%3Amain
