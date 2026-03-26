# Mapeamento entre camadas

Este documento descreve o padrão de mapeamento adotado no projeto para transformar dados entre as fronteiras da arquitetura hexagonal.

---

## Princípios

1. **Puro e síncrono.** Mappers são funções puras — recebem dados, retornam dados. Sem side effects, sem async, sem I/O, sem validação, sem regras de negócio.
2. **Explícito campo a campo.** Cada campo é mapeado individualmente no código. Nada de mapeamento baseado em strings, reflexão ou metadados dinâmicos.
3. **Tipado de ponta a ponta.** Os tipos de entrada e saída são declarados nos generics do `createMapper<I, O>`. Sem `Record<string, unknown>`, sem `as any`, sem `as`.
4. **Um mapper por camada, por módulo.** Cada camada do módulo tem exatamente um arquivo mapper com múltiplos exports. Sem classes — exports individuais.
5. **Namespace import nos consumers.** Consumers usam `import * as XxxMapper from "./xxx.mapper"` para agrupar os mappers por contexto.
6. **Datas são strings em todas as camadas exceto GraphQL.** TypeORM entities, domain, REST DTOs — todos usam `string` (ISO 8601) para campos de data. A coluna no banco continua `timestamptz`/`date`/`timestamp`, apenas o tipo TypeScript na entity é `string`. GraphQL DTOs mantêm `Date` por exigência do scalar `@Field(() => Date)`.

---

## Utilitários (`src/shared/mapping/create-mapper.ts`)

### `createMapper<I, O>`

Cria um mapper unitário com `.map(input)` e `.mapArray(inputs)`.

```typescript
export const toFindOneOutput = createMapper<EstadoFindOneQueryResult, EstadoFindOneOutputRestDto>(
  (output) => ({
    id: output.id,
    nome: output.nome,
    sigla: output.sigla,
  }),
);
```

### `createListMapper`

Cria um mapper de lista paginada. Instancia o DTO de lista, repassa o `meta` e mapeia o `data` usando um mapper de item.

```typescript
export const toListOutput = createListMapper(EstadoListOutputRestDto, toFindOneOutput);
```

### `createPaginatedInputMapper`

Cria um mapper de input paginado (DTO → Query). Mapeia automaticamente os campos comuns de paginação (`page`, `limit`, `search`, `sortBy`) e delega o mapeamento de filtros específicos via callback.

```typescript
// REST — filtros usam dot notation
export const toListInput = createPaginatedInputMapper<EstadoListInputRestDto, EstadoListQuery>(
  EstadoListQuery,
  (dto, query) => {
    if (dto["filter.id"] !== undefined) query["filter.id"] = dto["filter.id"];
  },
);

// GraphQL — filtros usam camelCase, mapeados para dot notation
const listInputMapper = createPaginatedInputMapper<EstadoListInputGraphQlDto, EstadoListQuery>(
  EstadoListQuery,
  (dto, query) => {
    if (dto.filterId !== undefined) query["filter.id"] = dto.filterId;
  },
);
```

---

## Estrutura de arquivos por camada

### Infraestrutura (`infrastructure.database/typeorm/`)

**Arquivo:** `{nome}.typeorm.mapper.ts`

Mapeia entre TypeORM Entity e tipos do domínio (Query Results).

```
infrastructure.database/
└── typeorm/
    ├── estado.typeorm.entity.ts
    ├── estado.typeorm.mapper.ts   ← mapper
    └── index.ts                   ← barrel com export * as EstadoTypeormMapper
```

**Barrel pattern:**
```typescript
export * from "./estado.typeorm.entity";
export * as EstadoTypeormMapper from "./estado.typeorm.mapper";
```

**Mapper:**
```typescript
// ============================================================================
// Persistência → Domínio (TypeORM Entity → Query Result)
// ============================================================================

export const entityToOutput = createMapper<EstadoEntity, EstadoFindOneQueryResult>((e) => ({
  id: e.id,
  nome: e.nome,
  sigla: e.sigla,
}));
```

