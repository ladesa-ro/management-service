# Dicas e troubleshooting

**TLDR**: a maioria dos problemas de ambiente local se resolve com `just rebuild`, `bun install` dentro do container, ou `bun run migration:run`.

| Sintoma | Vá pra |
|---|---|
| Container não inicia | [Container não sobe](#container-nao-sobe) |
| `migration:run` falha | [Migração falha](#migracao-falha) |
| Erro de permissão de arquivo dentro do container | [Erro de permissão no container](#erro-de-permissao-no-container) |
| Editou o arquivo mas o servidor não recarrega | [Hot reload não funciona](#hot-reload-nao-funciona) |
| Teste que passava começou a falhar depois de um `pull` | [Testes falhando após pull](#testes-falhando-apos-pull) |
| `typecheck` acusa erro que a IDE não mostra (ou o contrário) | [`typecheck` falhando](#typecheck-falhando) |
| Token `mock.matricula.*` não autentica | [Mock de autenticação não funciona](#mock-de-autenticacao-nao-funciona) |

## Container não sobe

- Docker não está rodando: verifique com `docker info`, inicie o Docker Desktop ou o daemon.
- Porta ocupada: se outra aplicação usa `3701`, `5432` ou `15672`, pare-a ou altere a porta no `.env`/`compose.yml`.
- Espaço em disco: `docker system prune` limpa imagem não usada.
- Rebuild necessário: se `Containerfile` ou dependência mudou, `just rebuild`.

## Migração falha

- Banco não acessível: confira se o container do PostgreSQL está rodando (`just logs`).
- Migração anterior não aplicada: rode `bun run migration:run` pra aplicar todas desde o início.
- Conflito de migração: se falhar por tabela/coluna já existente, o banco pode estar inconsistente, `bun run db:reset` reseta por completo (perde dado).

## Erro de permissão no container

- Diferença de UID: o container usa o usuário `happy` (uid 1000). Use `just shell-root` pra acessar como root se precisar.
- Podman: confirme `userns_mode: keep-id` (já configurado em `compose.yml`).

## Hot reload não funciona

- Volume não montado: confira se o código-fonte aparece montado (`docker compose ps`).
- Watchman/inotify em Linux: `echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p`.

## Testes falhando após pull

- Banco desatualizado: `bun run migration:run`.
- Dependência desatualizada: `bun install` dentro do container.
- Cache do Vitest: `bun run test --no-cache`.

## `typecheck` falhando

- Dependência instalada? `bun install` dentro do container.
- Tipo desatualizado? Dependência nova pode precisar de `@types/*` correspondente.
- IDE mostra erro mas `typecheck` passa (ou o contrário): a IDE pode usar versão diferente do TypeScript, o `typecheck` do container é a fonte de verdade.

## Mock de autenticação não funciona

- Formato correto é `mock.matricula.<número>` (ex.: `mock.matricula.1234`), não `mock.siape`.
- O usuário precisa existir no banco pela matrícula, rode `bun run migration:run` pra garantir o seed do superuser.
- Confirme `ENABLE_MOCK_ACCESS_TOKEN=true` no `.env`.
