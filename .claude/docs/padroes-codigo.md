# Padrões de código — com exemplos reais

## Entidade de domínio

Entidades usam constructor privado, factory methods estáticos (`create`, `load`) e validação Zod:

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
    // ... demais campos
    instance.dateCreated = getNowISO();
    instance.dateUpdated = getNowISO();
    instance.dateDeleted = null;
    return instance;
  }

  static load(dados: unknown): Campus {
    const parsed = zodValidate(Campus.entityName, CampusSchema, dados);
    const instance = new Campus();
    // ... atribui todos os campos do parsed
    return instance;
  }

  update(dados: unknown): void {
    const parsed = zodValidate(Campus.entityName, CampusUpdateSchema, dados);
    if (parsed.nomeFantasia !== undefined) this.nomeFantasia = parsed.nomeFantasia;
    // ... demais campos opcionais
    this.dateUpdated = getNowISO();
    zodValidate(Campus.entityName, CampusSchema, this);
  }
}
```

**Regras:**
- Constructor sempre `private`.
- `create` gera UUID v7 e datas. `load` reconstrói de dados existentes. `update` é parcial.
- `update` chama `zodValidate` no final com o schema completo para garantir consistência.
- Exceção: `Estado` e `Cidade` aceitam `id` no `create` (códigos IBGE).

## Schemas Zod

```typescript
// src/modules/ambientes/campus/domain/campus.schemas.ts
import { z } from "zod";
import { EntityBaseSchema } from "@/domain/entities/entity-base.schemas";
import { EnderecoFindOneQueryResultSchema } from "@/modules/localidades/endereco/domain/queries";

export const CampusSchema = EntityBaseSchema.extend({
  nomeFantasia: z.string().min(1),
  razaoSocial: z.string().min(1),
  apelido: z.string().min(1),
  cnpj: z.string().min(1),
  endereco: z.object({ id: z.string().uuid() }).or(EnderecoFindOneQueryResultSchema),
});

export const CampusCreateSchema = CampusSchema.omit({
  id: true,
  dateCreated: true,
  dateUpdated: true,
  dateDeleted: true,
});

export const CampusUpdateSchema = CampusCreateSchema.partial();
```

**Regras:**
- `EntityBaseSchema` fornece `id`, `dateCreated`, `dateUpdated`, `dateDeleted`.
- `CreateSchema` = schema base sem id e datas (gerados automaticamente).
- `UpdateSchema` = `CreateSchema.partial()`.
- Exceção: `Estado`/`Cidade` — `CreateSchema = EntitySchema` (id fornecido).

## Command handler

```typescript
// src/modules/ambientes/campus/application/commands/create/campus-create.command-handler.ts
import { Inject } from "@nestjs/common";
import type { IAccessContext } from "@/domain/abstractions";
import { DeclareDependency } from "@/domain/dependency-injection";
import type { ICampusRepository } from "../../../domain/repositories/campus.repository";
import type { ICampusPermissionChecker } from "../../../domain/authorization/campus.permission-checker";
import { Campus } from "../../../domain/campus";

export const ICampusCreateCommandHandler = Symbol("ICampusCreateCommandHandler");

export type ICampusCreateCommandHandler = {
  execute(accessContext: IAccessContext, input: unknown): Promise<{ id: string }>;
};

@DeclareDependency(ICampusCreateCommandHandler)
export class CampusCreateCommandHandler implements ICampusCreateCommandHandler {
  constructor(
    @Inject(ICampusRepository) private readonly campusRepository: ICampusRepository,
    @Inject(ICampusPermissionChecker) private readonly permissionChecker: ICampusPermissionChecker,
  ) {}

  async execute(accessContext: IAccessContext, input: unknown) {
    await this.permissionChecker.ensureCanCreate(accessContext);
    const campus = Campus.create(input);
    await this.campusRepository.create(campus);
    return { id: campus.id };
  }
}
```

**Regras:**
- Handler sempre verifica permissão ANTES de operar.
- `input` é `unknown` — a entidade de domínio valida via Zod.
- Nunca chamar `.transaction()` — o interceptor global cuida disso.

## Query handler

```typescript
// src/modules/ambientes/campus/application/queries/find-one/campus-find-one.query-handler.ts
@DeclareDependency(ICampusFindOneQueryHandler)
export class CampusFindOneQueryHandler implements ICampusFindOneQueryHandler {
  constructor(
    @Inject(ICampusRepository) private readonly campusRepository: ICampusRepository,
  ) {}

