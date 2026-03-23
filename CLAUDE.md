# CLAUDE.md — Instruções para o Claude Code

Este arquivo contém as diretrizes que o Claude Code deve seguir ao trabalhar neste repositório. Leia integralmente antes de qualquer tarefa.

---

## Filosofia geral

- **Seja crítico.** Sempre avalie se a mudança proposta respeita a arquitetura hexagonal, as padronizações do projeto e as melhores práticas. Recuse ou questione abordagens que violem esses princípios.
- **Conteste o usuário ao máximo.** Antes de executar, faça triagem: questione se a mudança é realmente necessária, se não vai causar over-engineering, retrabalho, piora na qualidade do código ou piora na experiência de desenvolvimento (DX). Aponte riscos, trade-offs e consequências. Ofereça alternativas quando houver caminhos melhores. **Porém, a decisão final é sempre do usuário** — após apresentar seus argumentos, acate a escolha dele.
- **Mantenha o README.md completo e atualizado.** O README é a porta de entrada do projeto. Ele deve ser compreensível para dois perfis simultaneamente: (1) um **iniciante** que nunca viu o projeto e precisa de contexto, explicações e passo a passo detalhado para rodar, entender e contribuir; (2) um **desenvolvedor experiente** que precisa rapidamente de detalhes técnicos precisos — arquitetura, integrações, variáveis, endpoints, scripts e fluxos.

  Toda alteração que impacte estrutura, serviços, variáveis de ambiente, scripts, portas, dependências, integrações ou fluxos **deve** ser refletida no README. Diagramas Mermaid devem ser atualizados quando fluxos mudarem.

  **Seções obrigatórias que devem ser mantidas completas:**

  | Seção | O que deve conter |
  |-------|-------------------|
  | Visão geral | O que é o projeto, para quem serve, o que ele faz, links do ambiente público |
  | Arquitetura | Diagrama Mermaid das camadas, explicação da hexagonal/CQRS, estrutura de diretórios completa, lista de módulos por área de negócio |
  | Por que containers | Explicação didática para iniciantes sobre o que são containers e por que o projeto os usa |
  | Pré-requisitos | Tudo que precisa instalar (Docker, just, Git, editor), com links de instalação por plataforma |
  | Clonando e rodando | Passo a passo detalhado dos dois caminhos (justfile e Dev Container), com todos os comandos |
  | Acessando a aplicação | Tabela com todas as URLs e o que cada uma faz |
  | Serviços do ambiente | Diagrama Mermaid dos containers + tabela com portas e credenciais |
  | Variáveis de ambiente | Tabela completa com variável, valor padrão e descrição — incluindo mock de autenticação |
  | Scripts disponíveis | Tabela com todos os `bun run` scripts e o que cada um faz |
  | Banco de dados e migrações | Fluxo de migrações, comandos, seed, soft deletes |
  | Autenticação e autorização | Diagrama Mermaid do fluxo de auth, explicação do Keycloak/OIDC/JWKS, mock tokens, permission checkers |
  | GraphQL | Abordagem code-first, endpoint, playground, cache |
  | Message broker | Diagrama Mermaid do fluxo assíncrono, filas, UI do RabbitMQ |
  | Qualidade de código | Biome, comandos de lint/format, regras |
  | Testes | Framework, padrões de arquivo, comandos |
  | CI/CD | Diagrama Mermaid do pipeline, etapas, triggers |
  | Stack tecnológico | Tabela completa com todas as tecnologias e links |
  | Licença | Tipo e abrangência |
