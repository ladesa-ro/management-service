<!-- README last synced with codebase at commit 4ab02ae5f51740012ea0b48f683d67e377f0690f (2026-03-23) -->

# Management Service

API REST/GraphQL de gerenciamento acadêmico desenvolvida com NestJS, TypeORM e PostgreSQL, seguindo princípios de **arquitetura hexagonal** (um estilo de organização de código onde a lógica de negócio fica isolada no centro, sem depender de frameworks ou bancos de dados — explicado em detalhes na seção [Arquitetura](#arquitetura)).

[![CI/CD - Management Service][action-build-deploy-dev-src]][action-build-deploy-dev-href]

**Ambiente de desenvolvimento público**: <https://dev.ladesa.com.br/api/v1/docs/>

---

## Visão geral

O **Ladesa** (Laboratório de Desenvolvimento de Software Acadêmico) é um ecossistema de software voltado para a **gestão acadêmica de instituições de ensino**. O **Management Service** é o back-end principal desse ecossistema — a API que centraliza e gerencia todos os dados acadêmicos da plataforma.

**O que ele gerencia:**

- **Estrutura física** — campus, blocos e ambientes (salas, laboratórios).
- **Estrutura acadêmica** — cursos, disciplinas, modalidades, níveis de formação, ofertas de formação e suas etapas.
- **Turmas e diários** — turmas vinculadas a ofertas, com diários de classe para registro de atividades.
- **Horários e calendários** — calendários letivos, agendamentos, configuração e geração automática de horários de aula.
- **Estágios** — empresas, estagiários, estágios e responsáveis.
- **Usuários e autenticação** — perfis de usuários, autenticação via Keycloak, notificações.
- **Armazenamento** — upload e gerenciamento de arquivos e imagens.
- **Localidades** — estados, cidades e endereços (com dados do IBGE).

A aplicação expõe uma **API REST** (com documentação interativa via Swagger/Scalar) e uma **API GraphQL** (com playground GraphiQL), permitindo que front-ends e outros serviços consumam os dados de forma flexível.

> **O que é uma API?** API (Application Programming Interface) é uma forma padronizada de dois programas se comunicarem. Neste caso, o front-end (a interface visual que o usuário vê no navegador) envia requisições HTTP para a API, e ela responde com dados em formato JSON. Pense como um garçom: ele recebe pedidos (requisições) e traz pratos (respostas) da cozinha (banco de dados).

**Tecnologias principais:** roda sobre o runtime [Bun](https://bun.sh/) (um runtime JavaScript/TypeScript rápido, alternativa ao Node.js), utiliza o framework [NestJS](https://nestjs.com/) v11 (framework que organiza o código em módulos, controllers e serviços — detalhado na seção [NestJS — conceitos fundamentais](#nestjs--conceitos-fundamentais)) e persiste dados em [PostgreSQL 15](https://www.postgresql.org/) (banco de dados relacional — armazena dados em tabelas com linhas e colunas) via [TypeORM](https://typeorm.io/) 0.3 (ferramenta que traduz objetos TypeScript para tabelas SQL — explicado na seção [ORM](#orm-object-relational-mapping)). A autenticação é delegada a um servidor [Keycloak](https://www.keycloak.org/) via OAuth2/OIDC (protocolos de autenticação delegada — explicados na seção [OAuth2 e OIDC](#oauth2-e-oidc)), e a comunicação assíncrona com outros serviços acontece por meio de filas [RabbitMQ](https://www.rabbitmq.com/) (um intermediário de mensagens entre serviços — explicado na seção [Message broker](#message-broker-rabbitmq)).

Todo o ambiente de desenvolvimento é containerizado — você **não precisa instalar** Bun, Node.js, PostgreSQL nem nenhuma outra dependência diretamente na sua máquina.

<!--
Source of Trust
commit_hash: ebb2cb05b8e21e5d4aae2cfcf0429805ebc7f344
verified_at: 2026-03-23T12:30:00Z
source_patterns:
  - src/package.json
  - .docker/compose.yml
confidence_scope: Versões das tecnologias principais (NestJS ^11.1.17, TypeORM ^0.3.28, Apollo Server ^5.4.0, PostgreSQL 15, Zod ^4.3.6, Vitest ^4.1.0)
-->

---

## Sumário

- [Visão geral](#visão-geral)
- [Pré-requisitos](#pré-requisitos)
  - [Container e Docker](#container-e-docker)
  - [Container runtime](#container-runtime)
  - [just (command runner) — recomendado](#just-command-runner--recomendado)
  - [Git](#git)
  - [Editor de código (escolha um)](#editor-de-código-escolha-um)
  - [Familiaridade com linha de comando](#familiaridade-com-linha-de-comando)
- [Clonando o repositório](#clonando-o-repositório)
- [Rodando o projeto](#rodando-o-projeto)
  - [Caminho A: justfile (recomendado)](#caminho-a-justfile-recomendado)
  - [Caminho B: Dev Container](#caminho-b-dev-container)
- [Primeiros passos após o setup](#primeiros-passos-após-o-setup)
- [Acessando a aplicação](#acessando-a-aplicação)
  - [Documentação Swagger/Scalar](#documentação-swaggerscalar)
- [Serviços do ambiente](#serviços-do-ambiente)
- [Variáveis de ambiente](#variáveis-de-ambiente)
  - [Sobre o prefixo (API_PREFIX)](#sobre-o-prefixo-api_prefix)
- [Scripts disponíveis](#scripts-disponíveis)
- [Banco de dados e migrações](#banco-de-dados-e-migrações)
  - [ORM (Object-Relational Mapping)](#orm-object-relational-mapping)
  - [Soft delete (exclusão lógica)](#soft-delete-exclusão-lógica)
  - [ACID e transações](#acid-e-transações)
- [Autenticação e autorização](#autenticação-e-autorização)
  - [JWT (JSON Web Token)](#jwt-json-web-token)
  - [JWKS (JSON Web Key Set)](#jwks-json-web-key-set)
  - [OAuth2 e OIDC](#oauth2-e-oidc)
- [Qualidade de código](#qualidade-de-código)
  - [Zod (validação de schemas)](#zod-validação-de-schemas)
- [Como contribuir](#como-contribuir)
  - [Conceitos básicos de Git](#conceitos-básicos-de-git-para-quem-está-começando)
  - [Gitflow do projeto](#gitflow-do-projeto)
  - [Convenções de nomenclatura](#convenções-de-nomenclatura)
  - [Trabalhando com Git localmente](#trabalhando-com-git-localmente)
  - [Trabalhando localmente no desenvolvimento](#trabalhando-localmente-no-desenvolvimento)
  - [Passo a passo completo](#passo-a-passo-completo)
  - [Ciclo de vida de um PR](#ciclo-de-vida-de-um-pull-request)
  - [O que fazer vs. o que NÃO fazer](#o-que-fazer-vs-o-que-não-fazer)
  - [Como escrever um bom commit](#como-escrever-um-bom-commit)
  - [Como escrever uma boa issue](#como-escrever-uma-boa-issue)
  - [Como escrever um bom Pull Request](#como-escrever-um-bom-pull-request)
- [Arquitetura](#arquitetura)
  - [Arquitetura hexagonal](#arquitetura-hexagonal)
  - [Inversão de dependência e Ports & Adapters](#inversão-de-dependência-e-ports--adapters)
  - [CQRS (Command Query Responsibility Segregation)](#cqrs-command-query-responsibility-segregation)
  - [NestJS — conceitos fundamentais](#nestjs--conceitos-fundamentais)
  - [As camadas em detalhe](#as-camadas-em-detalhe)
  - [Como as camadas conversam](#como-as-camadas-conversam)
  - [Fluxo de uma requisição](#fluxo-de-uma-requisição)
  - [Estrutura de diretórios](#estrutura-de-diretórios)
  - [Módulos de domínio](#módulos-de-domínio)
  - [Diagrama de entidades e relacionamentos](#diagrama-de-entidades-e-relacionamentos)
- [Principais abstrações e padrões](#principais-abstrações-e-padrões)
  - [Entidade de domínio](#entidade-de-domínio)
  - [Schemas Zod do domínio](#schemas-zod-do-domínio)
  - [FieldMetadata e QueryFields](#fieldmetadata-e-queryfields)
  - [Interfaces de repositório](#interfaces-de-repositório)
  - [Mappers (mapeamento entre camadas)](#mappers-mapeamento-entre-camadas)
  - [Command e Query Handlers](#command-e-query-handlers)
  - [Permission Checker](#permission-checker)
  - [Dep e Impl](#Dep-e-Impl)
  - [Scalars semânticos](#scalars-semânticos)
  - [TransactionInterceptor e ConnectionProxy](#transactioninterceptor-e-connectionproxy)
  - [ZodGlobalValidationPipe](#zodglobalvalidationpipe)
  - [ApplicationErrorFilter](#applicationerrorfilter)
  - [Paginação](#paginação)
- [GraphQL](#graphql)
- [Message broker](#message-broker)
- [Testes](#testes)
- [CI/CD](#cicd)
- [Boas práticas de desenvolvimento](#boas-práticas-de-desenvolvimento)
- [Princípios de engenharia](#princípios-de-engenharia)
  - [Single Source of Truth (SSOT)](#single-source-of-truth-ssot)
  - [Dependency Injection (DI)](#dependency-injection-di--interfaces-e-implementações)
- [Stack tecnológico](#stack-tecnológico)
- [Dicas e troubleshooting](#dicas-e-troubleshooting)
- [Licença](#licença)

---

## Pré-requisitos

Este projeto roda inteiramente dentro de containers Docker. Antes de instalar as ferramentas, entenda o que são containers:

### Container e Docker

Um **container** é um pacote que inclui um sistema operacional mínimo junto com todas as ferramentas, bibliotecas e configurações que uma aplicação precisa para rodar. Pense como uma mala de viagem organizada: tudo que o projeto precisa está dentro dela, e não importa em qual aeroporto (computador) você chegar — o conteúdo é o mesmo.

A diferença entre um container e uma **máquina virtual** (VM) é que a VM carrega um sistema operacional inteiro (como ter uma casa dentro de outra casa), enquanto o container compartilha o kernel do sistema host e empacota apenas o que é diferente — tornando-o muito mais leve e rápido para iniciar.

```mermaid
graph LR
    subgraph "Máquina Virtual"
        VM_OS["SO completo\n(Linux inteiro)"]
        VM_APP["Aplicação"]
        VM_LIB["Bibliotecas"]
        VM_OS --- VM_APP --- VM_LIB
    end

    subgraph "Container"
        C_APP["Aplicação"]
        C_LIB["Bibliotecas\n(apenas o necessário)"]
        C_APP --- C_LIB
    end

    HOST["Kernel do Host\n(compartilhado)"]
    C_LIB -.-> HOST
    VM_OS -.-> |"não compartilha"| HW["Hardware"]

    style Container fill:#50b86c,stroke:#3a8a50,color:#fff
    style HOST fill:#4a90d9,stroke:#2c5f8a,color:#fff
```

**Neste projeto**, o Docker Compose (uma ferramenta que orquestra múltiplos containers a partir de um arquivo de configuração) sobe três containers: a aplicação NestJS, o PostgreSQL e o RabbitMQ. O código-fonte da sua máquina é **montado como volume** dentro do container — isso significa que quando você edita um arquivo no seu editor (VS Code, WebStorm, etc.), a alteração aparece instantaneamente dentro do container, sem precisar reconstruí-lo. É como se o container tivesse uma "janela" apontando para a pasta do projeto na sua máquina.

<!--
Source of Trust
commit_hash: ebb2cb05b8e21e5d4aae2cfcf0429805ebc7f344
verified_at: 2026-03-23T12:30:00Z
source_patterns:
  - .docker/compose.yml
confidence_scope: Serviços do Docker Compose (management-service, db/PostgreSQL 15, rabbitmq), portas (3701, 9229, 5432), volumes e bind mounts
-->

```mermaid
graph TD
    subgraph "Sua máquina (host)"
        EDITOR["VS Code / WebStorm"]
        SRC["Código-fonte\n./src/"]
    end

    subgraph "Container Docker"
        VOL["Volume montado\n/ladesa/management-service/src/"]
        BUN_RT["Bun runtime"]
        NESTJS["NestJS App"]
    end

    SRC -- "bind mount\n(espelho em tempo real)" --> VOL
    VOL --> BUN_RT --> NESTJS
    EDITOR -- "edita" --> SRC

    style EDITOR fill:#4a90d9,stroke:#2c5f8a,color:#fff
    style VOL fill:#e8a838,stroke:#b07c1e,color:#fff
    style NESTJS fill:#50b86c,stroke:#3a8a50,color:#fff
```

> **Para ir mais fundo:** quando o Docker Compose declara `volumes: ['./src:/ladesa/management-service/src']`, ele cria um **bind mount** — um mapeamento direto entre um diretório do host e um diretório dentro do container. Qualquer alteração em um lado reflete imediatamente no outro. Já o **port forwarding** (ex.: `ports: ['3701:3701']`) redireciona tráfego de rede da porta do host para a porta do container, permitindo que você acesse `http://localhost:3701` no navegador e a requisição chegue ao NestJS rodando dentro do container. Os **named volumes** (ex.: `management-service-db-data`) persistem dados entre reinicializações do container — sem eles, o banco de dados seria zerado toda vez que o container parasse.

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

Com todas as ferramentas instaladas, o próximo passo é baixar o código-fonte do projeto para a sua máquina.

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
| `just cleanup` | Para, remove containers **e volumes** (reset completo — pede confirmação) |
| `just logs` | Mostra logs dos containers em tempo real |
| `just shell-1000` | Abre shell como usuário `happy` (uid 1000) |
| `just shell-root` | Abre shell como `root` |
| `just build` | Faz o build da imagem (apenas se mudaram `Containerfile`, `.dockerignore` ou manifestos do Bun) |
| `just rebuild` | Força rebuild da imagem |
| `just exec <args>` | Executa comando dentro do container |
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

**Extensões pré-instaladas (21 extensões):**

| Categoria | Extensões |
|-----------|-----------|
| **TypeScript/JS** | TypeScript Next, Biome (formatter/linter) |
| **Runtime** | Bun, JS Debug |
| **Banco de dados** | SQL Tools + Driver PostgreSQL |
| **Docker** | Docker, Remote Containers |
| **Git** | GitLens, Git Graph |
| **API/GraphQL** | GraphQL, OpenAPI (42Crunch) |
| **Testes** | Vitest Explorer |
| **Utilidades** | YAML, JSON, Path Intellisense, Spell Checker |

**Configurações do editor:**
- **Formatador padrão:** Biome — auto-format ao salvar.
- **Terminal padrão:** `zsh`.
- **Imports:** modo relativo (sem extensões).

**Portas encaminhadas:**
- `3701` (API) — `http://localhost:3701`
- `9229` (debug) — para attach do debugger
- `5432` (PostgreSQL) — para clientes SQL externos

**Instalação automática:** `bun install` executado no `postCreateCommand`.

**Usuário do container:** `happy` (uid 1000).

**Ferramentas adicionais:** Git (via PPA) e GitHub CLI instalados automaticamente.

---

## Primeiros passos após o setup

Se você chegou até aqui, o projeto já está rodando na sua máquina. Agora vamos verificar que tudo funciona e fazer sua primeira interação com a API.

Após rodar `just up` (ou abrir o Dev Container) e iniciar o servidor com `bun run dev`, siga estes passos:

1. **Aplique as migrações do banco de dados:**
   ```bash
   bun run migration:run
   ```
   Isso cria todas as tabelas (58 migrações), funções/triggers e insere os dados iniciais (estados do Brasil, cidades de Rondônia, campus IFRO Ji-Paraná e superuser).

2. **Acesse a documentação da API:**
   Abra <http://localhost:3701/api/docs> no navegador. Você verá a documentação interativa Scalar/Swagger com todos os endpoints disponíveis.

3. **Acesse o GraphQL Playground:**
   Abra <http://localhost:3701/api/graphql> para explorar queries e mutations GraphQL.

4. **Faça sua primeira requisição autenticada (mock):**
   Em desenvolvimento, com `ENABLE_MOCK_ACCESS_TOKEN=true` (padrão), você pode usar tokens simulados:
   ```bash
   # O token mock.matricula.1234 simula um usuário com matrícula 1234
   curl -H "Authorization: Bearer mock.matricula.1234" http://localhost:3701/api/campi
   ```

5. **Rode os testes para verificar que está tudo ok:**
   ```bash
   bun run test
   ```

<!--
Source of Trust
commit_hash: ebb2cb05b8e21e5d4aae2cfcf0429805ebc7f344
verified_at: 2026-03-23T12:30:00Z
source_patterns:
  - src/infrastructure.database/migrations/**/*.ts
  - src/infrastructure.config/options/app-config-mock-access-token/**/*.ts
  - .docker/compose.yml
confidence_scope: Contagem de migrações (58 arquivos), portas da API (3701), mock de autenticação (ENABLE_MOCK_ACCESS_TOKEN, formato mock.matricula.*)
-->

---

## Acessando a aplicação

Agora que você tem o projeto rodando e verificado, vamos explorar o que cada URL oferece e como interagir com a API.

Após iniciar o servidor com `bun run dev`, acesse:

| Recurso | URL | Descrição |
|---------|-----|-----------|
| Health check | <http://localhost:3701/health> | Status de saúde por dependência (database, keycloak, etc.). Sempre retorna 200 com payload informativo. |
| Documentação Swagger/Scalar | <http://localhost:3701/api/docs> | Documentação interativa da API REST com Scalar |
| OpenAPI JSON | <http://localhost:3701/api/docs/openapi.v3.json> | Schema OpenAPI em JSON (para importação em Postman, Insomnia, etc.) |
| Swagger UI | <http://localhost:3701/api/docs/swagger> | Interface Swagger UI clássica |
| GraphQL Playground | <http://localhost:3701/api/graphql> | Interface GraphiQL para explorar e testar queries/mutations |

> As URLs acima usam o prefixo padrão `/api/`. Se o `API_PREFIX` for alterado no `.env`, as URLs mudam de acordo. Veja [Sobre o prefixo](#sobre-o-prefixo-api_prefix) para detalhes.

### Documentação Swagger/Scalar

A documentação da API REST é gerada automaticamente a partir dos decorators do NestJS no código-fonte. Ao acessar <http://localhost:3701/api/docs>, você encontra a interface [Scalar](https://scalar.com/) — uma alternativa moderna ao Swagger UI:

**O que você pode fazer na documentação:**

- **Explorar endpoints** — todos os endpoints REST agrupados por módulo (tags `@ApiTags`).
- **Testar requisições** — enviar requests diretamente pelo navegador, com payload e autenticação.
- **Ver schemas** — tipos de entrada e saída de cada endpoint, com exemplos.
- **Autenticar** — clicar em "Authorize" e inserir o Bearer token (ex.: `mock.matricula.1234` em desenvolvimento).
- **Exportar** — baixar o schema OpenAPI em JSON para importar no Postman, Insomnia ou outra ferramenta.

A lista completa de endpoints está disponível na documentação interativa Swagger/Scalar em `http://localhost:3701/api/docs/`.

---

## Serviços do ambiente

Para entender de onde vêm todas essas URLs, é útil saber quais serviços rodam por trás do projeto. Quando você sobe o ambiente (via Dev Container ou `just up`), o Docker Compose inicia vários containers que trabalham juntos:

```mermaid
graph TB
    subgraph Docker Compose
        MS["Management Service\n:3701 (API)\n:9229 (debug)"]
        DB["PostgreSQL 15\n(bitnamilegacy/postgresql:15)\n:5432"]
        RMQ["RabbitMQ 3\n(rabbitmq:3-management-alpine)\n:15672 (UI)"]
    end

    MS --> DB
    MS --> RMQ

    style MS fill:#4a90d9,stroke:#2c5f8a,color:#fff
    style DB fill:#336791,stroke:#1e3d5c,color:#fff
    style RMQ fill:#ff6600,stroke:#b34700,color:#fff
```

| Serviço | Container | Porta | Credenciais |
|---------|-----------|-------|-------------|
| **Management Service** | `ladesa-management-service` | `3701` (API), `9229` (debug) | — |
| **PostgreSQL 15** | `ladesa-management-service-db` | `5432` | database: `main`, password: `7f22682363b549a389e03b7fe512488b` |
| **RabbitMQ 3** | `ladesa-rabbitmq` | `5672` (AMQP), `15672` (UI) | admin / admin |

**Volumes persistentes:**
- `management-service-db-data` — dados do PostgreSQL (persistem entre restarts)
- `management-service-uploaded-files` — arquivos enviados
- `management-service-shell-history` — histórico do shell

**Rede:** `ladesa-net` (bridge — uma rede virtual interna do Docker que permite que os containers se encontrem pelo nome) — todos os serviços se comunicam por nome de container.

<!--
Source of Trust
commit_hash: ebb2cb05b8e21e5d4aae2cfcf0429805ebc7f344
verified_at: 2026-03-23T12:30:00Z
source_patterns:
  - .docker/compose.yml
confidence_scope: Nomes de containers, portas expostas (3701, 9229, 5432, 15672), credenciais PostgreSQL (main/7f226...), credenciais RabbitMQ (admin/admin), volumes e rede
-->

---

## Variáveis de ambiente

As variáveis são definidas no arquivo `.env`, criado automaticamente a partir do `.env.example`. A tabela abaixo lista **todas** as variáveis com seus valores padrão:

### Servidor

| Variável | Valor padrão | Descrição |
|----------|--------------|-----------|
| `PORT` | `3701` | Porta da aplicação |
| `NODE_ENV` | `development` | Ambiente de execução |
| `API_PREFIX` | `/api/` | Prefixo global de todas as rotas (REST, docs e GraphQL) |

### Banco de dados

| Variável | Valor padrão | Descrição |
|----------|--------------|-----------|
| `DB_CONNECTION` | `postgres` | Tipo de conexão |
| `DATABASE_URL` | `postgresql://postgres:7f22...@ladesa-management-service-db:5432/main` | String de conexão completa com o PostgreSQL |
| `DATABASE_USE_SSL` | `false` | Habilitar SSL na conexão com o banco |
| `TYPEORM_LOGGING` | `true` | Logs de queries SQL no console (útil para debug, desabilitar em produção) |

### Autenticação (OAuth2/OIDC)

| Variável | Valor padrão | Descrição |
|----------|--------------|-----------|
| `OAUTH2_CLIENT_PROVIDER_OIDC_ISSUER` | `https://sso.ladesa.com.br/realms/sisgea-playground` | URL do issuer OIDC (usada para obter o JWKS endpoint) |
| `OAUTH2_CLIENT_REGISTRATION_LOGIN_CLIENT_ID` | `luna-backend` | Client ID OAuth2 |
| `OAUTH2_CLIENT_REGISTRATION_LOGIN_CLIENT_SECRET` | `8c9jOX...` | Client Secret OAuth2 |
| `OAUTH2_CLIENT_REGISTRATION_LOGIN_SCOPE` | `openid profile` | Scopes OAuth2 solicitados |

### Keycloak (admin client)

| Variável | Valor padrão | Descrição |
|----------|--------------|-----------|
| `KC_BASE_URL` | `https://sso.ladesa.com.br` | URL base do Keycloak |
| `KC_REALM` | `sisgea-playground` | Realm do Keycloak |
| `KC_CLIENT_ID` | `luna-backend` | Client ID para operações administrativas |
| `KC_CLIENT_SECRET` | `8c9jOX...` | Client Secret para admin client |
| `KC_PASSWORD_RESET_REDIRECT_URI` | `https://dev.ladesa.com.br` | URL de redirecionamento após reset de senha (opcional) |

### Mock de autenticação

| Variável | Valor padrão | Descrição |
|----------|--------------|-----------|
| `ENABLE_MOCK_ACCESS_TOKEN` | `true` | Habilita tokens simulados no formato `mock.matricula.<número>`. Quando ativo, não é necessário Keycloak para autenticar. **Deve ser `false` em produção.** |

### Message broker

| Variável | Valor padrão | Descrição |
|----------|--------------|-----------|
| `MESSAGE_BROKER_URL` | `amqp://admin:admin@ladesa-rabbitmq` | URL de conexão AMQP com o RabbitMQ |
| `MESSAGE_BROKER_QUEUE_TIMETABLE_REQUEST` | `dev.timetable_generate.request` | Fila para requisições de geração de horário |
| `MESSAGE_BROKER_QUEUE_TIMETABLE_RESPONSE` | `dev.timetable_generate.response` | Fila para respostas de geração de horário |

### Armazenamento

| Variável | Valor padrão | Descrição |
|----------|--------------|-----------|
| `STORAGE_PATH` | `/container/uploaded` | Diretório onde arquivos enviados são armazenados |

### Sobre o prefixo (`API_PREFIX`)

O `API_PREFIX` define o prefixo **global** de todas as rotas da aplicação — REST, documentação e GraphQL. O valor padrão no `.env.example` é `/api/`.

**Todas as URLs ficam sob esse prefixo:**

| Rota | URL resultante com `/api/` |
|------|---------------------------|
| Endpoints REST | `http://localhost:3701/api/campi` |
| Documentação Scalar | `http://localhost:3701/api/docs` |
| Swagger UI | `http://localhost:3701/api/docs/swagger` |
| OpenAPI JSON | `http://localhost:3701/api/docs/openapi.v3.json` |
| GraphQL | `http://localhost:3701/api/graphql` |
| Health check | `http://localhost:3701/health` (excluído do prefixo) |

> **Nota:** o ambiente de produção/desenvolvimento público (`dev.ladesa.com.br`) pode usar um prefixo diferente (ex.: `/api/v1/`), configurado via variável de ambiente no deploy. Localmente, o padrão é `/api/`.

<!--
Source of Trust
commit_hash: ebb2cb05b8e21e5d4aae2cfcf0429805ebc7f344
verified_at: 2026-03-23T12:30:00Z
source_patterns:
  - .env.example
  - src/infrastructure.config/**/*.ts
confidence_scope: Variáveis de ambiente com valores padrão, prefixo de API (API_PREFIX), configuração de OAuth2/Keycloak, mock de autenticação, message broker, armazenamento
-->

---

## Scripts disponíveis

Além de `bun run dev`, o projeto tem diversos scripts para tarefas comuns. Eles são sua caixa de ferramentas do dia a dia.

Todos os scripts são executados **dentro do container** com `bun run <script>`. Se você não estiver no shell do container (via `just up`), use `just exec bun run <script>`.

### Desenvolvimento

| Script | Descrição |
|--------|-----------|
| `dev` | Inicia o servidor em modo de desenvolvimento (com watch/hot reload) |
| `start` | Inicia o servidor em modo de produção |
| `debug` | Inicia com debugger na porta 9229 (para attach do editor) |

### Qualidade de código

| Script | Descrição |
|--------|-----------|
| `code:fix` | Formata e corrige o código automaticamente (Biome) — **obrigatório após alterações** |
| `code:check` | Verifica formatação e linting sem alterar arquivos |
| `code:fix:format` | Apenas formata (sem lint fix) |
| `code:fix:lint` | Apenas corrige linting (sem format) |
| `code:check:format` | Apenas verifica formatação |
| `code:check:lint` | Apenas verifica linting |
| `typecheck` | Verifica tipagem TypeScript sem compilar — **obrigatório após alterações** |
| `modulecheck` | Valida as fronteiras entre módulos |
| `check` | Executa validação completa (typecheck + modulecheck + code:check) |

### Testes

| Script | Descrição |
|--------|-----------|
| `test` | Executa os testes unitários uma vez |
| `test:watch` | Executa os testes em modo watch (re-executa ao salvar) |
| `test:cov` | Executa os testes com relatório de cobertura (v8) |
| `test:e2e` | Executa os testes end-to-end (integração com banco e serviços) |
| `test:debug` | Executa os testes com debugger |

### Banco de dados

| Script | Descrição |
|--------|-----------|
| `migration:run` | Aplica migrações pendentes no banco de dados |
| `migration:revert` | Reverte a última migração aplicada |
| `db:reset` | Reset completo do banco (drop + create + migrate + seed) |
| `typeorm` | Executa comandos TypeORM diretamente |
| `typeorm:create` | Cria um arquivo de migração vazio |
| `typeorm:entity` | Gera uma entidade TypeORM |
| `typeorm:generate` | Gera migração a partir do diff entre entidades e banco |

### Outros

| Script | Descrição |
|--------|-----------|
| `codegen:timetable-generator:fresh` | Gera tipos TypeScript para mensagens do timetable generator |

<!--
Source of Trust
commit_hash: ebb2cb05b8e21e5d4aae2cfcf0429805ebc7f344
verified_at: 2026-03-23T12:30:00Z
source_patterns:
  - src/package.json
confidence_scope: Scripts disponíveis via bun run (dev, build, start, test, migration:run, migration:revert, db:reset, typeorm:generate, code:fix, code:check, typecheck)
-->

---

## Banco de dados e migrações

Até agora você já sabe rodar o projeto, acessar as URLs e executar scripts. Quando você rodou `bun run migration:run` nos primeiros passos, criou as tabelas no banco de dados. Mas como exatamente o projeto armazena e gerencia esses dados?

Esta seção explica os três conceitos fundamentais por trás da camada de dados: como objetos do código viram linhas no banco (ORM), como a exclusão de registros funciona (soft delete) e como múltiplas operações no banco se mantêm consistentes (transações ACID).

### ORM (Object-Relational Mapping)

Um **ORM** é uma ferramenta que faz a ponte entre objetos do código e tabelas do banco de dados relacional. Em vez de escrever SQL manualmente (`INSERT INTO campus (nome_fantasia, ...) VALUES (...)`) você manipula objetos TypeScript e o ORM traduz para SQL.

```mermaid
graph LR
    subgraph "Código TypeScript"
        OBJ["Objeto Campus\n{\n  id,\n  nomeFantasia,\n  cnpj\n}"]
    end

    ORM_ENGINE["ORM\n(TypeORM)"]

    subgraph "Banco de dados"
        TBL["Tabela campus\n| id | nome_fantasia | cnpj |"]
    end

    OBJ -- "salvar" --> ORM_ENGINE
    ORM_ENGINE -- "INSERT INTO\ncampus (...)" --> TBL
    TBL -- "SELECT *\nFROM campus" --> ORM_ENGINE
    ORM_ENGINE -- "instancia\nobjeto" --> OBJ

    style OBJ fill:#4a90d9,stroke:#2c5f8a,color:#fff,text-align:left
    style ORM_ENGINE fill:#e8a838,stroke:#b07c1e,color:#fff,text-align:left
    style TBL fill:#336791,stroke:#1e3d5c,color:#fff,text-align:left
```

**Neste projeto**, usamos o [TypeORM](https://typeorm.io/) v0.3.28. Cada entidade de domínio (como `Campus`) tem uma entidade TypeORM correspondente (como `CampusEntity` em `src/modules/ambientes/campus/infrastructure.database/typeorm/campus.typeorm.entity.ts`) que define como os campos são mapeados para colunas do banco. O mapeamento fica **apenas na camada de infraestrutura** — a entidade de domínio em `domain/campus.ts` não sabe que o TypeORM existe.

```mermaid
graph TD
    subgraph "Domínio (não sabe do ORM)"
        DOM_ENT["Campus\n(entidade de domínio)\ncampus.ts"]
    end

    subgraph "Infraestrutura (sabe do ORM)"
        ORM_ENT["CampusEntity\n(entidade TypeORM)\ncampus.typeorm.entity.ts"]
        REPO["CampusTypeormRepository\n(adapter)"]
    end

    subgraph "Banco"
        DB_TBL["Tabela 'campus'\nPostgreSQL"]
    end

    DOM_ENT -- "contrato\n(interface)" --> REPO
    REPO -- "mapeia para" --> ORM_ENT
    ORM_ENT -- "persiste em" --> DB_TBL

    style DOM_ENT fill:#e8a838,stroke:#b07c1e,color:#fff
    style ORM_ENT fill:#50b86c,stroke:#3a8a50,color:#fff
    style DB_TBL fill:#336791,stroke:#1e3d5c,color:#fff
```

```typescript
// src/modules/ambientes/campus/infrastructure.database/typeorm/campus.typeorm.entity.ts
@Entity("campus")

export class CampusEntity {
  @PrimaryColumn("uuid") id!: string;
  @Column("text") nomeFantasia!: string;
  @Column("text") razaoSocial!: string;
  @ManyToOne(() => EnderecoEntity)
  @JoinColumn({ name: "id_endereco_fk" })
  endereco!: Relation<EnderecoEntity>;
  // ...
}
```

> **Para ir mais fundo:** o projeto usa `synchronize: false` no TypeORM — isso significa que o ORM **nunca** altera a estrutura do banco automaticamente. Toda alteração no schema do banco é feita via **migrações manuais** (scripts SQL versionados). Essa decisão evita surpresas em produção, onde uma sincronização automática poderia apagar dados ou alterar colunas inesperadamente. O trade-off é que o desenvolvedor precisa criar migrações manualmente a cada mudança em entidades. O TypeORM oferece `typeorm:generate` para gerar a migração automaticamente a partir do diff entre o código e o banco atual.

### Soft delete (exclusão lógica)

**Soft delete** significa que quando você "exclui" um registro, ele **não é removido** fisicamente do banco — apenas recebe uma marcação de exclusão. É como jogar um arquivo na lixeira em vez de deletá-lo permanentemente: ele fica invisível para uso normal, mas pode ser recuperado se necessário.

```mermaid
graph LR
    CREATE["Campus.create()"] --> ATIVO["Ativo\ndateDeleted = null\n\nAparece em findAll\ne findById"]
    ATIVO -- "DELETE endpoint\ndateDeleted = NOW()" --> EXCLUIDO["Excluído\ndateDeleted = 2026-03-22T...\n\nNão aparece em consultas"]
    EXCLUIDO -- "Restaurar\ndateDeleted = null" --> ATIVO
    UPDATE["campus.update()"] --> ATIVO

    style ATIVO fill:#50b86c,stroke:#3a8a50,color:#fff
    style EXCLUIDO fill:#e74c3c,stroke:#c0392b,color:#fff
    style CREATE fill:#4a90d9,stroke:#2c5f8a,color:#fff
    style UPDATE fill:#e8a838,stroke:#b07c1e,color:#fff
```

**Neste projeto**, toda entidade tem um campo `dateDeleted` (do tipo `timestamptz`, nullable). Quando é `null`, o registro está ativo. Quando preenchido com uma data, o registro é considerado excluído. Queries de listagem filtram automaticamente registros com `dateDeleted IS NOT NULL`.

> **Para ir mais fundo:** o banco possui **triggers** que gerenciam datas automaticamente. A function `change_date_updated()` (criada na migração `1742515200000`) é executada como trigger `BEFORE UPDATE` em cada tabela, atualizando o campo `date_updated` automaticamente. A stored procedure `ensure_change_date_trigger(table_name)` (migração `1742515260000`) é chamada durante a criação de cada tabela para anexar esse trigger. Isso garante que `date_updated` é sempre preciso, independentemente de o código da aplicação se lembrar de atualizá-lo. O código em `src/infrastructure.database/migrations/1742515200000-create-function-change-date-updated.ts` define essa function PostgreSQL.

### ACID e transações

Uma **transação** agrupa várias operações no banco de dados em uma **unidade atômica** — ou todas acontecem, ou nenhuma. É como uma transferência bancária: se o débito funciona mas o crédito falha, ambos são revertidos automaticamente.

**ACID** são as quatro garantias de uma transação:
- **Atomicidade** — tudo ou nada.
- **Consistência** — o banco nunca fica em estado inválido.
- **Isolamento** — transações paralelas não se atrapalham.
- **Durabilidade** — depois do commit, o dado sobrevive a quedas.

```mermaid
graph TD
    subgraph "Transação (ACID)"
        OP1["INSERT campus"]
        OP2["INSERT endereco"]
        OP3["UPDATE perfil"]
    end

    OP1 --> OP2 --> OP3

    OP3 --> |"tudo OK"| COMMIT["COMMIT\n(todas as operações\npersistidas)"]
    OP2 -.-> |"erro no meio"| ROLLBACK["ROLLBACK\n(nenhuma operação\npersistida — tudo volta\nao estado anterior)"]

    style COMMIT fill:#50b86c,stroke:#3a8a50,color:#fff
    style ROLLBACK fill:#e74c3c,stroke:#c0392b,color:#fff
```

**Neste projeto**, as transações são **automáticas para operações de escrita**. O `TransactionInterceptor` (em `src/server/nest/interceptors/transaction.interceptor.ts`) detecta o tipo de operação e aplica transação apenas quando necessário:

- **Leitura** (GET/HEAD em REST, queries em GraphQL) — executa **sem transação**, reduzindo overhead e contenção de recursos.
- **Escrita** (POST/PUT/PATCH/DELETE em REST, mutations em GraphQL) — abre uma transação antes do handler. Se completa sem erro → `COMMIT`. Se lança exceção → `ROLLBACK`.

Como desenvolvedor, você **nunca** precisa chamar `.transaction()` manualmente.

```mermaid
sequenceDiagram
    participant REQ as Requisição HTTP
    participant TI as TransactionInterceptor
    participant ALS as AsyncLocalStorage
    participant H as Handler
    participant R as Repositório
    participant DB as PostgreSQL

    REQ->>TI: chega requisição
    TI->>DB: BEGIN TRANSACTION
    TI->>ALS: armazena EntityManager transacional
    TI->>H: executa handler
    H->>R: repository.create(campus)
    R->>ALS: getActiveEntityManager()
    ALS-->>R: EntityManager (transacional)
    R->>DB: INSERT INTO campus (via EntityManager)
    DB-->>R: OK

    alt Sucesso
        H-->>TI: resultado
        TI->>DB: COMMIT
        TI-->>REQ: 201 Created
    else Exceção
        H-->>TI: ForbiddenError
        TI->>DB: ROLLBACK
        TI-->>REQ: 403 Forbidden
    end
```

```typescript
// src/server/nest/interceptors/transaction.interceptor.ts (código real)
@Injectable()

export class TransactionInterceptor implements NestInterceptor {
  intercept(_context: ExecutionContext, next: CallHandler): Observable<unknown> {
    return from(
      this.appTypeormConnection.transaction((entityManager) => {
        return transactionStorage.run(entityManager, () => {
          return new Promise<unknown>((resolve, reject) => {
            next.handle().subscribe({ next: resolve, error: reject });
          });
        });
      }),
    );
  }
}
```

> **Para ir mais fundo:** o mecanismo usa `AsyncLocalStorage` (Node.js) para propagar o `EntityManager` transacional por toda a call stack da requisição, sem passá-lo explicitamente. O `AppTypeormConnectionProxy` (em `src/infrastructure.database/typeorm/connection/app-typeorm-connection.proxy.ts`) intercepta chamadas a `getRepository()` — se existe um `EntityManager` ativo no `AsyncLocalStorage`, usa-o (participando da transação); caso contrário, usa o `DataSource` global. Esse padrão é uma variação do **Unit of Work** — todos os repositórios dentro de uma requisição compartilham a mesma transação sem saber disso. O trade-off: transação por requisição é simples mas pode manter locks por mais tempo em handlers lentos — por isso handlers devem ser rápidos e focados.

### O que são migrações?

Migrações são scripts que alteram a estrutura do banco de dados de forma **versionada e reproduzível**. Pense como um "Git para o banco de dados": cada alteração é registrada em um arquivo timestamped, pode ser aplicada (up) ou revertida (down), e o banco sabe quais migrações já foram executadas.

### Como funciona neste projeto

O projeto usa **TypeORM** com migrações manuais (`synchronize: false` — o banco **nunca** é alterado automaticamente). As migrações ficam em `src/infrastructure.database/migrations/` e são nomeadas com timestamp (ex.: `1742515200000-create-function-change-date-updated.ts`).

**Comandos:**

```bash
# Aplicar migrações pendentes (primeira vez ou após pull)
bun run migration:run

# Reverter a última migração
bun run migration:revert

# Gerar uma nova migração a partir de alterações nas entidades TypeORM
bun run typeorm:generate

# Reset completo — apaga tudo e recria (cuidado: perde todos os dados!)
bun run db:reset
```

### Fluxo ao alterar uma entidade

```mermaid
graph LR
    A["Alterar entidade TypeORM\n(*.typeorm.entity.ts)"] --> B["bun run typeorm:generate\n(gera migração)"]
    B --> C["Revisar migração\n(em migrations/)"]
    C --> D["bun run migration:run\n(aplica no banco)"]
    D --> E["bun run typecheck\n(verificar tipos)"]

    style A fill:#4a90d9,stroke:#2c5f8a,color:#fff,text-align:left
    style B text-align:left
    style C text-align:left
    style D fill:#50b86c,stroke:#3a8a50,color:#fff,text-align:left
    style E text-align:left
```

1. Altere a entidade TypeORM em `infrastructure.database/typeorm/`.
2. Gere a migração: `bun run typeorm:generate`.
3. Revise o arquivo gerado em `src/infrastructure.database/migrations/`.
4. Aplique: `bun run migration:run`.

### Dados iniciais (seed)

O banco já vem com dados de seed inseridos via migração — por exemplo, todos os estados do Brasil com códigos IBGE, cidades de Rondônia, o campus do IFRO Ji-Paraná e um superuser. Esses dados são inseridos automaticamente ao rodar `migration:run` pela primeira vez.

### Soft deletes e triggers

As entidades usam **exclusão lógica** (soft delete) — registros nunca são removidos fisicamente do banco. Em vez disso, o campo `dateDeleted` é preenchido com a data da exclusão.

```mermaid
sequenceDiagram
    participant APP as Aplicação
    participant DB as PostgreSQL
    participant TRIGGER as Trigger change_date_updated

    Note over APP,DB: CREATE
    APP->>DB: INSERT INTO campus (id, nome_fantasia, date_created, date_updated, date_deleted)\nVALUES ('uuid', 'IFRO', NOW(), NOW(), NULL)

    Note over APP,DB: UPDATE
    APP->>DB: UPDATE campus SET nome_fantasia = 'IFRO JPA' WHERE id = 'uuid'
    DB->>TRIGGER: BEFORE UPDATE (automático)
    TRIGGER->>DB: SET date_updated = NOW()

    Note over APP,DB: SOFT DELETE
    APP->>DB: UPDATE campus SET date_deleted = NOW() WHERE id = 'uuid'
    DB->>TRIGGER: BEFORE UPDATE (automático)
    TRIGGER->>DB: SET date_updated = NOW()
    Note over DB: Registro marcado como excluído\nmas ainda existe no banco

    Note over APP,DB: LISTAGEM (filtra excluídos)
    APP->>DB: SELECT * FROM campus WHERE date_deleted IS NULL
```

O banco possui **triggers automáticos** para controle de datas:

1. **Function `change_date_updated()`** — trigger function que executa `new.date_updated := now()` antes de cada UPDATE.
2. **Procedure `ensure_change_date_trigger(table_name)`** — cria o trigger automaticamente em qualquer tabela. É chamada durante a criação de cada tabela nas migrações:

```sql
-- Chamada no final de cada migração de tabela:
CALL ensure_change_date_trigger('campus');
```

Isso garante que `date_updated` é **sempre** preciso, independentemente de a aplicação se lembrar de atualizá-lo.

<!--
Source of Trust
commit_hash: ebb2cb05b8e21e5d4aae2cfcf0429805ebc7f344
verified_at: 2026-03-23T12:30:00Z
source_patterns:
  - src/infrastructure.database/migrations/**/*.ts
  - src/infrastructure.database/typeorm/**/*.ts
  - src/modules/*/infrastructure.database/typeorm/*.typeorm.entity.ts
confidence_scope: ORM (TypeORM 0.3, synchronize:false), 58 migrações, triggers automáticos (change_date_updated, ensure_change_date_trigger), soft delete via dateDeleted, transações automáticas via TransactionInterceptor
-->

---

## Autenticação e autorização

Com o banco de dados entendido, a próxima pergunta é: como a API sabe **quem** está fazendo uma requisição e **se essa pessoa tem permissão** para fazer o que está pedindo? A resposta envolve três conceitos que trabalham juntos: JWT (o "crachá digital" do usuário), JWKS (como a API verifica se o crachá é legítimo) e OAuth2/OIDC (o fluxo de login completo).

Para entender o fluxo de autenticação deste projeto, é importante conhecer os conceitos de JWT, JWKS e OAuth2/OIDC.

### JWT (JSON Web Token)

Um **JWT** é um token (uma string codificada) que carrega informações sobre um usuário. É como um crachá digital: contém quem você é (claims), quem emitiu (issuer) e uma assinatura que prova que ninguém adulterou o conteúdo. O token é composto de três partes separadas por pontos: `header.payload.signature`.

```mermaid
graph LR
    subgraph "JWT (3 partes separadas por '.')"
        H["Header\n{\n  alg: RS256,\n  typ: JWT,\n  kid: 'abc123'\n}"]
        P["Payload (claims)\n{\n  sub: 'user-id',\n  matricula: '1234',\n  exp: 1711000000\n}"]
        S["Signature\nHMAC(\n  header + payload,\n  chave secreta\n)"]
    end

    H --- P --- S

    style H fill:#4a90d9,stroke:#2c5f8a,color:#fff,text-align:left
    style P fill:#e8a838,stroke:#b07c1e,color:#fff,text-align:left
    style S fill:#50b86c,stroke:#3a8a50,color:#fff,text-align:left
```

A grande vantagem do JWT é que a API **não precisa consultar o banco de dados** para verificar se o token é válido — basta verificar a assinatura usando a chave pública do emissor.

```mermaid
sequenceDiagram
    participant KC as Keycloak
    participant API as Management Service
    participant DB as PostgreSQL

    Note over KC: Possui chave privada
    Note over API: Possui chave pública (via JWKS)

    KC->>KC: Assina JWT com chave privada
    KC-->>API: JWT assinado
    API->>API: Verifica assinatura com chave pública
    Note over API: Não precisa consultar o banco!
    API->>API: Extrai claims (matrícula, etc.)
```

**Neste projeto**, JWTs são emitidos pelo Keycloak (o servidor de autenticação). Quando um cliente faz login no Keycloak, recebe um JWT assinado com a chave privada do Keycloak. A API valida esse JWT usando a chave pública correspondente, obtida via JWKS (veja abaixo).

> **Para ir mais fundo:** JWTs são **auto-contidos** — toda a informação necessária para validação está no próprio token. Isso os diferencia de **tokens opacos** (como session IDs), que são apenas referências e exigem uma consulta ao servidor emissor para validação. O trade-off é que JWTs não podem ser "revogados" instantaneamente — uma vez emitido, ele é válido até expirar (campo `exp`). Por isso JWTs costumam ter validade curta (minutos), e um **refresh token** é usado para obter novos access tokens sem exigir novo login.

### JWKS (JSON Web Key Set)

**JWKS** é um endpoint HTTP que expõe as **chaves públicas** usadas para verificar assinaturas de JWTs. Em vez de configurar a chave pública manualmente na API, a API consulta o endpoint JWKS do Keycloak e obtém as chaves atuais automaticamente.

```mermaid
sequenceDiagram
    participant API as Management Service
    participant KC as Keycloak

    API->>KC: GET /.well-known/openid-configuration
    KC-->>API: {jwks_uri: ".../certs"}
    API->>KC: GET /realms/sisgea/protocol/openid-connect/certs
    KC-->>API: {keys: [{kid: "abc", kty: "RSA", n: "...", e: "..."}]}
    Note over API: Cacheia as chaves\n(5 chaves max, 10min TTL)
    API->>API: Usa chave pública para\nvalidar assinatura do JWT
```

**Neste projeto**, a API busca o JWKS do Keycloak na URL `{OAUTH2_CLIENT_PROVIDER_OIDC_ISSUER}/.well-known/openid-configuration` para descobrir o endpoint de chaves. A implementação fica em `src/infrastructure.identity-provider/jwks/`. A biblioteca `jwks-rsa` v4 cuida de buscar e cachear as chaves.

> **Para ir mais fundo:** o JWKS permite **rotação de chaves** sem downtime — o Keycloak pode gerar um novo par de chaves e começar a assinar tokens com a nova chave, enquanto a antiga ainda aparece no JWKS para validar tokens já emitidos. O campo `kid` (Key ID) no header do JWT indica qual chave foi usada para assinar. A biblioteca `jwks-rsa` faz cache das chaves e as recarrega periodicamente ou quando encontra um `kid` desconhecido.

### OAuth2 e OIDC

**OAuth2** é um protocolo de **autenticação delegada** — em vez do usuário informar sua senha diretamente à API, ele se autentica em um provedor confiável (como o Keycloak) que emite um token de acesso. É como quando você usa "Login com Google" em um site: você se autentica no Google, e o Google diz ao site "sim, este usuário é quem diz ser".

**OIDC** (OpenID Connect) é uma camada sobre o OAuth2 que adiciona informações padronizadas sobre o usuário (como nome, e-mail) via um **ID Token**.

```mermaid
sequenceDiagram
    participant U as Usuário
    participant FE as Front-end
    participant KC as Keycloak (IdP)
    participant API as Management Service

    U->>FE: Clica em "Login"
    FE->>KC: Redireciona para /auth (Authorization Code + PKCE)
    U->>KC: Insere login e senha
    KC->>KC: Valida credenciais
    KC-->>FE: Redireciona de volta com authorization code
    FE->>KC: Troca code por tokens (POST /token)
    KC-->>FE: Access token (JWT) + Refresh token
    Note over FE: Armazena tokens

    loop Cada requisição à API
        FE->>API: GET /api/campi + Authorization: Bearer <JWT>
        API->>API: Valida JWT via JWKS
        API-->>FE: Dados solicitados
    end

    Note over FE: Quando access token expira:
    FE->>KC: POST /token (grant_type=refresh_token)
    KC-->>FE: Novo access token
```

**Neste projeto**, o Keycloak é o **Identity Provider** (IdP — o servidor que gerencia contas de usuário e login). O fluxo é: (1) o front-end redireciona o usuário para o Keycloak, (2) o usuário faz login, (3) o Keycloak emite um JWT e redireciona de volta, (4) o front-end envia esse JWT em todas as requisições à API no header `Authorization: Bearer <token>` (o **Bearer token** é simplesmente a maneira padrão de enviar o JWT numa requisição HTTP — você coloca `Bearer` seguido do token no cabeçalho `Authorization`). A implementação fica em `src/infrastructure.identity-provider/`.

> **Para ir mais fundo:** o OAuth2 define vários **fluxos** (grant types). Para SPAs e apps web, o **Authorization Code** (com PKCE) é o mais seguro — o client troca um código temporário por tokens, evitando que tokens apareçam na URL. O **Client Credentials** é usado para comunicação entre serviços (machine-to-machine). Neste projeto, o Management Service é um **Resource Server** — ele valida tokens mas não os emite. As credenciais de client (`KC_CLIENT_ID`, `KC_CLIENT_SECRET`) são usadas pelo admin client do Keycloak para operações administrativas (como criar usuários).

### Autenticação

A aplicação delega autenticação a um servidor **Keycloak** via protocolo **OAuth2/OIDC**:

```mermaid
sequenceDiagram
    participant Cliente
    participant API as Management Service
    participant KC as Keycloak
    participant DB as PostgreSQL

    Cliente->>API: Requisição com Bearer token
    API->>API: É mock token? (mock.matricula.*)
    alt Token mock (dev)
        API->>API: Extrai matrícula do token
    else Token real (produção)
        API->>KC: Obtém JWKS (chaves públicas)
        KC-->>API: Chaves públicas (JSON Web Key Set)
        API->>API: Valida assinatura do JWT
        API->>API: Extrai claims do usuário
    end
    API->>DB: Busca Usuario por matrícula
    DB-->>API: Dados do usuário
    API->>API: Monta RequestActor (id, nome, matricula, email, isSuperUser)
    API-->>Cliente: Resposta da API
```

**Fluxo de autenticação (código real em `src/server/nest/auth/request-actor-resolver.adapter.ts`):**

1. O cliente envia um **Bearer token** no header `Authorization`.
2. Se `ENABLE_MOCK_ACCESS_TOKEN=true` e o token segue o formato `mock.matricula.<número>`:
   - A matrícula é extraída diretamente do token.
3. Caso contrário, o token é validado via **JWKS** obtido do Keycloak.
4. A API busca o `Usuario` no banco pela matrícula.
5. Se o usuário existe, um `RequestActor` com `id`, `nome`, `matricula`, `email` e `isSuperUser` é injetado nos controllers.
6. Se o usuário não existe no banco, retorna `ForbiddenException`.

**Tokens mock em desenvolvimento:**

```bash
# O token mock.matricula.1234 simula um usuário com matrícula 1234
curl -H "Authorization: Bearer mock.matricula.1234" \
  http://localhost:3701/api/campi

# Funciona com qualquer matrícula — basta mudar o número
curl -H "Authorization: Bearer mock.matricula.5678" \
  http://localhost:3701/api/turmas
```

> Em produção, `ENABLE_MOCK_ACCESS_TOKEN` deve ser `false`. Tokens reais são emitidos pelo Keycloak e validados via JWKS.

### Autorização

Após a autenticação, cada módulo verifica se o usuário tem **permissão** para realizar a operação solicitada:

```mermaid
graph TD
    REQ["Requisição autenticada\n(RequestActor disponível)"]
    REQ --> CTRL["Controller / Resolver"]
    CTRL --> HANDLER["Command Handler"]
    HANDLER --> PC["PermissionChecker\ndo módulo"]

    PC --> |"CREATE"| CAN_C["ensureCanCreate(ac, {dto})"]
    PC --> |"UPDATE"| CAN_U["ensureCanUpdate(ac, {dto}, id)"]
    PC --> |"DELETE"| CAN_D["ensureCanDelete(ac, {dto}, id)"]

    CAN_C & CAN_U & CAN_D --> |"OK"| CONTINUE["Continua execução"]
    CAN_C & CAN_U & CAN_D -.-> |"throw ForbiddenError"| DENIED["403 Forbidden"]

    HANDLER2["Query Handler\n(leitura)"] --> |"accessContext pode\nser null (hoje público;\nroadmap: filtrar por permissão)"| REPO["Repositório"]

    style REQ fill:#4a90d9,stroke:#2c5f8a,color:#fff
    style CONTINUE fill:#50b86c,stroke:#3a8a50,color:#fff
    style DENIED fill:#e74c3c,stroke:#c0392b,color:#fff
```

Isso é feito por um `IPermissionChecker` específico do módulo, com métodos:

- `ensureCanCreate(accessContext, { dto })` — verifica se o usuário pode criar.
- `ensureCanUpdate(accessContext, { dto }, id)` — verifica se o usuário pode atualizar.
- `ensureCanDelete(accessContext, { dto }, id)` — verifica se o usuário pode excluir.

O padrão é **"throw on deny"**: se o usuário não tiver permissão, uma exceção `ForbiddenError` (HTTP 403) é lançada automaticamente, e a operação é abortada.

Operações de **leitura** (queries) atualmente aceitam acesso com ou sem autenticação — o `accessContext` pode ser `null`. No roadmap está prevista a filtragem de resultados por permissão: o usuário verá apenas os registros que tem autorização para acessar.

<!--
Source of Trust
commit_hash: ebb2cb05b8e21e5d4aae2cfcf0429805ebc7f344
verified_at: 2026-03-23T12:30:00Z
source_patterns:
  - src/infrastructure.identity-provider/**/*.ts
  - src/server/nest/auth/**/*.ts
  - src/infrastructure.config/options/app-config-mock-access-token/**/*.ts
  - src/modules/*/domain/authorization/**/*.ts
  - src/modules/*/application/authorization/**/*.ts
confidence_scope: Fluxo de autenticação (Keycloak, JWKS, OAuth2/OIDC), mock tokens (mock.matricula.*), IPermissionChecker (ensureCanCreate/Update/Delete), pattern throw-on-deny
-->

---

## Qualidade de código

Antes de contribuir com código, é essencial entender as regras de qualidade que o projeto segue. Toda alteração precisa passar por validação automática e formatação — o projeto não aceita código fora desses padrões.

Para entender como o projeto garante a integridade dos dados em todas as camadas, é importante conhecer o Zod.

### Zod (validação de schemas)

**Zod** é uma biblioteca TypeScript que permite definir a "forma" que os dados devem ter e rejeitar automaticamente dados inválidos. Pense como um molde de bolo: se a massa não encaixa no molde, ela é rejeitada antes de entrar no forno.

A particularidade do Zod é que ele funciona tanto em **compile-time** (gerando tipos TypeScript via `z.infer<typeof Schema>`) quanto em **runtime** (validando dados reais com `schema.safeParse(data)`).

```mermaid
graph TD
    ZOD_SCHEMA["Schema Zod\nz.object({\n  nomeFantasia:\n    z.string().min(1)\n})"]

    ZOD_SCHEMA --> COMPILE["Compile-time\nz.infer gera tipo TypeScript\nICampus = {\n  nomeFantasia: string\n}"]
    ZOD_SCHEMA --> RUNTIME["Runtime\nschema.safeParse(dados)\nvalida dados reais"]

    RUNTIME --> OK["Válido\n→ retorna dados tipados"]
    RUNTIME --> ERR["Inválido\n→ retorna ZodError\ncom detalhes por campo"]

    style ZOD_SCHEMA fill:#e8a838,stroke:#b07c1e,color:#fff,text-align:left
    style COMPILE fill:#4a90d9,stroke:#2c5f8a,color:#fff,text-align:left
    style RUNTIME fill:#50b86c,stroke:#3a8a50,color:#fff,text-align:left
    style OK text-align:left
    style ERR fill:#e74c3c,stroke:#c0392b,color:#fff,text-align:left
```

**Neste projeto**, Zod é o **único** sistema de validação — `class-validator` e `class-transformer` não são usados. A validação acontece em **duas camadas**: na apresentação (DTOs com `static schema`) e no domínio (factory methods das entidades). Os schemas ficam em `src/modules/*/domain/*.schemas.ts`.

```mermaid
graph LR
    REQ["Requisição\n{ nomeFantasia: '' }"]

    subgraph "Camada 1 — Apresentação"
        PIPE["ZodGlobalValidationPipe\nusa DTO.schema"]
    end

    subgraph "Camada 2 — Domínio"
        FACTORY["Campus.create()\nzodValidate(\n  CampusCreateSchema\n)"]
    end

    REQ --> PIPE
    PIPE -- "válido" --> FACTORY
    PIPE -. "inválido\n400 Bad Request" .-> RESP1["❌ Erro de validação\n(detalhes por campo)"]
    FACTORY -- "válido" --> OK["✅ Entidade criada"]
    FACTORY -. "inválido\n(rede de segurança)" .-> RESP2["❌ Erro de domínio"]

    style REQ text-align:left
    style PIPE fill:#4a90d9,stroke:#2c5f8a,color:#fff,text-align:left
    style FACTORY fill:#e8a838,stroke:#b07c1e,color:#fff,text-align:left
    style RESP1 fill:#e74c3c,stroke:#c0392b,color:#fff,text-align:left
    style RESP2 fill:#e74c3c,stroke:#c0392b,color:#fff,text-align:left
```

```typescript
// src/modules/ambientes/campus/domain/campus.schemas.ts (trecho)

export const CampusCreateSchema = z.object({
  nomeFantasia: CampusFields.nomeFantasia.schema,
  razaoSocial: CampusFields.razaoSocial.schema,
  apelido: CampusFields.apelido.schema,
  cnpj: CampusFields.cnpj.schema,
  endereco: CampusEnderecoRefSchema,
});
```

> **Para ir mais fundo:** a validação em duas camadas é intencional. A camada de apresentação (`ZodGlobalValidationPipe`) rejeita dados malformados antes que cheguem ao handler — retornando 400 com detalhes por campo. A camada de domínio (`zodValidate()` nos factory methods) atua como **rede de segurança** — se por algum motivo dados inválidos chegarem ao domínio (ex.: chamada direta ao handler sem passar pelo pipe), a entidade rejeita. O tipo `ICampus = z.infer<typeof CampusSchema>` garante type safety: o TypeScript sabe exatamente quais campos existem e seus tipos, derivados automaticamente do schema Zod.

### Fluxo obrigatório após alterações

Após **qualquer** alteração de código, execute estes dois comandos nesta ordem:

```bash
# 1. Formata e corrige linting automaticamente
bun run code:fix

# 2. Verifica que nenhum tipo está quebrado
bun run typecheck
```

> Ambos devem passar sem erros. Uma alteração **não está concluída** sem esses dois passos.

### Biome (formatação e linting)

O projeto usa o [Biome](https://biomejs.dev/) v2.4 como formatador e linter único:

| Regra | Configuração |
|-------|-------------|
| Largura de linha | 100 caracteres |
| Indentação | 2 espaços |
| Ponto e vírgula | sempre |
| Trailing commas | todas |
| Imports não utilizados | removidos automaticamente |
| Variáveis não usadas | sinalizadas como erro |
| `const` | obrigatório quando possível |
| Organização de imports | automática |
| Line ending | LF |
| Bracket spacing | habilitado |
| Arrow parens | sempre |

```bash
# Corrigir formatação e linting
bun run code:fix

# Apenas verificar (sem alterar arquivos)
bun run code:check
```

O Dev Container já configura o Biome como formatador padrão com **auto-format ao salvar** — ou seja, ao salvar um arquivo no VS Code, ele é formatado automaticamente.

<!--
Source of Trust
commit_hash: ebb2cb05b8e21e5d4aae2cfcf0429805ebc7f344
verified_at: 2026-03-23T12:30:00Z
source_patterns:
  - src/biome.jsonc
  - src/shared/validation/**/*.ts
  - src/modules/*/domain/*.schemas.ts
confidence_scope: Configuração Biome (largura 100, 2 espaços, semicolons, trailing commas), validação Zod em duas camadas (apresentação + domínio), ZodGlobalValidationPipe
-->

---

## Como contribuir

Com o projeto rodando, as ferramentas entendidas e as regras de qualidade claras, você está pronto para contribuir. Esta seção guia você desde os conceitos básicos de Git (se nunca usou) até abrir seu primeiro Pull Request.

### Conceitos básicos de Git (para quem está começando)

Se você já conhece Git, pule para o [Gitflow do projeto](#gitflow-do-projeto).

| Conceito | O que é |
|----------|---------|
| **Repositório (repo)** | A pasta do projeto com todo o histórico de alterações. Existe uma cópia remota (no GitHub) e uma local (na sua máquina). |
| **Branch** | Uma "ramificação" do código. Permite trabalhar em uma alteração sem afetar o código principal. Pense como uma cópia paralela onde você faz suas mudanças. |
| **Commit** | Um "ponto de salvamento" no histórico. Registra o que mudou, quem mudou e uma mensagem descrevendo a alteração. |
| **Push** | Envia seus commits locais para o repositório remoto (GitHub), tornando-os visíveis para o time. |
| **Fetch** | Baixa as referências e objetos do repositório remoto **sem alterar** nenhum arquivo local. Diferente de pull, que baixa e incorpora automaticamente. |
| **Merge** | O ato de juntar as alterações de uma branch na outra. Acontece quando um PR é aprovado ou quando você incorpora mudanças da main. |
| **Pull Request (PR)** | Uma solicitação para incorporar suas alterações (da sua branch) na branch principal (`main`). Outros devs revisam antes de aprovar. |
| **Conflito** | Quando duas pessoas alteraram a mesma parte do código. Precisa ser resolvido manualmente antes do merge. |

### Gitflow do projeto

O projeto usa uma estratégia simples: **branch única `main`** + **feature branches** + **merge via Pull Request**.

```mermaid
gitGraph
    commit id: "estado atual"
    branch feat/cadastro-turma
    commit id: "criar entidade"
    commit id: "adicionar handler"
    commit id: "code:fix + typecheck"
    checkout main
    branch fix/corrigir-paginacao
    commit id: "corrigir offset"
    checkout main
    merge fix/corrigir-paginacao id: "PR #42 merged"
    checkout feat/cadastro-turma
    commit id: "adicionar testes"
    checkout main
    merge feat/cadastro-turma id: "PR #43 merged"
    commit id: "próximo ciclo..."
```

**Como funciona:**

1. A branch `main` é a versão **estável** do projeto. Todo código nela deve estar funcionando.
2. Para cada alteração, você cria uma **feature branch** a partir da `main`.
3. Trabalha na feature branch (commits, testes, formatação).
4. Quando terminar, abre um **Pull Request** para a `main`.
5. Após revisão e aprovação, o PR é **mergeado** na `main`.

### Convenções de nomenclatura

#### Branches

O nome da branch indica o **tipo** da alteração:

| Prefixo | Quando usar | Exemplo |
|---------|-------------|---------|
| `feat/` | Nova funcionalidade | `feat/cadastro-estagio` |
| `fix/` | Correção de bug | `fix/paginacao-campus` |
| `refactor/` | Refatoração sem mudança de comportamento | `refactor/extrair-handler-turma` |
| `docs/` | Alteração apenas em documentação | `docs/atualizar-readme` |
| `test/` | Adição ou correção de testes | `test/handler-diario` |
| `chore/` | Tarefas de manutenção (deps, CI, config) | `chore/atualizar-nestjs` |

#### Commits

Commits seguem o padrão **Conventional Commits**:

```
tipo(escopo): descrição curta do que foi feito
```

| Parte | Descrição | Exemplo |
|-------|-----------|---------|
| **tipo** | Categoria da mudança | `feat`, `fix`, `refactor`, `docs`, `test`, `chore` |
| **escopo** | Módulo ou área afetada (opcional) | `campus`, `turma`, `auth`, `database` |
| **descrição** | O que foi feito, em imperativo | `adicionar endpoint de listagem` |

**Exemplos bons vs ruins:**

| Bom | Ruim |
|-----|------|
| `feat(campus): adicionar endpoint de criação` | `update` |
| `fix(turma): corrigir paginação na listagem` | `fix bug` |
| `refactor(auth): extrair validação de token` | `refatoração` |
| `docs: atualizar variáveis de ambiente no README` | `docs` |
| `test(diario): adicionar testes do create handler` | `add tests` |

### Trabalhando com Git localmente

Manter a branch local sincronizada é fundamental para evitar conflitos. O fluxo recomendado neste projeto usa **`git fetch -p` + `git merge origin/main`** em vez de `git pull`.

#### Por que NÃO usar `git pull`

`git pull` é um atalho que faz `git fetch` + `git merge` (ou `rebase`, dependendo da config global) **automaticamente**. Isso pode causar problemas:

- Se o dev tem `pull.rebase = true` na config global e faz `git pull origin main` na branch de feature, os commits locais são **rebaseados** sobre a main — reescrevendo o histórico da feature branch. Se ele já tinha dado push, isso causa divergência.
- Separar `fetch` e `merge` é mais explícito e seguro: você vê o que mudou antes de incorporar.

#### Fluxo recomendado: `git fetch -p` + `git merge origin/main`

```mermaid
graph TD
    A["Início do trabalho"] --> B["git fetch -p"]
    B --> C["git merge origin/main"]
    C --> D{Conflitos?}
    D -- Não --> E["Continua trabalhando"]
    D -- Sim --> F["Resolve conflitos"]
    F --> G["git add arquivos-resolvidos"]
    G --> H["git commit"]
    H --> E

    style A fill:#4a90d9,stroke:#2c5f8a,color:#fff
    style D fill:#e8a838,stroke:#b07c1e,color:#fff
    style E fill:#50b86c,stroke:#3a8a50,color:#fff
```

**Explicação de cada comando:**

- **`git fetch -p`** — baixa as referências e objetos do repositório remoto **sem alterar nenhum arquivo local**. O `-p` (prune) limpa referências locais de branches remotas que já foram deletadas no GitHub. Após o fetch, `origin/main` aponta para o commit mais recente da main no GitHub, mas sua branch local não muda.

- **`git merge origin/main`** — incorpora as mudanças de `origin/main` na branch onde você está (sua feature branch). Isso é feito **sem trocar para a `main` local** — você referencia diretamente `origin/main`. Se não houver conflitos, o merge acontece automaticamente.

#### Regra: NÃO toque na `main` local

Neste projeto, a convenção é:

- **Nunca faça checkout na `main` local** para atualizar. Use sempre `origin/main` como referência.
- A `main` local pode ficar desatualizada e isso é OK — ela não é usada para nada.
- Se a `main` local ficou divergente ou confusa: `git checkout main && git reset --hard origin/main` (após um fetch) — isso faz a branch local apontar exatamente para o mesmo commit de `origin/main`, descartando qualquer divergência local.

#### Fluxo diário

```bash
# Início do trabalho (na sua feature branch):
git fetch -p
git merge origin/main

# Fim do trabalho:
bun run code:fix
bun run typecheck
git add .
git commit -m "feat(modulo): descrição"
git push origin feat/minha-feature

# Criando nova branch (a partir do remoto atualizado):
git fetch -p
git checkout -b feat/nova-feature origin/main
```

O `git checkout -b feat/nova-feature origin/main` cria uma nova branch a partir de `origin/main` (a versão mais recente da main no GitHub) — melhor que criar a partir da `main` local, que pode estar desatualizada.

#### O que fazer quando há conflitos

1. O Git marca os conflitos nos arquivos com `<<<<<<<`, `=======`, `>>>>>>>`.
2. Abra cada arquivo conflitante e escolha qual versão manter (ou combine ambas).
3. Remova os marcadores de conflito.
4. Adicione e commite:
   ```bash
   git add .
   git commit -m "merge: resolver conflitos com main"
   ```

> **Dica:** use o editor (VS Code tem uma interface visual para resolver conflitos) em vez de editar manualmente.

### Trabalhando localmente no desenvolvimento

Todo o desenvolvimento acontece **dentro do container Docker**. Isso garante que todos usam as mesmas versões de ferramentas.

```mermaid
graph TD
    subgraph "Sua máquina (host)"
        EDITOR["Editor de código\n(VS Code, WebStorm, etc.)"]
        JUST["just (task runner)"]
    end

    subgraph "Container Docker"
        BUN["Bun (runtime)"]
        APP["Aplicação NestJS"]
        TOOLS["Ferramentas\n(TypeScript, Biome, Vitest)"]
    end

    subgraph "Containers de serviço"
        DB["PostgreSQL 15"]
        RMQ["RabbitMQ 3"]
    end

    EDITOR -- "edita arquivos\n(volume montado)" --> APP
    JUST -- "just exec / just up" --> BUN
    BUN --> APP
    BUN --> TOOLS
    APP --> DB
    APP --> RMQ

    style EDITOR fill:#4a90d9,stroke:#2c5f8a,color:#fff
    style BUN fill:#e8a838,stroke:#b07c1e,color:#fff
    style DB fill:#336791,stroke:#1e3d5c,color:#fff
```

#### Fluxo de trabalho típico

```bash
# 1. Suba o ambiente (se ainda não estiver rodando)
just up                        # Sobe containers e abre shell

# 2. Dentro do container, inicie o servidor
bun run dev                    # Servidor com hot reload

# 3. Em outro terminal, rode comandos conforme necessário
just exec bun run test         # Testes
just exec bun run code:fix     # Formatação
just exec bun run typecheck    # Verificação de tipos
just exec bun run migration:run  # Migrações
```

#### Editor + Container: como funciona

O código fica na sua máquina e é **montado como volume** dentro do container. Isso significa:

- Você **edita no editor** normalmente (VS Code, WebStorm, Vim, etc.).
- As alterações aparecem **instantaneamente** dentro do container (sem rebuild).
- O `bun run dev` detecta as mudanças e faz **hot reload** automaticamente.
- Para rodar comandos (testes, lint, migrações), use `just exec` ou o shell dentro do container.

#### Dicas para produtividade

- **Dois terminais:** um para o servidor (`bun run dev`), outro para comandos (`just exec ...`).
- **Hot reload:** salve o arquivo e veja as mudanças refletidas automaticamente no servidor.
- **Debug:** use `bun run debug` e conecte o debugger do editor na porta `9229`.
- **Logs:** se algo não funcionar, veja os logs com `just logs`.

### Passo a passo completo

```mermaid
sequenceDiagram
    participant Dev as Desenvolvedor
    participant Local as Git Local
    participant Container as Container Docker
    participant Remote as GitHub
    participant Team as Time (Review)

    Dev->>Local: git checkout -b feat/minha-feature origin/main
    Note over Dev: Faz alterações no código
    Dev->>Container: bun run code:fix
    Container-->>Dev: Código formatado
    Dev->>Container: bun run typecheck
    Container-->>Dev: Tipos OK
    Dev->>Container: bun run test
    Container-->>Dev: Testes passando
    Dev->>Local: git add + git commit
    Dev->>Remote: git push origin feat/minha-feature
    Dev->>Remote: Abre Pull Request
    Remote->>Team: Notifica revisores
    Team->>Remote: Revisa e aprova
    Remote->>Remote: Merge na main
    Note over Remote: CI/CD deploya automaticamente
```

#### 1. Crie uma feature branch (a partir do remoto)

```bash
git fetch -p                                     # Atualiza referências
git checkout -b feat/minha-feature origin/main   # Cria branch a partir do remoto
```

#### 2. Faça suas alterações

Edite o código seguindo a [estrutura de módulos](#módulos-de-domínio) e as [boas práticas](#boas-práticas-de-desenvolvimento).

#### 3. Formate e valide (obrigatório)

```bash
bun run code:fix      # Formata o código e corrige problemas de linting
bun run typecheck     # Verifica que nenhum tipo está quebrado
```

> **Por que isso é obrigatório?** `code:fix` garante que o código segue o padrão visual do projeto (indentação, imports, etc.). `typecheck` garante que o TypeScript compila sem erros — se falhar, algo está quebrado e não deve ser commitado.

#### 4. Rode os testes

```bash
bun run test          # Executa os testes unitários
```

> Se algum teste falhar, corrija antes de commitar. Commits com testes quebrados não devem chegar ao PR.

#### 5. Faça o commit

```bash
git add .                                           # Adiciona todas as alterações
git commit -m "feat(campus): adicionar validação de CNPJ"   # Cria o commit com mensagem
```

> `git add .` adiciona **todos** os arquivos modificados. Se quiser adicionar apenas alguns, use `git add caminho/do/arquivo.ts`.

#### 6. Envie para o GitHub

```bash
git push origin feat/minha-feature    # Envia a branch para o repositório remoto
```

> Na primeira vez que fizer push de uma branch nova, o Git pode pedir para configurar o upstream. Use o comando que ele sugerir.

#### 7. Abra um Pull Request

1. Acesse o repositório no GitHub.
2. Você verá um banner sugerindo abrir um PR para a branch que acabou de enviar — clique nele.
3. Preencha o título (seguindo a convenção de commit) e a descrição.
4. Adicione revisores.
5. Clique em **Create Pull Request**.

### Ciclo de vida de um Pull Request

```mermaid
stateDiagram-v2
    [*] --> Draft: Abre PR como rascunho\n(ainda trabalhando)
    [*] --> ReadyForReview: Abre PR pronto\npara revisão
    Draft --> ReadyForReview: Marca como pronto
    ReadyForReview --> InReview: Revisor começa\na analisar
    InReview --> ChangesRequested: Revisor pede\nalterações
    InReview --> Approved: Revisor aprova
    ChangesRequested --> InReview: Dev faz correções\ne pede re-review
    Approved --> Merged: Merge na main
    Merged --> [*]

    note right of Draft: Use Draft quando\nainda não terminou
    note right of Approved: CI deve estar verde\nantes do merge
```

**Dicas:**
- Abra o PR como **Draft** se ainda estiver trabalhando e quiser feedback antecipado.
- PRs menores são revisados mais rápido — prefira PRs focados a PRs gigantes.
- Responda aos comentários da revisão e faça as correções na mesma branch.

### O que fazer vs. o que NÃO fazer

| Fazer | NÃO fazer |
|-------|-----------|
| Criar uma branch por feature/fix | Commitar direto na `main` |
| Commits pequenos e frequentes com mensagens claras | Um commit gigante com "várias coisas" |
| Rodar `code:fix` + `typecheck` antes de todo commit | Commitar com erros de tipo ou formatação |
| Rodar `bun run test` antes de abrir PR | Abrir PR com testes falhando |
| Manter branch atualizada com `git fetch -p && git merge origin/main` | Trabalhar semanas sem sincronizar |
| Escrever título de PR descritivo | Título genérico como "Update" |
| Fazer PRs pequenos e focados | PR com 50 arquivos e 3 features misturadas |
| Pedir revisão após CI verde | Pedir revisão com CI falhando |
| Resolver conflitos com cuidado | Forçar push (`--force`) sem entender |
| Deletar a branch após merge | Acumular branches antigas |

### Checklist pré-commit

Antes de cada `git commit`, verifique:

- [ ] `bun run code:fix` executado (sem erros).
- [ ] `bun run typecheck` passando.
- [ ] Mensagem de commit segue o padrão `tipo(escopo): descrição`.
- [ ] Nenhum `console.log` de debug esquecido.
- [ ] Nenhum arquivo sensível (`.env`, credenciais) incluído.

### Checklist pré-PR

Antes de abrir o Pull Request:

- [ ] `bun run code:fix` executado.
- [ ] `bun run typecheck` passando.
- [ ] `bun run test` passando.
- [ ] Branch atualizada com a main (`git fetch -p && git merge origin/main`).
- [ ] Novos endpoints documentados no Swagger (decorators `@ApiOperation`, `@ApiTags`).
- [ ] Migrações criadas se houve alteração em entidades do banco.
- [ ] README atualizado se houve mudança em estrutura, variáveis, serviços ou fluxos.
- [ ] PR com título descritivo seguindo Conventional Commits.
- [ ] Descrição do PR explicando o que foi feito e por quê.

> **Nota:** todo código roda dentro do container. Se você não estiver no shell do container (via `just up`), use `just exec <comando>` para executar de fora. Exemplo: `just exec bun run typecheck`.

### Como escrever um bom commit

Commits são o **histórico permanente** do projeto. Um bom commit permite que qualquer pessoa entenda o que foi feito, por que, e em qual contexto — mesmo meses depois.

#### Regras obrigatórias

Todos os commits neste projeto **devem** seguir o padrão [Conventional Commits](https://www.conventionalcommits.org/):

```
tipo(escopo): descrição imperativa curta

Corpo opcional com mais detalhes sobre o que mudou e por quê.
Pode ter múltiplas linhas.

Refs #123
```

**Estrutura:**

| Parte | Obrigatório | Descrição |
|-------|:-----------:|-----------|
| **tipo** | sim | Categoria da mudança (`feat`, `fix`, `refactor`, etc.) |
| **escopo** | não (mas recomendado) | Módulo ou área afetada (`campus`, `auth`, `database`) |
| **descrição** | sim | Frase curta no **imperativo** (ex.: "adicionar", não "adicionado" ou "adicionando") |
| **corpo** | não | Detalhes adicionais — o _porquê_ da mudança, contexto, decisões |
| **referência** | não | Link para issue (`Refs #123`, `Closes #45`) |

**Tipos permitidos:**

| Tipo | Quando usar | Exemplo |
|------|-------------|---------|
| `feat` | Nova funcionalidade visível ao usuário | `feat(turma): adicionar endpoint de matrícula` |
| `fix` | Correção de bug | `fix(campus): corrigir filtro de busca por CNPJ` |
| `refactor` | Mudança interna sem alterar comportamento | `refactor(auth): extrair validação de token para service` |
| `docs` | Documentação (README, comentários, Swagger) | `docs: atualizar variáveis de ambiente no README` |
| `test` | Adição ou correção de testes | `test(diario): adicionar testes do create handler` |
| `chore` | Manutenção (deps, CI, config, build) | `chore: atualizar NestJS para v11` |
| `style` | Formatação (sem mudança de lógica) | `style: aplicar code:fix no módulo campus` |
| `perf` | Melhoria de performance | `perf(database): adicionar índice na tabela turma` |
| `ci` | Alteração em pipelines CI/CD | `ci: adicionar step de typecheck no workflow` |

**Exemplos completos:**

```bash
# Commit simples (uma linha)
git commit -m "feat(campus): adicionar validação de CNPJ duplicado"

# Commit com corpo explicativo
git commit -m "fix(turma): corrigir erro 500 ao listar turmas sem diário

O findAll retornava erro quando a turma não tinha diários associados
porque o LEFT JOIN não tratava o caso de relação vazia.

Refs #127"

# Commit de refatoração
git commit -m "refactor(auth): mover mock token para infrastructure.identity-provider

O mock de token estava no controller, violando a separação de concerns.
Movido para o adapter de identity provider onde pertence."
```

**O que NÃO fazer em commits:**

| Ruim | Por quê | Bom |
|------|---------|-----|
| `fix` | Não diz o que foi corrigido | `fix(campus): corrigir paginação na listagem` |
| `update` | Genérico demais | `feat(turma): adicionar campo observacao` |
| `wip` | Não deve ser commitado — use stash | Finalize antes de commitar |
| `ajustes diversos` | Múltiplas mudanças misturadas | Separe em commits focados |
| `Adicionado endpoint` | Não segue o padrão (não é imperativo, sem tipo) | `feat(campus): adicionar endpoint de exclusão` |

### Como escrever uma boa issue

Issues são o ponto de partida de qualquer alteração. Uma boa issue permite que qualquer dev (inclusive você mesmo no futuro) entenda o problema ou a necessidade sem precisar perguntar.

#### Estrutura recomendada

**Para bugs:**

```markdown
## Descrição do bug
O que está acontecendo de errado? Qual o comportamento atual?

## Comportamento esperado
O que deveria acontecer?

## Como reproduzir
1. Acessar endpoint X com payload Y
2. Observar resposta Z

## Contexto adicional
- Ambiente: desenvolvimento / produção
- Endpoint: POST /api/campi
- Payload de exemplo (se aplicável)
- Logs de erro (se disponíveis)
```

**Para features:**

```markdown
## Descrição
O que precisa ser implementado e por quê?

## Critérios de aceite
- [ ] Endpoint POST /api/turmas criado
- [ ] Validação de campos obrigatórios
- [ ] Testes unitários do handler
- [ ] Documentação Swagger

## Contexto técnico (se aplicável)
Módulo afetado, dependências, decisões de design.
```

**Dicas:**
- Título claro e específico — "Erro 500 ao criar campus sem endereço" é melhor que "Bug no campus".
- Uma issue por problema/feature — não misture assuntos.
- Use labels para categorizar (`bug`, `feature`, `enhancement`, `docs`).
- Referencie issues relacionadas quando existirem.

### Como escrever um bom Pull Request

O PR é onde a revisão acontece. Um bom PR facilita a vida do revisor e acelera o merge.

#### Estrutura recomendada

```markdown
## O que foi feito
Resumo em 1-3 frases do que esta PR implementa/corrige.

## Por que
Contexto e motivação — qual problema resolve ou qual necessidade atende.
Link para a issue: Closes #123

## Como testar
1. Subir o ambiente com `just up`
2. Rodar migrações: `bun run migration:run`
3. Acessar POST /api/campi com payload X
4. Verificar resposta Y

## Checklist
- [ ] `code:fix` executado
- [ ] `typecheck` passando
- [ ] Testes passando
- [ ] Swagger atualizado (se aplicável)
- [ ] README atualizado (se aplicável)
```

**Regras:**

| Regra | Descrição |
|-------|-----------|
| **PRs pequenos** | Máximo ~400 linhas alteradas. Se passou disso, considere dividir. |
| **Uma responsabilidade** | Cada PR resolve um problema ou implementa uma feature. Não misture. |
| **Título descritivo** | Segue Conventional Commits: `feat(campus): adicionar validação de CNPJ` |
| **Descrição completa** | O revisor não deve precisar ler todo o diff para entender o contexto. |
| **CI verde** | Não peça revisão com CI falhando. |
| **Branch atualizada** | Faça `git fetch -p && git merge origin/main` antes de pedir revisão. |
| **Resolva conflitos** | Se houver conflitos com a `main`, resolva antes do merge. |

---

## Arquitetura

Com o fluxo de contribuição claro, agora vamos entender **como o código é organizado internamente**. Isso vai ajudar você a saber onde colocar cada alteração e por que os arquivos estão onde estão.

### Por que o código é organizado assim?

Imagine um restaurante. Se o cozinheiro, o garçom, o caixa e o fornecedor estivessem todos na mesma sala fazendo tudo junto, qualquer mudança (trocar o fornecedor, mudar o cardápio, aceitar um novo tipo de pagamento) afetaria todo mundo. Agora imagine que cada um tem seu espaço separado e se comunicam por pedidos padronizados — mudar o fornecedor não afeta o garçom, e o cozinheiro não precisa saber como o pagamento funciona.

Este projeto segue essa mesma ideia: cada parte do código tem uma responsabilidade clara e se comunica com as outras através de **contratos** (interfaces). Isso permite trocar peças sem quebrar o resto.

```mermaid
graph LR
    subgraph "Sem organização"
        MONO["Todo o código junto\n(banco, lógica, HTTP, auth)\n→ mudar uma coisa quebra outra"]
    end

    subgraph "Com arquitetura hexagonal"
        PRES["Apresentação\n(recebe requisições)"]
        APP["Aplicação\n(orquestra a lógica)"]
        DOM["Domínio\n(regras de negócio)"]
        INFRA["Infraestrutura\n(banco, auth, filas)"]
        PRES --> APP --> DOM
        INFRA --> DOM
    end

    style MONO fill:#e74c3c,stroke:#c0392b,color:#fff,text-align:left
    style DOM fill:#e8a838,stroke:#b07c1e,color:#fff,text-align:left
    style PRES fill:#4a90d9,stroke:#2c5f8a,color:#fff,text-align:left
    style INFRA fill:#50b86c,stroke:#3a8a50,color:#fff,text-align:left
```

**Na prática, quando você precisa adicionar um novo campo a uma entidade (ex.: "telefone" no Campus):**

1. Adiciona o campo no **domínio** (`campus.ts` e `campus.schemas.ts`)
2. Atualiza a entidade do banco na **infraestrutura** (`campus.typeorm.entity.ts`)
3. Gera uma **migração** (`bun run typeorm:generate`)
4. Atualiza os DTOs na **apresentação** (REST e/ou GraphQL)
5. Pronto — os handlers da aplicação não mudam porque delegam para o domínio

Essa separação é o que chamamos de **arquitetura hexagonal**.

### Arquitetura hexagonal

O projeto segue a **arquitetura hexagonal** (também conhecida como _ports & adapters_). Em termos simples: a lógica de negócio (domínio) fica no "centro" e não sabe nada sobre o mundo exterior. Ela define **contratos** — como "preciso de um repositório que salve Campus" — e as camadas externas fornecem **implementações** — como "aqui está um repositório que usa PostgreSQL". O termo **port** (porta) se refere ao contrato/interface, e **adapter** (adaptador) se refere à implementação concreta.

**O que isso significa na prática?** Se amanhã o banco de dados mudar de PostgreSQL para outro, ou se o Keycloak for substituído por outro provedor de autenticação, apenas a camada de infraestrutura precisa ser alterada — a lógica de negócio permanece intacta.

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

### Inversão de dependência e Ports & Adapters

A arquitetura hexagonal se apoia no princípio de **inversão de dependência**: código de alto nível (lógica de negócio) **não deve depender** de código de baixo nível (banco de dados, frameworks). Em vez disso, ambos dependem de **abstrações** (interfaces).

A analogia: uma tomada elétrica é uma interface padrão. O eletricista (domínio) instala a tomada (interface) sem saber que aparelho será plugado. O aparelho (infraestrutura) precisa ter o plug compatível. Se o aparelho mudar, a tomada continua a mesma.

```mermaid
graph TD
    subgraph "Sem inversão (acoplado)"
        H1["Handler"] --> R1["CampusTypeormRepository"]
        R1 --> DB1["PostgreSQL"]
        style H1 fill:#e74c3c,stroke:#c0392b,color:#fff
    end

    subgraph "Com inversão (desacoplado)"
        H2["Handler"]
        I["ICampusRepository\n(interface/port)"]
        R2["CampusTypeormRepository\n(adapter)"]
        DB2["PostgreSQL"]

        H2 -- "depende da\nabstração" --> I
        R2 -- "implementa" --> I
        R2 --> DB2
    end

    style I fill:#e8a838,stroke:#b07c1e,color:#fff
    style H2 fill:#4a90d9,stroke:#2c5f8a,color:#fff
    style R2 fill:#50b86c,stroke:#3a8a50,color:#fff
```

**Neste projeto**, o domínio define **Symbols** (tokens de injeção) e **types** (contratos). A infraestrutura registra implementações concretas para esses Symbols. O NestJS injeta a implementação correta em runtime. Exemplo: `ICampusRepository` (Symbol + type no domínio) é implementado por `CampusTypeormRepository` (na infraestrutura).

**Exemplo concreto — trocar a infraestrutura sem tocar no handler:**

```mermaid
graph LR
    HANDLER["CampusCreateCommandHandler\n(não muda nunca)"]

    subgraph "Produção"
        I1["ICampusRepository"] --> IMPL1["CampusTypeormRepository\n→ PostgreSQL"]
    end

    subgraph "Testes"
        I2["ICampusRepository"] --> IMPL2["MockCrudRepository\n→ memória (vi.fn)"]
    end

    subgraph "Futuro hipotético"
        I3["ICampusRepository"] --> IMPL3["CampusPrismaRepository\n→ Prisma ORM"]
    end

    HANDLER --> I1
    HANDLER -.-> I2
    HANDLER -.-> I3

    style HANDLER fill:#4a90d9,stroke:#2c5f8a,color:#fff,text-align:left
    style IMPL1 fill:#50b86c,stroke:#3a8a50,color:#fff,text-align:left
    style IMPL2 fill:#7b68ee,stroke:#5a4db0,color:#fff,text-align:left
    style IMPL3 fill:#e8a838,stroke:#b07c1e,color:#fff,text-align:left
```

> **Para ir mais fundo:** a diferença entre **inversão de dependência** e **injeção de dependência** é sutil mas importante. Inversão de dependência é um **princípio de design** — o domínio define interfaces, e a infraestrutura implementa. Injeção de dependência é um **mecanismo técnico** — o container (NestJS) resolve e injeta as implementações via constructor. Neste projeto, os Symbols do TypeScript funcionam como tokens de injeção porque TypeScript não emite interfaces em runtime — o Symbol é a referência concreta que o container usa para resolver a dependência. Essa abordagem é um **pragmatismo aceito**: tecnicamente, `Dep` (que internamente usa `@Inject` do NestJS) cria um acoplamento do domínio com o NestJS, mas na prática é um decorator fino que não afeta a testabilidade.

### CQRS (Command Query Responsibility Segregation)

**CQRS** é a prática de separar operações de **leitura** (queries) de operações de **escrita** (commands) em handlers distintos. A analogia: em um restaurante, quem anota os pedidos (garçom) e quem prepara a comida (cozinheiro) são pessoas diferentes com habilidades diferentes — mesmo que ambos trabalhem com "comida".

**Neste projeto**, cada módulo tem handlers separados para commands (`Create`, `Update`, `Delete`) e queries (`FindOne`, `List`). Commands alteram o estado do banco e exigem verificação de permissão. Queries apenas leem dados — atualmente aceitam acesso público, mas no roadmap está prevista a filtragem de resultados com base nas permissões do usuário (o usuário verá apenas os registros que "pode" ver).

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

> **Para ir mais fundo:** a separação facilita otimização independente — leituras podem ter cache, índices especializados e projeções otimizadas, enquanto escritas passam por validação completa, autorização e transações. Neste projeto, o CQRS é **lógico** (handlers separados, mesmo banco) — não há Event Sourcing ou bancos separados para leitura/escrita, embora a arquitetura permita evoluir nessa direção no futuro.

**Exemplo concreto — módulo Campus:**

```mermaid
graph TD
    subgraph "Commands (escrita)"
        CC["CampusCreateCommandHandler\nPOST /api/campi"]
        CU["CampusUpdateCommandHandler\nPATCH /api/campi/:id"]
        CD["CampusDeleteCommandHandler\nDELETE /api/campi/:id"]
    end

    subgraph "Queries (leitura)"
        QF["CampusFindOneQueryHandler\nGET /api/campi/:id"]
        QL["CampusListQueryHandler\nGET /api/campi"]
    end

    CC & CU & CD --> |"verificam\npermissão"| PC["PermissionChecker"]
    CC & CU & CD --> |"usam"| ENT["Campus\n(entidade de domínio)"]
    CC & CU & CD --> |"persistem via"| REPO_W["ICampusRepository\n(create, update, softDelete)"]

    QF & QL --> |"leem via"| REPO_R["ICampusRepository\n(findById, findAll)"]

    Note1["Queries: hoje aceitam acesso público.\nNo roadmap: filtrar resultados\npor permissão do usuário."]

    style CC fill:#e74c3c,stroke:#c0392b,color:#fff
    style CU fill:#e74c3c,stroke:#c0392b,color:#fff
    style CD fill:#e74c3c,stroke:#c0392b,color:#fff
    style QF fill:#4a90d9,stroke:#2c5f8a,color:#fff
    style QL fill:#4a90d9,stroke:#2c5f8a,color:#fff
```

### NestJS — conceitos fundamentais

O projeto usa o [NestJS](https://nestjs.com/) v11 como framework. O NestJS é um framework para construir aplicações server-side em TypeScript — ele fornece uma estrutura opinada para organizar o código, gerenciar dependências e lidar com requisições HTTP e GraphQL. Se você já usou frameworks como Spring (Java) ou Django (Python), o NestJS segue uma filosofia similar.

Se você nunca usou NestJS, aqui estão os conceitos essenciais para entender o código:

#### Building blocks

O NestJS organiza a aplicação em peças que se encaixam:

```mermaid
graph TD
    subgraph "Organização"
        MOD["Module\nAgrupa e organiza"]
        CTRL["Controller\nRecebe requisições"]
        PROV["Provider / Service\nLógica injetável"]
    end

    subgraph "Pipeline de requisição"
        MW["Middleware\n(antes de tudo)"]
        GD["Guard\n(autenticação)"]
        PP["Pipe\n(validação)"]
        IT["Interceptor\n(transação, logging)"]
        FT["Filter\n(tratamento de erros)"]
    end

    MOD --> CTRL
    MOD --> PROV
    CTRL -.-> PROV

    MW --> GD --> PP --> CTRL
    CTRL --> IT
    IT -.-> FT

    style MOD fill:#e8a838,stroke:#b07c1e,color:#fff
    style CTRL fill:#4a90d9,stroke:#2c5f8a,color:#fff
    style PROV fill:#50b86c,stroke:#3a8a50,color:#fff
```

| Conceito | O que é | Neste projeto |
|----------|---------|---------------|
| **Module** | Unidade organizacional que agrupa controllers e providers. `AppModule` é a raiz, e cada módulo de feature tem seu próprio module. | `AppModule` importa todos os módulos. Cada módulo (ex.: `CampusModule`) registra seus handlers, repositórios e controllers. |
| **Controller** | Classe que recebe requisições HTTP e delega para providers. Usa decorators como `@Controller('/path')`, `@Get()`, `@Post()`, `@Body()`, `@Param()`. | Controllers ficam em `presentation.rest/`. Delegam para command/query handlers — **nunca** contêm lógica de negócio. |
| **Provider** | Qualquer classe injetável no container de DI. Inclui services, handlers, repositórios, configs. | Handlers (`CampusCreateCommandHandlerImpl`), repositórios (`CampusTypeormRepository`), permission checkers — todos são providers. |
| **Resolver** | Equivalente ao Controller, mas para GraphQL. Usa `@Resolver()`, `@Query()`, `@Mutation()`. | Resolvers ficam em `presentation.graphql/`. Reutilizam os mesmos handlers do REST. |

#### Pipeline de uma requisição HTTP

Quando uma requisição chega ao NestJS, ela não vai direto para o controller — ela passa por uma "esteira" de etapas, onde cada etapa tem um papel específico. Pense como uma linha de montagem: cada estação verifica ou transforma algo antes de passar adiante.

As etapas dessa esteira são:

- **Middleware** — código que executa antes de tudo. Pode modificar a requisição ou resposta. Exemplo: adicionar um ID de rastreamento.
- **Guard** (guarda) — decide se a requisição pode prosseguir. É onde a autenticação acontece. Se o token for inválido, a requisição para aqui.
- **Pipe** (tubo/filtro) — transforma e/ou valida os dados de entrada. Se o body da requisição estiver malformado, a requisição é rejeitada aqui.
- **Interceptor** (interceptador) — envolve a execução do handler. Pode agir antes e depois da lógica principal. Usado para transações e logging.
- **Filter** (filtro de exceção) — captura erros que ocorreram em qualquer etapa e formata uma resposta de erro padronizada.

Visualmente:

```mermaid
graph LR
    REQ["Requisição HTTP"] --> MW["Middleware\nCorrelation ID"]
    MW --> GD["Guard\nExtrai Bearer token\ne valida JWT"]
    GD --> PP["Pipe\nZodGlobalValidationPipe\nvalida body/params"]
    PP --> CTRL["Controller\nDelega para handler"]
    CTRL --> INT["Interceptor\nTransactionInterceptor\nabre transação"]
    INT --> HANDLER["Handler\nexecuta lógica"]
    HANDLER --> INT2["Interceptor\ncommit ou rollback"]
    INT2 --> RESP["Resposta HTTP"]

    HANDLER -.-> |"erro"| FT["Filter\nApplicationErrorFilter\nformata erro HTTP"]
    FT --> RESP

    style REQ fill:#4a90d9,stroke:#2c5f8a,color:#fff,text-align:left
    style MW text-align:left
    style GD text-align:left
    style PP text-align:left
    style CTRL fill:#7b68ee,stroke:#5a4db0,color:#fff,text-align:left
    style INT text-align:left
    style HANDLER fill:#e8a838,stroke:#b07c1e,color:#fff,text-align:left
    style INT2 text-align:left
    style RESP fill:#50b86c,stroke:#3a8a50,color:#fff,text-align:left
    style FT text-align:left
```

| Etapa | Papel | Exemplo neste projeto |
|-------|-------|-----------------------|
| **Middleware** | Executa antes de tudo. Pode modificar request/response. | `correlationIdMiddleware` — gera um ID único por requisição para rastreamento em logs (`src/infrastructure.logging/`). |
| **Guard** | Decide se a requisição pode prosseguir (autenticação). Retorna `true`/`false`. | Valida o Bearer token via JWKS (ou mock token em dev) e popula o `RequestActor` (`src/server/nest/auth/`). |
| **Pipe** | Transforma e/ou valida dados de entrada (body, params, query). | `ZodGlobalValidationPipe` — valida o body contra o `static schema` do DTO. Se inválido, retorna 400 (`src/shared/validation/zod-global-validation.pipe.ts`). |
| **Controller** | Recebe a requisição já validada, extrai o ator (`@AccessContextHttp()`) e delega para o handler. | `CampusRestController.create()` chama `campusCreateCommandHandler.execute()`. |
| **Interceptor** | Envolve a execução do handler (antes e depois). | `TransactionInterceptor` — abre uma transação antes do handler e faz commit/rollback após (`src/server/nest/interceptors/transaction.interceptor.ts`). |
| **Filter** | Captura exceções e formata a resposta de erro. | `ApplicationErrorFilter` — converte `ForbiddenError` em HTTP 403, `ValidationError` em 422 com detalhes por campo (`src/server/nest/filters/`). |

#### Dependency Injection no NestJS

**Dependency Injection** (DI — Injeção de Dependência) é um padrão onde uma classe **não cria** suas dependências — ela apenas declara "preciso de X" e o framework fornece X automaticamente. Isso é fundamental para a arquitetura hexagonal: o handler diz "preciso de um repositório" sem saber se é PostgreSQL, memória ou qualquer outra coisa.

O NestJS resolve dependências automaticamente. Você declara o que precisa no constructor, e o framework injeta:

```typescript
// O NestJS vê que o constructor precisa de ICampusRepository
// e automaticamente injeta a classe registrada para esse Symbol
constructor(
  @Inject(ICampusRepository) private readonly repo: ICampusRepository,
) {}
```

Neste projeto, usamos **Symbols** como tokens de injeção. Um **Symbol** no TypeScript é um identificador único e imutável — como um número de CPF, que garante que nunca haverá confusão entre duas coisas com o mesmo nome. Usamos Symbols em vez de classes porque TypeScript não emite interfaces em tempo de execução — o Symbol é a referência concreta que o container usa para saber qual implementação entregar:

- `Symbol("ICampusRepository")` — token de injeção (definido no domínio)
- `@Dep(token)` — solicita a injeção de uma dependência (wrapper para `@Inject`)
- `@Impl()` — registra uma classe como provider injetável (wrapper para `@Injectable`)
- `@Inject(token)` — solicita a injeção da implementação registrada

### As camadas em detalhe

#### Camada de Domínio (`src/domain/`)

A camada mais interna e mais protegida. Contém a **lógica de negócio pura** — sem dependência de frameworks, bancos de dados ou protocolos.

```mermaid
graph TD
    subgraph "src/domain/"
        ENT["Entidades\nCampus, Turma, Diario..."]
        SCH["Schemas Zod\nCampusSchema, CampusCreateSchema..."]
        ABS["Abstrações\nIRepositoryCreate, IRepositoryFindAll\nIPermissionChecker, IAccessContext"]
        SCA["Scalars\nIdUuid, IdNumeric\nScalarDateTimeString"]
        ERR["Erros\nEntityValidationError\nBusinessRuleViolationError"]
        DI["Dependency Injection\nDep\nImpl"]
    end

    ENT --> SCH
    ENT --> SCA
    ENT --> ERR

    style ENT fill:#e8a838,stroke:#b07c1e,color:#fff
    style ABS fill:#e8a838,stroke:#b07c1e,color:#fff
```

**O que contém:**
- **Entidades** — classes com constructor privado, factory methods (`create`, `load`, `update`) e validação Zod interna.
- **Schemas Zod** — definem a forma dos dados. `EntitySchema`, `CreateSchema` (sem id/datas), `UpdateSchema` (parcial).
- **Abstrações** — interfaces que definem contratos: `IRepositoryCreate<T>`, `IRepositoryFindAll<T>`, `IPermissionChecker`, `IAccessContext`.
- **Scalars** — type aliases semânticos: `IdUuid` em vez de `string`, `ScalarDateTimeString` em vez de `string`.
- **Erros de domínio** — `EntityValidationError`, `BusinessRuleViolationError`, `InvalidStateError`, `InvariantViolationError` (em `src/domain/errors/`).
- **DI decorators** — `Dep`, `Impl` para registrar no container.

**Regra de ouro:** o domínio **nunca** importa de `infrastructure.*`, `server/`, ou qualquer framework. Ele define _o que_ precisa, não _como_ é feito.

Para entender como os identificadores das entidades funcionam neste projeto, veja o conceito de UUID v7:

### UUID v7

Um **UUID** (Universally Unique Identifier) é um identificador de 128 bits que é único no universo — como um CPF para cada registro no banco, mas gerado automaticamente sem coordenação central.

```mermaid
graph LR
    subgraph "UUID v4 (aleatório)"
        V4["550e8400-e29b-41d4-a716-446655440000\n(bits totalmente aleatórios)"]
    end

    subgraph "UUID v7 (temporal + aleatório)"
        V7_T["01906b5a-c8e3\n(timestamp)"]
        V7_R["-7c14-b59a-2f1e4a3b7c9d\n(aleatório)"]
        V7_T --- V7_R
    end

    V7_T -.-> |"ordenação\ncronológica"| IDX["Índice B-tree\n(inserções sequenciais\n= menos fragmentação)"]

    style V7_T fill:#50b86c,stroke:#3a8a50,color:#fff
    style IDX fill:#336791,stroke:#1e3d5c,color:#fff
```

**Neste projeto**, usamos **UUID v7** (implementado via `uuid` v13, em `src/domain/entities/utils/generate-uuid-v7.ts`). A diferença da versão mais comum (v4, que é aleatória) é que o UUID v7 inclui um **componente temporal** — os primeiros bits codificam o timestamp de criação.

> **Para ir mais fundo:** a vantagem do UUID v7 sobre o v4 é a **ordenação cronológica natural**. Como os primeiros bits são o timestamp, UUIDs mais novos são lexicograficamente maiores que UUIDs mais antigos. Isso melhora significativamente a performance de **índices B-tree** no PostgreSQL — inserções são sequenciais em vez de aleatórias, reduzindo page splits e fragmentação. Na prática, tabelas com milhões de registros indexados por UUID v7 têm performance de leitura e escrita consideravelmente melhor que com UUID v4. A exceção neste projeto são `Estado` e `Cidade`, que usam IDs numéricos do IBGE.

#### Camada de Aplicação (`src/application/`)

Orquestra o domínio. Recebe uma intenção do usuário (command/query), verifica permissões e coordena a execução.

```mermaid
graph LR
    INPUT["input (unknown)"] --> HANDLER["Command/Query Handler"]
    AC["AccessContext\n(usuário)"] --> HANDLER
    HANDLER --> PC["Permission Checker\nensureCanCreate()"]
    HANDLER --> ENT["Entidade.create(input)\n(domínio)"]
    HANDLER --> REPO["Repository.create(entity)\n(interface do domínio)"]

    style INPUT text-align:left
    style AC text-align:left
    style PC text-align:left
    style HANDLER fill:#7b68ee,stroke:#5a4db0,color:#fff,text-align:left
    style ENT fill:#e8a838,stroke:#b07c1e,color:#fff,text-align:left
    style REPO fill:#50b86c,stroke:#3a8a50,color:#fff,text-align:left
```

**O que contém:**
- **Command handlers** — `CreateCommandHandler`, `UpdateCommandHandler`, `DeleteCommandHandler`. Recebem `accessContext` + `input`, verificam permissão, criam/atualizam entidade, chamam repositório.
- **Query handlers** — `FindOneQueryHandler`, `ListQueryHandler`. Delegam leitura para o repositório.
- **Permission checkers** — implementações de `IPermissionChecker`. Verificam se o usuário pode executar a operação.
- **Erros de aplicação** — `ResourceNotFoundError` (404), `ForbiddenError` (403), `UnauthorizedError` (401), `ValidationError` (422), `ConflictError` (409), `InternalError` (500), `ServiceUnavailableError` (503) — em `src/application/errors/`.
- **Helpers** — utilitários de imagem, paginação.

**Papel:** é a camada de "orquestração". Não contém regras de negócio (essas ficam no domínio) nem detalhes de persistência (esses ficam na infraestrutura).

#### Camada de Infraestrutura (`src/infrastructure.*/`)

Implementa os contratos do domínio com tecnologias concretas. Cada _concern_ tem seu próprio diretório `infrastructure.*`:

```mermaid
graph TD
    subgraph "Contratos (domínio)"
        IR["IRepositoryCreate"]
        IIP["IIdentityProvider"]
        IMB["IMessageBrokerService"]
        IS["IStorageService"]
    end

    subgraph "Implementações (infraestrutura)"
        TR["TypeORM Repository\ninfrastructure.database"]
        KC["Keycloak Service\ninfrastructure.identity-provider"]
        RMQ["Rascal Service\ninfrastructure.message-broker"]
        FS["Filesystem Service\ninfrastructure.storage"]
    end

    IR -.-> TR
    IIP -.-> KC
    IMB -.-> RMQ
    IS -.-> FS

    TR --> PG["PostgreSQL"]
    KC --> KCS["Keycloak Server"]
    RMQ --> RMQS["RabbitMQ Server"]
    FS --> DISK["Filesystem"]

    style IR fill:#e8a838,stroke:#b07c1e,color:#fff,text-align:left
    style IIP text-align:left
    style IMB text-align:left
    style IS text-align:left
    style TR fill:#50b86c,stroke:#3a8a50,color:#fff,text-align:left
    style KC text-align:left
    style RMQ text-align:left
    style FS text-align:left
```

| Diretório | Tecnologia | O que implementa |
|-----------|-----------|-----------------|
| `infrastructure.database` | TypeORM + PostgreSQL | Repositórios, migrações (58 arquivos), paginação, connection proxy (transações) |
| `infrastructure.identity-provider` | Keycloak + JWKS | Validação de tokens, obtenção de info do usuário, admin client |
| `infrastructure.message-broker` | RabbitMQ via Rascal | Publicação e consumo de mensagens (filas de geração de horário) |
| `infrastructure.storage` | Filesystem + Sharp | Upload, armazenamento e redimensionamento de imagens/arquivos |
| `infrastructure.config` | NestJS ConfigModule | Leitura de variáveis de ambiente, opções de runtime, auth, database, broker |
| `infrastructure.graphql` | Apollo Server | Configuração do GraphQL, DTOs base, cache LRU |
| `infrastructure.logging` | Middleware customizado | Correlation ID para rastreamento de requisições |
| `infrastructure.authorization` | Implementações locais | Permission checkers concretos |
| `infrastructure.timetable-generator` | Contratos de mensagem | Tipos e comandos para geração de horários |
| `infrastructure.dependency-injection` | NestJS DI | Configuração do container de injeção de dependência |

**Papel:** é a única camada que "sabe" qual banco de dados, qual provedor de auth, ou qual broker está sendo usado. Se trocar PostgreSQL por MySQL, apenas `infrastructure.database` muda.

Para entender como a comunicação assíncrona funciona na camada de infraestrutura, veja o conceito de message broker:

### Message broker (RabbitMQ)

Um **message broker** é um intermediário de mensagens assíncronas entre serviços. É como um correio: um serviço deposita uma carta (mensagem) na caixa postal (fila) e outro serviço retira quando estiver pronto — os dois não precisam estar online ao mesmo tempo.

```mermaid
graph LR
    subgraph "Produtor"
        P["Management Service\n(publica mensagem)"]
    end

    subgraph "RabbitMQ (broker)"
        EX["Exchange\n(roteador)"]
        Q1["Fila request\ndev.timetable_generate.request"]
        Q2["Fila response\ndev.timetable_generate.response"]
        EX --> Q1
    end

    subgraph "Consumidor"
        C["Timetable Generator\n(processa e responde)"]
    end

    P -- "publica" --> EX
    Q1 -- "entrega" --> C
    C -- "responde" --> Q2
    Q2 -- "entrega resposta" --> P

    style P fill:#4a90d9,stroke:#2c5f8a,color:#fff
    style EX fill:#ff6600,stroke:#b34700,color:#fff
    style Q1 fill:#ff6600,stroke:#b34700,color:#fff
    style Q2 fill:#ff6600,stroke:#b34700,color:#fff
    style C fill:#50b86c,stroke:#3a8a50,color:#fff
```

**Dois padrões de comunicação:**

```mermaid
graph TD
    subgraph "Padrão 1: RPC (Request/Response)"
        RPC_P["Management Service"] -- "publica request" --> RPC_Q1["Fila request"]
        RPC_Q1 --> RPC_C["Timetable Generator"]
        RPC_C -- "publica response" --> RPC_Q2["Fila response"]
        RPC_Q2 --> RPC_P
        RPC_P -.-> |"espera com\ntimeout (60s)"| RPC_P
    end

    subgraph "Padrão 2: Fire-and-Forget"
        FF_P["Management Service"] -- "publica\n(não espera)" --> FF_Q["Fila request"]
        FF_Q --> FF_C["Timetable Generator"]
    end

    style RPC_P fill:#4a90d9,stroke:#2c5f8a,color:#fff
    style FF_P fill:#4a90d9,stroke:#2c5f8a,color:#fff
```

**Neste projeto**, o [RabbitMQ](https://www.rabbitmq.com/) é usado via biblioteca [Rascal](https://github.com/guidesmiths/rascal) v21 para **geração automática de horários**. O Management Service publica uma requisição na fila `dev.timetable_generate.request` e consome a resposta de `dev.timetable_generate.response` quando o Timetable Generator (serviço externo) completar o processamento. A interface `IMessageBrokerService` está em `src/domain/abstractions/message-broker/`.

> **Para ir mais fundo:** o Rascal é um wrapper sobre AMQP que adiciona gerenciamento de conexão, retry e configuração declarativa. O projeto implementa dois padrões: **RPC** (request/response — publica e espera resposta com timeout) e **fire-and-forget** (publica sem esperar). As filas são configuráveis via variáveis `MESSAGE_BROKER_QUEUE_TIMETABLE_REQUEST` e `MESSAGE_BROKER_QUEUE_TIMETABLE_RESPONSE`. A UI do RabbitMQ está disponível em `http://localhost:15672` (admin/admin).

#### Camada de Apresentação (`src/modules/*/presentation.*/`)

Traduz protocolos externos (HTTP, GraphQL) em chamadas para a camada de aplicação e formata as respostas.

```mermaid
graph LR
    subgraph "REST (presentation.rest/)"
        CTRL["Controller\n@Controller('/path')\n@Post, @Get,\n@Patch, @Delete"]
        DTO_IN["DTO de entrada\nstatic schema (Zod)"]
        DTO_OUT["DTO de saída\nSwagger decorators"]
    end

    subgraph "GraphQL (presentation.graphql/)"
        RES["Resolver\n@Resolver\n@Query, @Mutation"]
        GQL_DTO["GraphQL DTO\n@ObjectType\n@Field"]
    end

    CTRL --> HANDLER["Handler\n(aplicação)"]
    RES --> HANDLER

    style CTRL fill:#4a90d9,stroke:#2c5f8a,color:#fff,text-align:left
    style RES fill:#4a90d9,stroke:#2c5f8a,color:#fff,text-align:left
    style HANDLER fill:#7b68ee,stroke:#5a4db0,color:#fff,text-align:left
    style DTO_IN fill:none,stroke:none,text-align:left
    style DTO_OUT fill:none,stroke:none,text-align:left
    style GQL_DTO fill:none,stroke:none,text-align:left
```

**O que contém:**
- **Controllers REST** — recebem HTTP, validam DTO (via Zod pipe), extraem `AccessContext`, delegam para handler. Sempre com `@ApiTags` e `@ApiOperation` para documentação Swagger.
- **Importação em lote** — o módulo de usuários expõe `POST /usuarios/importar/csv` para upload de CSV (`multipart/form-data`), criando usuários com o campo `E-mail Pessoal` e sem exigir senha inicial.
- **Resolvers GraphQL** — equivalente ao controller, mas para queries/mutations GraphQL. Reutilizam os mesmos handlers.
- **DTOs de entrada** — classes com `static schema` (Zod) para validação automática. O schema é reutilizado do domínio.
- **DTOs de saída** — definem a forma da resposta (REST com tipos TypeScript, GraphQL com `@ObjectType`/`@Field`).
- **Mappers** — convertem entre formatos de domínio e apresentação.

**Regra:** a apresentação **nunca** acessa o banco diretamente. Ela sempre delega para handlers da aplicação.

Para entender como dados são transportados entre camadas na apresentação, veja o conceito de DTO:

### DTO (Data Transfer Object)

Um **DTO** é um objeto que existe apenas para **transportar dados** entre camadas — ele não contém lógica de negócio. Pense como um formulário padronizado: define quais campos existem e quais são obrigatórios, mas não processa nada.

```mermaid
graph LR
    CLIENT["Cliente\n(front-end)"] -- "JSON de entrada\n{nomeFantasia, cnpj}" --> DTO_IN["DTO de Entrada\nCampusCreateInputRestDto\n+ static schema (Zod)"]
    DTO_IN -- "dados validados" --> HANDLER["Handler"]
    HANDLER -- "resultado" --> DTO_OUT["DTO de Saída\nCampusFindOneOutputRestDto\n{\n  id, nomeFantasia,\n  dateCreated...\n}"]
    DTO_OUT -- "JSON de resposta" --> CLIENT

    style CLIENT text-align:left
    style DTO_IN fill:#4a90d9,stroke:#2c5f8a,color:#fff,text-align:left
    style DTO_OUT fill:#50b86c,stroke:#3a8a50,color:#fff,text-align:left
    style HANDLER fill:#7b68ee,stroke:#5a4db0,color:#fff,text-align:left
```

**Neste projeto**, existem DTOs de **entrada** (o que o cliente envia) e DTOs de **saída** (o que a API retorna). Os DTOs de entrada carregam um `static schema` Zod que é usado automaticamente pelo `ZodGlobalValidationPipe` para validar a requisição antes que ela chegue ao controller.

**Exemplo concreto** — o que o cliente envia vs. o que recebe ao criar um campus:

```mermaid
graph TD
    subgraph "Entrada (CampusCreateInputRestDto)"
        IN["nomeFantasia: 'IFRO'\nrazaoSocial: 'Instituto Federal'\napelido: 'Ji-Paraná'\ncnpj: '10817343000195'\nendereco: {\n  id: 'uuid-...'\n}"]
    end

    PIPE["ZodGlobalValidationPipe\nvalida com CampusCreateSchema"]

    subgraph "Saída (CampusFindOneQueryResult)"
        OUT["id: '019...' (UUID v7 gerado)\nnomeFantasia: 'IFRO'\nrazaoSocial: 'Instituto Federal'\napelido: 'Ji-Paraná'\ncnpj: '10817343000195'\nendereco: {\n  id, cep, cidade...\n}\ndateCreated: '2026-03-22T...'\ndateUpdated: '2026-03-22T...'"]
    end

    IN --> PIPE --> |"válido"| OUT
    PIPE -.-> |"inválido"| ERR["400 Bad Request\n{\n  field: 'cnpj',\n  message: 'cnpj é obrigatório'\n}"]

    style IN fill:#4a90d9,stroke:#2c5f8a,color:#fff,text-align:left
    style OUT fill:#50b86c,stroke:#3a8a50,color:#fff,text-align:left
    style PIPE text-align:left
    style ERR fill:#e74c3c,stroke:#c0392b,color:#fff,text-align:left
```

```typescript
// src/modules/ambientes/campus/presentation.rest/campus.rest.dto.ts (exemplo simplificado)

export class CampusCreateInputRestDto {
  static schema = CampusCreateSchema;  // Schema Zod reutilizado do domínio

  nomeFantasia!: string;
  razaoSocial!: string;
  apelido!: string;
  cnpj!: string;
  endereco!: { ... };
}
```

> **Para ir mais fundo:** a separação entre DTOs de entrada e saída segue o princípio de que o formato dos dados que o cliente **envia** raramente é idêntico ao que ele **recebe**. Na criação de um campus, o cliente envia `nomeFantasia` e `cnpj`, mas a resposta inclui também `id`, `dateCreated`, `endereco` completo com cidade e estado. O `static schema` no DTO é uma convenção deste projeto — o `ZodGlobalValidationPipe` (em `src/shared/validation/zod-global-validation.pipe.ts`) verifica se o `metatype` do parâmetro tem essa propriedade e, se tiver, executa `schema.safeParse(value)` para validar os dados de entrada automaticamente.

### REST e GraphQL

A camada de apresentação oferece duas interfaces para consumo da API:

**REST** é um estilo de API onde cada recurso tem um endereço fixo (URL) e operações são mapeadas para verbos HTTP: GET (ler), POST (criar), PATCH (atualizar), DELETE (excluir). A resposta sempre traz todos os campos do recurso, mesmo os que você não precisa. É como pedir um prato fixo no restaurante — você recebe tudo que vem, mesmo o que não quer.

**GraphQL** é uma linguagem de consulta onde o cliente diz **exatamente** quais campos quer e recebe só aquilo. É como pedir à la carte — você especifica cada item. Com REST, se um front-end precisa de dados de 3 endpoints, faz 3 requisições; com GraphQL faz 1 requisição pedindo tudo junto. Em GraphQL, **query** é leitura (equivale a GET) e **mutation** é escrita (equivale a POST/PUT/DELETE).

```mermaid
graph LR
    subgraph "REST — 3 requisições"
        R1["GET /api/campi/1\n→ {\n    id, nomeFantasia,\n    razaoSocial, apelido,\n    cnpj, endereco,\n    dateCreated...\n  }"]
        R2["GET /api/blocos?campus.id=1\n→ [todos os campos de cada bloco]"]
        R3["GET /api/turmas?campus.id=1\n→ [todos os campos de cada turma]"]
    end

    subgraph "GraphQL — 1 requisição"
        GQL["query {\n  campusFindOne(id: '1') {\n    nomeFantasia\n    blocos { nome }\n    cursos {\n      turmas { periodo }\n    }\n  }\n}\n→ só os campos pedidos"]
    end

    style R1 fill:#4a90d9,stroke:#2c5f8a,color:#fff,text-align:left
    style R2 fill:#4a90d9,stroke:#2c5f8a,color:#fff,text-align:left
    style R3 fill:#4a90d9,stroke:#2c5f8a,color:#fff,text-align:left
    style GQL fill:#e535ab,stroke:#b0297f,color:#fff,text-align:left
```

**Neste projeto**, a API oferece **ambos**. REST é a interface principal, com documentação Swagger interativa. GraphQL é uma alternativa flexível para front-ends que precisam de consultas compostas. A abordagem é **code-first**: em vez de escrever arquivos `.graphql`, o schema é gerado automaticamente a partir de classes TypeScript decoradas com `@ObjectType()` e `@Field()`. Ambas as interfaces reutilizam os **mesmos command/query handlers** — a lógica de negócio, validação e autorização são idênticas.

**Configuração do GraphQL** (em `src/infrastructure.graphql/graphql.module.ts`):

| Configuração | Valor |
|-------------|-------|
| **Server** | Apollo Server v5.4 com driver NestJS |
| **Endpoint** | `http://localhost:3701/api/graphql` |
| **Playground** | GraphiQL habilitado |
| **Introspection** | habilitada |
| **Cache** | LRU em memória (100 MB, TTL de 5 minutos) |
| **Schema** | code-first (`autoSchemaFile: true`) |

> **Para ir mais fundo:** manter REST e GraphQL duplica a camada de apresentação (DTOs, mappers) mas **não** duplica lógica — ambos delegam para os mesmos handlers. O overhead é aceitável porque cada interface serve um propósito diferente: REST para integrações simples e documentação automática, GraphQL para front-ends com necessidades de dados complexas. O projeto **não** usa DataLoader para resolver o problema N+1 do GraphQL — queries que buscam relações fazem JOINs no repositório TypeORM. Módulos que são apenas REST (`autenticacao`, `arquivo`, módulos de `estagio`, `gerar-horario`) não têm resolvers GraphQL.

### Como as camadas conversam

Visão completa de como uma requisição de criação flui entre todas as camadas, com os artefatos concretos:

```mermaid
graph TD
    subgraph "Apresentação"
        REQ["POST /api/campi\n+ Bearer token\n+ JSON body"]
        MW["Middleware:\ncorrelationIdMiddleware\n→ gera requestId"]
        GD["Guard:\nextrai token →\nRequestActor"]
        PP["Pipe:\nZodGlobalValidationPipe\n→ valida body com\nCampusCreateInputRestDto\n  .schema"]
        CTRL["CampusRestController\n  .create()\n→ @AccessContextHttp() ac,\n  @Body() dto"]
    end

    subgraph "Aplicação"
        INT["Interceptor:\nTransactionInterceptor\n→ abre transação"]
        HANDLER["CampusCreateCommand\n  HandlerImpl.execute()\n→ recebe accessContext\n  + dto"]
        PERM["CampusPermissionChecker\n→ ensureCanCreate(\n    accessContext\n  )"]
    end

    subgraph "Domínio"
        ENT["Campus.create(input)\n→ zodValidate,\n  gera UUID v7"]
    end

    subgraph "Infraestrutura"
        REPO["CampusTypeormRepository\n  .create()\n→ mapeia para TypeORM\n  entity e salva"]
        DB["PostgreSQL\n→ INSERT INTO campus"]
    end

    REQ --> MW --> GD --> PP --> CTRL
    CTRL --> INT --> HANDLER
    HANDLER --> PERM
    HANDLER --> ENT
    HANDLER --> REPO
    REPO --> DB

    DB --> |"commit"| INT
    INT --> |"201 Created"| REQ

    style REQ fill:#4a90d9,stroke:#2c5f8a,color:#fff,text-align:left
    style MW text-align:left
    style GD text-align:left
    style PP text-align:left
    style CTRL text-align:left
    style INT text-align:left
    style ENT fill:#e8a838,stroke:#b07c1e,color:#fff,text-align:left
    style HANDLER fill:#7b68ee,stroke:#5a4db0,color:#fff,text-align:left
    style PERM text-align:left
    style REPO fill:#50b86c,stroke:#3a8a50,color:#fff,text-align:left
    style DB text-align:left
```

**Resumo do fluxo:**

1. **Requisição chega** → Middleware adiciona Correlation ID para logs.
2. **Guard valida token** → extrai `RequestActor` (ou rejeita com 401).
3. **Pipe valida body** → executa o Zod schema do DTO (ou rejeita com 400).
4. **Controller delega** → cria `AccessContext` e chama o handler.
5. **Interceptor abre transação** → todas as operações de banco participam dela.
6. **Handler verifica permissão** → chama `ensureCanCreate` (ou lança 403).
7. **Handler cria entidade** → `Campus.create()` valida com Zod e gera UUID v7.
8. **Handler persiste** → chama o repositório (que internamente usa TypeORM).
9. **Interceptor faz commit** → se tudo deu certo, commit. Se houve erro, rollback.
10. **Resposta retorna** → 201 Created com a entidade criada.

**Regra de comunicação:** cada camada só conhece a camada imediatamente abaixo dela (via interfaces). A apresentação não sabe que o banco é PostgreSQL. O handler não sabe que o repositório usa TypeORM. O domínio não sabe que existe NestJS.

### Fluxo de uma requisição

Para entender como as camadas se conectam na prática, veja o caminho completo de uma requisição HTTP:

```mermaid
sequenceDiagram
    participant C as Cliente
    participant CT as Controller / Resolver
    participant H as Command / Query Handler
    participant PC as Permission Checker
    participant E as Entidade de Domínio
    participant R as Repositório (TypeORM)
    participant DB as PostgreSQL

    C->>CT: POST /api/campi (com Bearer token)
    CT->>CT: Valida DTO (Zod) e extrai AccessContext
    CT->>H: execute(accessContext, dto)
    H->>PC: ensureCanCreate(accessContext, { dto })
    PC-->>H: OK (ou ForbiddenError)
    H->>E: Campus.create(input)
    E->>E: Valida com Zod, gera UUID v7
    H->>R: create(campus)
    R->>DB: INSERT INTO campus ...
    DB-->>R: OK
    R-->>H: { id }
    H-->>CT: CampusFindOneQueryResult
    CT-->>C: 201 Created
```

Esse fluxo se repete para todos os módulos. Queries (`FindById`, `FindAll`) seguem o mesmo padrão, mas sem escrita no banco. Atualmente queries não verificam permissões, porém está no roadmap a adição de filtragem de resultados com base nas permissões do usuário.

### Estrutura de diretórios

```
management-service/
├── .devcontainer/          # Configuração do Dev Container (VS Code / WebStorm)
├── .docker/                # Containerfile e compose.yml
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
modules/<grupo>/<nome-do-modulo>/
├── domain/
│   ├── authorization/      # Contrato de permissões (IPermissionChecker)
│   ├── commands/           # Definições de commands e interfaces de handlers
│   ├── queries/            # Definições de queries, schemas e result types
│   ├── repositories/       # Contratos de repositório (Symbol + type)
│   └── shared/             # Utilitários de domínio, input refs
├── application/
│   ├── authorization/      # Implementação do permission checker
│   ├── commands/           # Command handlers + testes
│   └── queries/            # Query handlers + testes
├── infrastructure.database/
│   └── typeorm/            # Entidades TypeORM
├── presentation.rest/      # Controllers REST, DTOs, mappers (Swagger)
└── presentation.graphql/   # Resolvers GraphQL, DTOs, mappers
```

### Diagrama de entidades e relacionamentos

As principais entidades e seus relacionamentos (baseado nas entidades TypeORM reais em `src/modules/*/infrastructure.database/typeorm/`):

```mermaid
erDiagram
    Estado ||--o{ Cidade : "contém"
    Cidade ||--o{ Endereco : "localiza"
    Endereco ||--o{ Campus : "endereça"
    Campus ||--o{ Bloco : "contém"
    Bloco ||--o{ Ambiente : "contém"
    Campus ||--o{ Perfil : "vincula"
    Usuario ||--o{ Perfil : "possui"
    Usuario ||--o{ Notificacao : "recebe"

    Modalidade ||--o{ OfertaFormacao : "define tipo"
    OfertaFormacao ||--o{ OfertaFormacaoNivelFormacao : "associa"
    NivelFormacao ||--o{ OfertaFormacaoNivelFormacao : "associa"
    OfertaFormacao ||--o{ OfertaFormacaoPeriodo : "contém períodos"
    OfertaFormacaoPeriodo ||--o{ OfertaFormacaoPeriodoEtapa : "contém etapas"

    Curso ||--o{ Turma : "oferece"
    Ambiente }o--o| Turma : "ambiente padrão"
    Turma ||--o{ Diario : "possui"
    Disciplina ||--o{ Diario : "vincula"
    CalendarioLetivo ||--o{ Diario : "vincula"
    Diario ||--o{ DiarioProfessor : "associa professores"
    Usuario ||--o{ DiarioProfessor : "leciona"
    Diario ||--o{ DiarioPreferenciaAgrupamento : "configura"

    HorarioAulaConfiguracao ||--o{ HorarioAula : "define"
    Turma ||--o{ TurmaDisponibilidadeConfiguracao : "configura"

    Empresa ||--o{ ResponsavelEmpresa : "possui"
    Empresa ||--o{ Estagio : "oferece"
    Estagiario ||--o{ Estagio : "participa"
    Estagio ||--o{ HorarioEstagio : "define horários"

    Imagem ||--o{ ImagemArquivo : "variações"
    Arquivo ||--o{ ImagemArquivo : "armazena"
```

> **Nota:** este diagrama mostra os relacionamentos principais. Entidades de agendamento de calendário (`calendario-agendamento-*`) e geração de horários (`gerar-horario-*`) possuem tabelas junction adicionais não representadas para manter a legibilidade.

<!--
Source of Trust
commit_hash: ebb2cb05b8e21e5d4aae2cfcf0429805ebc7f344
verified_at: 2026-03-23T12:30:00Z
source_patterns:
  - src/domain/**/*.ts
  - src/application/**/*.ts
  - src/infrastructure.*/**/*.ts
  - src/modules/*/domain/**/*.ts
  - src/modules/*/application/**/*.ts
  - src/modules/*/infrastructure.database/**/*.ts
  - src/modules/*/presentation.rest/**/*.ts
  - src/modules/*/presentation.graphql/**/*.ts
  - src/server/nest/**/*.ts
confidence_scope: Arquitetura hexagonal (4 camadas), pipeline NestJS (Middleware → Guard → Pipe → Controller → Interceptor → Filter), DI via Symbols, estrutura de diretórios, 38 módulos organizados por área, diagrama ER
-->

---

## Principais abstrações e padrões

Agora que você entende a arquitetura em alto nível (as camadas e como elas se comunicam), esta seção mergulha nos **padrões de código concretos** — as "peças de Lego" que se repetem em todos os módulos. Se você vai contribuir com código, esses padrões são o que você vai encontrar e reproduzir no dia a dia.

### Entidade de domínio

Uma **entidade de domínio** é uma classe TypeScript que representa um conceito do mundo real (como um Campus, uma Turma ou um Diário). Diferente de uma classe comum, ela protege seus dados: você não cria uma instância diretamente com `new Campus()` — em vez disso, usa métodos especiais chamados **factory methods** (`create` para novos registros, `load` para reconstituir do banco, `update` para modificar).

Toda entidade segue o mesmo padrão: constructor **privado** (só a própria classe pode se instanciar), factory methods estáticos e validação Zod em cada operação.

```mermaid
graph TD
    subgraph "Campus.create — nova entidade"
        C1["dados brutos (unknown)"]
        C2["zodValidate com CampusCreateSchema"]
        C3["generateUuidV7 — gera id"]
        C4["getNowISO — gera timestamps"]
        C5["Instância Campus pronta"]
        C1 --> C2 --> C3 --> C4 --> C5
    end

    subgraph "Campus.load — reconstruir do banco"
        L1["dados do banco"]
        L2["zodValidate com CampusSchema completo"]
        L3["Instância Campus reconstituída"]
        L1 --> L2 --> L3
    end

    subgraph "campus.update — atualização parcial"
        U1["dados parciais"]
        U2["zodValidate com CampusUpdateSchema"]
        U3["Aplica campos presentes"]
        U4["zodValidate com CampusSchema completo\n(rede de segurança final)"]
        U5["Instância Campus atualizada"]
        U1 --> U2 --> U3 --> U4 --> U5
    end

    C5 -- "repository.create" --> DB["PostgreSQL"]
    L3 -- "já existia no banco" --> DB
    U5 -- "repository.update" --> DB

    style C5 fill:#50b86c,stroke:#3a8a50,color:#fff
    style L3 fill:#4a90d9,stroke:#2c5f8a,color:#fff
    style U5 fill:#e8a838,stroke:#b07c1e,color:#fff
    style DB fill:#336791,stroke:#1e3d5c,color:#fff
```

```typescript
// src/modules/ambientes/campus/domain/campus.ts
import type { z } from "zod";
import type { IdUuid, ScalarDateTimeString } from "@/domain/abstractions/scalars";
import { generateUuidV7 } from "@/domain/entities/utils/generate-uuid-v7";
import { zodValidate } from "@/shared/validation/index";
import { getNowISO } from "@/utils/date";
import { CampusCreateSchema, CampusSchema, CampusUpdateSchema } from "./campus.schemas";


export type ICampus = z.infer<typeof CampusSchema>;


export class Campus {
  static readonly entityName = "Campus";

  id!: IdUuid;
  nomeFantasia!: string;
  razaoSocial!: string;
  apelido!: string;
  cnpj!: string;
  endereco!: ICampus["endereco"];
  dateCreated!: ScalarDateTimeString;
  dateUpdated!: ScalarDateTimeString;
  dateDeleted!: ScalarDateTimeString | null;

  private constructor() {}

  static create(dados: unknown): Campus {
    const parsed = zodValidate(Campus.entityName, CampusCreateSchema, dados);
    const instance = new Campus();
    instance.id = generateUuidV7();
    instance.nomeFantasia = parsed.nomeFantasia;
    instance.razaoSocial = parsed.razaoSocial;
    instance.apelido = parsed.apelido;
    instance.cnpj = parsed.cnpj;
    instance.dateCreated = getNowISO();
    instance.dateUpdated = getNowISO();
    instance.dateDeleted = null;
    return instance;
  }

  static load(dados: unknown): Campus {
    const parsed = zodValidate(Campus.entityName, CampusSchema, dados);
    const instance = new Campus();
    // Atribui todos os campos do parsed
    instance.id = parsed.id;
    instance.nomeFantasia = parsed.nomeFantasia;
    // ...
    return instance;
  }

  update(dados: unknown): void {
    const parsed = zodValidate(Campus.entityName, CampusUpdateSchema, dados);
    if (parsed.nomeFantasia !== undefined) this.nomeFantasia = parsed.nomeFantasia;
    if (parsed.razaoSocial !== undefined) this.razaoSocial = parsed.razaoSocial;
    // ... demais campos opcionais
    this.dateUpdated = getNowISO();
    zodValidate(Campus.entityName, CampusSchema, this); // Validação final do estado completo
  }
}
```

**Padrões:**
- `create()` — recebe dados brutos (`unknown`), valida com `CampusCreateSchema`, gera UUID v7 e datas. Usado para novas entidades.
- `load()` — reconstrói uma entidade a partir de dados existentes (ex.: do banco). Valida com o schema completo.
- `update()` — aplica mudanças parciais. Ao final, revalida o estado completo da entidade para garantir consistência.
- Exceção: `Estado` e `Cidade` aceitam `id` no `create` (códigos IBGE).

### Schemas Zod do domínio

Cada entidade define seus schemas em um arquivo `*.schemas.ts`. Eles são a **fonte única de verdade** para a forma dos dados:

```mermaid
graph TD
    BASE["CampusSchema\n(schema completo)\n{id, nomeFantasia, razaoSocial,\ncnpj, endereco, dateCreated...}"]

    BASE --> CREATE["CampusCreateSchema\n= CampusSchema sem id e datas\n{nomeFantasia, razaoSocial,\ncnpj, endereco}"]
    BASE --> UPDATE["CampusUpdateSchema\n= CampusCreateSchema.partial()\n{nomeFantasia?, razaoSocial?,\ncnpj?, endereco?}"]

    CREATE --> FACTORY["Campus.create()\nzodValidate(CampusCreateSchema)"]
    UPDATE --> UPDATE_M["campus.update()\nzodValidate(CampusUpdateSchema)"]
    BASE --> LOAD["Campus.load()\nzodValidate(CampusSchema)"]
    BASE --> REVALIDATE["campus.update() final\nzodValidate(CampusSchema)\n(rede de segurança)"]

    style BASE fill:#e8a838,stroke:#b07c1e,color:#fff
    style CREATE fill:#4a90d9,stroke:#2c5f8a,color:#fff
    style UPDATE fill:#50b86c,stroke:#3a8a50,color:#fff
```

```typescript
// src/modules/ambientes/campus/domain/campus.schemas.ts
import { z } from "zod";
import { datedSchema, uuidSchema } from "@/shared/validation/schemas";
import { CampusFields } from "./campus.fields";


export const CampusSchema = z.object({
  id: uuidSchema,
  nomeFantasia: CampusFields.nomeFantasia.schema,
  razaoSocial: CampusFields.razaoSocial.schema,
  apelido: CampusFields.apelido.schema,
  cnpj: CampusFields.cnpj.schema,
  endereco: z.object({ id: uuidSchema, /* ... */ }).passthrough(),
}).merge(datedSchema);


export const CampusCreateSchema = z.object({
  nomeFantasia: CampusFields.nomeFantasia.schema,
  razaoSocial: CampusFields.razaoSocial.schema,
  apelido: CampusFields.apelido.schema,
  cnpj: CampusFields.cnpj.schema,
  endereco: CampusEnderecoRefSchema,
});


export const CampusUpdateSchema = z.object({
  nomeFantasia: CampusFields.nomeFantasia.schema.optional(),
  razaoSocial: CampusFields.razaoSocial.schema.optional(),
  apelido: CampusFields.apelido.schema.optional(),
  cnpj: CampusFields.cnpj.schema.optional(),
  endereco: CampusEnderecoRefSchema.optional(),
});
```

**Convenção:**
- `Schema` — schema completo da entidade (com id, datas).
- `CreateSchema` — sem id e datas (gerados automaticamente).
- `UpdateSchema` — todos os campos opcionais.
- Os schemas dos campos vêm do `CampusFields` (FieldMetadata) — garantindo que validação, Swagger e GraphQL compartilham a mesma definição.

### FieldMetadata e QueryFields

A classe `FieldMetadata` (em `src/domain/abstractions/fields/field-metadata.ts`) define **metadados de cada campo** de uma entidade uma única vez, e esses metadados são reutilizados automaticamente em Swagger, GraphQL e validação:

```mermaid
graph TD
    FM["CampusFields.nomeFantasia\n(FieldMetadata)\n{description, schema,\nnullable, defaultValue}"]

    FM --> ZOD[".schema\nz.string().min(1)\n→ validação Zod"]
    FM --> SWAGGER[".swaggerMetadata\n{description, required, type}\n→ Swagger docs"]
    FM --> GQL[".gqlMetadata\n{description, nullable}\n→ @Field() GraphQL"]

    subgraph "Consumidores"
        ZOD --> SCHEMA["CampusCreateSchema\nz.object({ nomeFantasia: field.schema })"]
        SWAGGER --> REST_DTO["CampusCreateInputRestDto\n@ApiProperty(field.swaggerMetadata)"]
        GQL --> GQL_DTO["CampusFindOneOutputGraphQlDto\n@Field(() => String, field.gqlMetadata)"]
    end

    style FM fill:#e8a838,stroke:#b07c1e,color:#fff
    style ZOD fill:#4a90d9,stroke:#2c5f8a,color:#fff
    style SWAGGER fill:#50b86c,stroke:#3a8a50,color:#fff
    style GQL fill:#e535ab,stroke:#b0297f,color:#fff
```

```typescript
// src/modules/ambientes/campus/domain/campus.fields.ts
import { z } from "zod";
import { createFieldMetadata } from "@/domain/abstractions";


export const CampusFields = {
  nomeFantasia: createFieldMetadata({
    description: "Nome fantasia do campus",
    schema: z.string().min(1, "nomeFantasia é obrigatório"),
  }),
  razaoSocial: createFieldMetadata({
    description: "Razao social do campus",
    schema: z.string().min(1, "razaoSocial é obrigatório"),
  }),
  cnpj: createFieldMetadata({
    description: "CNPJ do campus",
    schema: z.string().min(1, "cnpj é obrigatório")
      .transform((val) => val.replace(/\D/g, ""))
      .pipe(z.string().regex(/^\d{14}$/, "cnpj deve conter exatamente 14 dígitos")),
  }),
  // ...
};
```

O `FieldMetadata` expõe `.swaggerMetadata` (para decorators REST) e `.gqlMetadata` (para decorators GraphQL) automaticamente a partir de `description`, `nullable` e `defaultValue`.

### Interfaces de repositório

Repositórios são compostos de **interfaces granulares** via intersection types — em vez de uma interface monolítica, cada capacidade é definida separadamente (Interface Segregation Principle):

```mermaid
graph TD
    subgraph "Interfaces granulares (src/domain/abstractions/repositories/)"
        IC["IRepositoryCreate&lt;T&gt;\ncreate(data) → {id}"]
        IU["IRepositoryUpdate&lt;T&gt;\nupdate(id, data) → void"]
        ISD["IRepositorySoftDelete\nsoftDeleteById(id) → void"]
        IFA["IRepositoryFindAll&lt;T&gt;\nfindAll(ac, dto)"]
        IFB["IRepositoryFindById&lt;T&gt;\nfindById(ac, {id})"]
        IFBS["IRepositoryFindByIdSimple&lt;T&gt;\nfindByIdSimple(ac, id)"]
    end

    subgraph "Composição via intersection (&)"
        CAMPUS_REPO["ICampusRepository =\nIRepositoryCreate & IRepositoryUpdate &\nIRepositorySoftDelete & IRepositoryFindAll &\nIRepositoryFindById & IRepositoryFindByIdSimple"]
    end

    IC & IU & ISD & IFA & IFB & IFBS --> CAMPUS_REPO

    style CAMPUS_REPO fill:#e8a838,stroke:#b07c1e,color:#fff
    style IC fill:#4a90d9,stroke:#2c5f8a,color:#fff
    style IU fill:#4a90d9,stroke:#2c5f8a,color:#fff
```

```typescript
// src/domain/abstractions/repositories/repository-create.interface.ts

export interface IRepositoryCreate<DomainData> {
  create(data: Partial<PersistInput<DomainData>>): Promise<{ id: string | number }>;
}

// src/modules/ambientes/campus/domain/repositories/campus.repository.interface.ts

export const ICampusRepository = Symbol("ICampusRepository");


export type ICampusRepository = IRepositoryFindAll<CampusListQueryResult> &
  IRepositoryFindById<CampusFindOneQueryResult> &
  IRepositoryFindByIdSimple<CampusFindOneQueryResult> &
  IRepositoryCreate<ICampus> &
  IRepositoryUpdate<ICampus> &
  IRepositorySoftDelete;
```

**Interfaces disponíveis** (em `src/domain/abstractions/repositories/`):
- `IRepositoryCreate<T>` — `create(data)` → `{ id }`
- `IRepositoryUpdate<T>` — `update(id, data)` → `void`
- `IRepositorySoftDelete` — `softDeleteById(id)` → `void`
- `IRepositoryFindAll<T>` — `findAll(ac, dto)` → `T`
- `IRepositoryFindById<T>` — `findById(ac, { id })` → `T | null`
- `IRepositoryFindByIdSimple<T>` — `findByIdSimple(ac, id)` → `T | null`

O type `PersistInput<T>` converte relações em referências `{ id }` para desacoplar a persistência da forma completa da entidade.

### Mappers (mapeamento entre camadas)

**Mappers** são funções puras que **traduzem dados de um formato para outro** quando eles cruzam fronteiras entre camadas. Como a arquitetura hexagonal isola o domínio da infraestrutura, cada camada pode representar os mesmos dados de formas diferentes — por exemplo, o domínio armazena datas como strings ISO (`"2025-06-15T10:30:00.000Z"`) enquanto o TypeORM usa objetos `Date` do JavaScript. O mapper é quem faz essa conversão.

> **Analogia:** imagine que um hospital brasileiro recebe um paciente estrangeiro. O prontuário interno é em português, mas o paciente trouxe exames em inglês. O **mapper** é o tradutor que converte os exames para português (entrada) e traduz o diagnóstico de volta para inglês (saída) — sem alterar o conteúdo médico, apenas o formato.

O projeto possui mappers em **duas camadas**:

```mermaid
graph LR
    subgraph "Apresentação (REST/GraphQL)"
        DTO_IN["DTO de Entrada"]
        DTO_OUT["DTO de Saída"]
        PMAP["RestMapper / GraphqlMapper\n• findOneInputDtoToFindOneQuery.map(dto)\n• findOneQueryResultToOutputDto.map(queryResult)\n• listInputDtoToListQuery.map(dto)\n• listQueryResultToListOutputDto(queryResult)"]
    end

    subgraph "Infraestrutura (TypeORM)"
        ENTITY["TypeORM Entity\ndatas: Date\nrelações: Relation&lt;T&gt;"]
        IMAP["TypeormMapper\n• entityToFindOneQueryResult.map(entity)"]
    end

    subgraph "Domínio"
        DOMAIN["Entidade de Domínio\ndatas: ISO string\nrelações: { id }"]
        CMD["Command / Query Result"]
    end

    DTO_IN --> PMAP --> CMD
    CMD --> DOMAIN
    DOMAIN --> IMAP --> ENTITY
    ENTITY --> IMAP --> DOMAIN
    CMD --> PMAP --> DTO_OUT

    style DOMAIN fill:#27ae60,stroke:#1e8449,color:#fff
    style IMAP fill:#e67e22,stroke:#d35400,color:#fff
    style PMAP fill:#3498db,stroke:#2980b9,color:#fff
```

Todos os mappers são construídos com `createMapper<I, O>` de `src/shared/mapping/create-mapper.ts` — funções puras, síncronas, tipadas de ponta a ponta. Para mapeamento imperativo de campos individuais (filtros, paginação, input mapping), o projeto usa a DSL `into`:

```typescript
// into — DSL imperativa centrada no destino
into(query)
  .field("filter.id").from(dto, "filterId")   // rename camelCase → dot notation
  .field("page").default(1).from(dto)          // default se undefined/null
  .field("userId").required().from(auth);      // erro se ausente
```

#### Utilitários de mapeamento (`src/shared/mapping/create-mapper.ts`)

| Helper | Propósito |
|--------|-----------|
| `into(target)` | DSL imperativa para mapeamento de campos — `.from()`, `.field()`, `.transform()`, `.default()`, `.when()`, `.required()`, `.optional()` |
| `createMapper<I, O>(fn)` | Mapper unitário com `.map(input)` e `.mapArray(inputs)` |
| `createListMapper(DtoClass, itemMapper)` | Lista paginada — instancia DTO, repassa meta, mapeia data |
| `createPaginatedInputMapper(QueryClass, mapFilters)` | Input paginado — mapeia page/limit/search/sortBy via `into`, filtra via callback |

#### Mapper de infraestrutura (TypeORM Entity → Query Result)

Cada módulo define um mapper em `infrastructure.database/typeorm/{nome}.typeorm.mapper.ts`. O nome do
export descreve o fluxo **de onde → para onde**:

```typescript
// estado.typeorm.mapper.ts

export const entityToFindOneQueryResult = createMapper<EstadoEntity, EstadoFindOneQueryResult>(
  (entity) => {
    const queryResult = new EstadoFindOneQueryResult();

    into(queryResult).from(entity).field("id").field("nome").field("sigla");
    return queryResult;
  },
);
```

O barrel re-exporta via namespace (`
export * as EstadoTypeormMapper`) e o repositório usa como callback (`EstadoTypeormMapper.entityToFindOneQueryResult.map`).

#### Mapper de apresentação (DTO ↔ Command/Query)

Cada mapper de apresentação organiza exports em duas regiões ("Externa → Interna" e "Interna → Externa"). Os nomes dos exports seguem o padrão `origemToDestino`:

```typescript
import { createListMapper, createMapper, createPaginatedInputMapper, into } from "@/shared/mapping";

// Externa → Interna

export const findOneInputDtoToFindOneQuery = createMapper<...>((dto) => { ... });


export const listInputDtoToListQuery = createPaginatedInputMapper<...>(
  EstadoListQuery,
  (dto, query) => {

    into(query).field("filter.id").from(dto, "filter.id");
  },
);


export const createInputDtoToCreateCommand = createMapper<...>((dto) => { ... });

// Interna → Externa

export const findOneQueryResultToOutputDto = createMapper<
  EstadoFindOneQueryResult,
  EstadoFindOneOutputRestDto
>((queryResult) => ({ id: queryResult.id, nome: queryResult.nome, sigla: queryResult.sigla }));


export const listQueryResultToListOutputDto = createListMapper(
  EstadoListOutputRestDto,
  findOneQueryResultToOutputDto,
);
```

Controllers e resolvers importam via namespace e usam variáveis com nomes semânticos:
```typescript
import * as EstadoRestMapper from "./estado.rest.mapper";

// Query handler
const query = EstadoRestMapper.listInputDtoToListQuery.map(dto);
const queryResult = await this.listHandler.execute(accessContext, query);
return EstadoRestMapper.listQueryResultToListOutputDto(queryResult);

// Command handler
const command = ModalidadeRestMapper.createInputDtoToCreateCommand.map(dto);
const queryResult = await this.createHandler.execute(accessContext, command);
return ModalidadeRestMapper.findOneQueryResultToOutputDto.map(queryResult);
```

> **Para ir mais fundo:** a documentação completa do padrão de mapeamento (incluindo `into`, pipelines, transforms, convenções de nomenclatura e variáveis) está em [`.claude/docs/mapeamento.md`](.claude/docs/mapeamento.md).

### Command e Query Handlers

Handlers seguem contratos genéricos definidos em `src/domain/abstractions/operations/cqrs/`:

```mermaid
graph TD
    subgraph "Command Handler (escrita)"
        CMD_IN["execute(accessContext, dto)"]
        CMD_PERM["1. ensureCanCreate(ac)"]
        CMD_ENT["2. Campus.create(dto)"]
        CMD_REPO["3. repository.create(campus)"]
        CMD_FIND["4. repository.findById(id)"]
        CMD_OUT["5. retorna CampusFindOneQueryResult"]

        CMD_IN --> CMD_PERM --> CMD_ENT --> CMD_REPO --> CMD_FIND --> CMD_OUT
    end

    subgraph "Query Handler (leitura)"
        QRY_IN["execute(accessContext, {id})"]
        QRY_REPO["1. repository.findById(ac, {id})"]
        QRY_OUT["2. retorna resultado ou null"]

        QRY_IN --> QRY_REPO --> QRY_OUT
    end

    style CMD_IN fill:#7b68ee,stroke:#5a4db0,color:#fff
    style CMD_PERM fill:#e74c3c,stroke:#c0392b,color:#fff
    style CMD_ENT fill:#e8a838,stroke:#b07c1e,color:#fff
    style CMD_REPO fill:#50b86c,stroke:#3a8a50,color:#fff
    style QRY_IN fill:#4a90d9,stroke:#2c5f8a,color:#fff
```

```typescript
// Contrato genérico

export interface ICommandHandler<TCommand, TResult = void> {
  execute(accessContext: IAccessContext | null, command: TCommand): Promise<TResult>;
}

// Implementação real — src/modules/ambientes/campus/application/commands/campus-create.command.handler.ts
@Impl()

export class CampusCreateCommandHandlerImpl implements ICampusCreateCommandHandler {
  constructor(
    @Dep(ICampusRepository) private readonly repository: ICampusRepository,
    @Dep(ICampusPermissionChecker) private readonly permissionChecker: ICampusPermissionChecker,
    @Dep(IEnderecoCreateOrUpdateCommandHandler) private readonly enderecoCreateOrUpdateHandler: IEnderecoCreateOrUpdateCommandHandler,
  ) {}

  async execute(accessContext: IAccessContext | null, dto: CampusCreateCommand): Promise<CampusFindOneQueryResult> {
    await this.permissionChecker.ensureCanCreate(accessContext, { dto });
    const endereco = await this.enderecoCreateOrUpdateHandler.execute(null, { id: null, dto: dto.endereco });
    const domain = Campus.create({ nomeFantasia: dto.nomeFantasia, /* ... */ });
    const { id } = await this.repository.create({ ...domain, endereco: { id: endereco.id as string } });
    const result = await this.repository.findById(accessContext, { id });
    ensureExists(result, Campus.entityName, id);
    return result;
  }
}
```

**Fluxo padrão de um command handler:** verificar permissão → criar/atualizar entidade de domínio → persistir via repositório → retornar resultado.

### Permission Checker

Cada módulo implementa `IPermissionChecker` com o padrão **"throw on deny"** — se o usuário não tem permissão, uma exceção é lançada:

```mermaid
graph TD
    HANDLER["Handler.execute(accessContext, dto)"]
    PC["PermissionChecker\n.ensureCanCreate(ac, {dto})"]
    HANDLER --> PC

    PC --> |"usuário autorizado"| CONTINUE["Continua execução\n(Campus.create, repository.create)"]
    PC -.-> |"sem permissão"| THROW["throw ForbiddenError\n→ 403 Forbidden"]

    subgraph "Exemplo: CampusPermissionChecker"
        PC_IMPL["ensureCanCreate(): void\n(no-op — permite tudo)\n\nQuando implementado:\nif (!ac.isSuperUser) throw ForbiddenError"]
    end

    PC --- PC_IMPL

    style HANDLER fill:#7b68ee,stroke:#5a4db0,color:#fff
    style CONTINUE fill:#50b86c,stroke:#3a8a50,color:#fff
    style THROW fill:#e74c3c,stroke:#c0392b,color:#fff
```

```typescript
// Contrato — src/domain/abstractions/permission-checker.interface.ts

export interface IPermissionChecker {
  ensureCanCreate(ac: IAccessContext | null, payload: { dto: unknown }): Promise<void>;
  ensureCanUpdate(ac: IAccessContext | null, payload: { dto: unknown }, id: string): Promise<void>;
  ensureCanDelete(ac: IAccessContext | null, payload: { dto: unknown }, id: string): Promise<void>;
}
```

> As implementações atuais são **no-ops** (não verificam nada) — isso é intencional e não deve ser sinalizado como anti-pattern. Quando implementadas, lançam `ForbiddenError`.

### Dep e Impl

Decorators customizados em `src/domain/dependency-injection/` que abstraem o NestJS:

```mermaid
graph LR
    subgraph "Domínio (define o que precisa)"
        SYM["Symbol('ICampusRepository')\n(token de injeção)"]
        TYPE["type ICampusRepository =\n  IRepositoryCreate &\n  ..."]
    end

    subgraph "Infraestrutura (implementa)"
        IMPL["@Impl()\nclass CampusTypeormRepository"]
    end

    subgraph "Aplicação (consome)"
        HANDLER["constructor(\n  @Dep(\n    ICampusRepository\n  )\n  private repo:\n    ICampusRepository\n)"]
    end

    subgraph "NestJS (resolve em runtime)"
        DI["Container de DI\nresolve Symbol →\nImplementação"]
    end

    SYM --> DI
    IMPL -- "registra como provider\ndo Symbol" --> DI
    DI -- "injeta implementação\nno constructor" --> HANDLER

    style DI fill:#e8a838,stroke:#b07c1e,color:#fff,text-align:left
    style SYM fill:#4a90d9,stroke:#2c5f8a,color:#fff,text-align:left
    style TYPE fill:none,stroke:none,text-align:left
    style IMPL fill:#50b86c,stroke:#3a8a50,color:#fff,text-align:left
    style HANDLER fill:none,stroke:none,text-align:left
```

```typescript
// src/domain/dependency-injection/declare-dependency.ts

export const Dep = (token: any): ParameterDecorator => {
  const injectDecorator = NestjsInject(token);
  return (target, propertyKey, parameterIndex) => {
    return injectDecorator(target, propertyKey!, parameterIndex);
  };
};

// src/domain/dependency-injection/declare-implementation.ts

export const Impl = (): ClassDecorator => {
  return Injectable();
};
```

`Dep` é um wrapper para `@Inject()` do NestJS. `Impl` é um wrapper para `@Injectable()`. O acoplamento domínio ↔ NestJS é aceito pragmaticamente.

### Scalars semânticos

Um **scalar** (escalar) neste contexto é um tipo simples que representa um único valor (como uma string ou um número). O problema é que `string` é genérico demais — um `id`, um `nome` e uma `data` são todos `string`, mas representam coisas completamente diferentes. **Scalars semânticos** são type aliases (apelidos de tipo) que adicionam significado ao tipo primitivo, para que o TypeScript te avise se você tentar usar um no lugar do outro.

Eles ficam em `src/domain/abstractions/scalars/`:

```mermaid
graph LR
    subgraph "Sem scalars (ambíguo)"
        S1["id: string"]
        S2["nome: string"]
        S3["dateCreated: string"]
        S4["codigoIbge: number"]
    end

    subgraph "Com scalars (semântico)"
        T1["id: IdUuid"]
        T2["nome: string"]
        T3["dateCreated:\nScalarDateTimeString"]
        T4["codigoIbge: IdNumeric"]
    end

    S1 -.-> |"TypeScript permite\nconfundir id com nome\n(ambos string)"| WARN["Bug potencial"]
    T1 -.-> |"TypeScript sinaliza\nse trocar IdUuid por string"| SAFE["Type safety"]

    style S1 fill:none,stroke:none,text-align:left
    style S2 fill:none,stroke:none,text-align:left
    style S3 fill:none,stroke:none,text-align:left
    style S4 fill:none,stroke:none,text-align:left
    style T1 fill:none,stroke:none,text-align:left
    style T2 fill:none,stroke:none,text-align:left
    style T3 fill:none,stroke:none,text-align:left
    style T4 fill:none,stroke:none,text-align:left
    style WARN fill:#e74c3c,stroke:#c0392b,color:#fff,text-align:left
    style SAFE fill:#50b86c,stroke:#3a8a50,color:#fff,text-align:left
```

| Scalar | Tipo base | Propósito |
|--------|-----------|-----------|
| `IdUuid` | `string` | Identificador UUID (evita confundir com strings genéricas) |
| `IdNumeric` | `number` | Identificador numérico (IBGE codes) |
| `ScalarDateTimeString` | `string` | Data/hora em formato ISO string |
| `ScalarDate` | `string` | Data (sem hora) em formato ISO string |

### TransactionInterceptor e ConnectionProxy

O mecanismo de transações automáticas envolve três peças que cooperam para que repositórios participem da mesma transação sem saber disso:

```mermaid
graph TD
    subgraph "Peça 1: TransactionInterceptor"
        TI["Abre transação\nantes do handler"]
    end

    subgraph "Peça 2: AsyncLocalStorage"
        ALS["transactionStorage\nArmazena EntityManager\nno escopo da requisição"]
    end

    subgraph "Peça 3: ConnectionProxy"
        CP["AppTypeormConnectionProxy\nintercepta getRepository()"]
        CP --> |"EntityManager ativo?"| YES["Usa EntityManager\n(transacional)"]
        CP --> |"sem EntityManager"| NO["Usa DataSource\n(global)"]
    end

    TI -- "armazena EntityManager" --> ALS
    ALS -- "getActiveEntityManager()" --> CP

    style TI fill:#4a90d9,stroke:#2c5f8a,color:#fff
    style ALS fill:#e8a838,stroke:#b07c1e,color:#fff
    style CP fill:#50b86c,stroke:#3a8a50,color:#fff
```

O mecanismo envolve três peças:

1. **`TransactionInterceptor`** (`src/server/nest/interceptors/transaction.interceptor.ts`) — interceptor global que detecta se a operação é de leitura ou escrita. Para escritas (POST/PUT/PATCH/DELETE em REST, mutations em GraphQL), abre uma transação via `appTypeormConnection.transaction()`. Leituras (GET/HEAD, queries GraphQL) executam sem transação.

2. **`transactionStorage`** (`src/infrastructure.database/typeorm/connection/transaction-storage.ts`) — `AsyncLocalStorage<EntityManager>` que propaga o `EntityManager` transacional por toda a call stack:

```typescript

export const transactionStorage = new AsyncLocalStorage<EntityManager>();

export function getActiveEntityManager(): EntityManager | undefined {
  return transactionStorage.getStore();
}
```

3. **`AppTypeormConnectionProxy`** (`src/infrastructure.database/typeorm/connection/app-typeorm-connection.proxy.ts`) — proxy que intercepta `getRepository()`: se existe um `EntityManager` ativo no `AsyncLocalStorage`, usa-o; caso contrário, usa o `DataSource` global:

```typescript
getRepository<Entity extends ObjectLiteral>(target: EntityTarget<Entity>): Repository<Entity> {
  const activeManager = getActiveEntityManager();
  if (activeManager) return activeManager.getRepository(target);
  return this.dataSource.getRepository(target);
}
```

### Resiliência e tolerância a falhas

A aplicação é projetada para iniciar e operar mesmo quando dependências externas (banco de dados, RabbitMQ, Keycloak) estão indisponíveis ou não configuradas:

- **Bootstrap tolerante** — a API sobe independentemente da disponibilidade das dependências. Se uma dependência não está configurada (variáveis de ambiente ausentes), ela é marcada como `unavailable` sem tentativas de conexão. Se está configurada mas indisponível, a aplicação tenta reconectar automaticamente em background.
- **Reconexão automática** — conexões persistentes (DB, RabbitMQ, Keycloak/OIDC) usam retry com **backoff exponencial + jitter** (`src/shared/resilience/retry-with-backoff.ts`). As tentativas continuam indefinidamente até sucesso ou encerramento do processo.
- **Degradação controlada** — quando uma operação requer uma dependência indisponível, a API retorna `503 Service Unavailable` (via `ServiceUnavailableError`). A aplicação permanece operacional para endpoints que não dependem do serviço afetado.
- **Mock token** — login via mock token (`ENABLE_MOCK_ACCESS_TOKEN=true`) funciona mesmo com o identity provider indisponível, desde que o banco de dados esteja acessível.
- **Health check enriquecido** — `GET /health` sempre retorna HTTP 200 com status detalhado por dependência (`healthy`/`unavailable`), útil para monitoramento e dashboards:

```json
{
  "status": "degraded",
  "dependencies": {
    "database": { "status": "healthy", "lastCheckedAt": "2026-03-26T..." },
    "identity-provider": { "status": "unavailable", "lastCheckedAt": "...", "lastError": "..." },
    "keycloak": { "status": "unavailable", "lastCheckedAt": "..." },
    "message-broker": { "status": "unavailable", "lastCheckedAt": "..." }
  }
}
```

O registro de saúde é gerenciado por `ConnectionHealthRegistry` (`src/shared/resilience/connection-health-registry.ts`), injetável globalmente via `IConnectionHealthRegistry`.

### ZodGlobalValidationPipe

O pipe global (`src/shared/validation/zod-global-validation.pipe.ts`) valida automaticamente DTOs que possuem `static schema`:

```mermaid
sequenceDiagram
    participant C as Cliente
    participant P as ZodGlobalValidationPipe
    participant DTO as CampusCreateInputRestDto
    participant CTRL as Controller

    C->>P: POST /api/campi { nomeFantasia: "" }
    P->>DTO: Tem static schema?
    DTO-->>P: Sim → CampusCreateSchema
    P->>P: schema.safeParse({ nomeFantasia: "" })

    alt Válido
        P-->>CTRL: dados parseados (tipados)
    else Inválido
        P-->>C: 400 Bad Request\n[{field: "nomeFantasia", message: "nomeFantasia é obrigatório"}]
    end
```

```typescript
@Injectable()

export class ZodGlobalValidationPipe implements PipeTransform {
  transform(value: unknown, metadata: ArgumentMetadata) {
    const metatype = metadata.metatype;
    if (!hasSchema(metatype)) return value; // Se o DTO não tem schema, passa direto
    const result = metatype.schema.safeParse(value);
    if (!result.success) {
      throw new BadRequestException(
        result.error.issues.map((issue) => ({
          field: issue.path.join("."),
          message: issue.message,
          rule: issue.code,
        })),
      );
    }
    return result.data;
  }
}
```

### ApplicationErrorFilter

O filtro global (`src/server/nest/filters/application-error.filter.ts`) captura erros de domínio e aplicação e os traduz para respostas HTTP padronizadas:

```mermaid
graph LR
    subgraph "Erros de domínio / aplicação"
        E1["ResourceNotFoundError"]
        E2["ForbiddenError"]
        E3["ValidationError"]
        E4["ConflictError"]
        E5["EntityValidationError"]
    end

    FILTER["ApplicationErrorFilter\n+ error-http.mapper.ts"]

    subgraph "Respostas HTTP"
        H1["404 Not Found"]
        H2["403 Forbidden"]
        H3["422 Unprocessable"]
        H4["409 Conflict"]
        H5["422 Unprocessable\n(detalhes por campo)"]
    end

    E1 --> FILTER --> H1
    E2 --> FILTER --> H2
    E3 --> FILTER --> H3
    E4 --> FILTER --> H4
    E5 --> FILTER --> H5

    style FILTER fill:#e8a838,stroke:#b07c1e,color:#fff,text-align:left
    style H1 fill:#e74c3c,stroke:#c0392b,color:#fff,text-align:left
    style H2 fill:#e74c3c,stroke:#c0392b,color:#fff,text-align:left
```

```typescript
@Catch(ApplicationError, DomainError)

export class ApplicationErrorFilter implements ExceptionFilter {
  catch(exception: ApplicationError | DomainError, host: ArgumentsHost) {
    const errorResponse = buildHttpErrorResponse(exception, request.url);
    response.status(errorResponse.statusCode).json(errorResponse);
  }
}
```

**Mapeamento de erros** (`src/server/nest/filters/error-http.mapper.ts`):

| Código do erro | HTTP Status |
|---------------|-------------|
| `APP.RESOURCE_NOT_FOUND` | 404 |
| `APP.FORBIDDEN` | 403 |
| `APP.UNAUTHORIZED` | 401 |
| `APP.VALIDATION` | 422 |
| `APP.CONFLICT` | 409 |
| `APP.INTERNAL` | 500 |
| `APP.SERVICE_UNAVAILABLE` | 503 |
| `DOMAIN.ENTITY_VALIDATION` | 422 |
| `DOMAIN.BUSINESS_RULE_VIOLATION` | 422 |
| `DOMAIN.INVALID_STATE` | 422 |
| `DOMAIN.INVARIANT_VIOLATION` | 422 |

### Paginação

A paginação usa a biblioteca [`nestjs-paginate`](https://github.com/ppetzold/nestjs-paginate) v12 com um adapter próprio em `src/infrastructure.database/pagination/`:

```mermaid
sequenceDiagram
    participant C as Cliente
    participant CTRL as Controller
    participant H as ListQueryHandler
    participant R as Repository
    participant NP as nestjs-paginate

    C->>CTRL: GET /api/campi?page=2&limit=10&search=IFRO&sortBy=nomeFantasia:ASC
    CTRL->>H: execute(ac, paginateQuery)
    H->>R: findAll(ac, paginateQuery)
    R->>NP: NestJsPaginateAdapter.paginate(repo, dto, config)
    NP->>NP: Aplica filtros, busca, ordenação
    NP-->>R: { data: Campus[], meta: { totalItems, currentPage, ... } }
    R-->>C: { data: [...], meta: { totalItems: 47, currentPage: 2, itemsPerPage: 10 } }
```

```typescript
// No repositório TypeORM
NestJsPaginateAdapter.paginate(repo, dto, paginateConfig({
  sortableColumns: ["id", "nomeFantasia", "dateCreated"],
  searchableColumns: ["nomeFantasia", "razaoSocial"],
  filterableColumns: { "campus.id": [FilterOperator.EQ] },
}));
```

Configuração padrão (`src/infrastructure.database/pagination/config/paginate-config.ts`): `maxLimit: 100`, `defaultLimit: 20`, `multiWordSearch: true`.

<!--
Source of Trust
commit_hash: ebb2cb05b8e21e5d4aae2cfcf0429805ebc7f344
verified_at: 2026-03-23T12:30:00Z
source_patterns:
  - src/modules/*/domain/*.ts
  - src/modules/*/domain/*.schemas.ts
  - src/modules/*/domain/shared/*.query-fields.ts
  - src/modules/*/domain/repositories/*.ts
  - src/modules/*/application/commands/**/*.ts
  - src/modules/*/application/queries/**/*.ts
  - src/modules/*/domain/authorization/**/*.ts
  - src/domain/dependency-injection/**/*.ts
  - src/domain/abstractions/scalars/**/*.ts
  - src/server/nest/interceptors/transaction.interceptor.ts
  - src/shared/validation/**/*.ts
  - src/server/nest/filters/**/*.ts
  - src/infrastructure.database/pagination/**/*.ts
confidence_scope: Padrões de entidades (private constructor, create/load/update), schemas Zod (EntitySchema/CreateSchema/UpdateSchema), FieldMetadata, interfaces de repositório compostas, command/query handlers, permission checkers, Dep/Impl, scalars semânticos, TransactionInterceptor, ZodGlobalValidationPipe, ApplicationErrorFilter, paginação (nestjs-paginate)
-->

---

## GraphQL

As seções a seguir cobrem tópicos especializados — leia conforme precisar trabalhar com cada área.

**GraphQL** é uma linguagem de consulta alternativa ao REST. A diferença principal: no REST, o servidor decide quais campos retornar; no GraphQL, o **cliente** diz exatamente quais campos quer e recebe apenas esses. É como a diferença entre um buffet (REST — pega tudo) e um pedido à la carte (GraphQL — escolhe item por item).

A API GraphQL usa **Apollo Server** v5 com abordagem **code-first** (o schema GraphQL é gerado automaticamente a partir de classes TypeScript decoradas com `@ObjectType()` e `@Field()`, em vez de ser escrito manualmente em arquivos `.graphql`).

### Arquitetura GraphQL do projeto

```mermaid
graph TD
    CLIENT["Cliente\n(front-end)"]

    subgraph "Apollo Server v5"
        GQL_EP["Endpoint /api/graphql"]
        CACHE["LRU Cache\n100 MB / 5 min TTL"]
        SCHEMA["Schema gerado\n(code-first)"]
    end

    subgraph "Resolvers (presentation.graphql/)"
        RES_C["CampusResolver\n@Query campusFindOne\n@Query campusFindAll\n@Mutation campusCreate\n@Mutation campusUpdate\n@Mutation campusDelete"]
        RES_T["TurmaResolver"]
        RES_D["DiarioResolver"]
        RES_N["... (18 resolvers)"]
    end

    subgraph "Handlers (aplicação)"
        H_FIND["FindOneQueryHandler"]
        H_LIST["ListQueryHandler"]
        H_CREATE["CreateCommandHandler"]
    end

    CLIENT -- "query / mutation" --> GQL_EP
    GQL_EP --> SCHEMA
    GQL_EP --> CACHE
    SCHEMA --> RES_C & RES_T & RES_D & RES_N
    RES_C --> H_FIND & H_LIST & H_CREATE

    style CLIENT fill:#4a90d9,stroke:#2c5f8a,color:#fff
    style GQL_EP fill:#e535ab,stroke:#b0297f,color:#fff
    style SCHEMA fill:#e535ab,stroke:#b0297f,color:#fff
    style RES_C fill:#7b68ee,stroke:#5a4db0,color:#fff
```

### REST vs GraphQL — mesmos handlers, interfaces diferentes

```mermaid
graph TD
    subgraph "REST (presentation.rest/)"
        REST_REQ["POST /api/campi\n+ JSON body"]
        REST_CTRL["CampusRestController"]
        REST_DTO["CampusCreateInputRestDto\n(static schema)"]
        REST_MAP["CampusRestMapper"]
    end

    subgraph "GraphQL (presentation.graphql/)"
        GQL_REQ["mutation {\n  campusCreate(input: {...}) {\n    id, nomeFantasia\n  }\n}"]
        GQL_RES["CampusResolver"]
        GQL_DTO["CampusCreateInputGraphQlDto\n(@InputType + static schema)"]
        GQL_MAP["CampusGraphqlMapper"]
    end

    subgraph "Compartilhado (aplicação + domínio)"
        HANDLER["CampusCreateCommandHandler\n(mesma lógica)"]
        PERM["PermissionChecker"]
        ENT["Campus.create()"]
        REPO["ICampusRepository"]
    end

    REST_REQ --> REST_CTRL --> REST_DTO --> REST_MAP --> HANDLER
    GQL_REQ --> GQL_RES --> GQL_DTO --> GQL_MAP --> HANDLER
    HANDLER --> PERM --> ENT --> REPO

    style HANDLER fill:#7b68ee,stroke:#5a4db0,color:#fff
    style REST_CTRL fill:#4a90d9,stroke:#2c5f8a,color:#fff
    style GQL_RES fill:#e535ab,stroke:#b0297f,color:#fff
    style ENT fill:#e8a838,stroke:#b07c1e,color:#fff
```

### Code-first — como o schema é gerado

```mermaid
graph LR
    subgraph "Código TypeScript"
        OT["@ObjectType('Campus')\nclass CampusFindOneOutput\n  GraphQlDto"]
        F1["@Field(() => String)\nnomeFantasia!: string"]
        F2["@Field(() => String)\nrazaoSocial!: string"]
    end

    OT --- F1
    OT --- F2

    OT --> NESTJS_GQL["NestJS GraphQL\n(autoSchemaFile: true)"]
    NESTJS_GQL --> GQL_SCHEMA["Schema GraphQL gerado\ntype Campus {\n  nomeFantasia: String!\n  razaoSocial: String!\n}"]

    style OT fill:#e535ab,stroke:#b0297f,color:#fff,text-align:left
    style F1 fill:none,stroke:none,text-align:left
    style F2 fill:none,stroke:none,text-align:left
    style NESTJS_GQL fill:none,stroke:none,text-align:left
    style GQL_SCHEMA fill:#50b86c,stroke:#3a8a50,color:#fff,text-align:left
```

### Fluxo completo de uma query GraphQL

```mermaid
sequenceDiagram
    participant C as Cliente
    participant A as Apollo Server
    participant R as CampusResolver
    participant H as FindOneQueryHandler
    participant DB as PostgreSQL

    C->>A: query { campusFindOne(id: "uuid") { id, nomeFantasia } }
    A->>A: Parse e valida query contra schema
    A->>R: campusFindOne(id, info, accessContext)
    R->>H: execute(accessContext, {id})
    H->>DB: SELECT campus + relations FROM campus WHERE id = $1
    DB-->>H: { id, nomeFantasia }
    H-->>R: CampusFindOneQueryResult
    R-->>A: CampusFindOneOutputGraphQlDto
    A-->>C: { data: { campusFindOne: { id: "...", nomeFantasia: "IFRO" } } }
```

### Configuração

| Configuração | Valor |
|-------------|-------|
| **Endpoint** | `http://localhost:3701/api/graphql` |
| **Playground** | GraphiQL habilitado em desenvolvimento |
| **Introspection** | habilitada |
| **Cache** | LRU em memória (100 MB, TTL de 5 minutos) |
| **Schema** | code-first (`autoSchemaFile: true`) |
| **Number mode** | `integer` (números são Int, não Float) |

**Exemplo de query:**

```graphql
# Buscar um campus por ID — peça apenas os campos que precisa
query {
  findById(id: "uuid-do-campus") {
    id
    nomeFantasia
    razaoSocial
    apelido
    cnpj
  }
}
```

### Módulos com GraphQL vs apenas REST

```mermaid
graph TD
    subgraph "REST + GraphQL (18 módulos)"
        A1["campus"] & A2["bloco"] & A3["ambiente"]
        B1["usuario"] & B2["perfil"]
        C1["curso"] & C2["disciplina"] & C3["turma"] & C4["diario"]
        D1["modalidade"] & D2["nivel-formacao"] & D3["oferta-formacao"]
        E1["estado"] & E2["cidade"] & E3["endereco"]
        F1["calendario-letivo"] & F2["empresa"] & F3["imagem-arquivo"]
    end

    subgraph "Apenas REST (sem GraphQL)"
        R1["autenticacao\n(login, refresh)"]
        R2["arquivo\n(upload)"]
        R3["estagiario\nestagio\nresponsavel-empresa"]
        R4["gerar-horario\nhorario-edicao\nhorario-consulta"]
        R5["relatorio\nnotificacao"]
    end

    style A1 fill:#e535ab,stroke:#b0297f,color:#fff
    style R1 fill:#4a90d9,stroke:#2c5f8a,color:#fff
```

**Compartilhamento de lógica:** os resolvers GraphQL (em `presentation.graphql/`) reutilizam os **mesmos command/query handlers** da API REST. Isso significa que a lógica de negócio, validação e autorização são idênticas independentemente de a requisição vir via REST ou GraphQL.

> **Nota avançada:** o projeto **não** usa DataLoader para resolver o problema N+1 do GraphQL — queries que buscam relações fazem JOINs no repositório TypeORM. As relations são declaradas no `paginateConfig` de cada repositório e carregadas automaticamente via `nestjs-paginate` (para listagens) ou `repo.findOne({ relations })` (para buscas por ID).

<!--
Source of Trust
commit_hash: ebb2cb05b8e21e5d4aae2cfcf0429805ebc7f344
verified_at: 2026-03-23T12:30:00Z
source_patterns:
  - src/infrastructure.graphql/**/*.ts
  - src/modules/*/presentation.graphql/**/*.ts
confidence_scope: Apollo Server v5 code-first, endpoint /api/graphql, GraphiQL habilitado, cache LRU (100MB, 5min TTL), módulos com/sem GraphQL
-->

---

## Message broker

O projeto usa **RabbitMQ** como message broker, integrado via biblioteca [Rascal](https://github.com/guidesmiths/rascal) v21 (wrapper AMQP).

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

A aplicação publica uma mensagem de requisição na fila e consome a resposta quando o serviço gerador completa o processamento. Dois padrões são implementados em `IMessageBrokerService` (`src/domain/abstractions/message-broker/`):
- **RPC** (`publishTimetableRequest`) — publica e espera resposta com timeout.
- **Fire-and-forget** (`publishTimetableRequestFireAndForget`) — publica sem esperar.

**Filas configuráveis via variáveis de ambiente:**

| Variável | Padrão |
|----------|--------|
| `MESSAGE_BROKER_QUEUE_TIMETABLE_REQUEST` | `dev.timetable_generate.request` |
| `MESSAGE_BROKER_QUEUE_TIMETABLE_RESPONSE` | `dev.timetable_generate.response` |

A UI de gerenciamento do RabbitMQ está disponível em `http://localhost:15672` (usuário `admin`, senha `admin`).

<!--
Source of Trust
commit_hash: ebb2cb05b8e21e5d4aae2cfcf0429805ebc7f344
verified_at: 2026-03-23T12:30:00Z
source_patterns:
  - src/infrastructure.message-broker/**/*.ts
  - src/domain/abstractions/message-broker/**/*.ts
  - .docker/compose.yml
confidence_scope: RabbitMQ via Rascal v21, filas de timetable (request/response), padrões RPC e fire-and-forget, porta 15672 UI, credenciais admin/admin
-->

---

## Testes

Testes automatizados são programas que verificam se o código funciona como esperado. Quando você roda `bun run test`, esses programas executam cenários pré-definidos e reportam se algo quebrou.

O projeto usa [Vitest](https://vitest.dev/) v4 como framework de testes (Vitest é similar ao Jest, mas otimizado para projetos que usam Vite/Bun).

```mermaid
graph TD
    subgraph "Testes unitários (*.spec.ts)"
        UT["Handler / Entidade / Utilitário"]
        MOCK_REPO["Mock de repositório\n(createMockCrudRepository)"]
        MOCK_PC["Mock de permission checker\n(createMockPermissionChecker)"]
        MOCK_AC["Mock de access context\n(createTestAccessContext)"]

        UT --> MOCK_REPO & MOCK_PC & MOCK_AC
    end

    subgraph "Testes e2e (*.e2e-spec.ts)"
        E2E["Requisição HTTP completa"]
        E2E --> REAL_DB["PostgreSQL real"]
        E2E --> REAL_APP["NestJS completo\n(pipes, guards, interceptors)"]
    end

    subgraph "Pirâmide de testes"
        P1["Unitários\n(rápidos, isolados)"]
        P2["E2E\n(lentos, integrados)"]
        P1 --- P2
    end

    style UT fill:#4a90d9,stroke:#2c5f8a,color:#fff
    style E2E fill:#50b86c,stroke:#3a8a50,color:#fff
    style MOCK_REPO fill:#7b68ee,stroke:#5a4db0,color:#fff
```

### Tipos de teste

| Tipo | Padrão de arquivo | O que testa |
|------|-------------------|-------------|
| **Unitário** | `**/*.spec.ts` | Lógica isolada de command/query handlers, entidades de domínio e utilitários — com mocks de repositório e serviços externos |
| **End-to-end** | `**/*.e2e-spec.ts` | Fluxo completo de requisição HTTP, incluindo integração com banco de dados e serviços reais |

### Comandos

```bash
bun run test            # Executar testes unitários uma vez
bun run test:watch      # Modo watch — re-executa ao salvar arquivos
bun run test:cov        # Com relatório de cobertura (provedor v8)
bun run test:e2e        # Testes end-to-end
bun run test:debug      # Com debugger (porta 9229)
```

### Helpers de teste

Mocks de repositório, factories e utilitários de teste ficam em `src/test/helpers/`:

| Helper | O que fornece |
|--------|---------------|
| `createTestId()` | UUID v7 para testes |
| `createTestDate(offset?)` | Datas fixas ISO para testes determinísticos |
| `createTestRequestActor(overrides?)` | `IRequestActor` mock com dados padrão |
| `createTestAccessContext(actor?)` | `IAccessContext` completo para testes |
| `createTestSuperUserAccessContext()` | AccessContext com superuser |
| `createTestRef(id?)` | Referência `{ id }` para relações |
| `createTestDatedFields(offset?)` | Campos `dateCreated`, `dateUpdated`, `dateDeleted` |
| `createMockCrudRepository()` | Repositório mock com todos os métodos (`vi.fn()`) |
| `createMockPermissionChecker()` | Permission checker mock (no-op por padrão) |

### Configuração

O Vitest está configurado em `src/vitest.config.mts`:
- **Globals:** `true` (não precisa importar `describe`, `it`, `expect`).
- **Path alias:** `@/*` → `./` (respeita tsconfig paths).
- **Bundling:** Zod é bundled (`noExternal: ["zod"]`).

<!--
Source of Trust
commit_hash: ebb2cb05b8e21e5d4aae2cfcf0429805ebc7f344
verified_at: 2026-03-23T12:30:00Z
source_patterns:
  - src/vitest.config.mts
  - src/test/**/*.ts
  - src/modules/*/application/commands/**/*.spec.ts
  - src/modules/*/application/queries/**/*.spec.ts
confidence_scope: Framework Vitest v4, configuração (globals, path alias, noExternal zod), helpers de teste (createMockCrudRepository, createMockPermissionChecker, etc.)
-->

---

## CI/CD

> **O que é CI/CD?** CI (Continuous Integration — Integração Contínua) é o processo automático de compilar e testar o código a cada push. CD (Continuous Deployment — Deploy Contínuo) é a publicação automática do sistema após a CI passar. Juntos, garantem que código novo seja validado e disponibilizado rapidamente.

O pipeline de CI/CD é definido em `.github/workflows/build-deploy.dev.yml`.

**Triggers:**
- Manual dispatch (workflow_dispatch)
- Push na branch `main` (quando há mudanças em `src/`, `.docker/`, `.github/workflows/` ou `.deploy/`)

**Concurrency:** `build-deploy-dev` — apenas uma execução por vez.

```mermaid
graph LR
    PUSH["Push na main\n(ou dispatch manual)"] --> CI

    subgraph CI["CI — Build & Push"]
        CHECKOUT["Checkout"] --> BUILDX["QEMU + Buildx\n(multi-arch)"]
        BUILDX --> LOGIN["Login no GHCR"]
        LOGIN --> BUILD["Build imagem\n(target: service-runtime)"]
        BUILD --> PUSH_IMG["Push\nghcr.io/.../\nmanagement-service\n:development"]
    end

    CI --> CD

    subgraph CD["CD — Deploy"]
        DEPLOY["Runner dedicado\n(dev-deploy)"]
        DEPLOY --> SCRIPT[".deploy/development/\ndeploy.sh"]
    end

    style PUSH fill:#4a90d9,stroke:#2c5f8a,color:#fff,text-align:left
    style CHECKOUT text-align:left
    style BUILDX text-align:left
    style LOGIN text-align:left
    style BUILD text-align:left
    style PUSH_IMG fill:#50b86c,stroke:#3a8a50,color:#fff,text-align:left
    style DEPLOY text-align:left
    style SCRIPT fill:#50b86c,stroke:#3a8a50,color:#fff,text-align:left
```

**Detalhes das etapas:**

1. **CI — Build & Push** (roda em `ubuntu-latest`):
   - Checkout do código.
   - Configura QEMU + Docker Buildx para build multi-arquitetura.
   - Login no GitHub Container Registry (GHCR) com `GITHUB_TOKEN`.
   - Build da imagem Docker a partir de `.docker/Containerfile` (target `service-runtime`).
   - Push para `ghcr.io/<owner>/management-service:development`.
   - Build args: `BUILD_TIME`, `GIT_COMMIT_HASH` (para rastreabilidade).
   - Cache: GitHub Actions cache (`type=gha`) + registry cache no GHCR (`mode=max`) para builds incrementais rápidos.

2. **CD — Deploy** (roda em runner dedicado `dev-deploy`):
   - Depende do CI completar com sucesso.
   - Environment: `development` (com `DEPLOY_URL`).
   - Executa `.deploy/development/deploy.sh`.

<!--
Source of Trust
commit_hash: ebb2cb05b8e21e5d4aae2cfcf0429805ebc7f344
verified_at: 2026-03-23T12:30:00Z
source_patterns:
  - .github/workflows/build-deploy.dev.yml
  - .docker/Containerfile
  - .deploy/**/*
confidence_scope: Pipeline CI/CD (triggers, etapas build/push/deploy), imagem Docker (target service-runtime, GHCR), concurrency build-deploy-dev
-->

---

## Boas práticas de desenvolvimento

As seções a seguir consolidam as regras e princípios que guiam o desenvolvimento. Se você leu o README até aqui, já encontrou a maioria delas em contexto — aqui estão reunidas para referência rápida.

Estas são as práticas essenciais que todo contribuidor deve seguir:

### Qualidade obrigatória

- **Sempre rode `code:fix` → `typecheck`** após qualquer alteração. A tarefa não está concluída sem ambos passando.
- **Escreva testes** para command/query handlers. Helpers e mocks ficam em `src/test/`.
- **Nunca delete registros fisicamente** — use soft delete (exclusão lógica). As entidades já têm `dateDeleted`.

### Arquitetura

- **Siga a estrutura hexagonal** dos módulos existentes. Ao criar um novo módulo, replique a estrutura de um módulo já consolidado (ex.: `campus`).
- **Schemas Zod ficam no domínio** e são reutilizados na apresentação. Nunca duplicar validação.
- **Validação em duas camadas** — na apresentação (DTO com `static schema`) e no domínio (`zodValidate()`).
- **Transações são automáticas** — nunca chamar `.transaction()` manualmente. O interceptor global cuida disso.
- **Não instale `class-validator`** — o projeto usa exclusivamente Zod v4.

### Convenções de linguagem

- **Português (pt-BR):** nomes de entidades de domínio e todas as suas propriedades (`Campus`, `nomeFantasia`, `razaoSocial`).
- **Inglês:** todo o resto — infraestrutura, métodos, utilitários, variáveis (`findAll`, `CommandHandler`, `dateCreated`).

### O que evitar

- Não use `as any` — defina tipos adequados.
- Não importe de `modules/@shared` — é legado em remoção. Use `@/domain/`, `@/shared/`, `@/infrastructure.*`.
- Não adicione extensões `.js` ou `.ts` nos imports.
- Não proponha code generation ou meta-programação para reduzir boilerplate — consistência é preferida.

---

## Princípios de engenharia

Esta é a seção mais formal e densa do README — ela documenta os princípios de design que guiam todas as decisões de código. Não é necessário memorizar tudo; use como referência quando tiver dúvidas sobre "qual abordagem escolher".

O projeto segue princípios rigorosos de engenharia de software para garantir qualidade, manutenibilidade e escalabilidade:

### Design de código

| Princípio | Aplicação no projeto |
|-----------|---------------------|
| **SOLID** | Cada handler tem uma responsabilidade. Repositórios são compostos de interfaces granulares (`IRepositoryCreate`, `IRepositoryFindById`). Dependências são invertidas via Symbols. |
| **DRY** | Schemas Zod definidos uma vez no domínio, reutilizados na apresentação. Metadata de campos definida em `CampusFields`, consumida por REST e GraphQL. |
| **KISS** | Handlers são funções pequenas e diretas. Sem abstrações desnecessárias. |
| **YAGNI** | Não implemente o que ninguém pediu. Não adicione parâmetros "por precaução". |
| **SoC** | Controllers não contêm lógica de negócio. Handlers não fazem queries SQL. Repositórios não validam regras de domínio. |

### Single Source of Truth (SSOT)

Cada dado ou regra tem **uma única origem autoritativa** no projeto. Isso elimina inconsistências e facilita manutenção:

```mermaid
graph TD
    subgraph "Fonte única (domínio)"
        SCHEMA["CampusSchema\n(Zod)"]
        FIELDS["CampusFields\n(FieldMetadata)"]
    end

    subgraph "Consumidores"
        ENT["Entidade de domínio\nCampus.create() / Campus.update()"]
        DTO_REST["DTO REST\nstatic schema = CampusCreateSchema"]
        DTO_GQL["DTO GraphQL\n@Field(() => String, field.gqlMetadata)"]
        SWAGGER["Swagger\n(gerado automaticamente)"]
    end

    SCHEMA --> ENT
    SCHEMA --> DTO_REST
    FIELDS --> DTO_GQL
    FIELDS --> SWAGGER

    style SCHEMA fill:#e8a838,stroke:#b07c1e,color:#fff
    style FIELDS fill:#e8a838,stroke:#b07c1e,color:#fff
```

**Exemplos de SSOT no projeto:**

| Dado/Regra | Fonte única | Quem consome |
|------------|-------------|-------------|
| Validação de campos | `CampusSchema` (Zod, no domínio) | Entidade (`zodValidate`), DTO REST (`static schema`), DTO GraphQL |
| Metadata de campos (descrição, nullable) | `CampusFields` (FieldMetadata) | Decorators GraphQL (`gqlMetadata`), Swagger (`swaggerMetadata`) |
| Tipagem da entidade | `ICampus = z.infer<typeof CampusSchema>` | Todo o código que manipula Campus |
| Configuração de paginação | `paginateConfig()` na infraestrutura | `findAll` de cada repositório |

**O que isso significa na prática:** se uma regra de validação do Campus mudar (ex.: CNPJ passa a ser opcional), você altera **apenas** o `CampusFields.cnpj` e o `CampusCreateSchema`. A validação na apresentação (DTO) e no domínio (`zodValidate`) atualiza automaticamente, porque ambos consomem o mesmo schema.

### Dependency Injection (DI) — Interfaces e Implementações

O projeto usa **Inversão de Dependência** para desacoplar as camadas. O domínio define **interfaces** (o que precisa), e a infraestrutura fornece **implementações** (como faz).

```mermaid
graph LR
    subgraph "Domínio (interface/port)"
        SYMBOL["Symbol\nICampusRepository"]
        TYPE["Type\nICampusRepository"]
    end

    subgraph "Infraestrutura (implementação/adapter)"
        IMPL["CampusTypeormRepository\n@Impl()"]
    end

    subgraph "Aplicação (consumidor)"
        HANDLER["CampusCreateCommandHandlerImpl\n@Dep(\n  ICampusRepository\n)"]
    end

    SYMBOL -- "token de injeção" --> HANDLER
    TYPE -- "contrato (tipos)" --> HANDLER
    IMPL -- "registra como provider" --> SYMBOL

    style SYMBOL fill:#e8a838,stroke:#b07c1e,color:#fff,text-align:left
    style TYPE fill:#e8a838,stroke:#b07c1e,color:#fff,text-align:left
    style IMPL fill:#50b86c,stroke:#3a8a50,color:#fff,text-align:left
    style HANDLER fill:#4a90d9,stroke:#2c5f8a,color:#fff,text-align:left
```

**Como funciona passo a passo:**

**1. O domínio define o contrato** (o que o repositório deve fazer):

```typescript
// src/modules/ambientes/campus/domain/repositories/campus.repository.interface.ts

export const ICampusRepository = Symbol("ICampusRepository");  // Token de injeção


export type ICampusRepository =                                // Contrato
  IRepositoryFindAll<CampusListQueryResult> &
  IRepositoryFindById<CampusFindOneQueryResult> &
  IRepositoryFindByIdSimple<CampusFindOneQueryResult> &
  IRepositoryCreate<ICampus> &
  IRepositoryUpdate<ICampus> &
  IRepositorySoftDelete;
```

**2. A infraestrutura implementa** (como o repositório funciona):

```typescript
// src/modules/ambientes/campus/infrastructure.database/campus.repository.ts
@Impl()

export class CampusTypeormRepository implements ICampusRepository {
  constructor(
    @Dep(IAppTypeormConnection) private readonly conn: IAppTypeormConnection,
  ) {}

  async create(entity: ICampus): Promise<{ id: string | number }> { /* ... usa TypeORM */ }
  async findAll(...) { /* ... usa NestJS-Paginate */ }
}
```

**3. O handler consome** (sem saber da implementação):

```typescript
// src/modules/ambientes/campus/application/commands/campus-create.command.handler.ts
@Impl()

export class CampusCreateCommandHandlerImpl {
  constructor(
    @Dep(ICampusRepository) private readonly repo: ICampusRepository,
  ) {}

  async execute(ac: IAccessContext | null, dto: CampusCreateCommand) {
    const campus = Campus.create(dto);
    await this.repo.create(campus);  // Não sabe se é TypeORM, Prisma ou mock
  }
}
```

**Por que isso importa?**
- O handler **nunca sabe** que está usando TypeORM. Ele conhece apenas o contrato.
- Em testes, você injeta um **mock** que implementa a mesma interface — sem banco de dados.
- Se o banco mudar de PostgreSQL para outro, apenas o adapter muda — zero alteração no domínio e na aplicação.

### Arquitetura

| Princípio | Aplicação no projeto |
|-----------|---------------------|
| **Clean Architecture** | O domínio não depende de frameworks. Dependências apontam para dentro. |
| **Hexagonal (Ports & Adapters)** | Interfaces no domínio (ports), implementações na infraestrutura (adapters). |
| **CQRS** | Commands e queries separados em handlers distintos. |
| **Bounded Context** | Cada módulo é um contexto delimitado com seu modelo de domínio. |
| **DDD** | Entidades com identidade, factory methods, Ubiquitous Language (pt-BR para o domínio acadêmico). |

### Qualidade técnica

| Princípio | Aplicação no projeto |
|-----------|---------------------|
| **Fail Fast** | Validação Zod na entrada (DTO) e no domínio. Erros descritivos imediatos. |
| **Clean Code** | Nomes semânticos, funções pequenas, early return, sem side effects ocultos. |
| **POLA** | APIs REST com convenções padrão. Nomes refletem o que fazem. |
| **Law of Demeter** | Handlers injetam repositórios, não connections. Controllers injetam handlers, não repositórios. |
| **Immutability** | Entidades mudam apenas via `update()`. Configurações são imutáveis. |
| **Composition > Inheritance** | DTOs usam mixins (`ts-mixer`), não herança profunda. |

---

## Stack tecnológico

| Categoria | Tecnologia | Versão |
|-----------|------------|--------|
| Runtime | [Bun](https://bun.sh/) | latest |
| Linguagem | [TypeScript](https://www.typescriptlang.org/) | 5.9.3 |
| Framework | [NestJS](https://nestjs.com/) | 11.1.17 |
| ORM | [TypeORM](https://typeorm.io/) | 0.3.28 |
| Banco de dados | [PostgreSQL](https://www.postgresql.org/) | 15 (bitnamilegacy) |
| Documentação API | [Swagger/OpenAPI](https://swagger.io/) + [Scalar](https://scalar.com/) | NestJS Swagger 11.2 |
| GraphQL | [Apollo Server](https://www.apollographql.com/docs/apollo-server/) | 5.4.0 |
| Validação | [Zod](https://zod.dev/) | 4.3.6 |
| Autenticação | [Keycloak](https://www.keycloak.org/) + OAuth2/OIDC | Admin Client 26.5 |
| JWT/JWKS | [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) + [jwks-rsa](https://github.com/auth0/node-jwks-rsa) | 9.0.3 / 4.0.1 |
| Passport | [@nestjs/passport](https://docs.nestjs.com/security/authentication) | 11.0.5 |
| Message broker | [RabbitMQ](https://www.rabbitmq.com/) via [Rascal](https://github.com/guidesmiths/rascal) | 3-management / 21.0.1 |
| Processamento de imagens | [Sharp](https://sharp.pixelplumbing.com/) | 0.34.5 |
| Paginação | [nestjs-paginate](https://github.com/ppetzold/nestjs-paginate) | 12.9.0 |
| Eventos | [@nestjs/event-emitter](https://docs.nestjs.com/techniques/events) | 3.0.1 |
| Rate limiting | [@nestjs/throttler](https://docs.nestjs.com/security/rate-limiting) | 6.5.0 |
| Agendamento | [@nestjs/schedule](https://docs.nestjs.com/techniques/task-scheduling) | 6.1.1 |
| Segurança HTTP | [Helmet](https://helmetjs.github.io/) | 8.1.0 |
| Compressão | [compression](https://github.com/expressjs/compression) | 1.8.1 |
| Mixins | [ts-mixer](https://github.com/tannerntannern/ts-mixer) | 6.0.4 |
| Containerização | Docker (recomendado) / Podman | — |
| Task runner | [just](https://github.com/casey/just) | — |
| Monorepo | [NX](https://nx.dev/) | 22.6.0 |
| Linting/Formatação | [Biome](https://biomejs.dev/) | 2.4.8 |
| Testes | [Vitest](https://vitest.dev/) + [Supertest](https://github.com/ladjs/supertest) | 4.1.0 / 7.2.2 |
| Coverage | [@vitest/coverage-v8](https://vitest.dev/guide/coverage) | 4.1.0 |

<!--
Source of Trust
commit_hash: ebb2cb05b8e21e5d4aae2cfcf0429805ebc7f344
verified_at: 2026-03-23T12:30:00Z
source_patterns:
  - src/package.json
  - .docker/compose.yml
confidence_scope: Versões de todas as tecnologias listadas na tabela de stack (extraídas de package.json e compose.yml)
-->

---

## Dicas e troubleshooting

### Container não sobe

- **Docker não está rodando:** verifique com `docker info`. Se não estiver, inicie o Docker Desktop ou o daemon (`sudo systemctl start docker`).
- **Portas ocupadas:** se outra aplicação usa as portas 3701, 5432 ou 15672, pare-a ou altere as portas no `.env` / `compose.yml`.
- **Espaço em disco:** containers e imagens Docker ocupam espaço. Limpe imagens não usadas com `docker system prune`.
- **Rebuild necessário:** se houve mudança no `Containerfile` ou dependências, force rebuild com `just rebuild`.

### Migração falha

- **Banco não acessível:** verifique se o container do PostgreSQL está rodando (`just logs`). O banco precisa estar pronto antes de rodar migrações.
- **Migrações anteriores não aplicadas:** se o banco foi resetado, rode `bun run migration:run` para aplicar todas desde o início.
- **Conflito de migração:** se uma migração falha por tabela/coluna já existente, pode ser que o banco esteja em estado inconsistente. Use `bun run db:reset` para resetar completamente (perde dados).

### Erro de permissão no container

- **Diferença de UID:** o container usa o usuário `happy` (uid 1000). Se seu usuário no host tem uid diferente, pode haver problemas de permissão em volumes montados. O `justfile` tem a receita `shell-root` para acessar como root.
- **Podman:** se usando Podman, certifique-se de que `userns_mode: keep-id` está configurado (já está no `compose.yml`).

### Hot reload não funciona

- **Volume não montado:** verifique se o código-fonte está montado como volume no container (deve aparecer em `docker compose ps`).
- **Watchman/inotify:** em Linux, pode ser necessário aumentar o limite de watches: `echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p`.

### Testes falhando após pull

- **Banco desatualizado:** rode `bun run migration:run` para aplicar migrações novas.
- **Dependências desatualizadas:** rode `bun install` dentro do container.
- **Cache do Vitest:** tente `bun run test --no-cache`.

### `typecheck` falhando

- **Dependências instaladas?** Rode `bun install` dentro do container.
- **Tipos desatualizados?** Se adicionou uma dependência nova, pode precisar dos `@types/*` correspondentes.
- **IDE mostra erro mas `typecheck` passa (ou vice-versa):** a IDE pode estar usando uma versão diferente do TypeScript. O `typecheck` do container é a fonte de verdade.

### Mock de autenticação não funciona

- **Formato correto:** o token deve ser `mock.matricula.<número>` (ex.: `mock.matricula.1234`). Note: é `mock.matricula`, **não** `mock.siape`.
- **Usuário precisa existir:** o mock token busca o usuário no banco pela matrícula. Se o usuário não existe, retorna 403. Rode `bun run migration:run` para inserir o seed (superuser).
- **Variável habilitada:** verifique que `ENABLE_MOCK_ACCESS_TOKEN=true` no `.env`.

---

## Licença

[MIT](./LICENSE) &copy; 2024 &ndash; presente, Ladesa.

<!-- Links dos Badges -->

[action-build-deploy-dev-src]: https://img.shields.io/github/actions/workflow/status/ladesa-ro/management-service/build-deploy.dev.yml?style=flat&logo=github&logoColor=white&label=Deploy&branch=main&labelColor=18181B
[action-build-deploy-dev-href]: https://github.com/ladesa-ro/management-service/actions/workflows/build-deploy.dev.yml?query=branch%3Amain
