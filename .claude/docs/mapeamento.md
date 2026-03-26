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

## API `into` — mapeamento imperativo de campos

A API `into` é a forma padrão de mapear campos individuais entre objetos. É uma DSL imperativa centrada no destino.

### Forma canônica (source global)

```typescript
into(query)
  .from(dto)
  .field("filter.id", "filterId")
  .field("page")
  .field("limit");
```

- `into(target)` — define o objeto destino
- `.from(source)` — define a source corrente (global)
- `.field(targetKey, sourceKey?)` — copia o campo. `sourceKey` default = `targetKey`
- Campos `undefined` na source são ignorados (target preserva o valor anterior)

### Forma per-field (múltiplas sources)

```typescript
into(query)
  .field("filter.id").from(dto, "filterId")
  .field("tenantId").from(context)
  .field("userId").from(auth);
```

Cada `.field().from()` é independente — sem estado compartilhado.

### Pipeline por campo

Cada `field` abre um pipeline independente com operações opcionais:

```typescript
into(query)
  .field("page").default(1).from(dto)
  .field("status").when(v => v !== "DELETED").from(dto)
  .field("userId").required().from(auth);
```

### Operações do pipeline

| Operação | Descrição | Exemplo |
|----------|-----------|---------|
| `.from(source, key?)` | Define source e executa o mapping | `.from(dto, "filterId")` |
| `.transform(fn)` | Transforma o valor antes do set | `.transform(v => Number(v))` |
| `.default(value)` | Fallback quando valor é `undefined` ou `null` | `.default(1)` |
| `.when(predicate)` | Condicional — só escreve se `predicate(value)` retorna `true` | `.when(v => v !== "DELETED")` |
| `.required()` | Lança erro se valor é `undefined` ou `null` | `.required()` |
| `.optional()` | Ignora silenciosamente se valor é `undefined` ou `null` | `.optional()` |

### Ordem de execução

Fixa e determinística:

```
resolve source → transform → default → when → required/optional → set target
```

### Uso no `createPaginatedInputMapper`

O helper `createPaginatedInputMapper` usa `into` internamente para mapear page/limit/search/sortBy. O callback de filtros deve usar `into` também:

```typescript
export const listInputDtoToListQuery = createPaginatedInputMapper<EstadoListInputRestDto, EstadoListQuery>(
  EstadoListQuery,
  (dto, query) => {
    into(query)
      .field("filter.id").from(dto, "filter.id");
  },
);

// GraphQL — renomeia camelCase → dot notation
const listInputMapper = createPaginatedInputMapper<EstadoListInputGraphQlDto, EstadoListQuery>(
  EstadoListQuery,
  (dto, query) => {
    into(query)
      .field("filter.id").from(dto, "filterId");
  },
);
```

---

## Utilitários (`src/shared/mapping/create-mapper.ts`)

### `createMapper<I, O>`

Cria um mapper unitário com `.map(input)` e `.mapArray(inputs)`.

```typescript
export const findOneQueryResultToOutputDto = createMapper<EstadoFindOneQueryResult, EstadoFindOneOutputRestDto>(
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
export const listQueryResultToListOutputDto = createListMapper(
  EstadoListOutputRestDto,
  findOneQueryResultToOutputDto,
);
```

### `createPaginatedInputMapper`

Cria um mapper de input paginado (DTO → Query). Mapeia automaticamente page/limit/search/sortBy via `into` e delega filtros ao callback.

```typescript
export const listInputDtoToListQuery = createPaginatedInputMapper<EstadoListInputRestDto, EstadoListQuery>(
  EstadoListQuery,
  (dto, query) => {
    into(query).field("filter.id").from(dto, "filter.id");
  },
);
```

### `mapField` (deprecated)

> **@deprecated** — Use `into(target).field(key).from(source, key)` em vez de `mapField`.

---

## Estrutura de arquivos por camada

### Infraestrutura (`infrastructure.database/typeorm/`)

**Arquivo:** `{nome}.typeorm.mapper.ts`

```
infrastructure.database/
└── typeorm/
    ├── estado.typeorm.entity.ts
    ├── estado.typeorm.mapper.ts   ← mapper
    └── index.ts                   ← barrel com export * as EstadoTypeormMapper
```