- **Mantenha este CLAUDE.md atualizado.** Ao realizar mudanças no projeto que alterem padrões, convenções, decisões arquiteturais ou fluxos de trabalho, atualize este arquivo para refletir o estado atual. Sempre que identificar conhecimento que possa tornar o trabalho futuro mais eficiente e preciso — novos padrões descobertos, atalhos, armadilhas comuns, decisões do usuário — acrescente ao CLAUDE.md. O objetivo é que este arquivo seja a fonte de verdade completa para trabalhar neste repositório.
- **Mantenha o código documentado e bem escrito.** Código deve ser autoexplicativo. Quando a lógica não for óbvia, adicione comentários concisos explicando o _porquê_, não o _o quê_. Nomes de variáveis, funções e classes devem ser claros e descritivos.
- **Não invente trabalho.** Faça exatamente o que foi pedido. Não adicione features, refatorações ou melhorias além do escopo solicitado.

---

## Comandos e ferramentas

### Regra fundamental: tudo roda dentro do container

**Todo comando — seja `bun`, `git`, ou qualquer outro — deve ser executado dentro do container via `just exec`.**

```bash
# Sintaxe geral
just exec <comando>

# Exemplos
just exec bun run code:fix
just exec bun run check
just exec bun run test
just exec bun run migration:run
just exec bun add <pkg>
```

> **Nunca** rodar comandos diretamente no host. O container possui as versões corretas de todas as ferramentas.

> **Se o container não estiver rodando** quando um comando precisar ser executado, suba-o primeiro com `just` (que inicia os serviços do ambiente) antes de executar `just exec`.

### Package manager

Sempre use `bun` — nunca `npm`, `npx`, `yarn`, `pnpm` ou `node` diretamente.

### Após qualquer alteração de código (obrigatório)

Sempre executar os dois passos abaixo, nesta ordem, após toda e qualquer modificação de código:

1. **`just exec bun run code:fix`** — formata e corrige linting (Biome). Garante que o código segue as regras de estilo do projeto.
2. **`just exec bun run check`** — verifica tipagem TypeScript. Garante que nada está quebrado.
3. **Mapear testes** — sempre que código novo for criado ou código existente for alterado, crie ou atualize os testes correspondentes. A cobertura de testes deve acompanhar toda mudança de código.

> Esses três passos são **obrigatórios**. Não considere uma tarefa finalizada sem tê-los executado com sucesso.

### Outros comandos úteis

| Comando | Descrição |
|---------|-----------|
| `just exec bun run dev` | Inicia o servidor de desenvolvimento |
| `just exec bun run test` | Executa testes unitários |
| `just exec bun run test:e2e` | Executa testes end-to-end |
| `just exec bun run test:cov` | Testes com relatório de cobertura |
| `just exec bun run migration:run` | Aplica migrações pendentes |
| `just exec bun run migration:revert` | Reverte a última migração |
| `just exec bun run db:reset` | Reset completo do banco |
| `just exec bun add <pkg>` | Adiciona uma dependência |
| `just exec bun remove <pkg>` | Remove uma dependência |
| `just exec bun install` | Instala dependências |

---

## Arquitetura

### Hexagonal (Ports & Adapters)

O fluxo de dependência aponta para dentro. Nunca inverta:

```
Apresentação → Aplicação → Domínio ← Infraestrutura
```

- **Domínio** (`src/domain/`) — entidades, contratos (interfaces), erros, validação, scalars. Zero dependência de frameworks.
- **Aplicação** (`src/application/`) — command/query handlers, autorização, helpers. Depende apenas do domínio.
- **Infraestrutura** (`src/infrastructure.*/`) — implementações concretas. Implementa contratos do domínio.
- **Apresentação** (`src/modules/*/presentation.rest/`, `presentation.graphql/`) — controllers REST e resolvers GraphQL. Chama a camada de aplicação.

### CQRS

- **Commands** (`Create`, `Update`, `Delete`) alteram estado.
- **Queries** (`FindById`, `FindAll`) apenas leem.
- Cada handler recebe `IAccessContext` com o usuário autenticado.

### Estrutura de módulos

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

### Grupos de módulos

