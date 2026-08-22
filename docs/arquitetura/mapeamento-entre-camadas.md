# Mapeamento entre camadas

**TLDR**: mappers são funções puras e síncronas, tipadas de ponta a ponta, um arquivo por camada por módulo, consumidos via `import * as XxxMapper`. A DSL `into` cobre mapeamento imperativo campo a campo. Datas são `string` ISO em toda camada, exceto DTO de saída GraphQL, que usa `Date`.

| Termo | Vá pra |
|---|---|
| As seis regras que todo mapper segue | [Princípios](#principios) |
| A DSL de mapeamento campo a campo | [API into](#api-into-mapeamento-imperativo-de-campos) |
| `createMapper`, `createListMapper`, `createPaginatedInputMapper` | [Utilitários](#utilitarios) |
| Onde cada mapper vive, por camada | [Estrutura de arquivos](#estrutura-de-arquivos-por-camada) |
| O nome do export descreve o fluxo | [Convenções de nomenclatura](#convencoes-de-nomenclatura) |

## Princípios

1. **Puro e síncrono**: mappers recebem dado e retornam dado, sem side effect, sem I/O, sem validação, sem regra de negócio.
2. **Explícito campo a campo**: cada campo é mapeado individualmente no código, nunca por reflexão ou metadado dinâmico.
3. **Tipado de ponta a ponta**: tipo de entrada e saída declarados nos generics de `createMapper<I, O>`, sem `Record<string, unknown>`, sem `as any`.
4. **Um mapper por camada, por módulo**: sem classes, exports individuais num único arquivo por camada.
5. **Namespace import nos consumidores**: `import * as XxxMapper from "./xxx.mapper"` agrupa os mappers por contexto.
6. **Datas são `string` em toda camada, exceto GraphQL**: entidade TypeORM, domínio, DTO REST usam `string` ISO 8601 para data. A coluna do banco continua `timestamptz`/`date`. DTO GraphQL mantém `Date`, exigência do scalar `@Field(() => Date)`.

## API `into`: mapeamento imperativo de campos

DSL imperativa centrada no destino, forma canônica com source global:

```typescript
into(query).from(dto).field("filter.id", "filterId").field("page").field("limit");
```

Forma per-field, com múltiplas sources:

```typescript
into(query)
  .field("filter.id").from(dto, "filterId")
  .field("userId").from(auth);
```

Cada `field` abre um pipeline com operações opcionais, executadas nesta ordem fixa: `resolve source`, `transform`, `default`, `when`, `required`/`optional`, `set target`.

| Operação | Descrição |
|---|---|
| `.from(source, key?)` | Define source e executa o mapeamento |
| `.transform(fn)` | Transforma o valor antes de escrever |
| `.default(value)` | Fallback quando o valor é `undefined`/`null` |
| `.when(predicate)` | Só escreve se `predicate(value)` for verdadeiro |
| `.required()` | Lança erro se o valor for `undefined`/`null` |
| `.optional()` | Ignora silenciosamente se `undefined`/`null` |

## Utilitários

`createMapper<I, O>(fn)` cria um mapper unitário com `.map(input)` e `.mapArray(inputs)`. `createListMapper(DtoClass, itemMapper)` cria um mapper de lista paginada, instancia o DTO, repassa `meta`, mapeia `data` com o mapper de item. `createPaginatedInputMapper(QueryClass, mapFilters)` mapeia `page`/`limit`/`search`/`sortBy` via `into` automaticamente e delega filtros a um callback. `mapField` está **deprecated**, usar `into(target).field(key).from(source, key)` no lugar.

## Estrutura de arquivos por camada

**Infraestrutura** (`infrastructure.database/typeorm/{nome}.typeorm.mapper.ts`), exports típicos `entityToFindOneQueryResult`, `entityToDomain`, `domainToPersistence`. **Apresentação REST** (`{nome}.rest.mapper.ts`) e **GraphQL** (mesmo padrão, mas com output de data convertido pra `Date` e schema GraphQL definido no arquivo de DTO, não no domínio) organizam exports em duas regiões, "Externa para Interna" e "Interna para Externa".

```typescript
import * as EstadoRestMapper from "./estado.rest.mapper";

const query = EstadoRestMapper.listInputDtoToListQuery.map(dto);
const queryResult = await this.listHandler.execute(accessContext, query);
return EstadoRestMapper.listQueryResultToListOutputDto(queryResult);
```

Mapeamento **cross-module** reaproveita o mapper de outro módulo diretamente:

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

## Convenções de nomenclatura

O nome do export descreve o fluxo, de onde para onde:

| Export | Fluxo |
|---|---|
| `findOneInputDtoToFindOneQuery` | DTO de input para `FindOneQuery` |
| `listInputDtoToListQuery` | DTO de list para `ListQuery` |
| `createInputDtoToCreateCommand` | DTO de create para `CreateCommand` |
| `findOneQueryResultToOutputDto` | `QueryResult` para DTO de output |
| `listQueryResultToListOutputDto` | `ListQueryResult` para `ListOutputDto` |
| `entityToFindOneQueryResult` | Entity para `QueryResult` (infraestrutura) |
| `entityToDomain` | Entity para interface de domínio (infraestrutura) |
| `domainToPersistence` | Domínio para entity parcial (infraestrutura) |

Update input (query e command) retorna um plain object, nunca instancia classe com cast. Transforms tipadas (`src/shared/mapping/transforms.ts`, `pickId`, `dateToISOString`, `isoStringToDate`) cobrem conversão de data, necessária só na saída GraphQL, já que as demais camadas mantêm `string` do início ao fim.