  async execute(
    accessContext: IAccessContext | null,
    dto: { id: string },
  ) {
    return this.campusRepository.getFindOneQueryResult(accessContext, dto);
  }
}
```

## Contrato de repositório (new-style CQRS)

```typescript
// src/modules/ambientes/campus/domain/repositories/campus.repository.interface.ts
import type {
  IRepositoryGetFindAllQueryResult,
  IRepositoryGetFindOneQueryResult,
  IRepositoryLoadById,
  IRepositorySave,
  IRepositorySoftDeleteById,
} from "@/domain/abstractions";

export const ICampusRepository = Symbol("ICampusRepository");

export interface ICampusRepository {
  // Write side — command handlers
  loadById: IRepositoryLoadById<Campus>;
  save: IRepositorySave<Campus>;
  softDeleteById: IRepositorySoftDeleteById;

  // Read side — query handlers
  getFindOneQueryResult: IRepositoryGetFindOneQueryResult<CampusFindOneQuery, CampusFindOneQueryResult>;
  getFindAllQueryResult: IRepositoryGetFindAllQueryResult<CampusListQuery, CampusListQueryResult>;
}
```

**Regras:**
- Repositório é um Symbol + `interface` (não type alias `&`).
- Write side usa `loadById`/`save`/`softDeleteById` (aggregate pattern).
- Read side usa `getFindOneQueryResult`/`getFindAllQueryResult` (query result hidratado).
- Type aliases (`IRepositoryLoadById`, etc.) vêm de `@/domain/abstractions` — `TId` default é `string`.
- Repos com IDs sempre string (UUID) usam o default. Repos com IDs numéricos: `IRepositorySoftDeleteById<number>`.
- Repos que não têm aggregate pattern (ex: `usuario`, `perfil`) declaram `create`/`update` explicitamente.

## TypeORM adapter (infraestrutura)

```typescript
// src/modules/ambientes/campus/infrastructure.database/campus.repository.ts
@DeclareImplementation(ICampusRepository)
export class CampusTypeormRepository implements ICampusRepository {
  constructor(
    @Inject(IAppTypeormConnection) private readonly conn: IAppTypeormConnection,
  ) {}

  async create(entity: ICampus): Promise<void> {
    const repo = this.conn.getRepository(CampusEntity);
    // ... mapeia domínio → TypeORM e salva
  }

  async findAll(accessContext: IAccessContext | null, dto: unknown) {
    const repo = this.conn.getRepository(CampusEntity);
    return NestJsPaginateAdapter.paginate(repo, dto, paginateConfig(/* ... */));
  }
  // ... demais métodos
}
```

**Regras:**
- Usa `@DeclareImplementation` para registrar como provider do Symbol.
- Acessa o banco via `IAppTypeormConnection` (proxy que participa da transação global).
- Paginação via `NestJsPaginateAdapter` com `nestjs-paginate`.

## Permission checker

```typescript
// Interface (domínio)
export const ICampusPermissionChecker = Symbol("ICampusPermissionChecker");
export type ICampusPermissionChecker = IPermissionChecker;

// Implementação (aplicação)
@DeclareDependency(ICampusPermissionChecker)
export class CampusPermissionChecker implements ICampusPermissionChecker {
  async ensureCanCreate(_accessContext: IAccessContext): Promise<void> {}
  async ensureCanUpdate(_accessContext: IAccessContext): Promise<void> {}
  async ensureCanDelete(_accessContext: IAccessContext): Promise<void> {}
}
```

**Regras:**
- No-ops são intencionais. Não sinalize como anti-pattern.
- Padrão "throw on deny" — quando implementado, lança `ForbiddenError`.

## Controller REST

```typescript
// src/modules/ambientes/campus/presentation.rest/campus.controller.ts
@ApiTags("Ambientes - Campus")
@Controller("/ambientes/campus")
export class CampusController {
  constructor(
    @Inject(ICampusCreateCommandHandler) private readonly createHandler: ICampusCreateCommandHandler,
    @Inject(ICampusFindOneQueryHandler) private readonly findOneHandler: ICampusFindOneQueryHandler,
    @Inject(ICampusListQueryHandler) private readonly listHandler: ICampusListQueryHandler,
    // ...
  ) {}

  @Post()
  @ApiOperation({ summary: "Criar campus" })
  async create(@RequestActor() actor: IRequestActor, @Body() dto: CampusCreateInputRestDto) {
    return this.createHandler.execute({ requestActor: actor }, dto);
  }