| Grupo | Módulos |
|-------|---------|
| `acesso/` | `autenticacao`, `perfil`, `usuario` |
| `ambientes/` | `ambiente`, `bloco`, `campus` |
| `armazenamento/` | `arquivo`, `imagem`, `imagem-arquivo` |
| `ensino/` | `curso`, `diario`, `disciplina`, `modalidade`, `nivel-formacao`, `oferta-formacao`, `turma`, etc. |
| `estagio/` | `empresa`, `estagiario`, `estagio`, `responsavel-empresa` |
| `horarios/` | `calendario-letivo`, `calendario-agendamento`, `gerar-horario`, `horario-aula`, etc. |
| `localidades/` | `cidade`, `endereco`, `estado` |

### Diretórios compartilhados

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

---

## Padrões de código — com exemplos reais

### Entidade de domínio

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

### Schemas Zod

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

### Command handler

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

### Query handler

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
    selection?: string[] | boolean | null,
  ) {
    return this.campusRepository.findById(accessContext, dto, selection);
  }
}
```

### Contrato de repositório

```typescript
// src/modules/ambientes/campus/domain/repositories/campus.repository.ts
import type {
  IRepositoryCreate, IRepositoryFindAll, IRepositoryFindById,
  IRepositoryFindByIdSimple, IRepositoryUpdate, IRepositorySoftDelete,
} from "@/domain/abstractions";

export const ICampusRepository = Symbol("ICampusRepository");

export type ICampusRepository =
  IRepositoryFindAll<CampusListQueryResult> &
  IRepositoryFindById<CampusFindOneQueryResult> &
  IRepositoryFindByIdSimple<CampusFindOneQueryResult> &
  IRepositoryCreate<ICampus> &
  IRepositoryUpdate<ICampus> &
  IRepositorySoftDelete;
