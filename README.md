# Management Service

API REST/GraphQL de gerenciamento acadêmico desenvolvida com NestJS, TypeORM e PostgreSQL, seguindo princípios de arquitetura hexagonal (ports & adapters).

[![CI/CD - Management Service][action-build-deploy-dev-src]][action-build-deploy-dev-href]

**Ambiente de desenvolvimento público**: <https://dev.ladesa.com.br/api/v1/docs/>

---

## Sumário

- [Visão geral](#visão-geral)
- [Arquitetura](#arquitetura)
  - [Arquitetura hexagonal](#arquitetura-hexagonal)
  - [CQRS](#cqrs)
  - [Estrutura de diretórios](#estrutura-de-diretórios)
  - [Módulos de domínio](#módulos-de-domínio)
- [Por que containers?](#por-que-containers)
- [Pré-requisitos](#pré-requisitos)
- [Clonando o repositório](#clonando-o-repositório)
- [Rodando o projeto](#rodando-o-projeto)
  - [Caminho A: justfile (recomendado)](#caminho-a-justfile-recomendado)
  - [Caminho B: Dev Container](#caminho-b-dev-container)
- [Acessando a aplicação](#acessando-a-aplicação)
- [Serviços do ambiente](#serviços-do-ambiente)
- [Variáveis de ambiente](#variáveis-de-ambiente)
- [Scripts disponíveis](#scripts-disponíveis)
- [Banco de dados e migrações](#banco-de-dados-e-migrações)
- [Autenticação e autorização](#autenticação-e-autorização)
- [GraphQL](#graphql)
- [Message broker](#message-broker)
- [Qualidade de código](#qualidade-de-código)
- [Testes](#testes)
- [CI/CD](#cicd)
- [Stack tecnológico](#stack-tecnológico)
- [Licença](#licença)

---

## Visão geral

O **Management Service** é o back-end principal do ecossistema Ladesa. Ele expõe uma API REST (com documentação Swagger/Scalar) e uma API GraphQL (com playground GraphiQL) para gerenciar dados acadêmicos: campus, cursos, turmas, diários, horários, estágios, calendários e mais.

A aplicação roda sobre o runtime [Bun](https://bun.sh/), utiliza o framework [NestJS](https://nestjs.com/) e persiste dados em [PostgreSQL 15](https://www.postgresql.org/) via [TypeORM](https://typeorm.io/). A autenticação é delegada a um servidor [Keycloak](https://www.keycloak.org/) via OAuth2/OIDC, e a comunicação assíncrona com outros serviços acontece por meio de filas [RabbitMQ](https://www.rabbitmq.com/).

Todo o ambiente de desenvolvimento é containerizado — você **não precisa instalar** Bun, Node.js, PostgreSQL nem nenhuma outra dependência diretamente na sua máquina.

---

## Arquitetura

### Arquitetura hexagonal

O projeto segue a **arquitetura hexagonal** (também conhecida como _ports & adapters_). A ideia central é que a lógica de negócio (domínio) não depende de frameworks, bancos de dados ou protocolos — ela define **contratos** (interfaces/ports), e as camadas externas fornecem **implementações** (adapters).

```mermaid
graph TD
    A["🖥️ Apresentação\n(REST controllers, GraphQL resolvers)"]
    B["⚙️ Aplicação\n(command handlers, query handlers, autorização)"]
    C["🏛️ Domínio\n(entidades, contratos de repositório, erros,\nvalidação, abstrações de serviços externos)"]
    D["🔌 Infraestrutura\n(TypeORM, Keycloak, RabbitMQ, filesystem, config)"]

    A -- "chama" --> B
    B -- "usa interfaces de" --> C
    D -- "implementa contratos de" --> C

    style A fill:#4a90d9,stroke:#2c5f8a,color:#fff
    style B fill:#7b68ee,stroke:#5a4db0,color:#fff
    style C fill:#e8a838,stroke:#b07c1e,color:#fff
    style D fill:#50b86c,stroke:#3a8a50,color:#fff
```

O fluxo de dependência sempre aponta **para dentro**: a apresentação depende da aplicação, que depende do domínio. A infraestrutura implementa os contratos do domínio, mas o domínio nunca referencia a infraestrutura diretamente.

### CQRS

Dentro de cada módulo, operações de **leitura** (queries) e **escrita** (commands) são separadas em handlers distintos:

```mermaid
graph LR
    subgraph "Escrita (Commands)"
        C1["Create"]
        C2["Update"]
        C3["Delete"]
    end

    subgraph "Leitura (Queries)"
        Q1["FindById"]
        Q2["FindAll\n(paginação)"]
    end

    REQ["Requisição\n(REST / GraphQL)"] --> AC["AccessContext\n(usuário autenticado)"]
    AC --> C1 & C2 & C3
    AC --> Q1 & Q2

    C1 & C2 & C3 --> REPO["Repositório\n(escrita)"]
    Q1 & Q2 --> REPO2["Repositório\n(leitura)"]

    style REQ fill:#4a90d9,stroke:#2c5f8a,color:#fff
    style AC fill:#e8a838,stroke:#b07c1e,color:#fff
    style REPO fill:#50b86c,stroke:#3a8a50,color:#fff
    style REPO2 fill:#50b86c,stroke:#3a8a50,color:#fff
```

Cada handler recebe um contexto de acesso (`IAccessContext`) que carrega informações do usuário autenticado, permitindo que a autorização seja verificada antes de executar a operação.

### Estrutura de diretórios

```
management-service/
├── .devcontainer/          # Configuração do Dev Container (VS Code / WebStorm)
├── .docker/                # Containerfile e docker-compose.yml
├── .deploy/                # Scripts e values de deploy (Helm/Kubernetes)
├── .github/workflows/      # Pipelines de CI/CD
├── src/                    # Código-fonte principal
│   ├── domain/             # Camada de domínio (entidades, abstrações, erros)
│   ├── application/        # Camada de aplicação (handlers, autorização, paginação)
│   ├── infrastructure.*/   # Adapters de infraestrutura (um por concern)
│   │   ├── infrastructure.config/              # Variáveis de ambiente e opções de runtime
│   │   ├── infrastructure.database/            # TypeORM, migrações, paginação
│   │   ├── infrastructure.graphql/             # Apollo Server, DTOs GraphQL
│   │   ├── infrastructure.identity-provider/   # Keycloak, OIDC, JWKS
│   │   ├── infrastructure.authorization/       # Implementações de permissão
│   │   ├── infrastructure.logging/             # Correlation ID, performance hooks
│   │   ├── infrastructure.message-broker/      # RabbitMQ via Rascal
│   │   ├── infrastructure.storage/             # Armazenamento de arquivos (filesystem)
│   │   ├── infrastructure.timetable-generator/ # Contratos de geração de horários
│   │   └── infrastructure.dependency-injection/# Configuração de DI do NestJS
│   ├── modules/            # Módulos de feature (um por entidade/conceito)
│   ├── server/             # Bootstrap do NestJS, filtros, interceptors, auth
│   ├── shared/             # Mappers, validação, decorators compartilhados
│   ├── utils/              # Utilitários puros (datas, helpers)
│   ├── commands/           # Scripts CLI (dev, test, migrations, etc.)
│   └── test/               # Helpers de teste (mocks, factories)
├── justfile                # Receitas do task runner just
└── .env.example            # Template de variáveis de ambiente
```

### Módulos de domínio

Cada módulo segue a mesma estrutura hexagonal interna:

```
modules/<nome-do-modulo>/
├── domain/
│   ├── authorization/      # Contrato de permissões (IPermissionChecker)
│   ├── commands/           # Definições de commands
│   ├── queries/            # Definições de queries
│   ├── repositories/       # Contratos de repositório
│   └── shared/             # Utilitários de domínio
├── application/
│   ├── authorization/      # Implementação do permission checker
│   ├── commands/           # Command handlers
│   └── queries/            # Query handlers
├── infrastructure.database/
│   └── typeorm/            # Entidades e adapters TypeORM
├── presentation.rest/      # Controllers REST (Swagger)
└── presentation.graphql/   # Resolvers GraphQL
```

**Módulos organizados por área de negócio:**

| Área | Módulos |
|------|---------|
| **Acesso** | `usuario`, `autenticacao`, `notificacao`, `perfil` |
| **Ambientes** | `campus`, `bloco`, `ambiente` |
| **Armazenamento** | `arquivo`, `imagem`, `imagem-arquivo` |
| **Ensino** | `curso`, `disciplina`, `modalidade`, `nivel-formacao`, `oferta-formacao`, `oferta-formacao-periodo`, `oferta-formacao-periodo-etapa`, `turma`, `diario` |
| **Estágio** | `empresa`, `estagiario`, `estagio`, `responsavel-empresa` |
| **Horários** | `calendario-letivo`, `calendario-agendamento`, `gerar-horario`, `horario-aula`, `horario-aula-configuracao`, `horario-consulta`, `horario-edicao`, `relatorio`, `turma-horario-aula` |
| **Localidades** | `estado`, `cidade`, `endereco` |

---

## Por que containers?

No mundo do desenvolvimento de software, existem diversas linguagens de programação (TypeScript, Python, Go...) e cada uma possui várias versões diferentes, que podem ter mudanças significativas entre si. Além disso, cada projeto pode depender de ferramentas e bibliotecas específicas, cada qual com suas próprias versões.

Ter tudo isso instalado e corretamente configurado na máquina de cada desenvolvedor — e nos ambientes de produção — pode rapidamente se tornar um pesadelo: conflitos de versão, dependências incompatíveis, aquele clássico "na minha máquina funciona".

**Containers** resolvem isso. Um container empacota um sistema operacional mínimo junto com todas as ferramentas, bibliotecas e configurações que o projeto precisa, de forma isolada e reproduzível. Isso garante que **todos os desenvolvedores** — independentemente do sistema operacional ou do que já tem instalado — trabalhem com exatamente o mesmo ambiente.

Na prática, isso significa que você **não precisa instalar** Bun, Node.js, PostgreSQL nem nenhuma outra dependência diretamente na sua máquina. Tudo roda dentro do container.

---

## Pré-requisitos

Para contribuir com este projeto, você precisa de:

### Container runtime

| Opção | Instalação |
|-------|------------|
| **Docker + Docker Compose** (v2+) **(recomendado)** | [docs.docker.com](https://docs.docker.com/get-docker/) |
| Podman + Podman Compose | [podman.io](https://podman.io/getting-started/installation) |

> **Nota sobre Podman:** a recomendação oficial é o **Docker**. O projeto possui algumas configurações de compatibilidade com Podman (`userns_mode`, `x-podman`), porém o uso do Podman é **por conta e risco do usuário** — podem haver problemas de compatibilidade não cobertos pelo projeto.
>
> Se optar pelo Podman, defina a variável de ambiente `OCI_RUNTIME=podman` antes de rodar os comandos.

### just (command runner) — recomendado

O projeto usa o [just](https://github.com/casey/just) como task runner no lugar do Make. A instalação é **recomendada** para quem pretende usar o [Caminho A (justfile)](#caminho-a-justfile-recomendado), que é o caminho principal de desenvolvimento.

| Plataforma | Instalação |
|------------|------------|
| Linux (curl) | `curl --proto '=https' --tlsv1.2 -sSf https://just.systems/install.sh \| bash -s -- --to /usr/local/bin` |
| macOS (Homebrew) | `brew install just` |
| Windows (Scoop) | `scoop install just` |
| Cargo | `cargo install just` |

Mais opções em: <https://github.com/casey/just#installation>

### Git

Necessário para clonar e versionar o código-fonte.

- Tutorial de instalação e configuração: <https://docs.ladesa.com.br/docs/developers-guide/tutorials/source-code/git/>

### Editor de código (escolha um)

| Editor | Dev Container |
|--------|---------------|
| **VS Code** | Suporte nativo via extensão [Dev Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) |
| **WebStorm** | Suporte via [Remote Development](https://www.jetbrains.com/help/webstorm/connect-to-devcontainer.html) |

### Familiaridade com linha de comando

Você vai precisar usar o terminal para clonar o repositório, executar comandos e interagir com o container.

- Tutorial básico: <https://docs.ladesa.com.br/docs/developers-guide/tutorials/os/command-line/>

---

## Clonando o repositório

```bash
git clone https://github.com/ladesa-ro/management-service.git
cd management-service
```

> O `just setup` já copia automaticamente os arquivos `.example` para você. Nenhuma configuração manual é necessária para começar.

---

## Rodando o projeto

Existem dois caminhos para subir o ambiente de desenvolvimento. Escolha o que preferir:

| Caminho | Quando usar |
|---------|-------------|
| **A: justfile (recomendado)** | Você gerencia os containers pelo terminal com o `just`, independentemente do editor. Funciona com qualquer editor ou IDE. |
| **B: Dev Container** | Você usa VS Code ou WebStorm e quer que o editor abra diretamente dentro do container, com extensões, terminal e tudo configurado automaticamente. |

### Caminho A: justfile (recomendado)

O `justfile` oferece receitas prontas para gerenciar todo o ciclo de vida dos containers pelo terminal. É o caminho mais direto e flexível — funciona com qualquer editor.

#### 1. Configurar e subir o ambiente

```bash
just up
```

Esse único comando faz tudo:

- Copia os arquivos `.env` a partir dos exemplos (se ainda não existirem).
- Faz o build das imagens dos containers (apenas se houve mudanças).
- Sobe os containers (aplicação + PostgreSQL + RabbitMQ).
- Instala as dependências (`bun install`).
- Abre um shell `zsh` dentro do container da aplicação.

#### 2. Iniciar o servidor de desenvolvimento

Você já estará dentro do container após o `just up`. Basta rodar:

```bash
bun run dev
```

#### Receitas disponíveis

| Comando | O que faz |
|---------|-----------|
| `just up` | Sobe tudo e abre shell no container |
| `just start` | Sobe os containers em background (sem abrir shell) |
| `just stop` | Para os containers (sem remover) |
| `just down` | Para e remove os containers |
| `just cleanup` | Para, remove containers **e volumes** (reset completo) |
| `just logs` | Mostra logs dos containers em tempo real |
| `just shell-1000` | Abre shell como usuário `happy` (uid 1000) |
| `just shell-root` | Abre shell como `root` |
| `just build` | Faz o build da imagem (apenas se inputs mudaram) |
| `just rebuild` | Força rebuild da imagem |
| `just compose <args>` | Passa argumentos direto para o `docker compose` |

> **Usando Podman?** Defina a variável `OCI_RUNTIME=podman` antes dos comandos:
> ```bash
> OCI_RUNTIME=podman just up
> ```

---

### Caminho B: Dev Container

O [Dev Container](https://containers.dev/) é uma alternativa que configura automaticamente todo o ambiente de desenvolvimento — extensões, formatação, terminal, portas — dentro do container Docker, integrado ao editor.

#### VS Code

1. Instale a extensão **Dev Containers** (`ms-vscode-remote.remote-containers`).
2. Abra a pasta do projeto no VS Code.
3. Quando aparecer a notificação _"Reopen in Container"_, clique nela.
   - Ou use o Command Palette (`Ctrl+Shift+P`) e selecione **Dev Containers: Reopen in Container**.
4. Aguarde o build do container e a instalação das dependências (na primeira vez pode demorar alguns minutos).
5. Abra o terminal integrado (`` Ctrl+` ``) e inicie o servidor:

```bash
bun run dev
```

#### WebStorm

1. Abra a pasta do projeto no WebStorm.
2. Vá em **File > Remote Development > Dev Containers** e selecione o `devcontainer.json` do projeto.
3. Aguarde o build e a inicialização do container.
4. Abra o terminal integrado e inicie o servidor:

```bash
bun run dev
```

#### O que o Dev Container configura para você

- **Extensões do editor** — Biome, Vitest, GitLens, GraphQL, SQL Tools, Docker, GitHub CLI, entre outras.
- **Formatação automática ao salvar** — via Biome.
- **Terminal padrão** — `zsh` com Oh My Zsh.
- **Portas encaminhadas** — `3701` (API), `9229` (debug), `5432` (PostgreSQL).
- **Instalação automática de dependências** — `bun install` executado automaticamente.
- **Usuário do container** — `happy` (uid 1000).

---

## Acessando a aplicação

Após iniciar o servidor com `bun run dev`, acesse:

| Recurso | URL | Descrição |
|---------|-----|-----------|
| API REST | <http://localhost:3701> | Raiz da API (health check) |
| Documentação Swagger/Scalar | <http://localhost:3701/api/v1/docs> | Documentação interativa da API REST com Scalar |
| GraphQL Playground | <http://localhost:3701/graphql> | Interface GraphiQL para explorar e testar queries/mutations |

---

## Serviços do ambiente

Quando você sobe o ambiente (via Dev Container ou `just up`), os seguintes serviços são iniciados:

```mermaid
graph TB
    subgraph Docker Compose
        MS["Management Service\n:3701 (API)\n:9229 (debug)"]
        DB["PostgreSQL 15\n:5432"]
        RMQ["RabbitMQ 3\n:15672 (UI)"]
    end

    MS --> DB
    MS --> RMQ

    style MS fill:#4a90d9,stroke:#2c5f8a,color:#fff
    style DB fill:#336791,stroke:#1e3d5c,color:#fff
    style RMQ fill:#ff6600,stroke:#b34700,color:#fff
```

| Serviço | Porta | Descrição |
|---------|-------|-----------|
| **Management Service** | `3701` | Aplicação NestJS (API REST + GraphQL) |
| **PostgreSQL 15** | `5432` | Banco de dados relacional |
| **RabbitMQ 3** | `15672` | UI de gerenciamento do message broker (usuário: `admin`, senha: `admin`) |
| **Node Debugger** | `9229` | Porta de debug (para attach via VS Code ou WebStorm) |

---

## Variáveis de ambiente

As variáveis são definidas no arquivo `.env`, criado automaticamente a partir do `.env.example`. As principais são:

| Variável | Valor padrão | Descrição |
|----------|--------------|-----------|
| `PORT` | `3701` | Porta da aplicação |
| `NODE_ENV` | `development` | Ambiente de execução |
| `DATABASE_URL` | `postgresql://...` | String de conexão com o PostgreSQL |
| `DATABASE_USE_SSL` | `false` | Habilitar SSL na conexão com o banco |
| `TYPEORM_LOGGING` | `true` | Logs de queries SQL no console |
| `OAUTH2_CLIENT_PROVIDER_OIDC_ISSUER` | URL do Keycloak | Issuer do provedor OIDC |
| `KC_BASE_URL` | URL do Keycloak | URL base do Keycloak Admin |
| `KC_REALM` | `sisgea-playground` | Realm do Keycloak |
| `ENABLE_MOCK_ACCESS_TOKEN` | `true` | Habilita tokens de autenticação simulados para desenvolvimento |
| `MESSAGE_BROKER_URL` | `amqp://admin:admin@...` | URL de conexão com o RabbitMQ |
| `STORAGE_PATH` | `/container/uploaded` | Diretório de armazenamento de arquivos enviados |
| `API_PREFIX` | `/api/` | Prefixo das rotas REST |

> Em desenvolvimento, `ENABLE_MOCK_ACCESS_TOKEN=true` permite autenticar usando tokens no formato `mock.siape.<matrícula>`, sem precisar de um servidor Keycloak ativo.

---

## Scripts disponíveis

Todos os scripts são executados **dentro do container** com `bun run <script>`:

| Script | Descrição |
|--------|-----------|
| `dev` | Inicia o servidor em modo de desenvolvimento (com watch/hot reload) |
| `start` | Inicia o servidor em modo de produção |
| `debug` | Inicia com debugger na porta 9229 (para attach do editor) |
| `test` | Executa os testes unitários uma vez |
| `test:watch` | Executa os testes em modo watch (re-executa ao salvar) |
| `test:cov` | Executa os testes com relatório de cobertura |
| `test:e2e` | Executa os testes end-to-end |
| `test:debug` | Executa os testes com debugger |
| `typecheck` | Verifica tipagem TypeScript sem compilar |
| `code:fix` | Formata e corrige o código automaticamente (Biome) |
| `code:check` | Verifica formatação e linting sem alterar arquivos |
| `migration:run` | Aplica migrações pendentes no banco de dados |
| `migration:revert` | Reverte a última migração aplicada |
| `db:reset` | Reset completo do banco (drop + create + seed) |
| `modulecheck` | Valida as fronteiras entre módulos |

---

## Banco de dados e migrações

O projeto usa **TypeORM** com migrações manuais (sem `synchronize`). As migrações ficam em `src/infrastructure.database/typeorm/migrations/` e são nomeadas com timestamp (ex.: `1742515200000-NomeDaMigracao.ts`).

**Fluxo típico:**

```bash
# Aplicar migrações pendentes
bun run migration:run

# Reverter a última migração
bun run migration:revert

# Gerar uma nova migração a partir de alterações nas entidades
bun run typeorm:generate

# Reset completo (apaga tudo e recria)
bun run db:reset
```

O banco já vem com dados de seed inseridos via migração (ex.: estados do Brasil).

> **Soft deletes:** as entidades usam exclusão lógica (soft delete) com controle de datas via triggers no banco.

---

## Autenticação e autorização

### Autenticação

A aplicação delega autenticação a um servidor **Keycloak** via protocolo **OAuth2/OIDC**:

```mermaid
sequenceDiagram
    participant Cliente
    participant API as Management Service
    participant KC as Keycloak

    Cliente->>API: Requisição com Bearer token
    API->>KC: Obtém JWKS (chaves públicas)
    KC-->>API: Chaves públicas (JSON Web Key Set)
    API->>API: Valida assinatura do JWT
    API->>API: Extrai claims do usuário
    API->>API: Injeta RequestActor via @RequestActor()
    API-->>Cliente: Resposta da API
```

1. O cliente envia um **Bearer token** no header `Authorization`.
2. O token é validado usando **JWKS** (JSON Web Key Set) obtido do Keycloak.
3. As informações do usuário (claims do JWT) são extraídas e injetadas como `RequestActor` nos controllers via decorator `@RequestActor()`.

Em desenvolvimento, com `ENABLE_MOCK_ACCESS_TOKEN=true`, é possível usar tokens simulados no formato `mock.siape.<matrícula>` para testar sem depender do Keycloak.

### Autorização

Cada módulo implementa um `IPermissionChecker` com métodos:

- `ensureCanCreate(accessContext)` — verifica se o usuário pode criar.
- `ensureCanUpdate(accessContext)` — verifica se o usuário pode atualizar.
- `ensureCanDelete(accessContext)` — verifica se o usuário pode excluir.

O padrão é **"throw on deny"**: se o usuário não tiver permissão, uma exceção `ForbiddenError` é lançada.

---

## GraphQL

A API GraphQL usa **Apollo Server** com abordagem **code-first** — o schema é gerado automaticamente a partir de classes TypeScript decoradas com `@ObjectType()` e `@Field()`.

- **Endpoint:** `http://localhost:3701/graphql`
- **Playground:** GraphiQL habilitado em desenvolvimento.
- **Introspection:** habilitada.
- **Cache:** LRU em memória (100 MB, TTL de 5 minutos).

Os resolvers ficam em `presentation.graphql/` dentro de cada módulo e utilizam os mesmos command/query handlers da API REST.

---

## Message broker

O projeto usa **RabbitMQ** como message broker, integrado via biblioteca [Rascal](https://github.com/guidesmiths/rascal) (wrapper AMQP).

**Uso atual:** comunicação assíncrona para geração de horários (timetable).

```mermaid
sequenceDiagram
    participant MS as Management Service
    participant RMQ as RabbitMQ
    participant TG as Timetable Generator

    MS->>RMQ: Publica requisição na fila (request)
    RMQ->>TG: Entrega mensagem
    TG->>TG: Processa geração de horários
    TG->>RMQ: Publica resultado na fila (response)
    RMQ->>MS: Entrega resposta
```

A aplicação publica uma mensagem de requisição na fila e consome a resposta quando o serviço gerador completa o processamento.

**Filas configuráveis via variáveis de ambiente:**

| Variável | Padrão |
|----------|--------|
| `MESSAGE_BROKER_QUEUE_TIMETABLE_REQUEST` | `dev.timetable_generate.request` |
| `MESSAGE_BROKER_QUEUE_TIMETABLE_RESPONSE` | `dev.timetable_generate.response` |

A UI de gerenciamento do RabbitMQ está disponível em `http://localhost:15672` (usuário `admin`, senha `admin`).

---

## Qualidade de código

O projeto usa o [Biome](https://biomejs.dev/) para formatação e linting:

- **Largura de linha:** 100 caracteres.
- **Indentação:** 2 espaços.
- **Ponto e vírgula:** sempre.
- **Regras de lint:** imports não utilizados são removidos, variáveis não usadas são sinalizadas, `const` é obrigatório quando possível.
- **Organização de imports:** automática.

```bash
# Corrigir formatação e linting automaticamente
bun run code:fix

# Apenas verificar (sem alterar)
bun run code:check

# Verificar tipagem TypeScript
bun run typecheck
```

O Dev Container já configura o Biome como formatador padrão com auto-format ao salvar.

---

## Testes

O projeto usa [Vitest](https://vitest.dev/) como framework de testes:

- **Testes unitários:** `**/*.spec.ts`
- **Testes end-to-end:** `**/*.e2e-spec.ts`
- **Cobertura:** via provedor `v8`

```bash
bun run test            # Executar uma vez
bun run test:watch      # Modo watch
bun run test:cov        # Com relatório de cobertura
bun run test:e2e        # Testes end-to-end
bun run test:debug      # Com debugger
```

Helpers de teste (mocks de repositório, factories) ficam em `src/test/`.

---

## CI/CD

O pipeline de CI/CD é definido em `.github/workflows/build-deploy.dev.yml` e é disparado a cada push na branch `main` (quando há mudanças em `src/`, `.docker/`, `.github/workflows/` ou `.deploy/`).

```mermaid
graph LR
    PUSH["Push na main"] --> CI

    subgraph CI["CI — Build & Push"]
        CHECKOUT["Checkout"] --> BUILDX["QEMU + Buildx"]
        BUILDX --> LOGIN["Login no GHCR"]
        LOGIN --> BUILD["Build multi-arch"]
        BUILD --> PUSH_IMG["Push da imagem\nghcr.io/.../management-service:development"]
    end

    CI --> CD

    subgraph CD["CD — Deploy"]
        SCRIPT["deploy.sh"] --> HELM["Helm apply\n(values.yml)"]
    end

    style PUSH fill:#4a90d9,stroke:#2c5f8a,color:#fff
    style PUSH_IMG fill:#50b86c,stroke:#3a8a50,color:#fff
    style HELM fill:#50b86c,stroke:#3a8a50,color:#fff
```

**Etapas:**

1. **CI — Build & Push:**
   - Faz checkout do código.
   - Configura QEMU + Docker Buildx para build multi-arquitetura.
   - Faz login no GitHub Container Registry (GHCR).
   - Faz build e push da imagem para `ghcr.io/ladesa-ro/management-service/management-service:development`.

2. **CD — Deploy:**
   - Executa o script `.deploy/development/deploy.sh` em um runner dedicado.
   - Utiliza Helm com valores de `.deploy/development/values.yml`.

---

## Stack tecnológico

| Categoria | Tecnologia |
|-----------|------------|
| Runtime | [Bun](https://bun.sh/) |
| Linguagem | [TypeScript](https://www.typescriptlang.org/) (ES2022, strict mode) |
| Framework | [NestJS](https://nestjs.com/) |
| ORM | [TypeORM](https://typeorm.io/) |
| Banco de dados | [PostgreSQL 15](https://www.postgresql.org/) |
| Documentação API | [Swagger/OpenAPI](https://swagger.io/) + [Scalar](https://scalar.com/) |
| GraphQL | [Apollo Server](https://www.apollographql.com/docs/apollo-server/) |
| Validação | [Zod](https://zod.dev/) |
| Autenticação | [Keycloak](https://www.keycloak.org/) + OAuth2/OIDC |
| Message broker | [RabbitMQ](https://www.rabbitmq.com/) via [Rascal](https://github.com/guidesmiths/rascal) |
| Processamento de imagens | [Sharp](https://sharp.pixelplumbing.com/) |
| Containerização | Docker (recomendado) / Podman |
| Task runner | [just](https://github.com/casey/just) |
| Linting/Formatação | [Biome](https://biomejs.dev/) |
| Testes | [Vitest](https://vitest.dev/) |

---

## Licença

[MIT](./LICENSE) &copy; 2024 &ndash; presente, Ladesa.

<!-- Links dos Badges -->

[action-build-deploy-dev-src]: https://img.shields.io/github/actions/workflow/status/ladesa-ro/management-service/build-deploy.dev.yml?style=flat&logo=github&logoColor=white&label=Deploy&branch=main&labelColor=18181B
[action-build-deploy-dev-href]: https://github.com/ladesa-ro/management-service/actions/workflows/build-deploy.dev.yml?query=branch%3Amain