  @Get(":id")
  async findOne(@RequestActor() actor: IRequestActor | null, @Param("id") id: string) {
    return this.findOneHandler.execute(actor ? { requestActor: actor } : null, { id });
  }
}
```

**Regras:**
- `@RequestActor()` injeta o usuário autenticado (pode ser `null` para rotas públicas).
- DTOs REST usam `static schema` para validação automática via `ZodGlobalValidationPipe`.
- Swagger decorators em todas as rotas.

## DTO REST com validação Zod

```typescript
// src/modules/ambientes/campus/presentation.rest/dto/campus-create.input.rest-dto.ts
export class CampusCreateInputRestDto {
  static schema = CampusCreateSchema;

  nomeFantasia!: string;
  razaoSocial!: string;
  apelido!: string;
  cnpj!: string;
  endereco!: { id: string };
}
```

**Regras:**
- `static schema` é obrigatório — o `ZodGlobalValidationPipe` global usa ele para validar.
- O schema é reutilizado do domínio (`CampusCreateSchema`).

## Resolver GraphQL

```typescript
@ObjectType("Campus")
export class CampusFindOneOutputGraphQlDto {
  @Field(() => String, { ...CampusQueryFields.id.gqlMetadata })
  id!: string;

  @Field(() => String, { ...CampusQueryFields.nomeFantasia.gqlMetadata })
  nomeFantasia!: string;
  // ...
}

@Resolver(() => CampusFindOneOutputGraphQlDto)
export class CampusResolver {
  @Query(() => CampusFindOneOutputGraphQlDto)
  async campusFindOne(@Args("id") id: string, @GqlAccessContext() ac: IAccessContext | null) {
    return this.findOneHandler.execute(ac, { id });
  }
}
```

**Regras:**
- Abordagem code-first — schema gerado dos decorators TypeScript.
- `gqlMetadata` dos `QueryFields` já inclui `description`, `nullable`, `defaultValue`.
- Módulos sem GraphQL (`autenticacao`, `arquivo`, `estagio`, `gerar-horario`) ficam REST-only.

## FieldMetadata e QueryFields

```typescript
// src/modules/ambientes/campus/domain/shared/campus.query-fields.ts
export const CampusQueryFields = {
  id: new FieldMetadata({ description: "ID do campus", nullable: false }),
  nomeFantasia: new FieldMetadata({ description: "Nome fantasia", nullable: false }),
  razaoSocial: new FieldMetadata({ description: "Razão social", nullable: false }),
  // ...
};
```

**Regras:**
- `gqlMetadata` deve retornar `{ description, nullable, defaultValue }` direto — DTO não especifica manualmente.
- Nunca fazer spread `...SharedFields`. Sempre pick explícito: `{ page: SharedFields.page, limit: SharedFields.limit }`.

## Dependency Injection (`DeclareDependency` / `DeclareImplementation`)

```typescript
// Declarando que um handler PRECISA ser injetado
@DeclareDependency(ICampusCreateCommandHandler)
export class CampusCreateCommandHandler { ... }

// Declarando que uma classe IMPLEMENTA um contrato
@DeclareImplementation(ICampusRepository)
export class CampusTypeormRepository { ... }
```

**Regras:**
- Esse acoplamento domínio ↔ NestJS é intencional e aceito pragmaticamente.
- Símbolos (Symbols) são usados como tokens de injeção. Definidos junto ao tipo/interface.

## Transações automáticas

Todas as requisições HTTP são envelopadas em transação pelo `TransactionInterceptor` global:

```
Requisição → TransactionInterceptor → AsyncLocalStorage → Handler → Repos (via AppTypeormConnectionProxy) → Commit/Rollback
```

**Nunca** chamar `.transaction()` manualmente. `ITransaction` e `TransactionModule` foram removidos.

## Erros de aplicação

```typescript
// src/application/errors/
ResourceNotFoundError   // 404 — recurso não encontrado
ForbiddenError          // 403 — sem permissão
UnauthorizedError       // 401 — não autenticado
ValidationError         // 400 — dados inválidos (com detalhes por campo)
ConflictError           // 409 — conflito (ex.: duplicidade)
GoneError               // 410 — recurso existe mas não está mais ativo
InternalError           // 500 — erro interno
ServiceUnavailableError // 503 — serviço indisponível
```

Filtros de exceção globais (`src/server/nest/filters/`) convertem esses erros em respostas HTTP padronizadas.

## Paginação

Usa `nestjs-paginate` com adapter próprio. A configuração de paginação é separada em duas camadas:

1. **Spec no domínio** (`domain/{entidade}.pagination-spec.ts`) — define campos ordenáveis, filtráveis e buscáveis usando `PaginationFilter` (constantes abstratas de `@/application/pagination`):

```typescript
// src/modules/ambientes/campus/domain/campus.pagination-spec.ts
import type { IPaginationSpec } from "@/application/pagination";
import { PaginationFilter } from "@/application/pagination";