**Uso no repository:**
```typescript
import { EstadoEntity, EstadoTypeormMapper } from "./typeorm";

getFindOneQueryResult(accessContext, dto) {
  return typeormFindById<EstadoEntity, EstadoFindOneQuery, EstadoFindOneQueryResult>(
    this.appTypeormConnection,
    EstadoEntity,
    { ...config, paginateConfig: estadoPaginateConfig },
    dto,
    EstadoTypeormMapper.entityToOutput.map,  // callback de mapeamento
  );
}
```

**Exports típicos:**
- `entityToOutput` — Entity → Query Result (leitura)
- `entityToDomain` — Entity → Domain Interface (aggregate pattern, se aplicável)
- `domainToPersistence` — Domain → Entity parcial (escrita, se aplicável)

Apenas exporte o que é efetivamente usado pelo repository. Módulos read-only (ex: estado) só precisam de `entityToOutput`.

### Apresentação REST (`presentation.rest/`)

**Arquivo:** `{nome}.rest.mapper.ts`

**Regiões:**
```typescript
// ============================================================================
// Externa → Interna (Input: Presentation → Core)
// ============================================================================

export const toFindOneInput = createMapper<...>(...);
export const toListInput = createPaginatedInputMapper<...>(...);

// ============================================================================
// Interna → Externa (Output: Core → Presentation)
// ============================================================================

export const toFindOneOutput = createMapper<...>(...);
export const toListOutput = createListMapper(...);
```

**Uso no controller:**
```typescript
import * as EstadoRestMapper from "./estado.rest.mapper";

async findAll(accessContext, dto) {
  const input = EstadoRestMapper.toListInput.map(dto);
  const result = await this.listHandler.execute(accessContext, input);
  return EstadoRestMapper.toListOutput(result);
}

async findById(accessContext, params) {
  const input = EstadoRestMapper.toFindOneInput.map(params);
  const result = await this.findOneHandler.execute(accessContext, input);
  ensureExists(result, Estado.entityName, input.id);
  return EstadoRestMapper.toFindOneOutput.map(result);
}
```

### Apresentação GraphQL (`presentation.graphql/`)

**Arquivo:** `{nome}.graphql.mapper.ts`

Mesmo padrão do REST, com duas diferenças:

1. **Filtros usam camelCase** no DTO (`filterId`) e precisam ser mapeados para dot notation (`filter.id`) na Query.
2. **`toListInput` precisa de null check** porque GraphQL permite args opcionais:

```typescript
const listInputMapper = createPaginatedInputMapper<EstadoListInputGraphQlDto, EstadoListQuery>(...);

export function toListInput(dto: EstadoListInputGraphQlDto | null): EstadoListQuery | null {
  if (!dto) return null;
  return listInputMapper.map(dto);
}
```

**Uso no resolver:**
```typescript
import * as EstadoGraphqlMapper from "./estado.graphql.mapper";

async findById(accessContext, id: number) {
  const input = EstadoGraphqlMapper.toFindOneInput.map(id);
  const result = await this.findOneHandler.execute(accessContext, input);
  ensureExists(result, Estado.entityName, input.id);
  return EstadoGraphqlMapper.toFindOneOutput.map(result);
}
```

---

## Cross-module: referenciando mappers de outro módulo

Quando o DTO de saída de um módulo inclui dados de outro módulo (ex: `cidade.estado`), importe o mapper do outro módulo via namespace:

```typescript
import * as EstadoRestMapper from "@/modules/localidades/estado/presentation.rest/estado.rest.mapper";

export const toFindOneOutput = createMapper<CidadeFindOneQueryResult, CidadeFindOneOutputRestDto>(
  (output) => ({
    id: output.id,
    nome: output.nome,
    estado: EstadoRestMapper.toFindOneOutput.map(output.estado),
  }),
);
```

---

## Convenções de nomenclatura

