# Padrões de código

**TLDR**: entidade com constructor privado e factory methods, schema Zod como fonte única de verdade, repositório composto de interfaces granulares, handler que verifica permissão antes de agir, `Dep`/`Impl` como wrapper de `@Inject`/`@Injectable`, scalar semântico em vez de `string`/`number` cru. Módulo `campus` é a referência viva de todos esses padrões.

| Termo | Vá pra |
|---|---|
| Constructor privado, `create`/`load`/`update` | [Entidade de domínio](#entidade-de-dominio) |
| A fonte única de verdade da forma dos dados | [Schemas Zod](#schemas-zod) |
| Metadado de campo reaproveitado em Swagger e GraphQL | [FieldMetadata e QueryFields](#fieldmetadata-e-queryfields) |
| Interfaces granulares vs. o padrão novo de leitura/escrita | [Interfaces de repositório](#interfaces-de-repositorio) |
| O fluxo padrão de um handler | [Command e query handlers](#command-e-query-handlers) |
| "Throw on deny" | [Permission checker](#permission-checker) |
| Os wrappers de `@Inject`/`@Injectable` | [Dep e Impl](#dep-e-impl) |
| `IdUuid` em vez de `string` | [Scalars semânticos](#scalars-semanticos) |

## Entidade de domínio

Constructor privado, factory methods estáticos, validação Zod em cada operação:

```typescript
// src/modules/ambientes/campus/domain/campus.ts
export class Campus {
  static readonly entityName = "Campus";
  id!: IdUuid;
  nomeFantasia!: string;
  // ...

  private constructor() {}

  static create(dados: unknown): Campus {
    const parsed = zodValidate(Campus.entityName, CampusCreateSchema, dados);
    const instance = new Campus();
    instance.id = generateUuidV7();
    instance.nomeFantasia = parsed.nomeFantasia;
    // ...
    return instance;
  }

  static load(dados: unknown): Campus { /* reconstrói do banco, valida com schema completo */ }

  update(dados: unknown): void {
    const parsed = zodValidate(Campus.entityName, CampusUpdateSchema, dados);
    if (parsed.nomeFantasia !== undefined) this.nomeFantasia = parsed.nomeFantasia;
    // ...
    zodValidate(Campus.entityName, CampusSchema, this); // revalida o estado completo
  }
}
```

`create()` recebe dados brutos (`unknown`), gera UUID v7 e datas. `load()` reconstrói uma entidade a partir de dado existente. `update()` aplica mudança parcial e revalida o estado completo no final, como rede de segurança. Exceção: `Estado` e `Cidade` aceitam `id` no `create` (usam código IBGE em vez de UUID gerado).

## Schemas Zod

Cada entidade define seus schemas num arquivo `*.schemas.ts`, fonte única de verdade da forma dos dados:

```typescript
export const CampusSchema = EntityBaseSchema.extend({
  nomeFantasia: z.string().min(1),
  // ...
  endereco: z.object({ id: z.string().uuid() }).or(EnderecoFindOneQueryResultSchema),
});

export const CampusCreateSchema = CampusSchema.omit({
  id: true, dateCreated: true, dateUpdated: true, dateDeleted: true,
});

export const CampusUpdateSchema = CampusCreateSchema.partial();
```

`EntityBaseSchema` fornece `id`, `dateCreated`, `dateUpdated`, `dateDeleted`. `CreateSchema` é o schema base sem id e datas (gerados automaticamente). `UpdateSchema` é `CreateSchema.partial()`. Exceção: `Estado`/`Cidade`, cujo `CreateSchema` é igual ao schema completo, já que o id vem de fora (código IBGE).

## FieldMetadata e QueryFields

`FieldMetadata` define metadado de cada campo uma única vez, reaproveitado em Swagger, GraphQL e validação:

```typescript
export const CampusFields = {
  nomeFantasia: createFieldMetadata({
    description: "Nome fantasia do campus",
    schema: z.string().min(1, "nomeFantasia é obrigatório"),
  }),
  cnpj: createFieldMetadata({
    description: "CNPJ do campus",
    schema: z.string().min(1).transform((v) => v.replace(/\D/g, "")).pipe(z.string().regex(/^\d{14}$/)),
  }),
};
```

`.swaggerMetadata` alimenta decorators REST, `.gqlMetadata` alimenta decorators GraphQL, ambos derivados de `description`, `nullable` e `defaultValue`. Regra: `gqlMetadata` retorna `{ description, nullable, defaultValue }` direto, o DTO nunca especifica isso manualmente. Nunca fazer spread de `...SharedFields`, sempre pick explícito (`{ page: SharedFields.page, limit: SharedFields.limit }`).

## Interfaces de repositório

Duas convenções coexistem hoje. A mais antiga e mais comum compõe interfaces granulares via intersection type (Interface Segregation Principle):

```typescript
export const ICampusRepository = Symbol("ICampusRepository");
export type ICampusRepository = IRepositoryFindAll<CampusListQueryResult> &
  IRepositoryFindById<CampusFindOneQueryResult> &
  IRepositoryCreate<ICampus> &
  IRepositoryUpdate<ICampus> &
  IRepositorySoftDelete;
```

Interfaces disponíveis (`src/domain/abstractions/repositories/`): `IRepositoryCreate<T>`, `IRepositoryUpdate<T>`, `IRepositorySoftDelete`, `IRepositoryFindAll<T>`, `IRepositoryFindById<T>`, `IRepositoryFindByIdSimple<T>`.

Um padrão mais novo, piloto em `OfertaFormacao` (ver [Decisões arquiteturais](decisoes-arquiteturais.md)), separa leitura de escrita de forma mais explícita:

```typescript
export interface ICampusRepository {
  // Write side
  loadById: IRepositoryLoadById<Campus>;
  save: IRepositorySave<Campus>;
  softDeleteById: IRepositorySoftDeleteById;
  // Read side
  getFindOneQueryResult: IRepositoryGetFindOneQueryResult<CampusFindOneQuery, CampusFindOneQueryResult>;
  getFindAllQueryResult: IRepositoryGetFindAllQueryResult<CampusListQuery, CampusListQueryResult>;
}
```

O write side devolve o agregado de domínio (`loadById`/`save`), o read side devolve dado já hidratado pra apresentação (`getFindOneQueryResult`/`getFindAllQueryResult`). Os demais módulos continuam no padrão antigo até serem migrados, não há prazo definido pra essa migração.

## Command e query handlers

```typescript
@Impl()
export class CampusCreateCommandHandlerImpl implements ICampusCreateCommandHandler {
  constructor(
    @Dep(ICampusRepository) private readonly repository: ICampusRepository,
    @Dep(ICampusPermissionChecker) private readonly permissionChecker: ICampusPermissionChecker,
  ) {}

  async execute(accessContext: IAccessContext | null, dto: CampusCreateCommand) {
    await this.permissionChecker.ensureCanCreate(accessContext, { dto });
    const domain = Campus.create({ nomeFantasia: dto.nomeFantasia /* ... */ });
    const { id } = await this.repository.create({ ...domain });
    const result = await this.repository.findById(accessContext, { id });
    ensureExists(result, Campus.entityName, id);
    return result;
  }
}
```

Fluxo padrão de um command handler: verificar permissão, criar/atualizar entidade de domínio, persistir via repositório, retornar resultado. Um query handler é mais simples, delega leitura direto ao repositório sem passar por permission checker (ver nota em [Autenticação e autorização](autenticacao-e-autorizacao.md) sobre o roadmap de filtragem por permissão em leitura).

## Permission checker

Padrão **"throw on deny"**: se o usuário não tem permissão, a exceção é lançada, não um retorno booleano:

```typescript
export interface IPermissionChecker {
  ensureCanCreate(ac: IAccessContext | null, payload: { dto: unknown }): Promise<void>;
  ensureCanUpdate(ac: IAccessContext | null, payload: { dto: unknown }, id: string): Promise<void>;
  ensureCanDelete(ac: IAccessContext | null, payload: { dto: unknown }, id: string): Promise<void>;
}
```

As implementações atuais são **no-ops** intencionais, não verificam nada ainda. Isso não é sinalizado como anti-pattern, é o estado esperado até a autorização granular ser implementada módulo a módulo.

## Dep e Impl

Decorators em `src/domain/dependency-injection/` que abstraem o NestJS:

```typescript
export const Dep = (token: any): ParameterDecorator => NestjsInject(token);
export const Impl = (): ClassDecorator => Injectable();
```

`Dep` é um wrapper de `@Inject()`, `Impl` é um wrapper de `@Injectable()`. O acoplamento resultante entre domínio e NestJS é aceito pragmaticamente, ver [Decisões arquiteturais](decisoes-arquiteturais.md).

## Scalars semânticos

Type aliases que adicionam significado a um tipo primitivo, em `src/domain/abstractions/scalars/`:

| Scalar | Tipo base | Propósito |
|---|---|---|
| `IdUuid` | `string` | Identificador UUID |
| `IdNumeric` | `number` | Identificador numérico (códigos IBGE) |
| `ScalarDateTimeString` | `string` | Data/hora em ISO string |
| `ScalarDate` | `string` | Data sem hora, em ISO string |

Usar `id: IdUuid` em vez de `id: string` permite que o TypeScript sinalize se um campo de identificador for trocado por um campo de texto qualquer, algo que o tipo `string` cru não distingue.
