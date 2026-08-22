# Calendário e timetabling

**TLDR**: o vocabulário padrão de calendário (`RRULE`, `UID`, `RECURRENCE-ID`, `EXDATE`) vem do RFC 5545, e os produtos que resolvem bem calendário institucional convergiram num punhado de decisões de modelagem que vale conhecer antes de desenhar a próxima. Esta página reúne isso, sem entrar em como o `management-service` especificamente implementa cada peça — isso é [Arquitetura](../arquitetura/index.md).

## O vocabulário do RFC 5545 (iCalendar)

O [RFC 5545](https://datatracker.ietf.org/doc/html/rfc5545) é a especificação que Google, Outlook e praticamente todo produto de calendário usam como formato de intercâmbio, mesmo quando o armazenamento interno é outro.

| Conceito | Campo do RFC | Resolve |
|---|---|---|
| Identidade da série, estável entre edições | `UID` | Reconciliar o mesmo evento entre sistemas diferentes, ou entre versões |
| Regra de repetição | `RRULE` | Evita guardar uma linha por ocorrência futura |
| Alterar só uma ocorrência da série | `RECURRENCE-ID` | Um componente separado, que compartilha o `UID` da série e aponta pra instância que substitui |
| Cancelar só uma ocorrência | `EXDATE` | Lista de datas excluídas da expansão da regra |
| Data extra avulsa, fora da regra | `RDATE` | O caso oposto de `EXDATE`: adicionar uma ocorrência que a regra não geraria |
| Versão da definição | `SEQUENCE` | Detectar que uma mensagem de atualização é mais velha que o estado atual |
| Fuso da ocorrência | `TZID`, `VTIMEZONE` | Horário com fuso explícito, quando o evento não é hora local flutuante |

O ponto que mais gera confusão: versionar a **definição** de uma série ("como era esta regra mês passado") não é o mesmo mecanismo que registrar uma **ocorrência divergente** ("esta terça é diferente das outras"). O RFC trata os dois como conceitos separados — `SEQUENCE` para o primeiro, `RECURRENCE-ID` para o segundo — e é comum um sistema ter um sem o outro sem perceber que faltou o segundo.

O sucessor declarado do RFC 5545 é o [RFC 8984, JSCalendar](https://datatracker.ietf.org/doc/rfc8984/): mesmo domínio, mas um modelo de dados desenhado para JSON desde o início, em vez de uma tradução do formato de texto original. Para uma API que fala JSON, é a referência mais direta de se comparar.

## O vocabulário de três opções, ao editar uma série

Google Calendar, Outlook e a maioria dos produtos maduros convergiram na mesma pergunta, na mesma ordem, sempre que alguém edita um evento recorrente:

1. **Esta ocorrência** — vira uma exceção (`RECURRENCE-ID`), a série continua intacta.
2. **Esta e as seguintes** — a série original ganha uma data de término no dia anterior, e uma série nova nasce a partir daqui.
3. **Todas as ocorrências** — atualiza a definição da série inteira.

Vale copiar esse vocabulário em vez de inventar um próprio: quem já usa qualquer agenda pessoal reconhece as três opções sem explicação.

## Ocupação sem detalhe, o nível de acesso que falta na maioria dos modelos

O [modelo de ACL do Google Calendar](https://developers.google.com/workspace/calendar/api/v3/reference/acl) tem um papel que sistemas internos costumam esquecer de modelar: `freeBusyReader`, que revela só que um horário está ocupado, sem revelar do quê. É o nível certo para compartilhamento entre organizações ou departamentos que precisam coordenar agenda sem expor conteúdo um do outro — o caso central de qualquer calendário que atravesse mais de uma unidade administrativa.

## Produtos comparáveis, e o que cada um resolve melhor

Nenhum projeto de calendário institucional precisa reler os cinco. Serve como mapa de "se o problema for X, é esse aqui que já resolveu":

| Projeto | Resolve melhor | O que vale examinar |
|---|---|---|
| **[Cal.com](https://github.com/calcom/cal.com)** | Agendamento moderno, esquema declarado em Prisma/TypeScript | Como modelam disponibilidade recorrente: uma linha com `date` nulo é regra semanal, uma linha com `date` preenchido é exceção daquele dia — mais simples de consultar que `RRULE` em texto para disponibilidade. Também materializam cada ocorrência de reserva recorrente como linha própria (`recurringEventId`), o oposto do padrão regra+exceção do iCalendar: mais caro em armazenamento, mais barato de consultar, ordenar e paginar |
| **[UniTime](https://www.unitime.org/)** | Timetabling de ensino superior, multiusuário | Modelo de dados acadêmico — oferta, turma, docente, sala — e como coordenam edição concorrente entre departamentos. Ver também o [artigo sobre restrição rígida vs. branda](https://www.unitime.org/papers/patat03.pdf) |
| **[FET](https://lalescu.ro/liviu/fet/)** | O catálogo de restrições mais completo do nicho | A lista de restrições em si: deslocamento entre blocos (mínimo de intervalo, máximo de trocas por dia/semana), espaçamento entre atividades como constraint própria e distinta de "dias distintos na semana" |
| **[Timefold](https://timefold.ai/)** (ex-OptaPlanner) | Motor de otimização com biblioteca de padrões documentados | Preferências brandas específicas: estabilidade de sala (professor prefere sempre a mesma sala, quando possível), e aula geminada da mesma disciplina como algo às vezes indesejável — o oposto do caso comum de "aluno prefere aulas seguidas". É o concorrente direto de qualquer solver baseado em OR-Tools, com pontuação nativa em três níveis (rígido, médio, brando) em vez de só rígido/objetivo único |
| **[Untis](https://untis.at/)** | Timetabling escolar com fluxo de substituição ponta a ponta | Professor se declara ausente pelo celular, sistema entra em modo de cobertura, encontra substituto, notifica por push. Autoatendimento limitado (professor troca a própria sala sem passar pela coordenação, dentro de regra) e timetable disponível offline no app. Dois padrões de produto a mais: aula ministrada nasce como **confirmação** da aula planejada, com desvio registrado quando não bate, em vez de virar relatório derivado à parte; e agendamento de reunião de pais reaproveita a mesma infraestrutura de sala e disponibilidade que a grade de aula já usa, em vez de ser um módulo separado |
| **Radicale** / **Baïkal** | Servidor CalDAV enxuto | Como servem `.ics` de verdade, incluindo exceção e sincronização incremental |
| **Nextcloud Calendar** | CalDAV em produção com interface | Sincronização incremental e resolução de conflito de escrita |

## XHSTT, PATAT e a competição internacional: onde comparar contra o que já foi resolvido

O [XHSTT](https://link.springer.com/article/10.1007/s10479-011-1012-2) é o formato XML de referência para timetabling escolar, criado no PATAT de 2008 e mantido pela Universidade de Twente: cataloga **quinze tipos de restrição**, traz instâncias reais de oito países e um avaliador que verifica se uma solução respeita cada restrição declarada. Serve tanto de checklist ("o que um catálogo maduro de restrições cobre que o nosso não") quanto de banco de teste — dá pra alimentar o nosso solver com uma instância que outro sistema já resolveu e comparar o resultado.

O **[PATAT](https://www.patatconference.org/)** (Practice and Theory of Automated Timetabling) é a conferência bienal do assunto, ativa desde 1995 — quase toda dificuldade de timetabling que um projeto novo descobre "na marra" já foi nomeada, medida e comparada em algum artigo do PATAT. A **International Timetabling Competition**, com edições em 2002, 2007, 2011, 2019 e 2021, publica instâncias de problema reais, a formulação canônica de cada edição e a descrição dos solvers vencedores — referência direta para saber se um resultado é bom ou só válido.

## As listas de falsidades sobre tempo e calendário

Duas compilações conhecidas de suposições erradas que todo sistema que mexe com data, fuso ou recorrência acaba cometendo pelo menos uma vez: [Falsehoods programmers believe about time](https://infiniteundo.com/post/25326999628/falsehoods-programmers-believe-about-time), focada em tempo e fuso, e o catálogo mais amplo do [awesome-falsehood](https://github.com/kdeldycke/awesome-falsehood), que reúne listas equivalentes para datas, calendários, semanas e outros domínios. Vinte minutos de leitura que evitam uma classe inteira de defeito — particularmente relevante num modelo que decide deliberadamente usar tempo flutuante (sem fuso) e vai, em algum momento, exportar para sistemas que usam fuso de verdade.

## CalDAV: o protocolo de sincronização, separado do formato

O RFC 5545 define o **formato** de um evento. Ele não diz como um cliente publica, busca ou assina um calendário pela rede — isso é outro RFC, o [RFC 4791, CalDAV](https://datatracker.ietf.org/doc/html/rfc4791), que estende WebDAV para guardar e sincronizar coleções de eventos sobre HTTP. É o protocolo que Radicale, Baïkal e o Nextcloud Calendar da tabela acima implementam: a diferença entre "gerar um arquivo `.ics` estático para download" e "o cliente assina um endereço e recebe atualização automática" é exatamente a diferença entre não usar CalDAV e usar.

Para "o que mudou desde a última vez que eu perguntei", CalDAV usa o [RFC 6578](https://datatracker.ietf.org/doc/html/rfc6578) (`sync-token`), que também resolve o caso de token expirado — o servidor responde pedindo sincronização completa em vez de simplesmente falhar. Para escrita condicional (dois clientes editando o mesmo evento), o mecanismo equivalente é `getetag`, a mesma ideia do `If-Match` do HTTP. Fora do mundo CalDAV, a [consulta incremental por delta do Microsoft Graph](https://learn.microsoft.com/en-us/graph/delta-query-overview) resolve o mesmo problema de outro jeito — vale comparar as duas implementações independentes antes de desenhar uma terceira: o que é essencial ao problema e o que é escolha de cada uma.

## Pra ir além

Para a parte de regulação (carga horária mínima, reposição, dias letivos), ver [Regulação acadêmica brasileira](regulacao-academica-brasileira.md) — é uma categoria à parte, normativa e não técnica.

- [RFC 5545, iCalendar](https://datatracker.ietf.org/doc/html/rfc5545) — a especificação completa
- [RFC 8984, JSCalendar](https://datatracker.ietf.org/doc/rfc8984/) — o sucessor pensado para JSON
- [RFC 6578, sincronização incremental via `sync-token`](https://datatracker.ietf.org/doc/html/rfc6578)
- [RFC 4791, CalDAV](https://datatracker.ietf.org/doc/html/rfc4791) — o protocolo de sincronização, separado do formato
- [Consulta incremental por delta, Microsoft Graph](https://learn.microsoft.com/en-us/graph/delta-query-overview) — a segunda implementação madura de leitura por marcador
- [Recurrence ID, explicado com exemplo](https://icalendar.org/iCalendar-RFC-5545/3-8-4-4-recurrence-id.html)
- [Google Calendar, compartilhamento](https://developers.google.com/workspace/calendar/api/concepts/sharing) e [ACL](https://developers.google.com/workspace/calendar/api/v3/reference/acl)
- [XHSTT](https://link.springer.com/article/10.1007/s10479-011-1012-2) — arquivo XML padrão de timetabling escolar, com instâncias reais de oito países
- [PATAT](https://www.patatconference.org/) — a conferência do assunto, ativa desde 1995
- [Interactive Timetabling](https://arxiv.org/pdf/cs/0109022) — edição interativa sobre solução já gerada
- [UniTime, alocação de docentes](https://help.unitime.org/instructor-scheduling)
- [Falsehoods programmers believe about time](https://infiniteundo.com/post/25326999628/falsehoods-programmers-believe-about-time) e o catálogo mais amplo do [awesome-falsehood](https://github.com/kdeldycke/awesome-falsehood)
- [Apriorit, eventos recorrentes](https://www.apriorit.com/dev-blog/web-recurring-events-feature-calendar-app-development) e [OneUptime, esquema de calendário](https://oneuptime.com/blog/post/2026-03-31-mysql-design-schema-for-calendar-events-app/view) — dois relatos de engenharia sobre o padrão híbrido regra + instância
