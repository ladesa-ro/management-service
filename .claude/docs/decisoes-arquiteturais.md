# Decisões arquiteturais vigentes

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
13. **Separação read/write no repositório (piloto: OfertaFormacao)** — módulos com relações complexas usam interface explícita com `loadById` (write side → retorna aggregate de domínio), `getFindOneQueryResult` / `getFindAllQueryResult` (read side → retorna dados hidratados). O adapter contém dois mappers privados: `toDomainData()` (entity → domínio com `{ id }` para relações, ISO strings) e `toQueryResult()` (entity → query result com objetos completos). Os demais módulos continuam usando as interfaces genéricas (`IRepositoryFindAll`, `IRepositoryFindById`, etc.) até serem migrados.
14. **Utilitários de mapping** — funções puras em `src/infrastructure.database/typeorm/mapping/utils.ts` (`filterActive`, `toRef`, `toRefRequired`, `dateToISO`, `dateToISONullable`, `isoToDate`, `isoToDateNullable`). Usados nos mappers imperativos dos adapters.
15. **Relations declaradas explicitamente** — cada repositório declara a profundidade completa das relações no `paginateConfig.relations`. Se a UI precisa de `campus.endereco.cidade.estado`, o repositório deve declarar `campus: { endereco: { cidade: { estado: true } } }`, não apenas `campus: true`.
16. **Factories de relação por identificador** — `ObjectIdUuidFactory`/`ObjectIdIntFactory` produzem schemas `{ id: ... }` para referências de relação. Variantes nullable (`ObjectIdUuidFactoryNullable`/`ObjectIdIntFactoryNullable`) embutem `.nullable()` internamente. **Nunca** usar `ObjectIdUuidFactory.create(standard).nullable()` — isso posiciona `.nullable()` fora do `z.preprocess()`, impedindo a normalização de entradas inválidas. Usar `ObjectIdUuidFactoryNullable.create(standard)` (e `.optional()` se necessário). O preprocessor (`objectIdPreprocess`) normaliza entradas inválidas para `null`; a aceitação de `null` é responsabilidade do schema consumidor (`.nullable()`), não do factory.
