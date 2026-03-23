---
description: Refinar código para aumentar qualidade, reduzir débito técnico e evitar overengineering
---

## Objetivo

Aumentar a qualidade do código, reduzir débito técnico e evitar overengineering. Cada decisão tomada neste comando deve passar por esse filtro:

- **Simples é melhor.** Não adicione abstrações, patterns ou camadas que o projeto não precisa *agora*.
- **Menos código é mais.** Se dá pra resolver com menos linhas sem perder clareza, resolva.
- **Não invente problema.** Só corrija o que está errado ou fora do padrão. Não refatore código funcional e limpo só por preferência estética.

## 1. Reler e aplicar CLAUDE.md

Releia o arquivo CLAUDE.md na raiz do projeto **por completo**. Internalize todas as diretrizes, convenções, padrões e regras descritas. Você **não pode ignorar** nenhuma instrução contida nele. Tudo que seguir neste comando deve estar em conformidade com o CLAUDE.md.

## 2. Pré-validação de lógica

Antes de qualquer refatoração, analise os arquivos modificados ou pendentes e valide:

- **Corretude** — a lógica faz o que deveria? Há bugs, condições erradas, off-by-one, nulls não tratados?
- **Coerência** — o fluxo faz sentido no contexto do domínio? Os dados passam pelas camadas corretamente?
- **Efeitos colaterais** — alguma mudança recente quebra comportamento existente ou introduz regressões?
- **Casos de borda** — cenários limítrofes estão cobertos (listas vazias, valores nulos, permissões, concorrência)?

Se o problema for pontual e seguro de corrigir (ex: null não tratado, condição invertida), **corrija**. Se exigir refactor mais amplo ou decisão de design, **não corrija** — apenas registre para o relatório final.

## 3. Refinar arquivos pendentes

Para cada arquivo modificado ou pendente, aplique as práticas do CLAUDE.md:

- **DRY** — elimine duplicações reais (não force DRY em coisas que só parecem iguais)
- **Clean Code** — clareza, legibilidade, responsabilidade única
- **Nomes** — variáveis, funções, classes e arquivos nas convenções do projeto
- **Caminhos** — organização de diretórios e imports conforme a estrutura definida
- **Tipagem** — elimine `as any`. Sempre tipar corretamente; se necessário, use tipos mais específicos (`unknown`, narrowing, generics simples). `as any` é débito técnico, não solução.
- **Resíduos** — remova código morto (funções, variáveis, imports não utilizados), comentários desatualizados ou obsoletos, TODOs já resolvidos e arquivos órfãos. Não deixe lixo para trás.

**Não** introduza generics, abstrações, wrappers ou indireções que não sejam justificados por uso concreto no código atual.

## 4. Code Fix

Execute lint, formatação e type-check do projeto. Corrija todos os erros e warnings. Se houver erros que exijam decisão de design, sinalize-os em vez de aplicar um fix arbitrário.

## 5. Check

Rode build, lint, testes existentes e type-check. Tudo deve passar. Se algo quebrar, corrija antes de prosseguir.

## 6. Escrever testes

Para cada arquivo modificado ou criado nesta sessão, verifique se existem testes correspondentes. Se não existirem ou estiverem incompletos:

- Crie testes unitários seguindo as convenções do projeto
- Cubra: happy path, edge cases e erros esperados
- Rode os testes e garanta que passam

Testes devem ser diretos e objetivos. Não crie helpers, fixtures ou abstrações de teste desnecessárias.

## 7. Verificar README

Atualize o README.md se as mudanças exigirem. Se estiver correto, não mexa.

## 8. Verificar CLAUDE.md

Atualize o CLAUDE.md se alguma convenção nova surgiu ou algo ficou desatualizado. Proponha alterações se necessário.

## 9. Relatório de auditoria

Ao final de tudo, apresente um relatório executivo com três seções:

### Corrigido
O que foi efetivamente alterado nesta sessão (com arquivo e descrição breve).

### Divergências
Problemas pré-existentes encontrados que **não foram corrigidos** por exigirem refactor mais amplo ou decisão de design. Para cada item, descrever:
- Onde está (arquivo/camada)
- O que foi observado
- Por que não foi corrigido agora

Exemplo:
> **Observação (pré-existente, não introduzida):** `duracaoPeriodoEmMeses` não faz parte do domain entity `OfertaFormacao` nem do `OfertaFormacaoSchema` — é tratado como pass-through nos handlers. Corrigir exigiria refactor mais amplo no domínio.

### Recomendações
Sugestões de próximos passos para resolver as divergências encontradas, priorizadas por impacto.
