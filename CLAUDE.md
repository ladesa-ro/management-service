# CLAUDE.md — Instruções para o Claude Code

Este arquivo contém as diretrizes principais que o Claude Code deve seguir ao trabalhar neste repositório. Documentação detalhada está em arquivos separados dentro de `.claude/docs/` — consulte-os conforme a necessidade de cada tarefa.

---

## Filosofia geral

- **Seja crítico.** Sempre avalie se a mudança proposta respeita a arquitetura hexagonal, as padronizações do projeto e as melhores práticas. Recuse ou questione abordagens que violem esses princípios.
- **Conteste o usuário ao máximo.** Antes de executar, faça triagem: questione se a mudança é realmente necessária, se não vai causar over-engineering, retrabalho, piora na qualidade do código ou piora na experiência de desenvolvimento (DX). Aponte riscos, trade-offs e consequências. Ofereça alternativas quando houver caminhos melhores. **Porém, a decisão final é sempre do usuário** — após apresentar seus argumentos, acate a escolha dele.
- **Mantenha o README.md completo e atualizado.** O README é a porta de entrada do projeto. Ele deve ser compreensível para dois perfis simultaneamente: (1) um **iniciante** que nunca viu o projeto e precisa de contexto, explicações e passo a passo detalhado para rodar, entender e contribuir; (2) um **desenvolvedor experiente** que precisa rapidamente de detalhes técnicos precisos — arquitetura, integrações, variáveis, endpoints, scripts e fluxos. Toda alteração que impacte estrutura, serviços, variáveis de ambiente, scripts, portas, dependências, integrações ou fluxos **deve** ser refletida no README.
- **Mantenha este CLAUDE.md e os arquivos de `.claude/docs/` atualizados.** Ao realizar mudanças no projeto que alterem padrões, convenções, decisões arquiteturais ou fluxos de trabalho, atualize os arquivos relevantes para refletir o estado atual. Sempre que identificar conhecimento que possa tornar o trabalho futuro mais eficiente e preciso, acrescente à documentação apropriada.
- **Mantenha o código documentado e bem escrito.** Código deve ser autoexplicativo. Quando a lógica não for óbvia, adicione comentários concisos explicando o _porquê_, não o _o quê_.
- **Não invente trabalho.** Faça exatamente o que foi pedido. Não adicione features, refatorações ou melhorias além do escopo solicitado.

---

## Comandos obrigatórios

**Tudo roda dentro do container via `just exec`.** Nunca rodar comandos diretamente no host.

```bash
just exec <comando>
```

Se o container não estiver rodando, suba-o primeiro com `just`.

**Após qualquer alteração de código (obrigatório, nesta ordem):**

1. `just exec bun run code:fix` — formata e corrige linting (Biome)
2. `just exec bun run check` — verifica tipagem TypeScript
3. Criar/atualizar testes correspondentes

> Esses três passos são **obrigatórios**. Não considere uma tarefa finalizada sem tê-los executado com sucesso.

**Package manager:** sempre `bun` — nunca `npm`, `npx`, `yarn`, `pnpm` ou `node`.

---

## Índice de documentação detalhada

Consulte os arquivos abaixo conforme o contexto da tarefa. **Leia o arquivo relevante antes de agir** quando a tarefa envolver o tópico correspondente.

| Arquivo | Quando consultar |
|---------|-----------------|
| [`.claude/docs/comandos.md`](.claude/docs/comandos.md) | Ao precisar executar qualquer comando, script ou ferramenta do projeto |
| [`.claude/docs/arquitetura.md`](.claude/docs/arquitetura.md) | Ao criar/modificar módulos, entender a estrutura hexagonal, camadas ou diretórios |
| [`.claude/docs/padroes-codigo.md`](.claude/docs/padroes-codigo.md) | Ao escrever código novo — contém exemplos reais de entidades, handlers, repositórios, controllers, DTOs, schemas, mappers |
| [`.claude/docs/convencoes.md`](.claude/docs/convencoes.md) | Ao nomear arquivos, variáveis, imports, tipagem, formatação — regras de estilo e linguagem (PT-BR/EN) |
| [`.claude/docs/decisoes-arquiteturais.md`](.claude/docs/decisoes-arquiteturais.md) | Antes de propor mudanças arquiteturais — lista de decisões intencionais que **não devem ser questionadas** |
| [`.claude/docs/mapeamento.md`](.claude/docs/mapeamento.md) | Ao criar/modificar mappers — API `into`, `createMapper`, helpers de lista, convenções de nomenclatura, namespace imports |
| [`CHECKLIST.md`](CHECKLIST.md) | Ao migrar módulos para o novo padrão de mappers — progresso, ordem de migração, instruções de limpeza |
| [`.claude/docs/principios.md`](.claude/docs/principios.md) | Ao revisar ou propor código — SOLID, DDD, Clean Code, anti-patterns, qualidade técnica |
| [`.claude/docs/ambiente.md`](.claude/docs/ambiente.md) | Ao configurar ambiente, portas, autenticação, serviços externos |

---

## Datas: string em vez de Date

Campos de data (`dateCreated`, `dateUpdated`, `dateDeleted`, `dataNascimento`, etc.) usam **`string` (ISO 8601)** em todas as camadas TypeScript — TypeORM entities, domain, REST DTOs. A coluna no banco permanece `timestamptz`/`date`/`timestamp`.

- **TypeORM Entity** — `dateCreated!: string` (não `Date`)
- **REST DTO** — `dateCreated: string` (Swagger: `type: "string", format: "date-time"`)
- **Mappers typeorm/REST** — passthrough, sem conversão
- **GraphQL DTO** — exceção: mantém `Date` por exigência do scalar `@Field(() => Date)`
- **Mapper GraphQL** — converte `string` → `Date` com `new Date(output.dateCreated)`

> Migração em andamento. Módulos legados ainda usam `Date` na entity. Consultar [`CHECKLIST.md`](CHECKLIST.md) para status.
