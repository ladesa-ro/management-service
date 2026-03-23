# Management Service

API REST/GraphQL de gerenciamento acadêmico desenvolvida com NestJS, TypeORM e PostgreSQL, seguindo princípios de arquitetura hexagonal (ports & adapters).

[![CI/CD - Management Service][action-build-deploy-dev-src]][action-build-deploy-dev-href]

**Ambiente de desenvolvimento público**: <https://dev.ladesa.com.br/api/v1/docs/>

---

## Sumário

- [Visão geral](#visão-geral)
- [Arquitetura](#arquitetura)
  - [Arquitetura hexagonal](#arquitetura-hexagonal)
  - [Fluxo de uma requisição](#fluxo-de-uma-requisição)
  - [CQRS](#cqrs)
  - [Estrutura de diretórios](#estrutura-de-diretórios)
  - [Módulos de domínio](#módulos-de-domínio)
- [Por que containers?](#por-que-containers)
- [Pré-requisitos](#pré-requisitos)
- [Clonando o repositório](#clonando-o-repositório)
- [Rodando o projeto](#rodando-o-projeto)
  - [Caminho A: justfile (recomendado)](#caminho-a-justfile-recomendado)
  - [Caminho B: Dev Container](#caminho-b-dev-container)
- [Primeiros passos após o setup](#primeiros-passos-após-o-setup)
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
- [Boas práticas de desenvolvimento](#boas-práticas-de-desenvolvimento)
- [Princípios de engenharia](#princípios-de-engenharia)
  - [Single Source of Truth (SSOT)](#single-source-of-truth-ssot)
  - [Dependency Injection (DI)](#dependency-injection-di--interfaces-e-implementações)
- [Acessando a aplicação](#acessando-a-aplicação)
  - [Documentação Swagger/Scalar](#documentação-swaggerscalar)
- [Serviços do ambiente](#serviços-do-ambiente)
- [Variáveis de ambiente](#variáveis-de-ambiente)
  - [Sobre o prefixo (API_PREFIX)](#sobre-o-prefixo-api_prefix)
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

**Tecnologias principais:** roda sobre o runtime [Bun](https://bun.sh/), utiliza o framework [NestJS](https://nestjs.com/) e persiste dados em [PostgreSQL 15](https://www.postgresql.org/) via [TypeORM](https://typeorm.io/). A autenticação é delegada a um servidor [Keycloak](https://www.keycloak.org/) via OAuth2/OIDC, e a comunicação assíncrona com outros serviços acontece por meio de filas [RabbitMQ](https://www.rabbitmq.com/).

Todo o ambiente de desenvolvimento é containerizado — você **não precisa instalar** Bun, Node.js, PostgreSQL nem nenhuma outra dependência diretamente na sua máquina.

---

## Arquitetura

### Arquitetura hexagonal

O projeto segue a **arquitetura hexagonal** (também conhecida como _ports & adapters_). A ideia central é que a lógica de negócio (domínio) não depende de frameworks, bancos de dados ou protocolos — ela define **contratos** (interfaces/ports), e as camadas externas fornecem **implementações** (adapters).

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

    C->>CT: POST /api/ambientes/campus (com Bearer token)
    CT->>CT: Valida DTO (Zod) e extrai RequestActor
    CT->>H: execute(accessContext, input)
    H->>PC: ensureCanCreate(accessContext)
    PC-->>H: OK (ou ForbiddenError)
    H->>E: Campus.create(input)
    E->>E: Valida com Zod, gera UUID v7
    H->>R: create(campus)
    R->>DB: INSERT INTO campus ...
    DB-->>R: OK
    R-->>H: void
    H-->>CT: { id: "..." }
    CT-->>C: 201 Created { id: "..." }
```

Esse fluxo se repete para todos os módulos. Queries (`FindById`, `FindAll`) seguem o mesmo padrão, mas sem Permission Checker e sem escrita no banco.

### CQRS

**Por que separar leitura de escrita?** Operações de leitura e escrita têm necessidades diferentes — leituras podem ser otimizadas com cache e paginação, enquanto escritas precisam de validação, autorização e transações. Separá-las torna o código mais organizado, testável e fácil de manter.

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

| Área | Descrição | Módulos |
|------|-----------|---------|
| **Acesso** | Gestão de usuários, autenticação e perfis | `usuario`, `autenticacao`, `notificacao`, `perfil` |
| **Ambientes** | Estrutura física da instituição: campus, blocos e salas | `campus`, `bloco`, `ambiente` |
| **Armazenamento** | Upload e gerenciamento de arquivos e imagens | `arquivo`, `imagem`, `imagem-arquivo` |
| **Ensino** | Estrutura acadêmica: cursos, disciplinas, turmas, diários e ofertas de formação | `curso`, `disciplina`, `modalidade`, `nivel-formacao`, `oferta-formacao`, `oferta-formacao-periodo`, `oferta-formacao-periodo-etapa`, `turma`, `diario` |
| **Estágio** | Gestão de estágios, empresas parceiras e estagiários | `empresa`, `estagiario`, `estagio`, `responsavel-empresa` |
| **Horários** | Calendários letivos, agendamentos e geração automática de horários | `calendario-letivo`, `calendario-agendamento`, `gerar-horario`, `horario-aula`, `horario-aula-configuracao`, `horario-consulta`, `horario-edicao`, `relatorio`, `turma-horario-aula` |
| **Localidades** | Estados, cidades e endereços (dados IBGE) | `estado`, `cidade`, `endereco` |

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

## Primeiros passos após o setup

Após rodar `just up` (ou abrir o Dev Container) e iniciar o servidor com `bun run dev`, siga estes passos para verificar que tudo está funcionando:

1. **Aplique as migrações do banco de dados:**
   ```bash
   bun run migration:run
   ```
   Isso cria todas as tabelas e insere os dados iniciais (estados do Brasil, etc.).

2. **Acesse a documentação da API:**
   Abra <http://localhost:3701/api/docs> no navegador. Você verá a documentação interativa Scalar/Swagger com todos os endpoints disponíveis.

3. **Acesse o GraphQL Playground:**
   Abra <http://localhost:3701/api/graphql> para explorar queries e mutations GraphQL.

4. **Faça sua primeira requisição autenticada (mock):**
   Em desenvolvimento, com `ENABLE_MOCK_ACCESS_TOKEN=true` (padrão), você pode usar tokens simulados:
   ```bash
   # Exemplo com curl — o token mock.siape.1234 simula um usuário com matrícula 1234
   curl -H "Authorization: Bearer mock.siape.1234" http://localhost:3701/api/ambientes/campus
   ```

5. **Rode os testes para verificar que está tudo ok:**
   ```bash
   bun run test
   ```

---

## Como contribuir

### Conceitos básicos de Git (para quem está começando)

Se você já conhece Git, pule para o [Gitflow do projeto](#gitflow-do-projeto).

| Conceito | O que é |
|----------|---------|
| **Repositório (repo)** | A pasta do projeto com todo o histórico de alterações. Existe uma cópia remota (no GitHub) e uma local (na sua máquina). |
| **Branch** | Uma "ramificação" do código. Permite trabalhar em uma alteração sem afetar o código principal. Pense como uma cópia paralela onde você faz suas mudanças. |
| **Commit** | Um "ponto de salvamento" no histórico. Registra o que mudou, quem mudou e uma mensagem descrevendo a alteração. |
| **Push** | Envia seus commits locais para o repositório remoto (GitHub), tornando-os visíveis para o time. |
| **Pull** | Baixa as alterações mais recentes do repositório remoto para a sua máquina. |
| **Pull Request (PR)** | Uma solicitação para incorporar suas alterações (da sua branch) na branch principal (`main`). Outros devs revisam antes de aprovar. |
| **Merge** | O ato de juntar as alterações de uma branch na outra. Acontece quando um PR é aprovado. |
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

Manter a branch local sincronizada é fundamental para evitar conflitos. Siga este fluxo diariamente:

```mermaid
graph TD
    A["Início do dia"] --> B["git checkout main"]
    B --> C["git pull origin main"]
    C --> D["git checkout minha-branch"]
    D --> E["git merge main"]
    E --> F{Conflitos?}
    F -- Não --> G["Continua trabalhando"]
    F -- Sim --> H["Resolve conflitos"]
    H --> I["git add arquivos-resolvidos"]
    I --> J["git commit"]
    J --> G

    style A fill:#4a90d9,stroke:#2c5f8a,color:#fff
    style F fill:#e8a838,stroke:#b07c1e,color:#fff
    style G fill:#50b86c,stroke:#3a8a50,color:#fff
```

#### Comandos essenciais do dia a dia

```bash
# Atualizar main local com o remoto
git checkout main && git pull origin main

# Voltar para sua branch e incorporar mudanças da main
git checkout feat/minha-feature
git merge main

# Ver o estado atual (o que mudou, o que está staged)
git status

# Ver diferenças não commitadas
git diff

# Ver histórico de commits da branch atual
git log --oneline -10

# Desfazer alterações em um arquivo (CUIDADO: perde as mudanças)
git checkout -- caminho/do/arquivo.ts

# Guardar alterações temporariamente (sem commitar)
git stash                    # Guarda
git stash pop                # Recupera

# Ver branches locais
git branch

# Deletar branch local após merge
git branch -d feat/minha-feature
```

#### Regra: sempre mantenha sua branch atualizada

**Antes de começar a trabalhar** e **antes de abrir um PR**, sincronize com a `main`:

```bash
git checkout main
git pull origin main
git checkout feat/minha-feature
git merge main
```

> Se deixar a branch desatualizada por muito tempo, aumentam as chances de conflitos difíceis de resolver. Sincronize **pelo menos uma vez por dia**.

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
        DB["PostgreSQL"]
        RMQ["RabbitMQ"]
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

    Dev->>Local: git checkout -b feat/minha-feature
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

#### 1. Atualize sua branch `main`

Antes de criar uma nova branch, garanta que sua `main` está atualizada:

```bash
git checkout main        # Muda para a branch main
git pull origin main     # Baixa as alterações mais recentes
```

#### 2. Crie uma feature branch

```bash
git checkout -b feat/minha-feature    # Cria a branch e muda para ela
```

> O `-b` cria a branch. Sem ele, o `checkout` apenas muda para uma branch existente.

#### 3. Faça suas alterações

Edite o código seguindo a [estrutura de módulos](#módulos-de-domínio) e as [boas práticas](#boas-práticas-de-desenvolvimento).

#### 4. Formate e valide (obrigatório)

```bash
bun run code:fix      # Formata o código e corrige problemas de linting
bun run typecheck     # Verifica que nenhum tipo está quebrado
```

> **Por que isso é obrigatório?** `code:fix` garante que o código segue o padrão visual do projeto (indentação, imports, etc.). `typecheck` garante que o TypeScript compila sem erros — se falhar, algo está quebrado e não deve ser commitado.

#### 5. Rode os testes

```bash
bun run test          # Executa os testes unitários
```

> Se algum teste falhar, corrija antes de commitar. Commits com testes quebrados não devem chegar ao PR.

#### 6. Faça o commit

```bash
git add .                                           # Adiciona todas as alterações
git commit -m "feat(campus): adicionar validação de CNPJ"   # Cria o commit com mensagem
```

> `git add .` adiciona **todos** os arquivos modificados. Se quiser adicionar apenas alguns, use `git add caminho/do/arquivo.ts`.

#### 7. Envie para o GitHub

```bash
git push origin feat/minha-feature    # Envia a branch para o repositório remoto
```

> Na primeira vez que fizer push de uma branch nova, o Git pode pedir para configurar o upstream. Use o comando que ele sugerir.

#### 8. Abra um Pull Request

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
| Manter branch atualizada com a `main` (`git pull origin main`) | Trabalhar semanas sem sincronizar |
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
- [ ] Branch atualizada com a `main` (`git pull origin main`).
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
- Endpoint: POST /api/ambientes/campus
- Payload de exemplo (se aplicável)
- Logs de erro (se disponíveis)
```

**Para features:**

```markdown
## Descrição
O que precisa ser implementado e por quê?

## Critérios de aceite
- [ ] Endpoint POST /api/ensino/turmas criado
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
3. Acessar POST /api/ambientes/campus com payload X
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
| **Branch atualizada** | Faça `git pull origin main` antes de pedir revisão. |
| **Resolva conflitos** | Se houver conflitos com a `main`, resolva antes do merge. |

---

## Boas práticas de desenvolvimento

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
- **Não instale `class-validator`** — o projeto usa exclusivamente Zod.

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

O projeto segue princípios rigorosos de engenharia de software para garantir qualidade, manutenibilidade e escalabilidade:

### Design de código

| Princípio | Aplicação no projeto |
|-----------|---------------------|
| **SOLID** | Cada handler tem uma responsabilidade. Repositórios são compostos de interfaces granulares (`IRepositoryCreate`, `IRepositoryFindById`). Dependências são invertidas via Symbols. |
| **DRY** | Schemas Zod definidos uma vez no domínio, reutilizados na apresentação. Metadata de campos definida em `QueryFields`, consumida por REST e GraphQL. |
| **KISS** | Handlers são funções pequenas e diretas. Sem abstrações desnecessárias. |
| **YAGNI** | Não implemente o que ninguém pediu. Não adicione parâmetros "por precaução". |
| **SoC** | Controllers não contêm lógica de negócio. Handlers não fazem queries SQL. Repositórios não validam regras de domínio. |

### Single Source of Truth (SSOT)

Cada dado ou regra tem **uma única origem autoritativa** no projeto. Isso elimina inconsistências e facilita manutenção:

```mermaid
graph TD
    subgraph "Fonte única (domínio)"
        SCHEMA["CampusSchema\n(Zod)"]
        FIELDS["CampusQueryFields\n(FieldMetadata)"]
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
| Metadata de campos (descrição, nullable) | `CampusQueryFields` (FieldMetadata) | Decorators GraphQL (`gqlMetadata`), Swagger (`description`) |
| Tipagem da entidade | `ICampus = z.infer<typeof CampusSchema>` | Todo o código que manipula Campus |
| Configuração de paginação | `paginateConfig()` na infraestrutura | `findAll` de cada repositório |

**O que isso significa na prática:** se uma regra de validação do Campus mudar (ex.: CNPJ passa a ser opcional), você altera **apenas** o `CampusSchema`. A validação na apresentação (DTO) e no domínio (`zodValidate`) atualiza automaticamente, porque ambos consomem o mesmo schema.

### Dependency Injection (DI) — Interfaces e Implementações

O projeto usa **Inversão de Dependência** para desacoplar as camadas. O domínio define **interfaces** (o que precisa), e a infraestrutura fornece **implementações** (como faz).

```mermaid
graph LR
    subgraph "Domínio (interface/port)"
        SYMBOL["Symbol\nICampusRepository"]
        TYPE["Type\nICampusRepository"]
    end

    subgraph "Infraestrutura (implementação/adapter)"
        IMPL["CampusTypeormRepository\n@DeclareImplementation(ICampusRepository)"]
    end

    subgraph "Aplicação (consumidor)"
        HANDLER["CampusCreateCommandHandler\n@Inject(ICampusRepository)"]
    end

    SYMBOL -- "token de injeção" --> HANDLER
    TYPE -- "contrato (tipos)" --> HANDLER
    IMPL -- "registra como provider" --> SYMBOL

    style SYMBOL fill:#e8a838,stroke:#b07c1e,color:#fff
    style TYPE fill:#e8a838,stroke:#b07c1e,color:#fff
    style IMPL fill:#50b86c,stroke:#3a8a50,color:#fff
    style HANDLER fill:#4a90d9,stroke:#2c5f8a,color:#fff
```

**Como funciona passo a passo:**

**1. O domínio define o contrato** (o que o repositório deve fazer):

```typescript
// domain/repositories/campus.repository.ts
export const ICampusRepository = Symbol("ICampusRepository");  // Token de injeção

export type ICampusRepository =                                // Contrato
  IRepositoryFindAll<CampusListQueryResult> &
  IRepositoryFindById<CampusFindOneQueryResult> &
  IRepositoryCreate<ICampus> &
  IRepositoryUpdate<ICampus> &
  IRepositorySoftDelete;
```

**2. A infraestrutura implementa** (como o repositório funciona):

```typescript
// infrastructure.database/campus.repository.ts
@DeclareImplementation(ICampusRepository)                      // Registra no container DI
export class CampusTypeormRepository implements ICampusRepository {
  constructor(
    @Inject(IAppTypeormConnection) private readonly conn: IAppTypeormConnection,
  ) {}

  async create(entity: ICampus): Promise<void> { /* ... usa TypeORM */ }
  async findAll(...) { /* ... usa NestJS-Paginate */ }
}
```

**3. O handler consome** (sem saber da implementação):

```typescript
// application/commands/create/campus-create.command-handler.ts
@DeclareDependency(ICampusCreateCommandHandler)
export class CampusCreateCommandHandler {
  constructor(
    @Inject(ICampusRepository) private readonly repo: ICampusRepository,  // Injeta pela interface
  ) {}

  async execute(ac: IAccessContext, input: unknown) {
    const campus = Campus.create(input);
    await this.repo.create(campus);           // Não sabe se é TypeORM, Prisma ou mock
    return { id: campus.id };
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

## Acessando a aplicação

Após iniciar o servidor com `bun run dev`, acesse:

| Recurso | URL | Descrição |
|---------|-----|-----------|
| Health check | <http://localhost:3701/health> | Verificação de saúde da aplicação (fora do prefixo) |
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
- **Autenticar** — clicar em "Authorize" e inserir o Bearer token (ex.: `mock.siape.1234` em desenvolvimento).
- **Exportar** — baixar o schema OpenAPI em JSON para importar no Postman, Insomnia ou outra ferramenta.

**Como a documentação é gerada:**

Cada controller usa decorators que alimentam o Swagger automaticamente:

```typescript
@ApiTags("Ambientes - Campus")        // Agrupa no menu lateral
@Controller("/ambientes/campus")
export class CampusController {

  @Post()
  @ApiOperation({ summary: "Criar campus" })  // Descrição do endpoint
  async create(@Body() dto: CampusCreateInputRestDto) { ... }
}
```

> Se você criar um novo endpoint, **sempre** adicione `@ApiTags` e `@ApiOperation` para que ele apareça na documentação. Endpoints sem esses decorators não ficam visíveis no Swagger.

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
| `API_PREFIX` | `/api/` | Prefixo global de todas as rotas (REST, docs e GraphQL) |

> Em desenvolvimento, `ENABLE_MOCK_ACCESS_TOKEN=true` permite autenticar usando tokens no formato `mock.siape.<matrícula>`, sem precisar de um servidor Keycloak ativo.

### Sobre o prefixo (`API_PREFIX`)

O `API_PREFIX` define o prefixo **global** de todas as rotas da aplicação — REST, documentação e GraphQL. O valor padrão no `.env.example` é `/api/`.

**Todas as URLs ficam sob esse prefixo:**

| Rota | URL resultante com `/api/` |
|------|---------------------------|
| Endpoints REST | `http://localhost:3701/api/ambientes/campus` |
| Documentação Scalar | `http://localhost:3701/api/docs` |
| Swagger UI | `http://localhost:3701/api/docs/swagger` |
| OpenAPI JSON | `http://localhost:3701/api/docs/openapi.v3.json` |
| GraphQL | `http://localhost:3701/api/graphql` |
| Health check | `http://localhost:3701/health` (excluído do prefixo) |

> **Nota:** o ambiente de produção/desenvolvimento público (`dev.ladesa.com.br`) pode usar um prefixo diferente (ex.: `/api/v1/`), configurado via variável de ambiente no deploy. Localmente, o padrão é `/api/`.

---

## Scripts disponíveis

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
| `typecheck` | Verifica tipagem TypeScript sem compilar — **obrigatório após alterações** |
| `modulecheck` | Valida as fronteiras entre módulos |

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
| `db:reset` | Reset completo do banco (drop + create + seed) |

---

## Banco de dados e migrações

### O que são migrações?

Migrações são scripts que alteram a estrutura do banco de dados de forma versionada e reproduzível — como um "controle de versão" para o banco. Em vez de modificar tabelas manualmente, cada alteração é registrada em um arquivo de migração que pode ser aplicado (ou revertido) em qualquer ambiente.

### Como funciona neste projeto

O projeto usa **TypeORM** com migrações manuais (`synchronize: false` — o banco **nunca** é alterado automaticamente). As migrações ficam em `src/infrastructure.database/typeorm/migrations/` e são nomeadas com timestamp (ex.: `1742515200000-NomeDaMigracao.ts`).

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

**Fluxo ao alterar uma entidade:**

1. Altere a entidade TypeORM em `infrastructure.database/typeorm/`.
2. Gere a migração: `bun run typeorm:generate`.
3. Revise o arquivo gerado em `src/infrastructure.database/typeorm/migrations/`.
4. Aplique: `bun run migration:run`.

### Dados iniciais (seed)

O banco já vem com dados de seed inseridos via migração — por exemplo, todos os estados do Brasil com códigos IBGE. Esses dados são inseridos automaticamente ao rodar `migration:run` pela primeira vez.

### Soft deletes

As entidades usam **exclusão lógica** (soft delete) — registros nunca são removidos fisicamente do banco. Em vez disso, o campo `dateDeleted` é preenchido com a data da exclusão. Triggers no banco controlam as datas automaticamente.

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

Em desenvolvimento, com `ENABLE_MOCK_ACCESS_TOKEN=true` (padrão), é possível usar tokens simulados para testar sem depender do Keycloak:

```bash
# O token mock.siape.1234 simula um usuário com matrícula SIAPE 1234
curl -H "Authorization: Bearer mock.siape.1234" \
  http://localhost:3701/api/ambientes/campus

# Funciona com qualquer matrícula — basta mudar o número
curl -H "Authorization: Bearer mock.siape.5678" \
  http://localhost:3701/api/ensino/turmas
```

> Em produção, `ENABLE_MOCK_ACCESS_TOKEN` deve ser `false`. Tokens reais são emitidos pelo Keycloak e validados via JWKS.

### Autorização

Após a autenticação, cada módulo verifica se o usuário tem **permissão** para realizar a operação solicitada. Isso é feito por um `IPermissionChecker` específico do módulo, com métodos:

- `ensureCanCreate(accessContext)` — verifica se o usuário pode criar.
- `ensureCanUpdate(accessContext)` — verifica se o usuário pode atualizar.
- `ensureCanDelete(accessContext)` — verifica se o usuário pode excluir.

O padrão é **"throw on deny"**: se o usuário não tiver permissão, uma exceção `ForbiddenError` (HTTP 403) é lançada automaticamente, e a operação é abortada.

Operações de **leitura** (queries) geralmente são públicas ou permitem acesso com/sem autenticação — o `accessContext` pode ser `null`.

---

## GraphQL

A API GraphQL usa **Apollo Server** com abordagem **code-first** — o schema é gerado automaticamente a partir de classes TypeScript decoradas com `@ObjectType()` e `@Field()`. Não é necessário escrever arquivos `.graphql` manualmente.

| Configuração | Valor |
|-------------|-------|
| **Endpoint** | `http://localhost:3701/api/graphql` |
| **Playground** | GraphiQL habilitado em desenvolvimento |
| **Introspection** | habilitada |
| **Cache** | LRU em memória (100 MB, TTL de 5 minutos) |

**Exemplo de query:**

```graphql
# Buscar um campus por ID
query {
  campusFindOne(id: "uuid-do-campus") {
    id
    nomeFantasia
    razaoSocial
    apelido
    cnpj
  }
}
```

**Compartilhamento de lógica:** os resolvers GraphQL (em `presentation.graphql/`) reutilizam os **mesmos command/query handlers** da API REST. Isso significa que a lógica de negócio, validação e autorização são idênticas independentemente de a requisição vir via REST ou GraphQL.

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

O projeto usa o [Biome](https://biomejs.dev/) como formatador e linter único:

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

```bash
# Corrigir formatação e linting
bun run code:fix

# Apenas verificar (sem alterar arquivos)
bun run code:check
```

O Dev Container já configura o Biome como formatador padrão com **auto-format ao salvar** — ou seja, ao salvar um arquivo no VS Code, ele é formatado automaticamente.

---

## Testes

O projeto usa [Vitest](https://vitest.dev/) como framework de testes.

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

Mocks de repositório, factories e utilitários de teste ficam em `src/test/`. Ao escrever novos testes, reutilize os helpers existentes em vez de criar mocks ad hoc.

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