**Barrel:**
```typescript
export * from "./estado.typeorm.entity";
export * as EstadoTypeormMapper from "./estado.typeorm.mapper";
```

**Exports típicos:**
- `entityToFindOneQueryResult` — Entity → Query Result (leitura)
- `entityToDomain` — Entity → Domain Interface (aggregate pattern)
- `domainToPersistence` — Domain → Entity parcial (escrita)

### Apresentação REST (`presentation.rest/`)

**Arquivo:** `{nome}.rest.mapper.ts`

Regiões: "Externa → Interna" e "Interna → Externa".

**Controller:** `import * as EstadoRestMapper from "./estado.rest.mapper"`

### Apresentação GraphQL (`presentation.graphql/`)

Mesmo padrão do REST. Diferenças:
- Output dates: `new Date(output.dateCreated)` (GraphQL scalar)
- `listInputDtoToListQuery`: null check wrapper
- Schemas GraphQL definidos no arquivo de DTO (não no domain)

---

## Cross-module

```typescript
import * as EstadoRestMapper from "@/modules/localidades/estado/presentation.rest/estado.rest.mapper";

export const findOneQueryResultToOutputDto = createMapper<CidadeFindOneQueryResult, CidadeFindOneOutputRestDto>(
  (queryResult) => ({
    id: queryResult.id,
    nome: queryResult.nome,
    estado: EstadoRestMapper.findOneQueryResultToOutputDto.map(queryResult.estado),
  }),
);
```

---

## Convenções de nomenclatura

### Exports dos mappers

O nome descreve o fluxo **de onde → para onde**:

| Export | Fluxo |
|--------|-------|
| `findOneInputDtoToFindOneQuery` | DTO de input → FindOneQuery |
| `listInputDtoToListQuery` | DTO de list → ListQuery |
| `createInputDtoToCreateCommand` | DTO de create → CreateCommand |
| `updateInputDtoToUpdateCommand` | DTO de update → UpdateCommand |
| `findOneQueryResultToOutputDto` | QueryResult → DTO de output |
| `listQueryResultToListOutputDto` | ListQueryResult → ListOutputDto |
| `entityToFindOneQueryResult` | Entity → QueryResult (infraestrutura) |
| `entityToDomain` | Entity → Domain Interface (infraestrutura) |
| `domainToPersistence` | Domain → Entity parcial (infraestrutura) |

### Variáveis nos callbacks e consumers

| Contexto | Parâmetro do callback | Variável local construída |
|----------|-----------------------|---------------------------|
| entity → domain | `(entity)` | `domain` |
| entity → queryResult | `(entity)` | `queryResult` |
| domain → entity | `(domain)` | `entity` |
| dto → query | `(dto)` | `query` |
| dto → command | `(dto)` | `command` |
| queryResult → dto | `(queryResult)` | — (retorna literal) |
| Controller: query handler | — | `query`, `queryResult` |
| Controller: command handler | — | `command`, `queryResult` |

---

## Update input (Query & Command)

Retorne um plain object — nunca instancie classe com cast:

```typescript
export const updateInputDtoToUpdateCommand = createMapper<
  { params: ModalidadeFindOneInputRestDto; dto: ModalidadeUpdateInputRestDto },
  ModalidadeFindOneQuery & ModalidadeUpdateCommand
>(({ params, dto }) => ({
  id: params.id,
  nome: dto.nome,
  slug: dto.slug,
}));
```

---

## Transforms tipadas (`src/shared/mapping/transforms.ts`)

Datas são `string` em entity/domain/REST — conversões de data são necessárias apenas no GraphQL output.

| Função | Quando usar |
|--------|-------------|
| `pickId` | Extrair `{ id }` de relação carregada |
| `dateToISOString` | Converter Date → string (módulos legados) |
| `isoStringToDate` | Converter string → Date (saída GraphQL) |
| `dateToDateOnlyString` | Campos date-only |
| `dateOnlyStringToDate` | Campos date-only (entrada) |

---

## Schemas de validação GraphQL

Pertencem à camada de apresentação, não ao domínio:

```typescript
// presentation.graphql/estado.graphql.dto.ts
const EstadoGraphqlListInputSchema = createGraphqlListInputSchema();

export class EstadoListInputGraphQlDto {
  static schema = EstadoGraphqlListInputSchema;
}
```
