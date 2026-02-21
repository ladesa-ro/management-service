# Management Service

API REST/GraphQL de gerenciamento academico desenvolvida com NestJS, TypeORM e PostgreSQL, seguindo principios de arquitetura hexagonal.

[![CI/CD - Management Service][action-build-deploy-dev-src]][action-build-deploy-dev-href]

**Ambiente de desenvolvimento publico**: <https://dev.ladesa.com.br/api/v1/docs/>

---

## Sumario

- [Por que containers?](#por-que-containers)
- [Pre-requisitos](#pre-requisitos)
- [Clonando o repositorio](#clonando-o-repositorio)
- [Rodando o projeto](#rodando-o-projeto)
  - [Caminho A: Dev Container (recomendado)](#caminho-a-dev-container-recomendado)
  - [Caminho B: justfile (sem Dev Container)](#caminho-b-justfile-sem-dev-container)
- [Acessando a aplicacao](#acessando-a-aplicacao)
- [Stack tecnologico](#stack-tecnologico)
- [Licenca](#licenca)

---

## Por que containers?

No mundo do desenvolvimento de software, existem diversas linguagens de programacao (TypeScript, Python, Go...) e cada uma possui varias versoes diferentes, que podem ter mudancas significativas entre si. Alem disso, cada projeto pode depender de ferramentas e bibliotecas especificas, cada qual com suas proprias versoes.

Ter tudo isso instalado e corretamente configurado na maquina de cada desenvolvedor - e nos ambientes de producao - pode rapidamente se tornar um pesadelo: conflitos de versao, dependencias incompativeis, aquele classico "na minha maquina funciona".

**Containers** resolvem isso. Um container empacota um sistema operacional minimo junto com todas as ferramentas, bibliotecas e configuracoes que o projeto precisa, de forma isolada e reproduzivel. Isso garante que **todos os desenvolvedores** - independentemente do sistema operacional ou do que ja tem instalado - trabalhem com exatamente o mesmo ambiente.

Na pratica, isso significa que voce **nao precisa instalar** Bun, Node.js, PostgreSQL, nem nenhuma outra dependencia diretamente na sua maquina. Tudo roda dentro do container.

---

## Pre-requisitos

Para contribuir com este projeto, voce precisa de:

### Container runtime

| Opcao | Instalacao |
|-------|------------|
| **Docker + Docker Compose** (v2+) **(recomendado)** | [docs.docker.com](https://docs.docker.com/get-docker/) |
| Podman + Podman Compose | [podman.io](https://podman.io/getting-started/installation) |

> **Nota sobre Podman:** o projeto possui configuracoes de compatibilidade com Podman (`userns_mode`, `x-podman`), mas o **Docker e o runtime recomendado**. O Podman pode funcionar, porem nao e garantido.
>
> Se optar pelo Podman, defina a variavel de ambiente `OCI_RUNTIME=podman` antes de rodar os comandos.

### just (command runner)

O projeto usa o [just](https://github.com/casey/just) como task runner no lugar do Make.

| Plataforma | Instalacao |
|------------|------------|
| Linux (curl) | `curl --proto '=https' --tlsv1.2 -sSf https://just.systems/install.sh \| bash -s -- --to /usr/local/bin` |
| macOS (Homebrew) | `brew install just` |
| Windows (Scoop) | `scoop install just` |
| Cargo | `cargo install just` |

Mais opcoes em: <https://github.com/casey/just#installation>

### Git

Necessario para clonar e versionar o codigo-fonte.

- Tutorial de instalacao e configuracao: <https://docs.ladesa.com.br/docs/developers-guide/tutorials/source-code/git/>

### Editor de codigo (escolha um)

| Editor | Dev Container |
|--------|---------------|
| **VS Code** | Suporte nativo via extensao [Dev Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) |
| **WebStorm** | Suporte via [Remote Development](https://www.jetbrains.com/help/webstorm/connect-to-devcontainer.html) |

### Familiaridade com linha de comando

Voce vai precisar usar o terminal para clonar o repositorio, executar comandos e interagir com o container.

- Tutorial basico: <https://docs.ladesa.com.br/docs/developers-guide/tutorials/os/command-line/>

---

## Clonando o repositorio

```bash
git clone https://github.com/ladesa-ro/management-service.git
cd management-service
```

> O `just setup` ja copia automaticamente os arquivos `.example` para voce. Nenhuma configuracao manual e necessaria para comecar.

---

## Rodando o projeto

Existem dois caminhos para subir o ambiente de desenvolvimento. Escolha o que preferir:

| Caminho | Quando usar |
|---------|-------------|
| **A: Dev Container** | Voce usa VS Code ou WebStorm e quer que o editor abra diretamente dentro do container, com extensoes, terminal e tudo configurado automaticamente. |
| **B: justfile** | Voce prefere gerenciar os containers manualmente pelo terminal, independentemente do editor. |

### Caminho A: Dev Container (recomendado)

O [Dev Container](https://containers.dev/) configura automaticamente todo o ambiente de desenvolvimento - extensoes, formatacao, terminal, portas - dentro do container Docker/Podman, sem precisar instalar nada localmente.

#### VS Code

1. Instale a extensao **Dev Containers** (`ms-vscode-remote.remote-containers`).
2. Abra a pasta do projeto no VS Code.
3. Quando aparecer a notificacao _"Reopen in Container"_, clique nela.
   - Ou use o Command Palette (`Ctrl+Shift+P`) e selecione **Dev Containers: Reopen in Container**.
4. Aguarde o build do container e a instalacao das dependencias (primeira vez pode demorar alguns minutos).
5. Abra o terminal integrado (`` Ctrl+` ``) e inicie o servidor:

```bash
cd src/app
bun run dev
```

#### WebStorm

1. Abra a pasta do projeto no WebStorm.
2. Va em **File > Remote Development > Dev Containers** e selecione o `devcontainer.json` do projeto.
3. Aguarde o build e a inicializacao do container.
4. Abra o terminal integrado e inicie o servidor:

```bash
cd src/app
bun run dev
```

#### O que o Dev Container configura para voce

- Extensoes do editor (Biome, Vitest, GitLens, GraphQL, etc.)
- Formatacao automatica ao salvar (Biome)
- Terminal padrao: `zsh` (com Oh My Zsh)
- Portas encaminhadas: `3701` (API), `9229` (debug), `5432` (PostgreSQL)
- Instalacao automatica de dependencias (`bun install`)

---

### Caminho B: justfile (sem Dev Container)

Se voce prefere nao usar Dev Container, o `justfile` oferece receitas para gerenciar os containers pelo terminal.

#### 1. Configurar e subir o ambiente

```bash
just up
```

Esse unico comando faz tudo:

- Copia os arquivos `.env` a partir dos exemplos (se ainda nao existirem)
- Builda as imagens dos containers (apenas se houve mudancas)
- Sobe os containers (aplicacao + PostgreSQL + RabbitMQ)
- Instala as dependencias (`bun install`)
- Abre um shell `zsh` dentro do container da aplicacao

#### 2. Iniciar o servidor de desenvolvimento

Voce ja estara dentro do container apos o `just up`. Basta rodar:

```bash
bun run dev
```

#### Receitas disponiveis

| Comando | O que faz |
|---------|-----------|
| `just up` | Sobe tudo e abre shell no container |
| `just start` | Sobe os containers em background (sem abrir shell) |
| `just stop` | Para os containers (sem remover) |
| `just down` | Para e remove os containers |
| `just cleanup` | Para, remove containers **e volumes** (reset completo) |
| `just logs` | Mostra logs dos containers em tempo real |
| `just shell-1000` | Abre shell como usuario `happy` (uid 1000) |
| `just shell-root` | Abre shell como `root` |
| `just build` | Builda a imagem (apenas se inputs mudaram) |
| `just rebuild` | Forca rebuild da imagem |
| `just compose <args>` | Passa argumentos direto pro `docker compose` |

> **Usando Podman?** Defina a variavel `OCI_RUNTIME=podman` antes dos comandos:
> ```bash
> OCI_RUNTIME=podman just up
> ```

---

## Acessando a aplicacao

Apos iniciar o servidor com `bun run dev`, acesse:

| Recurso | URL |
|---------|-----|
| API REST | <http://localhost:3701> |
| Documentacao Swagger | <http://localhost:3701/api/v1/docs> |
| GraphQL Playground | <http://localhost:3701/graphql> |

---

## Stack tecnologico

| Categoria | Tecnologia |
|-----------|------------|
| Runtime | [Bun](https://bun.sh/) |
| Framework | [NestJS](https://nestjs.com/) |
| ORM | [TypeORM](https://typeorm.io/) |
| Banco de Dados | [PostgreSQL 15](https://www.postgresql.org/) |
| Documentacao API | [Swagger/OpenAPI](https://swagger.io/) + [Scalar](https://scalar.com/) |
| GraphQL | Apollo Server |
| Autenticacao | Keycloak + OAuth2/OIDC |
| Containerizacao | Docker (recomendado) / Podman |
| Task Runner | [just](https://github.com/casey/just) |
| Linting/Formatacao | [Biome](https://biomejs.dev/) |
| Testes | [Vitest](https://vitest.dev/) |

---

## Licenca

[MIT](./LICENSE) &copy; 2024 &ndash; presente, Ladesa.

<!-- Links dos Badges -->

[action-build-deploy-dev-src]: https://img.shields.io/github/actions/workflow/status/ladesa-ro/management-service/build-deploy.dev.yml?style=flat&logo=github&logoColor=white&label=Deploy&branch=main&labelColor=18181B
[action-build-deploy-dev-href]: https://github.com/ladesa-ro/management-service/actions/workflows/build-deploy.dev.yml?query=branch%3Amain
