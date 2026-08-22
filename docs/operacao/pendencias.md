# Pendências

**TLDR**: a migração de conteúdo (`README.md`, `.claude/docs/`) pra `docs/` está concluída. O que falta agora é infraestrutura de CI, gate de qualidade de documentação, lint/teste/typecheck automatizado, e uma página de notificação WebSocket que nunca chegou a ser escrita.

## Gates de CI ainda não configurados

- [ ] **Qualidade de código (`code:check`, `check`) não roda em CI**: hoje só `.github/workflows/build-push.dev.yml` (build e push da imagem), `readme-sync-ai.yml` (sincronização do `README.md`), `docs.yml` (publicação de `docs/`) e `gitops-lint.yml` (lint do chart) existem. Condição pra fechar: um workflow novo rodando Biome e typecheck em todo push/PR que toque `src/`, ver [Qualidade de código](desenvolvimento.md#qualidade-de-codigo).
- [ ] **Testes (Vitest) não rodam em CI**: mesma lacuna acima, ver [Testes](desenvolvimento.md#testes).
- [ ] **Nenhum gate de qualidade de documentação existe pra `docs/`**: a infrastructure já tem lychee (link quebrado), grep de caractere fora do teclado e `mkdocs build --strict`, todos bloqueantes. Condição pra fechar: replicar os três workflows aqui, adaptando path de gatilho pra `docs/`/`README.md` deste repositório, ver [Qualidade da documentação](desenvolvimento.md#qualidade-da-documentacao).
- [ ] **Convenção de commit (Conventional Commits só no título) não é verificada automaticamente**: a infrastructure tem `commit-lint.yml`, este repositório não tem equivalente, ver [Commits](desenvolvimento.md#commits).

## Conteúdo referenciado que nunca foi escrito

- [ ] **[WebSockets e notificações](../arquitetura/websockets-e-notificacoes.md) fica raso de propósito**: o `README.md` anterior a esta migração linkava `.claude/docs/notificacoes-websocket.md` pra detalhar tipo de notificação, canais (rooms) e formato de pacote, mas esse arquivo nunca existiu no repositório. A página atual documenta só os dois parágrafos que o `README.md` já tinha. Condição pra fechar: escrever o conteúdo prometido, ou remover a promessa se não for mais relevante.

## Divergência não revisada

- [ ] **Cooldown do Dependabot (14 dias aqui, 7 dias na infrastructure)**: nenhuma decisão explícita documentada sobre por que os dois repositórios do Ladesa usam janelas diferentes pro mesmo tipo de proteção (dar tempo de um release comprometido ser detectado antes de chegar aqui). Condição pra fechar: alguém decidir se os dois deveriam convergir, ou se a diferença é intencional e só falta registrar o porquê.

## Divergência registrada, não pendência

A regra de [Comentários em código](desenvolvimento.md#comentarios-em-codigo) (permitido explicar o porquê aqui, proibido por completo na infrastructure) foi decidida explicitamente, não é um gap a fechar.

## Migração concluída

- [x] **`README.md` (4298 linhas) dividido entre Aprender, Arquitetura e Operação**: concluído. O `README.md` na raiz agora é um resumo curto que aponta pra `docs/`.
- [x] **`.claude/docs/` (`arquitetura.md`, `decisoes-arquiteturais.md`, `mapeamento.md`, `padroes-codigo.md`, `principios.md`, `convencoes.md`) reorganizado em `docs/arquitetura/`**: concluído.
- [x] **`SECURITY.md` (163 linhas) migrado pra [Segurança](seguranca.md)**: concluído. Diferente do `README.md`, o `SECURITY.md` da raiz não virou só ponteiro cego: o canal de reporte (e-mail, prazo de confirmação) continua visível ali, porque o GitHub renderiza esse arquivo direto na aba Security do repositório, e quem reporta uma vulnerabilidade não deveria precisar de um clique a mais pra achar o e-mail.
- [x] **`AGENTS.md` atualizado pra refletir o `README.md` curto**: concluído, ver [Estrutura de conteúdo](desenvolvimento.md#estrutura-de-conteudo-modo-e-voz-por-secao).
- [x] **Publicação de `docs/` no GitHub Pages**: concluído em 2026-08-22. `.github/workflows/docs.yml` criado, e o Pages do repositório habilitado via API (`build_type: workflow`), confirmado por `gh api repos/ladesa-ro/management-service/pages` retornando `html_url: https://ladesa-ro.github.io/management-service/`. `mkdocs build --strict` roda no push em `main`, mas só ali, não como check de PR, ver [CI/CD e deploy](../arquitetura/ci-cd-e-deploy.md#publicacao-de-docs-no-github-pages).
