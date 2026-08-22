# Decisões arquiteturais

**TLDR**: dezesseis decisões intencionais, cada uma com o raciocínio por trás. Não devem ser questionadas ou revertidas sem justificativa nova equivalente ao raciocínio original.

1. **`Dep`/`Impl`**: o acoplamento entre domínio e NestJS é aceito pragmaticamente, ver [Padrões de código](padroes-de-codigo.md#dep-e-impl).
2. **Boilerplate por módulo é aceitável**: consistência é preferida sobre abstração. Não propor code generation pra reduzir repetição estrutural entre módulos.
3. **Módulos sem GraphQL permanecem REST-only**: `autenticacao`, `arquivo`, `estagio`, `gerar-horario`.
4. **`Estado` e `Cidade` aceitam `id` no `create`** (códigos IBGE). Todos os outros módulos geram UUID v7.
5. **`src/modules/@shared/` está em remoção**: nunca importar dele. Migração em curso para `src/domain/`, `src/application/`, `src/shared/`, `src/infrastructure.*`.
6. **`infrastructure.database/` é o caminho preferido**: `modules/@shared/infrastructure/persistence/typeorm/` é legado.
7. **Transações são automáticas**: via `TransactionInterceptor` global. `ITransaction`/`TransactionModule` foram removidos, ver [Banco de dados e transações](banco-de-dados-e-transacoes.md).
8. **Validação Zod em duas camadas**: apresentação e domínio, sem `class-validator`.
9. **Constructor privado em entidade de domínio**: instanciação só via `create`/`load`.
10. **`src/shared/` é o lar de utilitário cross-cutting**: validação, mapping, decorators de apresentação.
11. **Mapper domínio para entity é interno à infraestrutura**: `createEntityDomainMapper` em `src/infrastructure.database/typeorm/helpers/`. Cada módulo define seu mapper em `infrastructure.database/typeorm/{nome}.mapper.ts`. O mapper nunca vaza pra camada de aplicação.
12. **Database command services**: operações programáticas (`migration:run`, `migration:revert`, schema drop) ficam em `src/infrastructure.database/services/`, implementando `IDatabaseCommand`. Scripts de scaffolding (`typeorm:generate`, `typeorm:create`) continuam usando o CLI do TypeORM diretamente.
13. **Separação read/write no repositório, piloto em `OfertaFormacao`**: módulos com relação complexa usam interface explícita com `loadById`/`save` (write side, retorna agregado de domínio) e `getFindOneQueryResult`/`getFindAllQueryResult` (read side, retorna dado hidratado). O adapter contém dois mappers privados, `toDomainData()` (entity para domínio, com `{ id }` pra relação e strings ISO) e `toQueryResult()` (entity para query result, com objeto completo). Os demais módulos continuam nas interfaces genéricas (`IRepositoryFindAll`, `IRepositoryFindById`) até migrarem, sem prazo definido, ver [Padrões de código](padroes-de-codigo.md#interfaces-de-repositorio).
14. **Utilitários de mapping**: funções puras em `src/infrastructure.database/typeorm/mapping/utils.ts` (`filterActive`, `toRef`, `toRefRequired`, `dateToISO`, `dateToISONullable`, `isoToDate`, `isoToDateNullable`), usadas nos mappers imperativos dos adapters.
15. **Relations declaradas explicitamente**: cada repositório declara a profundidade completa das relações no `paginateConfig.relations`. Se a UI precisa de `campus.endereco.cidade.estado`, o repositório declara `campus: { endereco: { cidade: { estado: true } } }`, nunca só `campus: true`.
16. **Factories de relação por identificador**: `ObjectIdUuidFactory`/`ObjectIdIntFactory` produzem schemas `{ id: ... }` pra referência de relação. Variantes nullable (`ObjectIdUuidFactoryNullable`/`ObjectIdIntFactoryNullable`) embutem `.nullable()` internamente. Nunca usar `ObjectIdUuidFactory.create(standard).nullable()`, isso posiciona `.nullable()` fora do `z.preprocess()` e impede a normalização de entrada inválida. Usar `ObjectIdUuidFactoryNullable.create(standard)` (mais `.optional()` se necessário). O preprocessor (`objectIdPreprocess`) normaliza entrada inválida para `null`, a aceitação de `null` é responsabilidade do schema consumidor (`.nullable()`), não do factory.
