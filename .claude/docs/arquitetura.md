# Arquitetura

## Hexagonal (Ports & Adapters)

O fluxo de dependência aponta para dentro. Nunca inverta:

```
Apresentação → Aplicação → Domínio ← Infraestrutura
```

- **Domínio** (`src/domain/`) — entidades, contratos (interfaces), erros, validação, scalars. Zero dependência de frameworks.
- **Aplicação** (`src/application/`) — command/query handlers, autorização, helpers. Depende apenas do domínio.
- **Infraestrutura** (`src/infrastructure.*/`) — implementações concretas. Implementa contratos do domínio.
- **Apresentação** (`src/modules/*/presentation.rest/`, `presentation.graphql/`) — controllers REST e resolvers GraphQL. Chama a camada de aplicação.

## CQRS

- **Commands** (`Create`, `Update`, `Delete`) alteram estado.
- **Queries** (`FindById`, `FindAll`) apenas leem.
- Cada handler recebe `IAccessContext` com o usuário autenticado.

## Estrutura de módulos

Cada módulo em `src/modules/{grupo}/{nome}/` segue:

```
domain/
├── authorization/           # Contrato IPermissionChecker
├── commands/                # Definições de commands (input types)
├── queries/                 # Definições de queries (input/output types)
├── repositories/            # Contrato do repositório (ICampusRepository)
├── shared/                  # QueryFields, metadata de campos
├── {entidade}.ts            # Classe de domínio com factory methods
└── {entidade}.schemas.ts    # Schemas Zod (CampusSchema, CampusCreateSchema, CampusUpdateSchema)

application/
├── authorization/           # Implementação do permission checker
├── commands/                # Command handlers (Create, Update, Delete)
└── queries/                 # Query handlers (FindOne, List)

infrastructure.database/
└── typeorm/                 # Entidade TypeORM + adapter do repositório + mapper domain ↔ entity

presentation.rest/           # Controllers REST (Swagger)
presentation.graphql/        # Resolvers GraphQL (quando aplicável)
```

## Grupos de módulos

| Grupo | Módulos |
|-------|---------|
| `acesso/` | `autenticacao`, `usuario` (inclui `perfil` como sub-entidade) |
| `ambientes/` | `ambiente`, `bloco`, `campus` |
| `armazenamento/` | `arquivo`, `imagem`, `imagem-arquivo` |
| `ensino/` | `curso`, `diario`, `disciplina`, `modalidade`, `nivel-formacao`, `oferta-formacao`, `turma`, etc. |
| `estagio/` | `empresa`, `estagiario`, `estagio`, `responsavel-empresa` |
| `horarios/` | `calendario-letivo`, `calendario-agendamento`, `gerar-horario`, `horarios-de-aula` (inclui `horario-aula-configuracao-item`), `horario-consulta`, `horario-edicao`, `turma-disponibilidade` (inclui `turma-disponibilidade-configuracao`, `turma-disponibilidade-configuracao-item`), `relatorio` |
| `localidades/` | `cidade`, `endereco`, `estado` |

## Diretórios compartilhados

| Diretório | Propósito |
|-----------|-----------|
| `src/domain/` | Abstrações compartilhadas: entidades base, scalars (`IdUuid`, `ScalarDateTimeString`), DI, metadata |
| `src/application/` | Erros de aplicação, helpers, contratos de paginação |
| `src/shared/` | Utilitários cross-cutting: validação Zod, mappers, decorators de apresentação |
| `src/infrastructure.database/` | TypeORM config, migrações, paginação, database command services (caminho preferido) |
| `src/infrastructure.graphql/` | Apollo Server config, DTOs GraphQL base |
| `src/infrastructure.identity-provider/` | Keycloak, OIDC, JWKS |
| `src/infrastructure.authorization/` | Implementações de permissão |
| `src/infrastructure.logging/` | Correlation ID, performance hooks |
| `src/infrastructure.message-broker/` | RabbitMQ via Rascal |
| `src/infrastructure.storage/` | Armazenamento de arquivos (filesystem) |
| `src/server/` | Bootstrap NestJS, filtros de exceção, interceptors, auth, access context |
| `src/utils/` | Utilitários puros (datas, helpers) |
| `src/commands/` | Scripts CLI (dev, test, migrations) |
| `src/test/` | Helpers de teste (mocks, factories) |
| `src/modules/@shared/` | **LEGADO — em remoção.** Nunca importar daqui. |
