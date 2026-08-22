# Convenções e princípios de engenharia

**TLDR**: português pra tudo que é domínio acadêmico, inglês pra tudo que é infraestrutura e framework. Zero `as any`, zero `class-validator`, imports sem extensão. Os princípios de engenharia abaixo guiam toda decisão de código, em caso de conflito entre eles, prioriza-se a ordem em que aparecem.

| Termo | Vá pra |
|---|---|
| PT-BR vs. inglês, nomenclatura de arquivo | [Convenções de código](#convencoes-de-codigo) |
| SOLID, KISS, YAGNI, DRY, SSOT aplicados aqui | [Fundamentos SOLID e core](#fundamentos-solid-e-core) |
| Clean Architecture, Hexagonal, CQRS, DDD | [Arquitetura e organização](#arquitetura-e-organizacao) |
| Fail fast, POLA, Law of Demeter, resiliência | [Robustez e resiliência](#robustez-e-resiliencia) |
| Legibilidade, early return, anti-patterns a evitar | [Clean Code](#clean-code) |

## Convenções de código

**Linguagem**: português para nome de entidade de domínio e todas as suas propriedades (`Campus`, `nomeFantasia`, `razaoSocial`, `matricula`). Inglês para absolutamente todo o resto, infraestrutura, framework, métodos, utilitários, variáveis locais (`dateCreated`, `findAll`, `IPermissionChecker`, `CommandHandler`).

**Nomenclatura de arquivo**:

| Tipo | Padrão | Exemplo |
|---|---|---|
| Interface | `*.interface.ts` | `conn.interface.ts` |
| Entidade de domínio | `{nome}.ts` | `campus.ts` |
| Schemas Zod | `{nome}.schemas.ts` | `campus.schemas.ts` |
| Query fields | `{nome}.query-fields.ts` | `campus.query-fields.ts` |
| DTO REST | sufixo `RestDto` | `CampusFindOneOutputRestDto` |
| DTO GraphQL | sufixo `GraphQlDto` | `CampusFindOneOutputGraphQlDto` |
| Command handler | `{nome}-{ação}.command-handler.ts` | `campus-create.command-handler.ts` |
| Query handler | `{nome}-{ação}.query-handler.ts` | `campus-find-one.query-handler.ts` |
| Controller REST | `{nome}.controller.ts` | `campus.controller.ts` |
| Resolver GraphQL | `{nome}.resolver.ts` | `campus.resolver.ts` |

**Imports**: alias `@/*` aponta pra `src/*`. Sem extensão (`.js`/`.ts`). Nunca importar de `modules/@shared` (legado em remoção, ver [Decisões arquiteturais](decisoes-arquiteturais.md)), usar `@/domain/`, `@/application/`, `@/shared/`, `@/infrastructure.*`. Biome organiza import automaticamente, não reordenar manualmente.

**Tipagem**: zero `as any`, defina interface ou tipo adequado. Propriedade de entidade usa scalar semântico (`IdUuid`, não `string` cru, ver [Padrões de código](padroes-de-codigo.md#scalars-semanticos)).

**Validação**: Zod é o único sistema, `class-validator`/`class-transformer` estão desinstalados. Validação em duas camadas, apresentação (`static schema` no DTO) e domínio (`zodValidate()` como rede de segurança).

**Formatação (Biome)**: largura de linha 100, indentação 2 espaços, ponto e vírgula sempre, trailing comma em tudo, import organizado automaticamente e não usado removido, `const` obrigatório quando possível.

**TypeScript**: target ES2022, module NodeNext, strict mode habilitado, path alias `@/*` relativo a `src/`, incremental compilation habilitada.

## Fundamentos SOLID e core

- **Single Responsibility**: um handler lida com um command/query, um controller delega pra handler, um repositório persiste dado.
- **Open/Closed**: estender comportamento via nova implementação de interface, não modificando código existente que já funciona.
- **Liskov Substitution**: qualquer implementação de `ICampusRepository` é intercambiável sem quebrar quem a consome.
- **Interface Segregation**: repositório composto de interfaces granulares (`IRepositoryCreate`, `IRepositoryFindById`), não uma interface monolítica.
- **Dependency Inversion**: handler e controller dependem de abstração (Symbol + type), nunca de implementação concreta.
- **Composition over Inheritance**: DTOs usam `Mixin()`/`ts-mixer`, não herança em cadeia.
- **KISS**: a solução mais simples que resolve o problema é a melhor.
- **YAGNI**: não implementar o que ninguém pediu, não adicionar parâmetro "por precaução".
- **DRY**: eliminar redundância lógica real. Três linhas parecidas que representam conceitos distintos não são duplicação, e não justificam abstração prematura pra unificá-las.
- **SSOT**: cada dado ou regra tem uma origem autoritativa única. Schema Zod fica no domínio e é reutilizado na apresentação, metadado de campo é definido uma vez em `QueryFields` e consumido por REST e GraphQL.

## Arquitetura e organização

Clean Architecture (domínio não depende de framework), Hexagonal/Ports & Adapters, Layered Architecture (apresentação para aplicação para domínio, infraestrutura implementa domínio, nunca pular camada), CQRS, Separation of Concerns (controller não tem lógica de negócio, handler não faz SQL, repositório não valida regra de domínio), High Cohesion, Low Coupling, Bounded Context. Ver o vocabulário completo de cada termo em [Arquitetura hexagonal, DDD e CQRS](../aprender/arquitetura-hexagonal.md).

## Robustez e resiliência

- **Fail Fast**: validar e reportar erro o mais cedo possível, Zod na entrada e no domínio.
- **Defensive Programming**: validar em fronteira do sistema, dentro do domínio confiar em contrato já validado.
- **POLA** (Principle of Least Astonishment): comportamento previsível, convenção REST padrão, sem side effect oculto.
- **Law of Demeter**: handler injeta repositório, não a connection do TypeORM. Controller injeta handler, não repositório.
- **Idempotency**: leitura é naturalmente idempotente, escrita deve considerar se repetir a mesma operação produz o mesmo efeito.
- **Immutability**: entidade muda só via `update()`, configuração é imutável.
- **Graceful Degradation**: quando um serviço externo falha (Keycloak, fila BullMQ), degradar de forma controlada, não crashar silenciosamente, ver [Banco de dados e transações](banco-de-dados-e-transacoes.md#resiliencia-e-tolerancia-a-falhas).

## Clean Code

Código limpo é código que outro engenheiro entende rápido, modifica com segurança, mantém sem regressão. Propriedades obrigatórias: legibilidade (se precisa de comentário pra explicar o que faz, reescreva, comentário existe pra explicar o porquê), baixa complexidade cognitiva, nome semântico (`campusRepository`, não `repo`), função pequena e focada, tipo explícito, lógica direta sem indireção desnecessária.

Heurísticas: early return/guard clause (validar pré-condição no início, retornar cedo, reduzir aninhamento), sem side effect oculto (`findById` nunca modifica dado), dependência explícita via constructor, remoção de ruído (sem código morto, sem `console.log` esquecido).

**Anti-patterns a detectar e corrigir:**

| Anti-pattern | Descrição | Correção |
|---|---|---|
| God Object | Classe com responsabilidade demais | Extrair para handler/service separado |
| Long Method | Função extensa e multifuncional | Extrair sub-função com nome semântico |
| Magic Numbers | Valor sem significado semântico | Constante nomeada ou config |
| Deep Nesting | Muito nível de if/else | Guard clause e early return |
| Shotgun Surgery | Uma mudança exige alterar muitos arquivos | Provável violação de SRP, revisar fronteira |
| Primitive Obsession | `string`/`number` onde deveria haver modelo | Scalar semântico e entidade de domínio |
| Feature Envy | Método usa mais dado de outra classe que da própria | Mover lógica pra classe correta |
| Speculative Generality | Abstração criada pra uso futuro que nunca chega | Remover, YAGNI |

**Qualidade técnica**: erro explícito (tipo de `application/errors/`, nunca engolir exceção silenciosamente), observability (log com correlation ID), teste cobrindo command/query handler com mock de repositório, sem `--no-verify` em commit, migração manual (`synchronize: false`, nunca sincronização automática), soft delete com controle de data via trigger no banco.
