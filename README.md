# Web API Integrada

[![CI/CD - Release][action-release-src]][action-release-href]
[![Autofix][action-autofix-src]][action-autofix-href]

## Ambientes

Instância Pública de Desenvolvimento: <https://dev.ladesa.com.br/api>.

## Integrações

### Cliente JavaScript

[![NPM Package: @ladesa-ro/api-client-fetch latest version][npm-package-latest-version-src]][npm-package-versions-href]

```sh
npm install @ladesa-ro/api-client-fetch@latest
```

## Desenvolvimento

### Obter o código fonte do projeto

```bash
git clone https://github.com/ladesa-ro/api.git
cd api
```

### Estrutura de Pastas

[`./api-service`](packages/api-service/)

```bash
cd api-service
```

> A pasta API service contém o código fonte do Serviço de API, que utiliza o framework NestJS no NodeJS.

### Serviços do [docker-compose.yml](packages/docker-compose.yml)

| Host            | Endereço         | Descrição                | Plataforma Base                   |
| --------------- | ---------------- | ------------------------ | --------------------------------- |
| `ladesa-api`    | `localhost:3701` | Aplicação NodeJS.        | `docker.io/library/node:22`       |
| `ladesa-api-db` | `localhost:5432` | Banco de dados postgres. | `docker.io/bitnami/postgresql:15` |

### Scripts Make

O projeto conta com um [arquivo make](packages/Makefile) que comporta scrips destinados ao desenvolvimento da aplicação.

<details>
<summary>Visão geral dos scripts make</summary>

- `setup`

  ```sh
  make setup;
  ```

  > Configura o ambiente de deselvolvimento, como a criação da rede ladesa-net e os arquivos .env.

- `up`

  ```sh
  make up;
  ```

  > Inicia os containers da api e do banco de dados usando o docker.

- `shell`

  ```sh
  make shell;
  ```

  > Inicia os containers docker e abre o bash na aplicação node.

  - Após este processo, talvez você queira executar dentro do shell do container:

    ```sh
    bun run start:dev;
    ```

- `down`

  ```sh
  make down;
  ```

  > Encerra todos os containers.

- `cleanup`

  ```sh
  make cleanup;
  ```

  > Encerra todos os containers e remove os containers e volumes associados.

- `logs`

  ```sh
  make logs;
  ```

  > Mostra os registros dos containers

</details>

## Licença

[MIT](./LICENSE) © 2024 – presente, Ladesa.

<!-- Links -->

<!-- Badges -->

<!-- Badges / Actions / Release  -->

[action-release-src]: https://img.shields.io/github/actions/workflow/status/ladesa-ro/api/ci-release.yml?style=flat&logo=github&logoColor=white&label=Release&branch=development&labelColor=18181B
[action-release-href]: https://github.com/ladesa-ro/api/actions/workflows/ci-release.yml?query=branch%3Adevelopment

<!-- Badges / Actions / Autofix  -->

[action-autofix-src]: https://img.shields.io/github/actions/workflow/status/ladesa-ro/api/autofix.yml?style=flat&logo=github&logoColor=white&label=Generate%20Integrations&branch=development&labelColor=18181B
[action-autofix-href]: https://github.com/ladesa-ro/api/actions/workflows/autofix.yml?query=branch%3Adevelopment

<!-- Badges / Integrations / NPM -->

[npm-package-versions-href]: https://www.npmjs.com/package/@ladesa-ro/api-client-fetch?activeTab=versions

<!-- Badges / Integrations / NPM / Latest -->

[npm-package-latest-version-src]: https://img.shields.io/badge/dynamic/json?url=https://registry.npmjs.com/@ladesa-ro/api-client-fetch&query=$[%22dist-tags%22].latest&prefix=v&style=flat&logo=npm&logoColor=white&label=@latest&labelColor=%23CB3837&style=flat&colorA=18181B&colorB=ffffff
