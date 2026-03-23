---
description: Reler CLAUDE.md e refinar arquivos pendentes seguindo as diretrizes do projeto
---

## 1. Reler e aplicar CLAUDE.md

Releia o arquivo CLAUDE.md na raiz do projeto **por completo**. Internalize todas as diretrizes, convenções, padrões e regras descritas. Você **não pode ignorar** nenhuma instrução contida nele. Tudo que seguir neste comando deve estar em conformidade com o CLAUDE.md.

## 2. Refinar arquivos pendentes

Analise os arquivos do projeto que foram modificados recentemente ou que possuem pendências. Para cada arquivo, aplique as melhores práticas **conforme definidas no CLAUDE.md**, incluindo mas não limitado a:

- **DRY** — elimine duplicações
- **Clean Code** — clareza, legibilidade, responsabilidade única
- **Nomes** — variáveis, funções, classes, arquivos devem seguir as convenções do projeto
- **Caminhos** — organização de diretórios e imports conforme a estrutura definida

Corrija o que estiver fora do padrão. Se encontrar ambiguidades, siga a interpretação mais conservadora (a que mantém maior consistência com o restante do projeto).

## 3. Code Fix

Execute as ferramentas de lint, formatação e type-check do projeto (conforme configuradas no CLAUDE.md ou nos configs do repo). Corrija todos os erros e warnings reportados. Se houver erros que exijam decisão de design, sinalize-os em vez de aplicar um fix arbitrário.

## 4. Check

Rode os comandos de verificação do projeto (build, lint, testes existentes, type-check). Confirme que tudo passa sem erros. Se algo quebrar após as mudanças anteriores, corrija antes de prosseguir.

## 5. Escrever testes

Para cada arquivo modificado ou criado nesta sessão, verifique se existem testes correspondentes. Se não existirem ou estiverem incompletos:

- Crie testes unitários seguindo as convenções do projeto (framework, localização, nomenclatura)
- Cubra os cenários principais: happy path, edge cases e erros esperados
- Rode os testes e garanta que todos passam

## 6. Verificar README

Avalie se o README.md precisa ser atualizado considerando as mudanças feitas. Se precisar, atualize-o. Se estiver correto, não mexa.

## 7. Verificar CLAUDE.md

Avalie se o próprio CLAUDE.md precisa ser atualizado — por exemplo, se alguma convenção nova surgiu durante o refinamento, ou se algo ficou desatualizado. Proponha alterações se necessário.
