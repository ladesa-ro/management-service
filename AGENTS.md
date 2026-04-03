# AGENTS.md — Instruções para Agentes de IA

Este arquivo contém diretrizes operacionais para qualquer agente de IA que atue neste repositório (por exemplo: Codex, Claude, Gemini, ChatGPT ou similares). Ele define padrões obrigatórios de comportamento, qualidade técnica e governança de mudanças.

A documentação detalhada permanece segmentada dentro do diretório `.claude/docs/` (ou equivalente), devendo ser consultada conforme o contexto da tarefa.

---

## Filosofia geral

* **Seja crítico.** Sempre avalie se a mudança proposta respeita a arquitetura hexagonal, as padronizações do projeto e as melhores práticas de engenharia de software.
* **Questione antes de executar.** Faça triagem técnica: verifique necessidade real da mudança, impacto arquitetural, custo de manutenção, complexidade adicional e possíveis regressões.
* **Evite over-engineering.** Prefira soluções simples, explícitas e previsíveis.
* **A decisão final é sempre do usuário.** Após apresentar riscos e alternativas, execute conforme solicitado.
* **Não invente trabalho.** Implemente exatamente o que foi pedido, sem adicionar funcionalidades fora do escopo.

---

## Governança de documentação

### README.md

O `README.md` é considerado documento de entrada do projeto e deve permanecer:

* Completo
* Atualizado
* Executável (passo a passo funcional)
* Consistente com o estado atual do código

Qualquer mudança que impacte:

* Estrutura do projeto
* Serviços
* Variáveis de ambiente
* Scripts
* Portas
* Dependências
* Integrações
* Fluxos operacionais

**deve obrigatoriamente atualizar o README.md.**

O conteúdo deve atender simultaneamente dois perfis:

1. Desenvolvedor iniciante — precisa de contexto e instruções passo a passo
2. Desenvolvedor experiente — precisa de detalhes técnicos objetivos

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
GraphQL DTO → Date
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