```

**Regras:**
- Repositório é um Symbol + type alias composto de interfaces granulares.
- `IRepositoryFindAll`, `IRepositoryFindById`, etc. vêm de `@/domain/abstractions`.

### TypeORM adapter (infraestrutura)

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

  async findAll(accessContext: IAccessContext | null, dto: unknown, selection?: string[] | boolean | null) {
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

### Permission checker

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

### Controller REST

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

### DTO REST com validação Zod

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

### Resolver GraphQL

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

### FieldMetadata e QueryFields

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

### Dependency Injection (`DeclareDependency` / `DeclareImplementation`)

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

### Transações automáticas

Todas as requisições HTTP são envelopadas em transação pelo `TransactionInterceptor` global:

```
Requisição → TransactionInterceptor → AsyncLocalStorage → Handler → Repos (via AppTypeormConnectionProxy) → Commit/Rollback
```

**Nunca** chamar `.transaction()` manualmente. `ITransaction` e `TransactionModule` foram removidos.

### Erros de aplicação

```typescript
// src/application/errors/
ResourceNotFoundError   // 404 — recurso não encontrado
ForbiddenError          // 403 — sem permissão
UnauthorizedError       // 401 — não autenticado
ValidationError         // 400 — dados inválidos (com detalhes por campo)
ConflictError           // 409 — conflito (ex.: duplicidade)
InternalError           // 500 — erro interno
ServiceUnavailableError // 503 — serviço indisponível
```

Filtros de exceção globais (`src/server/nest/filters/`) convertem esses erros em respostas HTTP padronizadas.

### Paginação

Usa `nestjs-paginate` com adapter próprio:

```typescript
// Na infraestrutura
NestJsPaginateAdapter.paginate(repo, dto, paginateConfig({
  sortableColumns: ["id", "nomeFantasia", "dateCreated"],
  searchableColumns: ["nomeFantasia", "razaoSocial"],
  filterableColumns: { "campus.id": [FilterOperator.EQ] },
  // ...
}));
```

Contratos de paginação ficam em `src/application/pagination/`.

### Database command services

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

---

## Convenções de código

### Linguagem (PT-BR / EN)

- **Português (pt-BR):** nomes de entidades de domínio e **todas** as suas propriedades (`nomeFantasia`, `razaoSocial`, `matricula`, `Campus`, `Turma`, `DiarioEntity`).
- **Inglês:** absolutamente todo o resto — infraestrutura, framework, métodos, utilitários, variáveis locais, nomes de arquivos não-domínio (`dateCreated`, `findAll`, `IPermissionChecker`, `CommandHandler`, `setup`, `config`).

### Nomenclatura de arquivos

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

### Imports

- Alias: `@/*` aponta para `src/*`.
- **Sem extensões** nos imports — nunca adicionar `.js` ou `.ts`.
- Nunca importar de `modules/@shared` (legado em remoção). Usar: `@/domain/`, `@/application/`, `@/shared/`, `@/infrastructure.*`.
- Biome organiza imports automaticamente — não reordenar manualmente.

### Tipagem

- **Zero `as any`** — defina interfaces/tipos adequados. Se o tipo não encaixa, crie uma interface.
- Propriedades de entidades de domínio usam type aliases de `@/domain/abstractions/scalars`:
  - `id: IdUuid` (não `string`)
  - `id: IdNumeric` (não `number`)
  - `dateCreated: ScalarDateTimeString` (não `string`)
- `ICampus = z.infer<typeof CampusSchema>` — tipo inferido do schema Zod.

### Validação

- **Zod** é o único sistema. `class-validator` e `class-transformer` estão desinstalados.
- Validação em duas camadas:
  1. **Apresentação** — DTOs com `static schema` → `ZodGlobalValidationPipe`.
  2. **Domínio** — `zodValidate()` nos factory methods como rede de segurança.
- `zodValidate(entityName, schema, data)` — lança `ValidationError` com detalhes por campo.

### Transações

- Automáticas via `TransactionInterceptor` global. **Nunca** chamar `.transaction()`.
- Repositórios participam da transação via `AppTypeormConnectionProxy` + `AsyncLocalStorage`.

### Permission checkers

- Cada módulo implementa `IPermissionChecker` com `ensureCanCreate`, `ensureCanUpdate`, `ensureCanDelete`.
- Padrão "throw on deny" — lança `ForbiddenError`.
- No-ops são intencionais — não sinalize como anti-pattern.

### FieldMetadata

- `gqlMetadata` retorna `{ description, nullable, defaultValue }` — DTO não especifica manualmente.
- Nunca spread `...SharedFields`. Pick explícito: `{ page: SharedFields.page, limit: SharedFields.limit }`.

### Mapeamento domain ↔ entity (infraestrutura)

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

---

## Decisões arquiteturais vigentes

Estas decisões são intencionais e **não devem ser questionadas ou alteradas**:

1. **`DeclareDependency` / `DeclareImplementation`** — acoplamento domínio ↔ NestJS aceito pragmaticamente.
2. **Boilerplate por módulo é aceitável** — consistência sobre abstração. Não propor code generation.
3. **Módulos sem GraphQL permanecem REST-only** — `autenticacao`, `arquivo`, `estagio`, `gerar-horario`.
4. **`Estado` e `Cidade`** aceitam `id` no create (códigos IBGE). Todos os outros geram UUID v7.
5. **`src/modules/@shared/`** em remoção — nunca importar. Migração para `src/domain/`, `src/application/`, `src/shared/`, `src/infrastructure.*`.
6. **`infrastructure.database/`** é o caminho preferido — `modules/@shared/infrastructure/persistence/typeorm/` é legado.
7. **Transações automáticas** — `TransactionInterceptor` global. `ITransaction`/`TransactionModule` foram removidos.
8. **Validação Zod em duas camadas** — apresentação + domínio. Sem class-validator.
9. **Constructor privado** em entidades de domínio — instanciação apenas via `create`/`load`.
10. **`src/shared/`** é o lar de utilitários cross-cutting — validação, mapping, decorators de apresentação.
11. **Mapper domain ↔ entity é interno à infraestrutura** — `createEntityDomainMapper` em `src/infrastructure.database/typeorm/helpers/`. Cada módulo define seu mapper em `infrastructure.database/typeorm/{nome}.mapper.ts`. O mapper nunca vaza para a camada de aplicação.
12. **Database command services** — operações programáticas (migration run/revert, schema drop) ficam em `src/infrastructure.database/services/` implementando `IDatabaseCommand`. Scripts de scaffolding (`typeorm-generate`, `typeorm-create`) continuam usando o CLI do TypeORM.

---

## Princípios de engenharia

Estes princípios guiam **toda** decisão de código neste projeto. Ao propor ou revisar mudanças, avalie se estão em conformidade. Em caso de conflito entre princípios, priorize na ordem em que aparecem.

### Fundamentos (SOLID + core)

- **Single Responsibility (SRP)** — cada classe, função e módulo tem uma única razão para mudar. Um handler lida com um command/query. Um controller delega para handlers. Um repositório persiste dados.
- **Open/Closed (OCP)** — estenda comportamento via novas implementações de interfaces (novos adapters, novos handlers), não modificando código existente que já funciona.
- **Liskov Substitution (LSP)** — qualquer implementação de `ICampusRepository` deve ser intercambiável sem quebrar o código que a consome. Respeite os contratos (tipos de retorno, exceções esperadas).
- **Interface Segregation (ISP)** — repositórios são compostos de interfaces granulares (`IRepositoryCreate`, `IRepositoryFindById`, etc.), não de uma interface monolítica. Consuma apenas o que precisa.
- **Dependency Inversion (DIP)** — handlers e controllers dependem de abstrações (Symbols + types), nunca de implementações concretas. A infraestrutura implementa os contratos do domínio, não o contrário.
- **Dependency Injection (DI) / Inversion of Control (IoC)** — dependências são injetadas via constructor pelo container NestJS. Nunca instancie dependências manualmente com `new`.
- **Composition over Inheritance** — prefira compor objetos (mixins, delegação) a criar hierarquias de herança profundas. DTOs usam `Mixin()` e `ts-mixer`, não extends em cadeia.

### Simplicidade e pragmatismo

- **KISS (Keep It Simple)** — a solução mais simples que resolve o problema é a melhor. Complexidade acidental é inimiga da manutenibilidade. Se uma abordagem direta funciona, não sofistique.
- **YAGNI (You Aren't Gonna Need It)** — não implemente funcionalidade que ninguém pediu. Não adicione parâmetros "por precaução". Não crie abstrações para cenários hipotéticos. Resolva o problema atual.
- **DRY (Don't Repeat Yourself)** — elimine redundância lógica real (mesma regra de negócio em dois lugares). Mas três linhas de código similares **não** são duplicação se representam conceitos distintos — não crie uma abstração prematura para unificá-las.
- **SSOT (Single Source of Truth)** — cada dado ou regra tem uma única origem autoritativa. Schemas Zod ficam no domínio e são reutilizados na apresentação. Metadata de campos é definida uma vez em `QueryFields` e consumida por REST e GraphQL.

### Arquitetura e organização

- **Clean Architecture** — o domínio não depende de frameworks ou infraestrutura. Dependências apontam para dentro.
- **Hexagonal Architecture (Ports & Adapters)** — o sistema interage com o mundo externo por interfaces (ports no domínio) e implementações (adapters na infraestrutura).
- **Layered Architecture** — camadas bem definidas: apresentação → aplicação → domínio ← infraestrutura. Nunca pule camadas.
- **CQRS** — commands e queries são separados em handlers distintos com responsabilidades claras.
- **Separation of Concerns (SoC)** — cada componente trata apenas um aspecto do sistema. Controllers não contêm lógica de negócio. Handlers não fazem queries SQL. Repositórios não validam regras de domínio.
- **High Cohesion** — um módulo faz poucas coisas, mas todas fortemente relacionadas. O módulo `campus` trata apenas de campus.
- **Low Coupling** — módulos dependem pouco uns dos outros. Comunicação entre módulos acontece por interfaces, não por acesso direto.
- **Bounded Context** — cada módulo é um contexto delimitado onde seu modelo de domínio é consistente e tem significado próprio.

### Domain-Driven Design (DDD)

- **Entity** — objeto definido por identidade (`id: IdUuid`), não por valor. Possui ciclo de vida (create, load, update).
- **Aggregate** — conjunto de entidades tratado como unidade de consistência. Operações passam pelo aggregate root.
- **Ubiquitous Language** — vocabulário compartilhado entre negócio e código. Entidades e propriedades em pt-BR refletem a linguagem do domínio acadêmico.
- **Anti-Corruption Layer (ACL)** — a camada de infraestrutura traduz entre o modelo de domínio e modelos externos (TypeORM entities, Keycloak responses, RabbitMQ messages).

### Robustez e resiliência

- **Fail Fast** — detectar e reportar erros o mais cedo possível. Validação Zod na entrada (apresentação) e no domínio. Se dados são inválidos, falhe imediatamente com erro descritivo.
- **Defensive Programming** — validar entradas e estados em fronteiras do sistema (input do usuário, APIs externas). Dentro do domínio, confie nos contratos já validados.
- **Principle of Least Astonishment (POLA)** — o comportamento deve ser previsível. APIs seguem convenções REST padrão. Nomes refletem o que fazem. Sem side-effects ocultos.
- **Law of Demeter (LoD)** — um objeto deve conhecer apenas seus colaboradores diretos. Handlers injetam repositórios, não o connection do TypeORM. Controllers injetam handlers, não repositórios.
- **Idempotency** — operações de leitura são naturalmente idempotentes. Para escrita, considere se executar a mesma operação duas vezes produz o mesmo efeito.
- **Determinism** — mesma entrada sempre gera mesma saída (exceto para geração de IDs e timestamps).
- **Immutability** — Value Objects e dados de configuração são imutáveis. Entidades mudam apenas via métodos explícitos (`update`).
- **Graceful Degradation** — quando um serviço externo falha (Keycloak, RabbitMQ), o sistema deve degradar de forma controlada, não crashar silenciosamente.
- **Circuit Breaker / Retry with Backoff** — para chamadas a serviços externos, considere padrões de resiliência quando apropriado. Não reinvente — use as abstrações do framework.

### Clean Code

> Código limpo = código que outro engenheiro consegue entender rapidamente, modificar com segurança e manter sem introduzir regressões.

**Propriedades obrigatórias:**

- **Legibilidade** — o código comunica intenção sem exigir interpretação mental excessiva. Se precisa de um comentário para explicar _o que_ faz, reescreva. Comentários existem para explicar _por que_.
- **Baixa complexidade cognitiva** — fluxo simples, poucas ramificações, responsabilidades claras. Se uma função exige manter muitas variáveis na cabeça simultaneamente, ela está complexa demais.
- **Nomes semânticos** — identificadores descrevem o que a coisa _é_ ou _faz_. Evitar nomes genéricos (`data`, `temp`, `handler`, `result`, `item`, `info`). Exemplos deste projeto: `campusRepository` (não `repo`), `ensureCanCreate` (não `check`), `nomeFantasia` (não `nome`).
- **Funções pequenas e focadas** — cada função resolve um único problema. Se faz mais de uma coisa, extraia.
- **Tipos explícitos** — aproveitando TypeScript strict mode, tipos devem ser claros e expressivos. Scalars semânticos (`IdUuid`, `ScalarDateTimeString`) em vez de primitivos.
- **Lógica direta** — sem indireções desnecessárias, sem wrappers que não adicionam valor, sem abstrações que existem "por via das dúvidas".

**Heurísticas obrigatórias:**

- **Early Return / Guard Clauses** — valide pré-condições no início e retorne cedo. Reduz profundidade de aninhamento e torna o fluxo principal linear:
  ```typescript
  // Bom
  async execute(ac: IAccessContext, input: unknown) {
    await this.permissionChecker.ensureCanCreate(ac);
    const entity = Entity.create(input);
    await this.repository.create(entity);
    return { id: entity.id };
  }

  // Ruim — nesting desnecessário
  async execute(ac: IAccessContext, input: unknown) {
    if (ac) {
      await this.permissionChecker.ensureCanCreate(ac);
      if (input) {
        const entity = Entity.create(input);
        // ...
      }
    }
  }
  ```
- **No Side Effects ocultos** — funções não devem alterar estado inesperadamente. `findById` nunca deve modificar dados. `create` não deve disparar efeitos colaterais invisíveis.
- **Explicit Dependencies** — dependências visíveis e injetadas via constructor. Nunca acessar serviços globais diretamente.
- **Consistent Formatting** — estrutura visual uniforme (Biome cuida disso automaticamente).
- **Remoção de ruído** — sem código morto, sem imports não utilizados (Biome remove), sem variáveis não usadas, sem comentários obsoletos, sem `console.log` esquecido.

**Anti-patterns — detectar e corrigir:**

| Anti-pattern | Descrição | Como corrigir neste projeto |
|--------------|-----------|---------------------------|
| **God Object** | Classe com responsabilidades demais | Extrair para handlers/services separados |
| **Long Method** | Função extensa e multifuncional | Extrair sub-funções com nomes semânticos |
| **Magic Numbers** | Valores sem significado semântico | Usar constantes nomeadas ou config |
| **Deep Nesting** | Muitos níveis de if/else | Guard clauses e early return |
| **Shotgun Surgery** | Uma mudança exige alterar muitos arquivos | Provavelmente violação de SRP — rever fronteiras |
| **Primitive Obsession** | Uso de `string`/`number` onde deveria haver modelo | Usar scalars (`IdUuid`, `IdNumeric`, `ScalarDateTimeString`) e entidades de domínio |
| **Feature Envy** | Método que usa mais dados de outra classe do que da própria | Mover lógica para a classe correta |
| **Speculative Generality** | Abstração criada para uso futuro que nunca chega | Remover — YAGNI |

### Qualidade técnica

- **Erros explícitos** — usar os tipos de `application/errors/` (`ResourceNotFoundError`, `ForbiddenError`, `ValidationError`, etc.). Nunca engolir exceções silenciosamente.
- **Observability** — logs significativos com Correlation ID para rastreamento de requisições. Erros logados com contexto suficiente para diagnóstico.
- **Testes** — cobrem command/query handlers com mocks de repositório em `src/test/`. Testes devem ser determinísticos e independentes.
- **Sem `--no-verify`** em commits — corrija o problema subjacente, não contorne hooks.
- **Migrações manuais** — `synchronize: false`. Nunca ativar sincronização automática do TypeORM.
- **Soft deletes** — exclusão lógica com controle de datas via triggers no banco.

### Formatação (Biome)

- **Largura de linha:** 100 caracteres.
- **Indentação:** 2 espaços.
- **Ponto e vírgula:** sempre.
- **Imports:** organizados automaticamente, não utilizados removidos.
- **`const`:** obrigatório quando possível.
- **Trailing commas:** todas.

### TypeScript

- **Target:** ES2022.
- **Module:** NodeNext.
- **Strict mode:** habilitado.
- **Path alias:** `@/*` → `./*` (relativo a `src/`).
- **Incremental compilation** habilitada.

---

## Ambiente de desenvolvimento

- **Container runtime:** Docker (recomendado). Podman é por conta e risco do usuário.
- **Task runner:** `just` (receitas no `justfile`).
- **Portas:** `3701` (API), `5432` (PostgreSQL), `9229` (debug), `15672` (RabbitMQ UI).
- **Mock de autenticação:** `ENABLE_MOCK_ACCESS_TOKEN=true` → tokens `mock.siape.<matrícula>`.
- **Autenticação real:** Keycloak via OAuth2/OIDC com validação JWKS.
- **Message broker:** RabbitMQ via Rascal — usado para geração de horários (timetable).
- **Armazenamento de arquivos:** filesystem em `/container/uploaded` (configurável via `STORAGE_PATH`).
