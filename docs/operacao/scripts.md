# Scripts disponíveis

**TLDR**: todo script roda com `bun run <script>` dentro do container, ou `just exec bun run <script>` de fora dele.

| Termo | Vá pra |
|---|---|
| Subir o servidor, modo debug | [Desenvolvimento](#desenvolvimento) |
| Formatar, lint, typecheck | [Qualidade de código](#qualidade-de-codigo) |
| Rodar teste, cobertura, e2e | [Testes](#testes) |
| Migração, reset do banco | [Banco de dados](#banco-de-dados) |
| Codegen do timetable generator | [Outros](#outros) |

## Desenvolvimento

| Script | O que faz |
|---|---|
| `dev` | Servidor em modo desenvolvimento, com hot reload |
| `start` | Servidor em modo produção |
| `debug` | Servidor com debugger na porta `9229` |

## Qualidade de código

| Script | O que faz |
|---|---|
| `code:fix` | Formata e corrige lint (Biome), obrigatório após alteração |
| `code:check` | Verifica formatação e lint sem alterar arquivo |
| `code:fix:format` / `code:fix:lint` | Só formata, ou só corrige lint |
| `code:check:format` / `code:check:lint` | Só verifica formatação, ou só lint |
| `typecheck` | Verifica tipagem TypeScript, obrigatório após alteração |
| `modulecheck` | Valida fronteira entre módulos |
| `check` | `typecheck` + `modulecheck` + `code:check`, validação completa |

## Testes

| Script | O que faz |
|---|---|
| `test` | Testes unitários, uma vez |
| `test:watch` | Modo watch, re-executa ao salvar |
| `test:cov` | Com relatório de cobertura (v8) |
| `test:e2e` | Testes end-to-end |
| `test:debug` | Com debugger |

## Banco de dados

| Script | O que faz |
|---|---|
| `migration:run` | Aplica migração pendente |
| `migration:revert` | Reverte a última migração |
| `db:reset` | Reset completo, drop + create + migrate + seed |
| `typeorm` | Comando TypeORM direto |
| `typeorm:create` | Cria arquivo de migração vazio |
| `typeorm:entity` | Gera entidade TypeORM |
| `typeorm:generate` | Gera migração a partir do diff entre entidade e banco |

## Outros

| Script | O que faz |
|---|---|
| `codegen:timetable-generator:fresh` | Gera tipos TypeScript pras mensagens do timetable generator |

O `justfile` na raiz oferece receitas próprias pra ciclo de vida de container (`just up`, `just start`, `just logs`, entre outras), ver [Comece por aqui](comecando.md#rodando-o-projeto).
