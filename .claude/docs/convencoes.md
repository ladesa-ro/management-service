# Convenções de código

## Linguagem (PT-BR / EN)

- **Português (pt-BR):** nomes de entidades de domínio e **todas** as suas propriedades (`nomeFantasia`, `razaoSocial`, `matricula`, `Campus`, `Turma`, `DiarioEntity`).
- **Inglês:** absolutamente todo o resto — infraestrutura, framework, métodos, utilitários, variáveis locais, nomes de arquivos não-domínio (`dateCreated`, `findAll`, `IPermissionChecker`, `CommandHandler`, `setup`, `config`).

## Nomenclatura de arquivos

| Tipo | Padrão | Exemplo |
|------|--------|---------|
| Interface | `*.interface.ts` | `conn.interface.ts` |
| Provider | `*.provider.ts` | `conn.provider.ts` |
| Entidade de domínio | `{nome}.ts` | `campus.ts` |
| Schemas Zod | `{nome}.schemas.ts` | `campus.schemas.ts` |
| Query fields | `{nome}.query-fields.ts` | `campus.query-fields.ts` |
| DTO REST | sufixo `RestDto` | `CampusFindOneOutputRestDto` |
| DTO GraphQL | sufixo `GraphQlDto` | `CampusFindOneOutputGraphQlDto` |
| Domain query/command | sem sufixo de apresentação | `CampusFindOneQueryResult` |
| Command handler | `{nome}-{ação}.command-handler.ts` | `campus-create.command-handler.ts` |
| Query handler | `{nome}-{ação}.query-handler.ts` | `campus-find-one.query-handler.ts` |
| Controller REST | `{nome}.controller.ts` | `campus.controller.ts` |
| Resolver GraphQL | `{nome}.resolver.ts` | `campus.resolver.ts` |
| Repositório (domínio) | `{nome}.repository.ts` | `campus.repository.ts` (em `domain/repositories/`) |
| Repositório (infra) | `{nome}.repository.ts` | `campus.repository.ts` (em `infrastructure.database/`) |
| Database command service | `{nome}.service.ts` | `migration-run.service.ts` (em `infrastructure.database/services/`) |
| Database command interface | `{nome}.service.interface.ts` | `migration-run.service.interface.ts` (em `infrastructure.database/services/interfaces/`) |

## Imports

- Alias: `@/*` aponta para `src/*`.
- **Sem extensões** nos imports — nunca adicionar `.js` ou `.ts`.
- Nunca importar de `modules/@shared` (legado em remoção). Usar: `@/domain/`, `@/application/`, `@/shared/`, `@/infrastructure.*`.
- Biome organiza imports automaticamente — não reordenar manualmente.

## Tipagem

- **Zero `as any`** — defina interfaces/tipos adequados. Se o tipo não encaixa, crie uma interface.
- Propriedades de entidades de domínio usam type aliases de `@/domain/abstractions/scalars`:
  - `id: IdUuid` (não `string`)
  - `id: IdNumeric` (não `number`)
  - `dateCreated: ScalarDateTimeString` (não `string`)
- `ICampus = z.infer<typeof CampusSchema>` — tipo inferido do schema Zod.

## Validação

- **Zod** é o único sistema. `class-validator` e `class-transformer` estão desinstalados.
- Validação em duas camadas:
  1. **Apresentação** — DTOs com `static schema` → `ZodGlobalValidationPipe`.
  2. **Domínio** — `zodValidate()` nos factory methods como rede de segurança.
- `zodValidate(entityName, schema, data)` — lança `ValidationError` com detalhes por campo.

## Transações

- Automáticas via `TransactionInterceptor` global apenas para **operações de escrita** (POST/PUT/PATCH/DELETE em REST, mutations em GraphQL). **Nunca** chamar `.transaction()`.
- Operações de leitura (GET/HEAD em REST, queries em GraphQL) **não** abrem transação.
- Repositórios participam da transação via `AppTypeormConnectionProxy` + `AsyncLocalStorage`.

## Permission checkers

- Cada módulo implementa `IPermissionChecker` com `ensureCanCreate`, `ensureCanUpdate`, `ensureCanDelete`.
- Padrão "throw on deny" — lança `ForbiddenError`.
- No-ops são intencionais — não sinalize como anti-pattern.

## FieldMetadata

- `gqlMetadata` retorna `{ description, nullable, defaultValue }` — DTO não especifica manualmente.
- Nunca spread `...SharedFields`. Pick explícito: `{ page: SharedFields.page, limit: SharedFields.limit }`.

## Formatação (Biome)

- **Largura de linha:** 100 caracteres.
- **Indentação:** 2 espaços.
- **Ponto e vírgula:** sempre.
- **Imports:** organizados automaticamente, não utilizados removidos.
- **`const`:** obrigatório quando possível.
- **Trailing commas:** todas.

## TypeScript

- **Target:** ES2022.
- **Module:** NodeNext.
- **Strict mode:** habilitado.
- **Path alias:** `@/*` → `./*` (relativo a `src/`).
- **Incremental compilation** habilitada.