export const campusPaginationSpec: IPaginationSpec = {
  sortableColumns: ["id", "nomeFantasia", "dateCreated"],
  searchableColumns: ["nomeFantasia", "razaoSocial"],
  defaultSortBy: [["nomeFantasia", "ASC"]],
  filterableColumns: { "endereco.cidade.id": [PaginationFilter.EQ] },
};
```

2. **Config na infraestrutura** (`infrastructure.database/{entidade}.repository.ts`) — compõe spec + relations via `buildTypeOrmPaginateConfig`:

```typescript
import { buildTypeOrmPaginateConfig } from "@/infrastructure.database/pagination/adapters/pagination-spec.adapter";
import { campusPaginationSpec } from "@/modules/ambientes/campus/domain/campus.pagination-spec";

const campusRelations = { endereco: { cidade: { estado: true } } };
const campusPaginateConfig = buildTypeOrmPaginateConfig<CampusEntity>(campusPaginationSpec, campusRelations);
```

**Regras:**
- Nunca importar `FilterOperator` de `nestjs-paginate` nos módulos — usar `PaginationFilter` de `@/application/pagination`.
- `relations` fica na infraestrutura (conceito ORM), não no spec do domínio.
- Contratos de paginação ficam em `src/application/pagination/`.

## Database command services

Operações programáticas sobre o banco (migrações, schema drop) ficam em `src/infrastructure.database/services/`:

```
services/
├── interfaces/
│   ├── database-command.interface.ts       # IDatabaseCommand { execute(): Promise<void> }
│   ├── migration-run.service.interface.ts  # IMigrationRunService extends IDatabaseCommand
│   ├── migration-revert.service.interface.ts
│   └── schema-drop.service.interface.ts
├── migration-run.service.ts                # MigrationRunService — dataSource.runMigrations()
├── migration-revert.service.ts             # MigrationRevertService — dataSource.undoLastMigration()
├── schema-drop.service.ts                  # SchemaDropService — dataSource.dropDatabase()
└── entrypoints/
    ├── migration-run.ts                    # Entrypoint executável via bun run
    ├── migration-revert.ts
    └── db-reset.ts                         # Compõe SchemaDropService + MigrationRunService
```

**Regras:**
- Cada service recebe um `DataSource` inicializado no constructor.
- Entrypoints gerenciam o lifecycle (initialize/destroy) do DataSource.
- Shell scripts em `src/commands/` chamam `bun run` nos entrypoints .ts.
- Scripts de scaffolding (`typeorm-generate`, `typeorm-create`, `typeorm-entity`) continuam usando o CLI do TypeORM diretamente.

## Mapeamento domain ↔ entity (infraestrutura)

Cada módulo define um mapper em `infrastructure.database/typeorm/{nome}.mapper.ts` usando `createEntityDomainMapper`:

```typescript
// src/modules/ambientes/campus/infrastructure.database/typeorm/campus.mapper.ts
export const campusEntityDomainMapper = createEntityDomainMapper<ICampus, Record<string, unknown>>({
  fields: [
    "id", "nomeFantasia", "razaoSocial", "apelido", "cnpj",
    { field: "endereco", type: "relation" },
    { field: "dateCreated", type: "date" },
    { field: "dateUpdated", type: "date" },
    { field: "dateDeleted", type: "date" },
  ],
});
```

**Tipos de campo disponíveis:**

| Tipo | Forward (entity → domain) | Reverse (domain → entity) | Quando usar |
|------|--------------------------|--------------------------|-------------|
| `string` | passthrough | passthrough | Campos diretos sem conversão |
| `"date"` | `Date` → ISO string | ISO string → `Date` | `dateCreated`, `dateUpdated`, `dateDeleted` |
| `"date-only"` | `Date` → `"YYYY-MM-DD"` | `"YYYY-MM-DD"` → `Date` | `dataNascimento` e similares |
| `"relation"` | `{ id, ... }` → `{ id }` | passthrough | Domain armazena `{ id }` (ex: `endereco`) |
| `"relation-loaded"` | passthrough | `{ id, ... }` → `{ id }` | Domain armazena objeto completo (ex: `cidade.estado`) |
| custom `{ forward, reverse }` | função custom | função custom | Casos especiais |

**Regras:**
- O mapper é **interno à infraestrutura** — nunca vaza para a camada de aplicação.
- Repositórios usam `toPersistenceData()` nos métodos `create`/`update`.
- Repositórios que usam `typeormFindAll`/`typeormFindById` continuam usando esses helpers para leitura.
- Config `output` opcional para `toOutputData` com campos computados (ex: `ativo = !dateDeleted`).
- Transforms comuns ficam em `src/shared/mapping/transforms.ts`.
