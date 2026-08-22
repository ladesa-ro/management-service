# AGENTS.md: instruções para agentes de IA

Este arquivo contém diretrizes operacionais para qualquer agente de IA que atue neste repositório (por exemplo: Codex, Claude, Gemini, ChatGPT ou similares). Ele define padrões obrigatórios de comportamento, qualidade técnica e governança de mudanças.

A documentação detalhada vive em [`docs/`](docs/index.md), organizada em três trilhas (Aprender, Arquitetura, Operação, ver [Diátaxis](docs/aprender/diataxis.md)), e deve ser consultada conforme o contexto da tarefa. Os arquivos em `.claude/docs/` foram migrados pra lá e hoje só apontam pro destino certo.

---

## Filosofia geral

* **Seja crítico.** Sempre avalie se a mudança proposta respeita a arquitetura hexagonal, as padronizações do projeto e as melhores práticas de engenharia de software.
* **Questione antes de executar.** Faça triagem técnica: verifique necessidade real da mudança, impacto arquitetural, custo de manutenção, complexidade adicional e possíveis regressões.
* **Evite over-engineering.** Prefira soluções simples, explícitas e previsíveis.
* **A decisão final é sempre do usuário.** Após apresentar riscos e alternativas, execute conforme solicitado.
* **Não invente trabalho.** Implemente exatamente o que foi pedido, sem adicionar funcionalidades fora do escopo.

---

## Governança de documentação

### README.md e docs/

O `README.md` é um resumo curto (visão geral, quick start, link pra documentação completa), não o documento de entrada detalhado. Ele **não** deve crescer de volta pra conter passo a passo, variável de ambiente ou explicação de arquitetura, isso pertence a [`docs/`](docs/index.md).

Qualquer mudança que impacte:

* Estrutura do projeto
* Serviços
* Variáveis de ambiente
* Scripts
* Portas
* Dependências
* Integrações
* Fluxos operacionais

**deve atualizar a página certa de `docs/`**, seguindo o modo Diátaxis correspondente (ver [Estrutura de conteúdo](docs/operacao/desenvolvimento.md#estrutura-de-conteudo-modo-e-voz-por-secao)): fato novo sobre este serviço vai pra [Arquitetura](docs/arquitetura/index.md), passo executável novo vai pra [Operação](docs/operacao/index.md). Só atualize o `README.md` se a mudança afetar o resumo em si (nova tecnologia central, novo link de ambiente público).

O conteúdo de `docs/` deve atender simultaneamente dois perfis:

1. Desenvolvedor iniciante: precisa de contexto e instruções passo a passo
2. Desenvolvedor experiente: precisa de detalhes técnicos objetivos

---

### Arquivos de diretrizes do projeto

Sempre que mudanças alterarem:

* Padrões
* Convenções
* Arquitetura
* Fluxos de trabalho
* Decisões técnicas recorrentes

Os arquivos de documentação correspondentes devem ser atualizados para refletir o novo estado do sistema.

---

## Execução de comandos

### Regra obrigatória

Todos os comandos devem ser executados dentro do container.

Nunca executar comandos diretamente no host.

```bash
just exec <comando>
```

Se o container não estiver ativo, iniciar primeiro:

```bash
just
```

---

## Pipeline obrigatório após alteração de código

Sempre que houver qualquer modificação em código-fonte:

1. Formatar e corrigir lint

```bash
just exec bun run code:fix
```

2. Validar tipagem

```bash
just exec bun run check
```

3. Criar ou atualizar testes

Esses passos são obrigatórios para considerar a tarefa concluída.

---

## Gerenciador de pacotes

Uso obrigatório:

```text
bun
```

Nunca utilizar:

* npm
* npx
* yarn
* pnpm
* node

---

## Arquitetura

Este projeto segue arquitetura:

* Hexagonal (Ports and Adapters)
* Domain-Driven Design (DDD)
* Clean Architecture

Mudanças devem preservar:

* Isolamento do domínio
* Independência de infraestrutura
* Separação clara de camadas
* Testabilidade
* Baixo acoplamento

---

## Qualidade de código

Código deve ser:

* Determinístico
* Legível
* Testável
* Coeso
* Com baixo acoplamento

Comentários devem explicar:

* Por que a decisão foi tomada
* Qual problema está sendo resolvido

Não comentar código trivial.

---

## Regras de comportamento para agentes de IA

O agente deve:

* Ler a documentação relevante antes de agir
* Validar impacto arquitetural antes de modificar código
* Identificar riscos técnicos
* Apontar trade-offs
* Propor alternativas quando necessário

O agente não deve:

* Refatorar sem solicitação
* Alterar arquitetura sem justificativa explícita
* Introduzir dependências desnecessárias
* Alterar contratos públicos sem avaliação de impacto
* Executar mudanças silenciosas em comportamento do sistema

---

## Datas em TypeScript

Campos de data devem utilizar:

```text
string (ISO 8601)
```

Aplicável a:

* Entities
* Domain
* DTOs
* APIs REST

Exceção:

```text
GraphQL DTO -> Date
```

Conversão ocorre apenas no mapper de apresentação.

---

## Princípios técnicos obrigatórios

Aplicar consistentemente:

* SOLID
* Separation of Concerns
* Single Source of Truth
* Fail Fast
* Explicit over implicit
* Composition over inheritance

Anti-patterns devem ser evitados:

* God objects
* Hidden side effects
* Temporal coupling
* Circular dependencies
* Leaky abstractions

---

## Escopo de atuação do agente

O agente deve operar dentro destes limites:

* Implementar tarefas solicitadas
* Corrigir defeitos identificados
* Manter consistência arquitetural
* Atualizar documentação quando necessário

O agente não deve:

* Criar features não solicitadas
* Reescrever módulos inteiros sem justificativa
* Introduzir mudanças estruturais não requisitadas
* Alterar comportamento funcional sem validação explícita

---

## Atualização deste arquivo

Este arquivo deve ser atualizado sempre que houver mudanças que afetem:

* Fluxo de desenvolvimento
* Regras operacionais
* Padrões arquiteturais
* Governança técnica
* Responsabilidades dos agentes de IA