| Export | Uso |
|--------|-----|
| `toFindOneInput` | DTO → FindOneQuery |
| `toListInput` | DTO → ListQuery (via `createPaginatedInputMapper`) |
| `toFindOneOutput` | QueryResult → FindOneOutputDto |
| `toListOutput` | PaginatedQueryResult → ListOutputDto (via `createListMapper`) |
| `toCreateInput` | CreateDto → CreateCommand |
| `toUpdateInput` | UpdateDto → UpdateCommand |
| `entityToOutput` | Entity → QueryResult (infraestrutura) |
| `entityToDomain` | Entity → Domain Interface (infraestrutura, aggregate pattern) |
| `domainToPersistence` | Domain → Entity parcial (infraestrutura, escrita) |

---

## Schemas de validação GraphQL

Schemas de validação específicos do GraphQL (ex: `createGraphqlListInputSchema()`) pertencem à **camada de apresentação**, não ao domínio. Defina a constante no próprio arquivo de DTO:

```typescript
// presentation.graphql/estado.graphql.dto.ts
const EstadoGraphqlListInputSchema = createGraphqlListInputSchema();

export class EstadoListInputGraphQlDto {
  static schema = EstadoGraphqlListInputSchema;
  // ...
}
```

---

## Transforms tipadas (`src/shared/mapping/transforms.ts`)

Como datas são `string` em entity/domain/REST, **conversões de data não são necessárias na maioria dos mappers** — os campos passam direto (passthrough). Transforms são necessárias apenas em dois cenários:

1. **GraphQL output** — `@Field(() => Date)` exige objetos `Date`, então o mapper GraphQL converte: `new Date(output.dateCreated)`
2. **Relações** — `pickId` extrai `{ id }` de uma relação carregada

| Função | Assinatura | Quando usar |
|--------|------------|-------------|
| `pickId` | `({ id: TId }) → { id: TId }` / nullable | Extrair referência de relação carregada |
| `dateToISOString` | `(Date) → string` / nullable | Converter Date para string (módulos legados com entity Date) |
| `isoStringToDate` | `(string) → Date` / nullable | Converter string para Date (saída GraphQL) |
| `dateToDateOnlyString` | `(Date) → "YYYY-MM-DD"` / nullable | Campos date-only |
| `dateOnlyStringToDate` | `("YYYY-MM-DD") → Date` / nullable | Campos date-only (entrada) |

As funções legadas (`dateToISO`, `isoToDate`, `normalizeRelationRef`, etc.) estão marcadas `@deprecated` e tipadas como `(unknown) → unknown`.

### Update input (Query & Command)

Para mappers de update que retornam `FindOneQuery & UpdateCommand`, **não instancie a classe e faça cast**. Retorne um plain object que satisfaz a interseção:

```typescript
// Errado — usa `as`
const input = new ModalidadeFindOneQuery() as ModalidadeFindOneQuery & ModalidadeUpdateCommand;

// Correto — plain object
export const toUpdateInput = createMapper<
  { params: ModalidadeFindOneInputRestDto; dto: ModalidadeUpdateInputRestDto },
  ModalidadeFindOneQuery & ModalidadeUpdateCommand
>(({ params, dto }) => ({
  id: params.id,
  nome: dto.nome,
  slug: dto.slug,
}));
```

---

## Migração de módulos legados

Módulos não migrados ainda usam o padrão antigo (classes com static methods, `createEntityDomainMapper`, `createMapping`). Os arquivos legados em `src/shared/mapping/` estão marcados como `@deprecated`:

- `base.mapper.ts` — helpers antigos (`createListOutputMapper`, `createListInputMapper`, etc.)
- `field-mapper.ts` — mapeamento baseado em strings (`createMapping`, `mapFilterCase`)
- `imagem-output.mapper.ts` — helper de imagem (será migrado)
- `entity-domain-mapper.ts` — mapper bidirectional de infraestrutura

**Ativo (novo padrão):**
- `create-mapper.ts` — `createMapper`, `createListMapper`, `createPaginatedInputMapper`
- `transforms.ts` — funções tipadas (`dateToISOString`, `isoStringToDate`, `pickId`, etc.) + legadas deprecated

Ao migrar um módulo, siga o padrão dos módulos `estado` e `modalidade` como referência.
