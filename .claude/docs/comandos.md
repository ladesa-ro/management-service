# Comandos e ferramentas

## Regra fundamental: tudo roda dentro do container

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

## Package manager

Sempre use `bun` — nunca `npm`, `npx`, `yarn`, `pnpm` ou `node` diretamente.

## Após qualquer alteração de código (obrigatório)

Sempre executar os dois passos abaixo, nesta ordem, após toda e qualquer modificação de código:

1. **`just exec bun run code:fix`** — formata e corrige linting (Biome). Garante que o código segue as regras de estilo do projeto.
2. **`just exec bun run check`** — verifica tipagem TypeScript. Garante que nada está quebrado.
3. **Mapear testes** — sempre que código novo for criado ou código existente for alterado, crie ou atualize os testes correspondentes. A cobertura de testes deve acompanhar toda mudança de código.

> Esses três passos são **obrigatórios**. Não considere uma tarefa finalizada sem tê-los executado com sucesso.

## Outros comandos úteis

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
