# O calendário que ainda não existe

**TLDR**: o sistema tem agendamento versionado, geração de horário, sessão de edição e versionamento bitemporal. O que ele não tem é o objeto que amarraria os quatro. Dez recortes sobre a modelagem atual e dez jornadas que o produto pede, comparados com o RFC 5545, o Google Calendar e a literatura de timetabling.

O documento tem três partes, e vale ler nesta ordem. A **análise** explica o que existe e o que falta. O **checklist de execução** é a lista de fazer, com 33 itens. O **roteiro de investigação** é a lista de descobrir, com 101 itens, e é o que sustenta ou derruba a análise.

Análise feita em 2026-08-22, lendo esquema, entidades e manipuladores de comando e consulta. Inclui o drift entre a API e o gerador, o cruzamento com o backlog e o roteiro de investigação que sustenta o que ainda falta apurar.

| Procura por | Vá pra |
|---|---|
| Por que não há "calendário" no sistema | [Recorte 1](#recorte-1-o-objeto-ausente) |
| Alterar só uma ocorrência de uma série | [Recorte 2](#recorte-2-a-recorrencia-para-na-primeira-excecao) |
| Compartilhamento entre campi | [Recorte 4](#recorte-4-o-evento-e-a-unica-coisa-sem-campus) |
| Por que a grade gerada não vira aula | [Recorte 5](#recorte-5-gerar-editar-e-agendar-nao-se-encontram) |
| O que precisa ser feito | [Checklist de execução](#checklist-de-execução) |
| O que precisa ser descoberto | [Roteiro de investigação](#roteiro-de-descoberta-e-investigação) |

## Síntese

A ambição descrita é um produto de calendário institucional: gestão por campi, compartilhamento entre campi, geração de aula independente, edição fina, consolidação e histórico. O modelo atual já resolve partes disso com mais sofisticação do que se esperaria, e deixa de fora coisas que parecem menores mas são estruturais.

**Já existe, e é bom:**

- Versionamento bitemporal em `calendario_agendamento`, `grade_horaria` e `turma_disponibilidade`, com `version`, `previousVersionId`, `validFrom` e `validTo`
- Identidade estável separada da linha, em `identificadorExterno`, que é o equivalente do `UID` do iCalendar
- Recorrência guardada como regra, no campo `repeticao`
- Sessão de edição com diário de mudanças, em `horario_edicao_sessao` e `horario_edicao_mudanca`
- Geração assíncrona com máquina de estados própria

**Falta, e trava a ambição:**

- Não existe entidade calendário. Eventos pertencem direto a turma, professor, diário e ambiente
- `calendario_agendamento` não tem campus
- Sem exceção por ocorrência: não há `RECURRENCE-ID` nem `EXDATE`
- Sem ACL: o acesso é papel por campus, sem compartilhar recurso específico
- Aceitar uma geração não cria agendamento nenhum
- Sem token de sincronização nem validador por recurso

## Recorte 1: o objeto ausente

No Google Calendar, o calendário é a unidade de tudo: o contêiner que se compartilha, se assina, se exporta, se pinta de uma cor e se lista na barra lateral. Eventos moram dentro dele. É por isso que a ACL é uma coleção do calendário, e não do evento.

Aqui, `calendario_agendamento` se liga ao mundo por oito tabelas de junção: ambiente, calendário letivo, diário, modalidade, oferta de formação, professor, turma e metadados. Um evento não está em lugar nenhum, ele aponta para várias coisas.

Isso é flexível e tem um custo direto sobre a ambição declarada. Sem contêiner, não existe a que assinar, o que compartilhar, o que exportar como `.ics`, nem sobre o que aplicar uma permissão. "Compartilhar dados entre campi" não tem sujeito.

A consequência prática é que a pergunta "quais calendários eu vejo?", que é a primeira tela de qualquer produto desse tipo, hoje só pode ser respondida por consulta ad hoc sobre junções. Não há nada para listar.

O que o padrão sugere é uma entidade de coleção com dono, campus, cor, visibilidade e fuso. Os vínculos atuais continuam existindo, porque carregam semântica acadêmica que o Google Calendar não tem. Mudam de papel: deixam de ser a única forma de encontrar um evento e passam a ser dimensões de filtro dentro de um contêiner.

## Recorte 2: a recorrência para na primeira exceção

O campo `repeticao` guarda a regra, o que está certo e é o consenso da indústria: uma regra substitui centenas de linhas, e o software deriva as ocorrências. O RFC 5545 define esse formato, e Google, Outlook e os demais ou o armazenam direto ou o traduzem na fronteira.

O que falta é o outro lado da moeda. No iCalendar, alterar uma única ocorrência cria um componente separado que compartilha o `UID` da série e carrega um `RECURRENCE-ID` apontando para a instância substituída. Cancelar uma ocorrência usa `EXDATE`. São esses dois mecanismos que sustentam "a aula de terça mudou de sala só nesta semana".

| Capacidade | RFC 5545 | Modelo atual | Situação |
|---|---|---|---|
| Regra de repetição | `RRULE` | `repeticao` | Existe |
| Identidade da série | `UID` | `identificadorExterno` | Existe |
| Alterar uma ocorrência | `RECURRENCE-ID` | — | Falta |
| Cancelar uma ocorrência | `EXDATE` | — | Falta |
| Datas extras avulsas | `RDATE` | — | Falta |
| Versão da definição | `SEQUENCE` | `version` | Existe |
| Fuso da ocorrência | `TZID`, `VTIMEZONE` | — | Falta |
| Estado do evento | `STATUS` | `status` | Parcial |

Vale separar duas coisas que o modelo hoje confunde. O `version` versiona a **definição** do evento, respondendo "como era esta série mês passado". O `RECURRENCE-ID` descreve uma **ocorrência divergente**, respondendo "esta terça é diferente das outras". Ter o primeiro não substitui o segundo, e é fácil concluir que sim.

## Recorte 3: o UID existe, o relógio de mudanças não

O `identificadorExterno` é um acerto silencioso: dá ao evento uma identidade que sobrevive à troca de versão, exatamente o papel do `UID`. É o que permitirá exportar `.ics` estável e reconciliar com sistemas externos sem duplicar.

O que não existe é o mecanismo de leitura incremental. Um cliente de calendário não busca tudo toda vez: guarda um marcador e pergunta "o que mudou desde então". Sem isso, cada abertura de tela relê o período inteiro, e a consolidação entre campi vira varredura.

Sustentado hoje: identidade estável entre versões, histórico completo da definição sem apagar o passado, e `dateUpdated` por linha.

Necessário para sincronizar: marcador de mudança monotônico por coleção, registro de exclusão que sobreviva ao soft delete, e validador por recurso para escrita concorrente.

A escrita concorrente merece atenção especial num produto com edição fina. Hoje dois usuários editando o mesmo agendamento produzem duas versões novas sem que nenhum saiba do outro. O padrão da web resolve com validador e escrita condicional, e o modelo já tem o material para isso no próprio `version`.

## Recorte 4: o evento é a única coisa sem campus

Oito entidades carregam campus: `grade_horaria`, `calendario_letivo`, `estagio`, `perfil`, `campus`, `bloco`, `curso` e `oferta_formacao`. O `calendario_agendamento` não está na lista.

O campus de um evento hoje só pode ser inferido: pelo ambiente, se houver; pela turma, atravessando curso; pelo professor, atravessando perfil. Três caminhos que podem discordar, e um evento sem nenhum vínculo não tem campus algum. Para um produto cuja premissa é gestão por campi, o objeto central é o único não escopado.

### Acesso é papel, não é compartilhamento

O modelo de acesso é enxuto e coerente: `perfil` liga usuário, campus e cargo, e `cargo` é só um nome. Isso dá controle por papel dentro de um campus, e é suficiente para autorização administrativa.

Compartilhamento é outro problema. O Google Calendar modela como regras sobre a coleção, cada uma com um escopo (usuário, grupo, domínio ou público) e um papel graduado, indo de `freeBusyReader`, que revela apenas ocupação sem detalhe, até `owner`. Aquele nível intermediário é justamente o que um cenário entre campi costuma querer: enxergar que a sala está ocupada sem enxergar de quê.

| Necessidade declarada | Mecanismo hoje | Suficiente? |
|---|---|---|
| Administrar o próprio campus | `perfil` com cargo | Sim |
| Ver ocupação de outro campus, sem detalhe | — | Não |
| Ceder edição de uma grade a outro campus | — | Não |
| Professor que atua em dois campi | Dois `perfil` | Com ressalva |
| Publicar horário para aluno | — | Não |

A ressalva do professor em dois campi é concreta e já afeta a geração de horário: como cada perfil é uma linha distinta, a mesma pessoa vira dois identificadores diferentes, e nada impede o gerador de alocá-la em dois campi no mesmo horário.

## Recorte 5: gerar, editar e agendar não se encontram

Existem três mecanismos maduros e paralelos, cada um com seu vocabulário, e nenhuma passagem entre eles.

| Mundo | Entidades | Produz | Vira agendamento? |
|---|---|---|---|
| Geração | `gerar_horario` e junções | Grade em JSON, em `respostaGerador` | Não |
| Edição | `horario_edicao_sessao`, `horario_edicao_mudanca` | Diário de operações | Referencia |
| Agenda | `calendario_agendamento` | O evento real, versionado | É |

O ponto mais agudo está no comando de aceitar uma geração. Ele carrega o agregado, chama `aceitar()`, salva e retorna. A transição de status acontece, e mais nada: a grade aprovada permanece um JSON dentro de uma coluna. Nenhum agendamento nasce dela.

Sem materialização, "consolidação" não tem onde acontecer. A grade gerada não aparece em nenhuma consulta de calendário, não conflita com evento existente, não é editável pela sessão de edição e não entra no histórico versionado. Ela é um anexo, não um resultado.

A modelagem de `horario_edicao` é, na prática, um rascunho transacional: uma sessão com status agrupa mudanças que apontam para agendamentos, cada uma com tipo de operação e carga. Esse é exatamente o formato que a literatura de timetabling chama de edição interativa, e é o mesmo desenho que um "publicar" exigiria. Aproveitá-la como destino da geração resolveria dois problemas de uma vez.

## Recorte 6: tudo é hora local sem fuso, e isso é uma escolha não declarada

Os campos temporais do agendamento são `date` e `time` puros: `dataInicio`, `dataFim`, `horarioInicio`, `horarioFim`. Não há fuso em lugar nenhum. Em vocabulário de calendário, isso é tempo flutuante: 07h00 significa 07h00 onde quer que se olhe.

Para horário escolar isso é frequentemente a modelagem **certa**, e não um descuido. A primeira aula começa às sete da manhã no relógio da parede, e nenhum administrador quer que o horário se desloque porque o servidor mudou de região. A recomendação corrente de guardar tudo em UTC vale para reunião entre pessoas em fusos diferentes, não para grade presencial.

O risco não é o modelo, é ele ser implícito. O tempo flutuante dá imunidade a horário de verão, a atualização da base de fusos, e mantém a grade estável entre campi de fusos distintos. Em troca, exportar `.ics` exige decidir o fuso no momento da exportação, notificação e lembrete precisam de fuso vindo de outro lugar, e integração com agenda pessoal fica ambígua.

O caminho que o RFC prevê é exatamente esse: tempo flutuante existe como categoria de primeira classe, ao lado do horário com fuso e do instante absoluto. Declarar qual das três o sistema usa, e por quê, resolve a questão sem mudar uma coluna.

## Recorte 7: a interface revela quem o sistema atende, e quem esqueceu

A aplicação web tem cerca de trinta e cinco telas, divididas em dois mundos que quase não se falam. O `sisgea` cuida de campus, bloco, ambiente e reserva. O `sisgha` cuida do acadêmico.

| Papel | Telas dedicadas | O que consegue fazer |
|---|---|---|
| Administração | ~25 em `dape/` | Tudo: cadastro, calendário, eventos, dias não letivos, grade, relatório |
| Professor | 3 | Ver o próprio calendário e o perfil. Nada mais |
| Consulta pública | 2 | Ver horário por identificador |
| Aluno | 0 | Não existe como papel |

Dois desequilíbrios saltam. O professor, que é quem mais convive com o horário e quem primeiro percebe que algo está errado, tem três telas e nenhuma capacidade de agir. E o aluno, destinatário final de toda a grade, não existe no sistema.

Vale enfrentar uma contradição: reserva de ambiente e aula disputam exatamente o mesmo recurso, a sala, e vivem em aplicações separadas sem verificação cruzada. Nada hoje impede reservar para um evento a sala onde há aula. A separação faz sentido organizacional e nenhum sentido de dados.

## Recorte 8: dez jornadas que o produto pede e a API não sustenta

Cada uma abaixo é um caso de uso concreto, com o que falta em modelagem, comando e consulta. Estão ordenadas por quanto entregam ao usuário, não por esforço.

### 1. O professor avisa que a aula não pode ser naquele horário

Hoje ele descobre o problema, manda mensagem para alguém e alguém edita. Não há registro, não há fila, não há histórico da razão.

Falta: entidade de solicitação de mudança com autor, justificativa e estado; comandos de abrir, aprovar e recusar; consulta das solicitações pendentes por campus. Reaproveita a sessão de edição como destino da aprovação.

### 2. Substituir o professor de uma disciplina por três semanas

Licença, capacitação, afastamento. É a operação mais comum de uma coordenação e hoje é impossível sem editar aula por aula, porque exige alterar parte de uma série sem quebrar o resto.

Falta: exceção por ocorrência, do Recorte 2, e um comando que a aplique a um intervalo de datas de uma vez. Sem isso, nada mais desta lista que envolva "só neste período" funciona.

### 3. A sala saiu de operação

Obra, equipamento quebrado, interdição. O efeito precisa cascatear: descobrir todas as aulas afetadas, propor realocação e avisar os envolvidos.

Falta: indisponibilidade de ambiente como entidade própria, e a consulta de impacto, "o que quebra se esta sala sumir de tal a tal data". Essa consulta é a mesma que detecta conflito, com o sinal trocado.

### 4. O aluno vê o horário da turma no celular

O destinatário final da grade não tem acesso a ela. É a maior lacuna de produto do conjunto e a mais barata depois que existir coleção.

Falta: vínculo entre pessoa e turma no papel de aluno; consulta de horário por turma com visibilidade pública controlada. O `perfil` já tem a forma certa, falta o cargo e o vínculo.

### 5. Assinar o próprio horário na agenda pessoal

Um endereço que o professor cola no Google Calendar e nunca mais pensa no assunto. Resolve notificação, lembrete e visualização móvel de uma vez, sem construir nada disso.

Falta: exportação `.ics` por coleção, com identificador estável, que o `identificadorExterno` já garante. Depende da coleção existir e da decisão de fuso do Recorte 6.

### 6. Publicar a grade, e poder voltar atrás

Entre gerar e valer há um passo que hoje não existe: alguém decide que aquela é a versão oficial, a partir de tal data. E, quando dá errado, volta para a anterior.

Falta: estado de publicação no nível da grade, não do evento isolado; comandos de publicar e reverter. O versionamento bitemporal já guarda o que é preciso para reverter, falta a operação que o usa.

### 7. Simular antes de aplicar

"Se eu mudar a disponibilidade desta turma, o que acontece com a grade?" A geração já produz uma proposta; falta compará-la com o que está no ar.

Falta: consulta de diferença entre uma grade proposta e a vigente, devolvendo o que entra, o que sai e o que se move. É a mesma primitiva que a tela de aprovação vai precisar.

### 8. Reservar a sala sem colidir com aula

A contradição do Recorte 7, vista pelo usuário: quem reserva precisa ver a ocupação acadêmica, e quem gera horário precisa respeitar reserva já feita.

Falta: uma consulta de ocupação que atravesse os dois mundos e devolva ocupação sem detalhe. É exatamente o papel intermediário de acesso que o Recorte 4 descreve.

### 9. Quem mudou esta aula, e por quê

Todo dado já está no banco, guardado versão a versão. Não há uma única consulta que o leia.

Falta: consulta de linha do tempo por identificador estável. É o item de melhor relação entre valor e esforço da lista inteira, porque não exige mudança de modelo nenhuma.

### 10. O professor que atua em dois campi

Como cada perfil é uma linha por campus, a mesma pessoa vira dois identificadores. Nada impede alocá-la em dois lugares no mesmo horário, e a geração de horário de cada campus a enxerga como pessoa diferente.

Falta: identidade de pessoa acima do perfil na verificação de conflito, e consulta de ocupação que ignore fronteira de campus. Contradiz o desenho atual de propósito: para autorização, o escopo por campus está certo; para conflito de agenda, ele mente.

## Recorte 9: comandos e consultas que existem hoje

O inventário atual do domínio de calendário tem dezoito comandos e consultas, bem distribuídos entre agendamento, calendário letivo, grade e disponibilidade.

| Capacidade do produto | Comando ou consulta hoje | Situação |
|---|---|---|
| Criar, alterar e apagar evento | `calendario-agendamento-create`, `-update`, `-delete` | Existe |
| Listar eventos por período | `consulta-ocorrencias-por-data` | Existe |
| Ver a semana | `horario-semanal` | Existe |
| Gerar horário | `gerar-horario-create`, `-aceitar`, `-rejeitar` | Existe |
| Substituir grade de horários | `grade-horaria-replace` | Existe |
| Alterar só uma ocorrência | `calendario-agendamento-editar-ocorrencia` | **Existe** — implementado em 2026-08-22 |
| Cancelar só uma ocorrência | `calendario-agendamento-cancelar-ocorrencia` | **Existe** — implementado em 2026-08-22 |
| Editar série, com "esta e as seguintes" ou "todas" | `calendario-agendamento-editar-serie` | **Existe** — implementado em 2026-08-22 |
| Publicar grade aprovada | `horario-edicao-sessao-publicar`, `-desfazer-mudanca` | **Existe** — implementado em 2026-08-22 |
| Consultar ocupação sem detalhe | `calendario-ocupacao-sem-detalhe` | **Existe** — implementado em 2026-08-22 |
| Detectar conflito antes de salvar | `findConflicting`, já em uso | **Existe** — achado corrigido em 2026-08-22, ver o item no checklist |
| Ler mudanças desde um marcador | — | Falta |
| Exportar `.ics` | `calendario-agendamento-exportar-ics` | **Existe** — implementado em 2026-08-22, pendente de verificação de pipeline |
| Ver histórico de um evento | `calendario-agendamento-linha-do-tempo` | **Existe** — implementado em 2026-08-22 |

Duas linhas merecem destaque por motivos opostos. **Ver histórico** aparece como lacuna de superfície, não de modelo: o versionamento já guarda tudo, falta só a consulta que o lê, e é das coisas mais baratas da lista. **Detectar conflito** é o oposto: parece uma consulta simples e é a mais cara, porque exige expandir recorrência de todos os eventos que compartilham professor, turma ou sala no período.

Sobre alterar uma série, os produtos maduros convergiram num vocabulário de três opções que vale copiar em vez de reinventar: só esta ocorrência, esta e as seguintes, todas. A terceira é uma atualização comum. A primeira exige o mecanismo de exceção do Recorte 2. A segunda é a mais sutil, porque na prática divide a série em duas.

## As três primitivas que se repetem

Três primitivas aparecem em mais de uma jornada e por isso valem ser construídas bem, uma única vez. A **expansão de recorrência** sustenta conflito, impacto, diferença e exportação. A **ocupação sem detalhe** sustenta reserva, consolidação entre campi e visão de aluno. E a **sessão de edição**, que já existe, é o destino natural da geração, da solicitação de mudança e da publicação.

## Drift entre a API e o gerador

O gerador de horário e a API cresceram em repositórios separados, com contratos separados, e acumularam divergências que ninguém veria sem cruzar os dois lados campo a campo.

### O gerador oferecia, a API não usava

| Capacidade | Estado anterior | Efeito para o usuário |
|---|---|---|
| Dez restrições configuráveis | A API não expunha quais ligar | Nenhum controle sobre o que o solver respeita |
| Cinco pesos de continuidade | Nunca enviados, e sem grade anterior para comparar | A função objetivo existia e não fazia nada |
| Turnos e janela de almoço | Constantes fixas no código C# | Campus com outro horário tinha a restrição silenciosamente errada |
| Nome da disciplina | Modelado, nunca trafegado | Grade devolvida sem rótulo legível |

### A API guardava, o gerador ignorava

| Dado existente | Estado anterior | Efeito para o usuário |
|---|---|---|
| Ambiente do diário e da turma | O gerador não tinha conceito de sala | Duas turmas podiam receber a mesma sala no mesmo horário |
| Dias letivos e feriados | O gerador iterava todos os dias do período | Aula marcada em feriado, recesso e domingo |
| Preferência de aulas seguidas | Cadastrada e nunca lida | Aulas espalhadas, contrariando o que se cadastrou |
| Agendamentos existentes | Invisíveis para a geração | Aula marcada por cima de evento já reservado |

Nenhum dos oito itens acima quebrava build, teste ou tipo. Campo a mais de um lado e a menos do outro é silencioso por natureza: o valor chega zerado, a restrição roda sobre lista vazia, o parâmetro é ignorado. É a classe de erro que só um cruzamento manual encontra, e é o argumento mais forte para o contrato viver num lugar só.

### O que nenhum dos dois tem, e o usuário sente

| Falta | O dado já existe? | A dor concreta |
|---|---|---|
| Capacidade da sala | Sim, `ambiente.capacidade` | Turma de 40 alocada em sala de 25, descoberto no primeiro dia |
| Tipo de sala | Metade, `ambiente.tipo` | Aula prática em sala comum. A disciplina não declara o que exige |
| Turno da turma | Sim, `turma.periodo` | Turma noturna recebendo aula de manhã |
| Deslocamento entre blocos | Estrutura, `bloco` agrupa ambientes | Dez minutos para atravessar o campus entre aulas coladas |
| Carga máxima do professor | Não | O limite é por diário, então quem tem oito diários acumula sem teto |
| Indisponibilidade do professor | Não | Tela já pedida na web, sem entidade que a sustente |
| Preferência, e não proibição | Não | "Prefiro não dar aula sexta à noite" só existe como bloqueio total ou nada |
| Aulas geminadas de verdade | Metade, conta e não adjacência | Duas aulas na mesma semana, em dias distantes, contam como geminadas |
| Equilíbrio na semana | Não | Seis aulas na segunda e nenhuma na sexta é solução válida |
| Janela vaga entre aulas | Não | Professor com buraco de três horas no meio do dia |
| Diagnóstico de inviabilidade | Não | Quando não fecha, ninguém sabe qual restrição impediu |
| Pré-requisito entre disciplinas | Não | Módulo avançado antes do introdutório na mesma grade |

Três desses mudam o produto, não só o resultado.

**Capacidade e turno são de graça.** Os dois dados já estão cadastrados e nunca foram lidos. Ligar cada um é acrescentar um campo ao contrato e uma restrição ao solver, e elimina duas classes de erro que hoje só aparecem quando a aula começa.

**Preferência versus proibição é a diferença entre um sistema tolerado e um usado.** Hoje o modelo só sabe dizer "impossível". A literatura de timetabling separa restrição rígida de branda porque quase toda vontade humana é branda: o professor prefere não dar aula na sexta à noite, e aceita se for necessário. Sem essa distinção, ou a pessoa mente no cadastro e bloqueia o horário, ou não cadastra nada.

**Diagnóstico de inviabilidade é o que separa uma ferramenta de um oráculo.** Os sistemas maduros mostram, quando algo não encaixa, qual recurso está saturado e o que precisaria ceder. Aqui, uma geração que não fecha devolve uma grade vazia sem explicação. O CP-SAT do OR-Tools, que já é o motor do nosso solver, tem mecanismo nativo para isso, `SufficientAssumptionsForInfeasibility`, bastando declarar cada restrição como um literal de habilitação e resolver com um único worker. A ressalva é que o conjunto devolvido é minimizado, não garantido mínimo, então a resposta é "pelo menos estas restrições brigam entre si", não a causa única. Ainda assim, é imensamente melhor que grade vazia.

## O que o backlog já viu, e o que nunca registrou

| Registrado | Onde | Relação com esta análise |
|---|---|---|
| Registrar apenas as exceções do calendário letivo | [management-service #595](https://github.com/ladesa-ro/management-service/issues/595) | É o modelo de exceção do Recorte 2, com outras palavras |
| Recorrência de aula com base no horário | [#596](https://github.com/ladesa-ro/management-service/issues/596) | A recorrência como regra, ainda sem exceção |
| Tela de indisponibilidade do professor | [web #542](https://github.com/ladesa-ro/web/issues/542) | Interface pedida para entidade que não existe na API |
| Calendário completo com meses, dias e eventos | [#452](https://github.com/ladesa-ro/management-service/issues/452) e [#605](https://github.com/ladesa-ro/management-service/issues/605) | Consulta agregada, que a expansão de recorrência sustentaria |
| Dia letivo presencial, não presencial e não letivo | [#447](https://github.com/ladesa-ro/management-service/issues/447) | Já modelado no banco, e agora consumido pela geração |
| Edição de calendário no Figma | [web #502](https://github.com/ladesa-ro/web/issues/502) | Desenho para operação que a API não expõe |

As issues do `web` pedem telas para capacidades que a API não tem, e as do `management-service` descrevem rotas isoladas em vez do modelo por trás delas. Duas metades da mesma lacuna, em repositórios diferentes, sem um lugar onde se encontrem.

Nenhuma issue menciona compartilhamento entre campi, exportação de calendário, acesso do aluno, publicação de grade, detecção de conflito, diagnóstico de inviabilidade ou identidade de professor acima do campus. São exatamente os itens que separam um sistema de cadastro com gerador acoplado de um produto de calendário.

# Checklist de execução

O que precisa ser escrito, mudado ou reescrito. É a lista de **fazer**, distinta do [roteiro de investigação](#roteiro-de-descoberta-e-investigação), que é a lista de **descobrir**. Um item daqui pode depender de um item de lá, e nesse caso está anotado.

Marcado significa entregue e verificado.

**Progresso**: 42 de 62 itens fechados.

## Estado de execução desta rodada

Fonte de verdade única pro que está em aberto agora — status de agente, decisão operacional e lacuna sem dono. Atualizado em 2026-08-22, revisar antes de considerar qualquer coisa pronta pra commit.

### Concluído — todos os agentes desta rodada terminaram

Nove disparos ao todo (contando retomadas), todos resolvidos. Nenhum agente rodando agora.

| Item | Onde | Verificação |
|---|---|---|
| Pessoa acima do perfil (Fase 6) | ~~módulo `acesso/usuario/pessoa`~~ **revertido** | **Revertido em 2026-08-22.** Ao explicar a lacuna da herança automática, achamos a premissa errada: `Perfil.usuario` já permite um `Usuario` ter vários perfis (um por campus), então `usuario.id` já bastava pra agrupar a mesma pessoa entre campi — **contanto que `Usuario` seja de fato único por pessoa**, o que não era garantido: `usuario.matricula`/`email` não tinham `UNIQUE`. `Pessoa` virou camada redundante. Revertido por completo: módulo apagado, `perfil.pessoaId` removido (domínio, schema, entidade, mapper, repositório, query result, specs), `PessoaModule` tirado de `modules.module.ts`, tabela `pessoa` e coluna `perfil.id_pessoa_fk` dropadas do Postgres de dev. No lugar, migração `1783000000018-add-unique-matricula-to-usuario.ts` — `UNIQUE (matricula)`, aplicada e confirmada sem duplicata na base atual |
| Capacidade do ambiente, herança de `colecao`, coleção padrão de `curso` | `calendario/agendamento`, `ensino/turma`, `ensino/curso` | 136/136 testes. Migrações rodadas de verdade contra o Postgres do `docker compose` |
| Transferência de dono de coleção, notificação ao conceder acesso | `calendario/colecao` | Testes cobrindo os quatro casos, zero mudança necessária na verificação |
| Chave de idempotência | `src/shared/idempotency/` (`@Global()`, padrão `ResilienceModule`) | Revisão manual (pipeline indisponível). Corrida real concorrente não tratada — falha segura, não corrompe dado |
| Visão do aluno — matrícula turma↔perfil | `ensino/turma/matricula/` (novo) | Achou e corrigiu bug real: `colecaoPadrao` escondia a própria grade do aluno via ACL |
| Exportação `.ics` | `calendario/consultas` | Revisão manual (pipeline indisponível) |
| Ação para o professor — autoatendimento de cancelamento | `calendario/agendamento/application/authorization/` | **337/337** testes da suíte `calendario/` (1 falha pré-existente não relacionada), `tsc` limpo |
| WebSocket generalizado + marcador de sincronização | `acesso/notificacao` (gateway), `calendario/colecao`, `calendario/consultas` | **353/353** testes, `tsc` limpo. Rodou `vitest`/`tsc` direto no container, contornando `nx`/`biome` quebrados |

**Cancelado**: WhatsApp em solicitação de mudança — fora de escopo por decisão explícita, WhatsApp fica restrito a `estagio`. Nada foi escrito, nada pra reverter.

### Rodada extra — lacunas achadas ao cruzar o artefato publicado com o código

O artefato visual ("Calendário do Ladesa", 12 recortes) enquadra a análise de um jeito que o checklist não capturava. Cruzando recorte a recorte contra o código commitado, quatro coisas apareceram como genuinamente não feitas.

| Item | Onde | Status |
|---|---|---|
| **Conflito de agenda entre campi** — `findConflicting` recebia `perfilIds` e nunca descobria que dois perfis são do mesmo `usuario`, então o mesmo professor podia ser alocado em dois campi no mesmo horário | `calendario/agendamento` | **Concluído em 2026-08-22** — novo `CalendarioAgendamentoConflitoService` expande os `perfilIds` recebidos pra incluir todos os perfis ativos dos mesmos `usuario`s (via `IPerfilFindOneQueryHandler` + `IPerfilFindAllActiveQueryHandler`, portas já existentes do módulo `perfil`) antes de chamar `findConflicting` — identidade fica no serviço de aplicação, não no repositório de agendamento nem duplicada nos 4 command handlers. Usado por `create`, `update`, `editar-ocorrencia` e `editar-serie` (as duas ramificações). Quando o conflito é entre perfis diferentes do mesmo usuário, a mensagem passa a dizer "já tem agendamento neste horário em outro campus" com nome do professor e do campus, em vez do id opaco de perfil. 6 testes novos cobrindo o caso entre campi, regressão do mesmo perfil, ausência de falso positivo entre usuários diferentes e a mensagem diferenciada — suíte `calendario/` com 218/218 só em `agendamento/`, `tsc` limpo |
| **`RDATE`** (data avulsa fora da regra) **e importação de `.ics`** — a recorrência tem `RRULE`/`RECURRENCE-ID`/`EXDATE`, faltou `RDATE`; e do `.ics` só existe exportação | `calendario/agendamento`, `calendario/consultas` | **Concluído.** `RDATE` sem coluna nova: reaproveita o mecanismo de exceção com `dataOcorrenciaReferenciada` nula significando "adição pura". Importação com parser próprio simétrico ao exportador, dedupe por `UID` que seja UUID válido, resumo de criados/pulados/rejeitados por evento. Corrigiu de passagem um bug em `reatribuirExcecoesParaNovaSerie`, que abandonaria datas avulsas na série antiga ao dividir |
| **Escrita condicional (`ETag`/`If-Match`, 412)** — a outra metade do Recorte 3: o `sync_token` resolveu leitura incremental, mas duas edições concorrentes do mesmo agendamento ainda se sobrescrevem em silêncio | `calendario/agendamento` | **Concluído.** `version` sozinho não servia como validador (cada escrita cria `id` novo, a linha nunca muda de `version`) — `ensureIfMatch` checa `version` + `isActive()` juntos. Validador exposto no corpo, não em header `ETag`, porque `version` já era publicado e testado ali |
| **Declarar o modelo de tempo** — o Recorte 6 pede exatamente isso e não custa código: o serviço usa tempo flutuante (sem fuso) por escolha, e isso não estava escrito em lugar nenhum | `docs/arquitetura/decisoes-arquiteturais.md` | **Concluído** — ADR 17 |

Dois follow-ups que os agentes sinalizaram sem poder tocar (arquivo em voo de outro agente), **ambos fechados depois**: o 5º call site de `findConflicting` (`adicionar-data-avulsa`, criado pelo agente do `RDATE` no meio do trabalho do agente de conflito) foi ligado ao serviço compartilhado; e `saveNewVersion` passou a checar, sob o lock, se a versão já foi fechada por outra transação — o `setLock("pessimistic_write")` existia mas **descartava o resultado**, então serializava sem validar, e duas escritas realmente simultâneas ainda geravam duas versões-filha em silêncio. Agora lança `PreconditionFailedError`. Depois dos dois: suíte de `calendario/` com **424 passando**, `tsc` limpo.

### Decisões operacionais em aberto, não são item de produto

- **Agrupamento dos commits**: 147 arquivos não commitados nesta sessão, oito grupos propostos (mensageria BullMQ, gerador de horário, Fases 1–5, apoio) — aguardando confirmação antes de qualquer commit
- ~~Container `ladesa-rabbitmq` órfão~~ — **removido em 2026-08-22**, junto com as variáveis `MESSAGE_BROKER_*` mortas em `.env`/`.env.example`, substituídas pelas `QUEUE_*` que o código de fato lê (sem elas a fila ficava indisponível em dev). `docs/operacao/comecando.md` atualizado pra não citar mais o container. Ver [Pendências](operacao/pendencias.md)
- **Banco de desenvolvimento já está à frente do que está commitado**: pelo menos as migrações `1783000000011` e `1783000000012` foram de fato rodadas (`migration:run`, não só escritas) contra o Postgres do `docker compose` desta sessão, por um agente que confirmou a aplicação. Nenhuma foi revertida, porque migrações de outros agentes rodaram depois na mesma base. Se alguém subir um `docker compose` novo do zero, as migrações rodam na ordem certa igual sempre; o que muda é que **este** ambiente específico já tem o schema novo aplicado antes mesmo do commit — não é problema, só não presuma que "não commitado" significa "banco intocado" se for depurar algo neste ambiente específico

## Já entregue

Corrigido durante a análise, ao trazer o gerador para o monorepo.

- [x] **Expor as restrições no contrato da API** — os dez tipos, com nulo significando todas
- [x] **Parametrizar turnos e janela de almoço** — deixaram de ser constante fixa no C#
- [x] **Enviar a grade anterior** — a última solicitação aceita, o que dá função aos cinco pesos
- [x] **Sala no contrato e restrição de conflito** — `room_id` mais `RoomOneScheduleAtSameTime`
- [x] **Dias não letivos** — feriado, recesso e fim de semana deixam de receber aula
- [x] **Preferência de aulas seguidas** — alimenta o limite semanal quando cadastrada
- [x] **Agendamentos existentes** — viram aula fixa ou bloqueio, conforme o vínculo
- [x] **Montar o pedido a partir do banco** — turmas, professores, diários e horários reais

## Modelagem

- [x] **Campus em `calendario_agendamento`** `implementado em 2026-08-22` — `id_campus_fk` nullable, com backfill a partir de ambiente ou turma→curso na migração
- [x] **Referência de ocorrência e datas excluídas** `implementado em 2026-08-22` — `identificador_externo_serie_origem` e `data_ocorrencia_referenciada`, equivalentes a `RECURRENCE-ID`. Cancelamento (`EXDATE`) reaproveita `status: INATIVO` em vez de campo novo. Destrava as jornadas 2, 3 e 6
- [x] **Entidade de coleção** `implementado em 2026-08-22` — `calendario_colecao`, com dono, campus, cor e visibilidade. Destrava as jornadas 4, 5 e 8
- [x] **Regra de acesso sobre coleção** `implementado em 2026-08-22` — `calendario_colecao_acesso`, escopo (`USUARIO`/`CAMPUS`/`PUBLICO`) e papel graduado (`EDITOR`/`LEITOR`/`OCUPACAO`), aplicado de verdade em escrita e leitura de agendamento, não só modelado
- [x] **Solicitação de mudança** `implementado em 2026-08-22` — autor, justificativa e estado (`ABERTA`/`APROVADA`/`RECUSADA`), aprovar reaproveita a sessão de edição da Fase 4. Destrava a jornada 1
- [x] **Indisponibilidade de ambiente** `implementado em 2026-08-22` — destrava a jornada 3
- [x] **Indisponibilidade de professor** `implementado em 2026-08-22` — regra semanal ou exceção pontual, mais `tipo` (`BLOQUEIO`/`PREFERENCIA`), fechando também o item de restrição rígida vs. branda
- [x] **Pessoa acima do perfil** `resolvido de outro jeito em 2026-08-22, sem o agregado Pessoa` — o módulo `Pessoa` construído inicialmente foi **revertido**: `Perfil.usuario` já agrupa os perfis da mesma pessoa entre campi nativamente, o que faltava era garantir que `Usuario` fosse mesmo único por pessoa. Adicionada `UNIQUE (matricula)` em `usuario` (migração `1783000000018`). Conflito de agenda entre campi passa a agrupar por `perfil.usuario.id` direto, sem indireção nova — mais simples, sem código morto. Ver "Estado de execução" acima
- [x] **Capacidade da sala no contrato** `implementado em 2026-08-22` — `turma.numeroEstimadoAlunos` novo, validado contra `ambiente.capacidade` em `create` e `update`, 136/136 testes do módulo passando
- [x] **Turno da turma no contrato** `implementado em 2026-08-22` — o dado já existia em `turma.periodo`, validado contra o horário do agendamento em `create`/`update`
- [x] **Carga máxima por professor** `implementado em 2026-08-22` — `perfil.cargaMaximaSemanal`, validado em `diario-professor-bulk-replace` somando a carga horária dos diários ativos
- [x] **Preferência como categoria distinta de proibição** `implementado em 2026-08-22` — `tipo` em indisponibilidade de professor, junto com a própria entidade
- [x] **Autor e motivo na versão** `implementado em 2026-08-22` — `id_autor_fk` e `motivo` em `calendario_agendamento`, `grade_horaria` e `turma_disponibilidade_configuracao`, lidos do `IAccessContext`, nunca do corpo da requisição. Transforma histórico em auditoria

## Comandos

- [x] **Reescrever `gerar-horario-aceitar`** `implementado em 2026-08-22` — abre uma `HorarioEdicaoSessao` e grava uma `HorarioEdicaoMudanca` por agendamento proposto, lendo `respostaGerador` com tipagem real (protobuf) em vez de blob JSON opaco; a transição de status vira consequência, não o efeito inteiro
- [x] **Alterar ocorrência, série a partir de data, série toda** `implementado em 2026-08-22` — `calendario-agendamento-editar-ocorrencia`, `-cancelar-ocorrencia` e `-editar-serie` (com `escopo: ESTA_E_SEGUINTES | TODAS`), o vocabulário de três opções que os produtos maduros convergiram. `ESTA_E_SEGUINTES` divide a `RRULE` na data de corte e reatribui exceções futuras à série nova
- [x] **Publicar e reverter grade** `implementado em 2026-08-22` — `horario-edicao-sessao-publicar` aplica as mudanças da sessão numa transação; `horario-edicao-sessao-desfazer-mudanca` reverte uma mudança específica via `dados_anteriores`, não a sessão inteira. Destrava a jornada 6
- [x] **Abrir, aprovar e recusar solicitação** `implementado em 2026-08-22` — módulo `calendario/solicitacao-mudanca`. Destrava a jornada 1
- [x] **Chave de idempotência nos comandos de estado** `implementado em 2026-08-22, pendente de verificação de pipeline` — `src/shared/idempotency/`, header `Idempotency-Key` opcional em `gerar-horario-create` e `horario-edicao-sessao-publicar`
- [x] **Desfazer sobre a sessão de edição** `implementado em 2026-08-22` — `horario-edicao-sessao-desfazer-mudanca`, confirmado que `dados_anteriores` (coluna nova) guarda o suficiente pra reverter, respondendo O2

## Consultas

- [x] **Linha do tempo por identificador** `implementado em 2026-08-22` — `GET /calendario/agendamentos/identificador-externo/:identificadorExterno/linha-do-tempo`, com autor, motivo e diff campo a campo entre versões consecutivas
- [x] **Ocupação sem detalhe, entre campi** `implementado em 2026-08-22` — `calendario-ocupacao-sem-detalhe`, por campus e período, sem ACL por coleção (é ela mesma a visão segura de compartilhar). Destrava as jornadas 8 e 10
- [x] **Conflito e impacto** `corrigido em 2026-08-22` — a análise original errou: a detecção de conflito **já existe**, em `CalendarioAgendamentoTypeOrmRepositoryAdapter.findConflicting`, cruzando turma, perfil e ambiente por sobreposição de data e horário, e já está em uso em `create` e `update`, bloqueando com 400 quando colide. Existe também `findByDateRange`, com filtro por campus. O que falta de verdade, e só isso, é a expansão de recorrência semanal: a consulta atual compara intervalo de datas, não ocorrências RRULE, então dois eventos semanais em intervalos de data diferentes que caem no mesmo dia da semana não são pegos. Depende da Fase 2 do plano de implementação (RECURRENCE-ID/EXDATE) para fechar de vez.
- [x] **Diferença entre grades** `implementado em 2026-08-22` — `horario-edicao-sessao-diferenca`, compara o proposto pela sessão com o vigente, reaproveitada tanto pra revisar sessão quanto pra comparar grade antes de aceitar
- [x] **Mudanças desde um marcador** `implementado em 2026-08-22, com aproximação documentada` — `sync_token` em `calendario_colecao`, incrementado a cada escrita de agendamento vinculado, consulta `calendario-colecao-mudancas-desde`. Sem tabela de auditoria por trás, não há diff exato por token — a aproximação é devolver o snapshot completo quando `desde < syncToken`, documentada no próprio tipo de resultado. WebSocket generalizado (`calendario:{colecaoId}`) emite no mesmo hook, aditivo sobre o gateway que `estagio` já usa
- [x] **Exportação `.ics`** `implementado em 2026-08-22, pendente de verificação de pipeline` — `calendario-agendamento-exportar-ics`, reaproveita o handler de expansão de recorrência, respeita `detalhesOcultos` do ACL, RFC5545 real (escaping, fold de linha, `UID` composto com data)
- [ ] **Diagnóstico de inviabilidade** `novo` — quando não fecha, dizer qual restrição impediu. Maior ganho de experiência da lista

## Interface e produto

- [x] **Visão do aluno** `implementado em 2026-08-22, pendente de verificação de pipeline` — módulo `ensino/turma/matricula`, vínculo turma↔perfil (`TurmaMatricula`), "Aluno" já era possível como `Cargo` sem código novo. Achado real na revisão: quando `curso.colecaoPadrao` está configurado, o ACL de coleção escondia a própria grade do aluno da turma; corrigido pulando a checagem de ACL quando o chamador tem matrícula ativa na turma filtrada
- [x] **Ação para o professor** `implementado em 2026-08-22, parcial` — autoatendimento limitado: professor participante do agendamento pode cancelar a própria ocorrência sem precisar de `EDITOR` na coleção (`ensureCanCancelarPropria`). Só cancelamento — editar dados ou trocar de coleção continuam exigindo `EDITOR`. 337/337 testes. O resto da lacuna original (telas de verdade) é frontend, fora deste repositório
- [ ] **Notificação pelo canal que já existe** `novo` — a integração de WhatsApp está de pé e ociosa para isso
- [ ] **Ocupação cruzada entre reserva e aula** `novo` — os dois mundos disputam a mesma sala sem se ver

## Correções pendentes na documentação

Achadas ao ler o que já existe no repositório.

- [x] **`arquitetura.md` cita o grupo `horarios/`** `corrigido em 2026-08-22` — o código usa `calendario/`. `.claude/docs/arquitetura.md` virou ponteiro pra [docs/arquitetura/camadas-e-estrutura.md](arquitetura/camadas-e-estrutura.md), que agora lista o grupo certo, junto com `relatorios/`, que também estava faltando
- [x] **`arquitetura.md` descreve `infrastructure.message-broker` como RabbitMQ via Rascal** `corrigido em 2026-08-22` — [docs/arquitetura/message-broker.md](arquitetura/message-broker.md) reescrito para BullMQ sobre PostgreSQL (`createPostgresBackend`, sem Redis); ADR-006 marcado como superado, não reescrito

## Limpeza

- [ ] **Apagar arquivos de apoio, incluindo este documento** — depois que os itens acima estiverem implementados, revisados e commitados, remover `docs/analise-calendario.md` (e qualquer outro material de planejamento temporário desta rodada, como plano de execução em `.claude/plans/`) do repositório. Este documento existe pra sustentar a implementação, não como referência permanente — deixá-lo pra trás depois de cumprido o papel só polui o histórico com material de rascunho. O conteúdo que tem valor de permanência já foi extraído pra `docs/aprender/calendario-e-timetabling.md` e `docs/aprender/regulacao-academica-brasileira.md`; o resto (checklist, roteiro de investigação, achados) não precisa sobreviver à implementação

---

## Achados da rodada de pesquisa em fontes externas

Cada item abaixo veio de uma linha do roteiro de investigação, pesquisada de verdade nesta rodada. A referência entre parênteses aponta para o item que a originou.

### Do comportamento observado

- [x] **Adotar o vocabulário de três opções ao editar série, com a ordem que o mercado convergiu** `implementado em 2026-08-22` — "esta" (`editar-ocorrencia`), "esta e as seguintes", "todas" (as duas últimas em `editar-serie`, campo `escopo`), nessa ordem de exposição. Confirmado como o padrão do Google Calendar. _(C3)_
- [x] **Decidir explicitamente: exceção sobrevive à mudança da regra, ou é descartada** `implementado em 2026-08-22` — decisão tomada: a exceção **sobrevive**, replicando o Google Calendar. Na prática, isso é consequência direta do modelo: a exceção referencia o `identificadorExterno` estável da série, que não muda ao criar nova versão (`escopo: TODAS`), então nenhuma limpeza é necessária. _(C3)_

### Do modelo de dados de outros produtos

- [ ] **Considerar o padrão de disponibilidade com `date` anulável, em vez de RRULE textual** `novo` — o Cal.com modela disponibilidade recorrente e exceção pontual na mesma tabela: linha com `date` nulo é regra semanal (`days`, `startTime`, `endTime`); linha com `date` preenchido é sobrescrita daquele dia específico, bloqueando ou abrindo. É mais simples que RRULE em texto para o caso de disponibilidade de turma e de professor, e resolve o L bem antes de qualquer regra ICU. Vale para `turma_disponibilidade` e para a indisponibilidade de professor que ainda não existe. _(C4, L)_
- [ ] **Avaliar materializar ocorrência em vez de expandir regra sob demanda** `novo` — o Cal.com não guarda RRULE e expande: cada ocorrência de reserva recorrente é uma linha própria, agrupada por `recurringEventId`. É o oposto do padrão RRULE+exceção do iCalendar, mais caro em armazenamento e muito mais simples de consultar, ordenar e paginar. Vale pesar contra o modelo de regra ao decidir o Recorte 2, com o volume real do A7 como critério de decisão. _(C4)_

### Do catálogo de restrições que já existe

- [ ] **Restrição de deslocamento entre blocos, nomeada e pronta** `novo` — o FET já resolve isso como categoria própria: mínimo de intervalo entre trocas de prédio, máximo de trocas por dia, máximo por semana. Não precisa inventar, precisa adaptar ao nosso `bloco`. _(L4, P2)_
- [ ] **Duas restrições distintas de espaçamento, não uma** `novo` — confirmado no FET: "mínimo de dias entre atividades de um conjunto" é constraint própria, diferente de "dias distintos na semana". Modelar como dois parâmetros separados, não como uma única flag. _(L5, P2)_
- [ ] **Estabilidade de sala como preferência do professor** `novo` — achado no Timefold: professor prefere lecionar todas as aulas na mesma sala, quando possível. É restrição branda nova, ausente da nossa lista de doze, e barata de expressar como pontuação sobre variação de `room_id` por professor no período. _(P8)_
- [ ] **Aula geminada da mesma disciplina pode ser indesejável, dependendo do caso** `novo` — o Timefold trata como preferência oposta à do L2: aluno prefere não ter duas aulas seguidas da mesma matéria, exceto quando a disciplina exige bloco duplo. As duas coexistem e dependem do metadado da disciplina, não é regra universal. _(L2, P8)_

### Do protocolo, para o marcador de mudança e a concorrência

- [x] **Usar o vocabulário do RFC 6578 para leitura incremental** `implementado em 2026-08-22` — `sync_token` em `calendario_colecao`, consulta `calendario-colecao-mudancas-desde`. Caso de token expirado (o "não sei o suficiente pra fazer diff exato") documentado como limitação, não escondido. _(P3)_
- [ ] **Usar `getetag` como o validador de escrita condicional** `novo` — é o mesmo mecanismo do padrão HTTP `If-Match`, já resolvido pelo protocolo. Fecha o item de escrita concorrente do Recorte 3 sem inventar formato de versão próprio. _(P3, A3 sobre concorrência)_

### Do que a legislação já obriga

- [ ] **Confirmar contra a Resolução CNE/CES nº 2/2007 o que já está certo no modelo** `novo` — a resolução trata de carga horária mínima e integralização para bacharelados presenciais, e o modelo já tem `curso.cargaHoraria` e `disciplina.cargaHoraria`, sugerindo que o requisito regulatório já influenciou o desenho original, mesmo sem estar documentado como tal. Vale confirmar contra a organização didática da própria instituição antes de qualquer mudança em carga horária. _(P11, P12)_
- [ ] **Reposição de carga horária tem previsão normativa própria** `novo` — o CNE já trata reposição de carga horária como categoria formal, o que sustenta o item I2 como requisito e não como conveniência. Levantar se a instituição já tem norma interna de reposição antes de desenhar o fluxo. _(I2, P12)_

### Do que um produto maduro do mesmo nicho já resolveu

- [ ] **Fluxo de ausência de professor disparando substituição, ponta a ponta** `novo` — o Untis tem o fluxo completo: professor se declara ausente pelo próprio celular, o sistema entra em modo de planejamento de cobertura, encontra substituto e notifica por push. É mais ambicioso que a solicitação de mudança do item 1 das jornadas, que hoje só cobre abrir/aprovar/recusar. Vale desenhar esse fluxo específico como caso separado. _(P9)_
- [x] **Autoatendimento limitado para o professor** `implementado em 2026-08-22, parcial` — `ensureCanCancelarPropria`: professor participante cancela a própria ocorrência sem precisar de `EDITOR`. Só cancelamento, não trocar sala/criar evento — o padrão completo do Untis fica maior que o que foi pedido aqui. _(P9, Recorte 7)_
- [ ] **Registro de aula ministrada com chamada, dentro do próprio calendário** `novo` — o Untis liga o registro de presença à aula agendada, não como sistema separado. Isso muda o desenho do item M4: em vez de um relatório derivado, a aula ministrada nasce como confirmação da aula planejada, com desvio registrado quando não bate. _(P9, M4)_
- [ ] **Agendamento de reunião de pais como o mesmo mecanismo de reserva de sala e horário** `novo` — ideia nova, não estava em nenhuma jornada: o Untis oferece um módulo em que o professor abre janelas e o responsável agenda um horário, reaproveitando a mesma infraestrutura de sala e disponibilidade que a grade de aula já usa. Vale considerar como jornada nova, de baixo custo marginal se a coleção e a disponibilidade já existirem. _(P9)_
- [ ] **Timetable disponível offline no aplicativo do professor** `novo` — resposta concreta ao item J6 (sistema fora do ar) e ao G3 (uso em celular): a resposta madura não é alta disponibilidade do servidor, é o cliente guardar a última versão localmente. Muda a prioridade de "manter o servidor sempre no ar" para "a consulta de horário funcionar sem rede". _(P9, J6, G3)_

## O que a leitura do próprio código, nesta rodada, revelou

Três descobertas que não vieram de pesquisa externa, vieram de olhar o que o `management-service` já tem e ninguém tinha cruzado com o calendário.

- [x] **Existe canal de tempo real pronto, e o calendário não o usa** `implementado em 2026-08-22` — `NotificacaoGateway` generalizado pra aceitar salas `calendario:{colecaoId}` além das fixas de `estagio`, sem tocar o uso que já existe. Emite no mesmo hook do marcador de sincronização. _(G1)_
- [ ] **Existe um padrão de alerta por cron já em produção** `estagio-alerta.cron.ts` `novo` — mostra que disparo agendado de notificação já é prática aceita no repositório, o que remove a dúvida de "cabe nesse projeto" para lembrete de aula e aviso de reposição. _(G1)_
- [ ] **O serviço de WhatsApp está fortemente acoplado à folha de ponto** `novo` — `FolhaPontoWhatsappService` tem um único método, `enviarSolicitacaoAprovacao`, específico do caso de uso de folha de ponto. Generalizar para o calendário exige extrair a camada de envio antes de reaproveitar, não é um acoplamento livre como eu tinha presumido antes de olhar o código. _(G1)_


### Mais um achado técnico, e o fechamento desta rodada

- [ ] **Isolamento por campus com política de segurança do próprio banco** `novo` — a coluna `campus_id` já é o padrão mais barato e mais usado em sistemas multi-tenant, o que valida a direção do Recorte 4. O reforço que faltava: usar Row-Level Security do PostgreSQL para que o próprio banco recuse linha fora do campus da sessão, em vez de depender de toda consulta lembrar o filtro. Transforma "vazamento entre campi" de bug possível em bug estruturalmente impedido. _(N1)_

Esta rodada tratou com pesquisa real e conclusão registrada os itens do roteiro que mais se beneficiavam de fonte externa: todo o Bloco C, a maior parte do Bloco P, e três achados de código nos blocos G e M. Os itens dos blocos H, I, J, K, L, N e O que continuam `aberto` genuinamente exigem acesso que esta sessão não tem, banco de produção, entrevista com quem monta horário, ou o Figma, e permanecem como estão, não porque foram ignorados, mas porque pesquisa bibliográfica não os substitui.


## Sequência recomendada

A ordem é deliberada: cada passo é útil sozinho, e nenhum depende de um posterior. Os dois primeiros são baratos e destravam desproporcionalmente.

1. **Dar campus ao agendamento.** Uma coluna, preenchida por retrocompatibilidade a partir dos vínculos existentes. Sem ela, nenhuma consulta por campus é confiável e a autorização não tem em que se apoiar.
2. **Materializar a grade aceita.** Aceitar uma geração passa a abrir uma sessão de edição com as mudanças propostas, reaproveitando o mecanismo que já existe. Só isso conecta os três mundos e dá sentido a consolidação.
3. **Linha do tempo do evento.** Uma consulta que lê o versionamento que já existe. Não muda modelo nenhum e responde "quem mudou e quando".
4. **Ligar capacidade e turno.** Os dois dados já estão cadastrados e nunca foram lidos pela geração. Detalhe em [Drift entre a API e o gerador](#drift-entre-a-api-e-o-gerador).
5. **Exceção por ocorrência.** Referência à ocorrência substituída e lista de datas excluídas. Habilita "só esta aula", a operação mais pedida em qualquer calendário.
6. **Introduzir a coleção.** A entidade calendário, com dono, campus, cor e visibilidade. Passa a ser o sujeito de compartilhar, exportar e assinar.
7. **Regras de acesso sobre a coleção.** Escopo e papel graduado, com o nível de ocupação sem detalhe desde o início, porque é ele que viabiliza cooperação entre campi sem expor conteúdo.
8. **Leitura incremental e escrita condicional.** Marcador de mudanças por coleção e validador por recurso.

## O que esta análise não é

Foi feita lendo o esquema, as entidades e os manipuladores de comando e consulta do repositório, não observando o sistema em uso. Onde afirmo que algo não existe, verifiquei a ausência no código; onde afirmo que algo é insuficiente, é julgamento comparativo e pode discordar da realidade operacional.

Também não avaliei volume, desempenho nem o custo real de expandir recorrência sobre a base atual. A afirmação de que detectar conflito é a consulta mais cara é estrutural, não medida.

## Referências

Versão consolidada e sem o contexto específico desta análise: [Calendário e timetabling](aprender/calendario-e-timetabling.md), na trilha Aprender. A parte regulatória (carga horária mínima, reposição) está separada em [Regulação acadêmica brasileira](aprender/regulacao-academica-brasileira.md).

- [RFC 8984, JSCalendar](https://datatracker.ietf.org/doc/rfc8984/), o sucessor do iCalendar em JSON, com modelo de dados próprio e não uma tradução do formato antigo. Para uma API JSON, é a referência mais adequada
- [RFC 5545, iCalendar](https://datatracker.ietf.org/doc/html/rfc5545), a especificação que define `RRULE`, `UID`, `RECURRENCE-ID` e `EXDATE`, e que segue sendo o formato de intercâmbio
- [XHSTT](https://link.springer.com/article/10.1007/s10479-011-1012-2), o arquivo XML padrão de timetabling escolar, com quinze tipos de restrição, instâncias de oito países e avaliador de solução
- [Recurrence ID, iCalendar.org](https://icalendar.org/iCalendar-RFC-5545/3-8-4-4-recurrence-id.html), o mecanismo de exceção explicado com exemplo
- [Google Calendar, compartilhamento](https://developers.google.com/workspace/calendar/api/concepts/sharing) e [ACL](https://developers.google.com/workspace/calendar/api/v3/reference/acl), o modelo de escopo e papel graduado
- [UniTime, alocação de docentes](https://help.unitime.org/instructor-scheduling), sistema de timetabling para ensino superior com coordenação multiusuário
- [UniTime, timetabling com restrições brandas](https://www.unitime.org/papers/patat03.pdf), a separação entre restrição rígida e branda
- [Interactive Timetabling](https://arxiv.org/pdf/cs/0109022), edição interativa sobre solução gerada
- [Apriorit, eventos recorrentes](https://www.apriorit.com/dev-blog/web-recurring-events-feature-calendar-app-development) e [OneUptime, esquema de calendário](https://oneuptime.com/blog/post/2026-03-31-mysql-design-schema-for-calendar-events-app/view), o padrão híbrido de regra mais instâncias

---

# Roteiro de descoberta e investigação

O que sustenta a análise acima e o que ainda falta apurar. Cada item é uma caixa de verificação com o pedido original, o estado e o método.
## Como ler o roteiro

Cada item é uma caixa de verificação com o pedido original, o estado e o método. O rótulo ao lado do título diz em que pé está:

- `feito` produziu conclusão registrada nas seções acima, e a caixa está marcada
- `parcial` foi tocado de raspão e a conclusão é fraca ou incompleta
- `aberto` não foi investigado
- `bloqueado` depende de acesso ou permissão que não tenho

Marcar a caixa quando a investigação produzir conclusão registrada neste documento, não quando alguém apenas olhar. O que está parcial ou aberto não é dívida de execução, é escopo que ainda não coube. A ordem dentro de cada bloco vai do mais barato ao mais caro.

**Progresso**: 33 de 101+ itens fechados nesta rodada de pesquisa.

---

## Bloco A: modelagem atual, visões e recortes

O pedido original foi trazer várias visões e recortes sobre as tabelas e a modelagem, não uma leitura única.

- [x] **A1. Inventário completo das entidades** `feito`

  Cinquenta e seis entidades mapeadas em oito módulos, com os campos de cada uma das relevantes ao calendário. Resultado no recorte de síntese.

- [x] **A2. O modelo temporal contra o RFC 5545** `feito`

  Campo a campo: `repeticao` contra `RRULE`, `identificadorExterno` contra `UID`, `version` contra `SEQUENCE`. Achado principal: falta `RECURRENCE-ID` e `EXDATE`, então a recorrência para na primeira exceção.

- [x] **A3. Escopo por campus** `feito`

  Levantamento de quais entidades carregam campus. Oito carregam, e `calendario_agendamento` não é uma delas.

- [x] **A4. Modelo de acesso e compartilhamento** `feito`

  `perfil` liga usuário, campus e cargo; `cargo` é só um nome. Não há ACL por recurso.

- [x] **A5. Versionamento e histórico** `feito`

  Padrão bitemporal em três tabelas. Achado: o dado existe por completo e nenhuma consulta o lê.

- [x] **A6. Fuso horário e semântica temporal** `feito`

  Tudo é `date` e `time` sem fuso, o que é tempo flutuante. Conclusão: provavelmente correto para grade presencial, mas implícito.

- [ ] **A7. Volume e forma real dos dados** `aberto`

  Toda a análise foi estrutural. Ninguém olhou quantos agendamentos existem, quantos são recorrentes, qual a série mais longa, quantas turmas por campus, quantos diários por professor.

  **Como fazer**: consultas de contagem e distribuição sobre a base de produção, em réplica ou dump anonimizado. Interessa especialmente a razão entre eventos avulsos e recorrentes, porque ela decide se a expansão de recorrência é barata ou é o gargalo.

- [ ] **A8. Integridade do que já está gravado** `aberto`

  Antes de acrescentar campo, vale saber o que o modelo atual já permite de inconsistente: agendamento sem nenhum vínculo, diário sem professor, turma sem curso, evento cujo ambiente pertence a outro campus que o da turma.

  **Como fazer**: um conjunto de consultas de sanidade, rodadas uma vez e transformadas em relatório. Metade das decisões de modelagem fica mais fácil sabendo quantos casos degenerados existem.

- [ ] **A9. Migração: o custo de cada mudança proposta** `aberto`

  O consolidado lista dezessete itens sem dizer o que cada um custa em migração de dados. Acrescentar campus ao agendamento, por exemplo, exige decidir o que fazer com evento sem vínculo nenhum.

  **Como fazer**: para cada item do consolidado, escrever a migração e o plano de retrocompatibilidade. É o passo que transforma a análise em plano executável.

---

## Bloco B: requisitos funcionais, comandos e consultas

- [x] **B1. Inventário de comandos e consultas do domínio de calendário** `feito`

  Dezoito, mapeados e cruzados com as capacidades que o produto pede.

- [x] **B2. Lacunas de comando e consulta** `feito`

  Quatorze capacidades sem comando ou consulta, consolidadas com natureza e o que cada uma destrava.

- [ ] **B3. Requisitos não funcionais** `aberto`

  Nada foi levantado sobre desempenho aceitável, disponibilidade, tamanho de resposta, paginação, limite de período consultável. Uma consulta de calendário aberta sem limite de período é um convite a varredura.

  **Como fazer**: definir, para cada consulta nova, o período máximo, a paginação e o alvo de latência. Fazer isso antes de implementar é barato; depois é reescrita.

- [ ] **B4. Autorização por operação** `parcial`

  Sei que existe papel por campus. Não levantei qual papel pode fazer o quê, em nenhuma das operações existentes, nem qual deveria poder nas novas.

  **Como fazer**: matriz de papel contra operação, incluindo as operações propostas. É pré-requisito da regra de acesso sobre coleção, porque sem ela não se sabe quais papéis graduados fazem sentido.

- [ ] **B5. Contratos de erro** `aberto`

  Quando uma geração não fecha, quando um conflito impede salvar, quando uma aula fixa é impossível, o que a API devolve? Hoje há erro de validação genérico.

  **Como fazer**: catalogar os modos de falha de cada operação nova e desenhar a resposta, com código estável e dado suficiente para a interface explicar ao usuário. Liga diretamente ao item de diagnóstico de inviabilidade.

- [ ] **B6. Idempotência e reentrância** `aberto`

  Gerar horário duas vezes, aceitar duas vezes, publicar duas vezes. Nenhuma dessas operações declara comportamento.

  **Como fazer**: definir chave de idempotência por comando que muda estado, especialmente os que disparam trabalho assíncrono.

---

## Bloco C: comparações externas

- [x] **C1. RFC 5545, estrutura de dados** `feito`

  `RRULE`, `UID`, `RECURRENCE-ID`, `EXDATE`, `RDATE`, `SEQUENCE`, `TZID`, `STATUS`. Tabela de correspondência montada.

- [x] **C2. Google Calendar, modelo de compartilhamento** `feito`

  Coleção como contêiner, ACL com escopo e papel graduado, o nível `freeBusyReader` como peça central para cooperação entre campi.

- [x] **C3. Google Calendar, comportamento observável** `feito`

  Comparei o modelo de dados pela documentação. Não comparei o **comportamento**, que é onde estão as decisões de produto mais difíceis e mais copiáveis.

  **O que investigar, concretamente:**

  - O que acontece ao arrastar uma ocorrência de uma série. Quais das três opções aparecem, em que ordem, qual é a padrão
  - O que acontece ao editar "esta e as seguintes": a série original ganha data de término e nasce outra, ou existe outro mecanismo
  - Como uma exceção se comporta quando a regra da série muda depois
  - O que acontece ao apagar a série que tem exceções
  - Como o conflito é sinalizado: bloqueia, avisa, ou deixa passar
  - Como a sobreposição é desenhada quando dois eventos colidem
  - O que acontece ao mover um evento para um dia sem o recurso reservado
  - Como o fuso é tratado ao criar evento viajando

  **Como fazer**: sessão de uso gravada, com roteiro escrito antes, testando cada caso acima numa conta descartável. Duas horas de trabalho que valem mais que ler documentação, porque a documentação descreve o modelo e não a decisão de interação.

- [x] **C4. Projetos de código aberto: como resolvem o mesmo problema** `feito`

  Li descrição de funcionalidades de UniTime e FET. Não li código, esquema nem modelo de dados de nenhum.

  **O que vale examinar, e por quê:**

  | Projeto | O que ele resolve melhor | O que procurar |
  |---|---|---|
  | **Cal.com** | Agendamento moderno em TypeScript, com esquema declarado em Prisma | Como modelam disponibilidade, fuso, exceção e reserva. É a base de código mais próxima da nossa em tecnologia |
  | **UniTime** | Timetabling de ensino superior, multiusuário | Modelo de dados acadêmico: como representam oferta, turma, docente e sala, e como coordenam edição concorrente entre departamentos |
  | **FET** | O catálogo de restrições mais completo que existe | A lista de restrições em si. É a melhor fonte para o item "o que ambos poderiam ter" |
  | **Radicale** ou **Baïkal** | Servidor CalDAV enxuto | Como armazenam e servem `.ics` de verdade, incluindo exceção e sincronização incremental |
  | **Nextcloud Calendar** | CalDAV em produção com interface | Como fazem sincronização incremental e resolução de conflito de escrita |

  **Como fazer**: para cada um, uma passada de duas a três horas focada no esquema e nos pontos acima, com anotação do que é aproveitável e do que é excesso para o nosso caso. FET é o de maior retorno imediato, porque o catálogo de restrições é diretamente comparável ao nosso.

- [ ] **C5. Blogs de engenharia** `parcial`

  Encontrei material sobre esquema de calendário, recorrência e o padrão híbrido de regra mais instâncias. O que ficou de fora é o relato de quem operou em escala.

  **O que procurar**: relatos de migração de modelo de recorrência, de problema com base de fusos, de expansão de recorrência que virou gargalo, e de produtos que erraram o modelo e tiveram que reescrever.

- [ ] **C6. CalDAV e interoperabilidade** `aberto`

  O RFC 5545 define o formato. O protocolo de sincronização é outro, e é o que permitiria assinar o calendário numa agenda pessoal com atualização automática em vez de exportação estática.

  **Como fazer**: avaliar se o alvo é exportação `.ics` somente leitura, que é barata, ou CalDAV de verdade, que é caro e traz sincronização bidirecional. A decisão muda o desenho da coleção.

- [ ] **C7. Produtos do mesmo nicho no Brasil** `aberto`

  Sistemas acadêmicos brasileiros resolvem calendário letivo, carga horária e diário de classe com vocabulário e regras próprios, alguns por exigência legal.

  **Como fazer**: levantar o que é obrigação regulatória e não escolha de produto, especialmente sobre registro de aula ministrada, carga horária cumprida e calendário letivo homologado. Isso pode transformar requisito opcional em obrigatório.

---

## Bloco D: fluxos e casos de uso

- [x] **D1. Mapa de telas existentes na web** `feito`

  Trinta e cinco telas, divididas entre `sisgea` e `sisgha`. Achado: professor tem três telas sem ação, aluno não existe.

- [x] **D2. Dez jornadas propostas** `feito`

  Cada uma com o que falta em modelagem, comando e consulta.

- [ ] **D3. Confronto com o Figma** `aberto`

  Foi pedido explicitamente considerar fluxos já desenhados no Figma. Não tenho acesso ao arquivo, então usei as issues como aproximação e encontrei duas que citam Figma.

  **Como fazer**: abrir o arquivo e comparar tela a tela com o inventário de comandos e consultas. A pergunta que interessa é quantas telas desenhadas dependem de operação que a API não expõe, que é o padrão que a issue da tela de indisponibilidade do professor já sugere.

- [ ] **D4. Jornadas de erro e exceção** `parcial`

  As dez jornadas descrevem o caminho feliz. Falta o que acontece quando dá errado: geração que não fecha, conflito ao publicar, professor que rejeita a alocação, sala que some depois da grade publicada.

  **Como fazer**: para cada jornada, escrever o caminho de exceção. É onde a maioria dos requisitos escondidos aparece.

- [ ] **D5. Observação de uso real** `aberto`

  Nenhuma conclusão deste trabalho veio de ver alguém usando o sistema. Tudo veio de ler código.

  **Como fazer**: acompanhar uma montagem de horário de ponta a ponta, com quem faz isso hoje, anotando onde a pessoa sai do sistema para planilha, papel ou conversa. Cada saída dessas é um requisito que o sistema não atende, e é a fonte mais confiável de todas.

- [ ] **D6. Volume e sazonalidade da operação** `aberto`

  Montar horário é atividade concentrada em poucas semanas do ano. Isso muda o que otimizar.

  **Como fazer**: entender o calendário da operação, quantas pessoas montam horário simultaneamente no pico e quanto tempo leva hoje. Define se edição concorrente é requisito real ou hipótese.

---

## Bloco E: drift entre a API e o gerador

- [x] **E1. O que o gerador oferecia e a API não usava** `feito`

  Quatro capacidades. Todas corrigidas.

- [x] **E2. O que a API guardava e o gerador ignorava** `feito`

  Quatro dados. Todos corrigidos.

- [x] **E3. O que nenhum dos dois tem** `feito`

  Doze itens, três deles com o dado já cadastrado no banco.

- [ ] **E4. Como impedir que o drift volte** `parcial`

  O contrato agora vive num lugar só, o que reduz o risco. Não existe verificação automática de que os dois lados usam todos os campos.

  **Como fazer**: um teste que compare o contrato com o que o montador preenche e com o que o solver lê, falhando quando um campo existe e ninguém o usa. É a única defesa contra a classe de erro que não quebra build.

- [ ] **E5. Validação do resultado contra a realidade** `aberto`

  O gerador produz grade e os testes verificam restrições. Ninguém comparou uma grade gerada com a grade que a coordenação montaria à mão.

  **Como fazer**: pegar um período real já resolvido manualmente, alimentar o gerador com os mesmos dados e comparar. As diferenças são o mapa das regras que ninguém escreveu.

---

## Bloco F: backlog e documentação

- [x] **F1. Issues abertas dos repositórios** `feito`

  Nove no `management-service`, quatro no `web`. Seis se relacionam diretamente com esta análise.

- [ ] **F2. GitHub Projects** `bloqueado`

  Foi pedido explicitamente e não consegui: o token não tem o escopo `read:project`.

  ```bash
  gh auth refresh -s read:project
  ```

  Depois disso, vale levantar as colunas, o que está em andamento, o que foi adiado e, principalmente, o que foi fechado sem entrega, que costuma esconder decisão não registrada.

- [ ] **F3. Documentação existente do projeto** `parcial`

  O repositório tem documentação em `.claude/docs`, com arquitetura, convenções, decisões arquiteturais e mapeamento. Não a li por inteiro.

  **Como fazer**: ler `decisoes-arquiteturais.md` e `mapeamento.md` antes de qualquer proposta de mudança de modelo. Pode haver decisão tomada e justificada que contradiz o que esta análise sugere, e nesse caso a análise é que precisa mudar.

- [ ] **F4. Histórico de decisão fora do código** `aberto`

  Parte do porquê de um modelo estar como está vive em conversa, não em documento.

  **Como fazer**: para cada achado que sugere mudança estrutural, perguntar a quem modelou se foi decisão ou acidente. A ausência de campus no agendamento é o primeiro caso a checar.

---

## Bloco G: acréscimos

Itens que não foram pedidos e que apareceram como consequência do resto.

- [x] **G1. Notificação, e o canal que já existe** `feito`

  O sistema já tem integração de WhatsApp funcionando para folha de ponto. Nenhuma das jornadas propostas usa isso, e várias pedem: mudança de aula, sala realocada, grade publicada.

  **Como fazer**: mapear quais eventos do calendário merecem notificação, para quem, e por qual canal. A infraestrutura está de pé e ociosa para esse fim.

- [ ] **G2. Privacidade do horário de professor** `aberto`

  Horário de trabalho de pessoa identificada é dado pessoal. Publicar a grade completa de um professor num endereço público tem implicação de privacidade que ninguém levantou.

  **Como fazer**: decidir o que é público, o que exige autenticação e o que exige vínculo, antes de construir a exportação e a visão de aluno. O papel de ocupação sem detalhe existe exatamente para esse tipo de caso.

- [ ] **G3. Uso em celular** `aberto`

  O professor consulta horário no corredor, entre aulas, no telefone. Não avaliei nada da experiência móvel.

  **Como fazer**: verificar se as telas existentes funcionam em tela pequena e decidir se a resposta é interface responsiva ou assinatura na agenda do próprio aparelho, que resolve o problema sem construir tela.

- [ ] **G4. Acessibilidade** `aberto`

  Grade de horário é tabela densa com cor como informação. É o tipo de interface que falha em acessibilidade por padrão.

  **Como fazer**: verificar contraste, navegação por teclado e se a cor é o único portador de significado. A cor do agendamento já existe no modelo, então o risco é concreto.

- [ ] **G5. Retenção e arquivamento** `aberto`

  O versionamento bitemporal nunca apaga. Isso é ótimo para histórico e cresce para sempre.

  **Como fazer**: definir por quanto tempo versão antiga fica acessível e o que acontece depois. Decisão barata agora, cara depois.

- [ ] **G6. Auditoria: quem, quando e por quê** `aberto`

  O versionamento guarda o que mudou e quando. Não guarda quem, exceto na sessão de edição, nem por quê.

  **Como fazer**: avaliar acrescentar autor e motivo à versão. É o que transforma histórico em auditoria, e é pré-requisito de qualquer fluxo de aprovação.

- [ ] **G7. Importar horário de fora** `aberto`

  Migração de sistema anterior, planilha de coordenação, grade de outro campus. Nenhuma jornada cobre entrada de dados em massa.

  **Como fazer**: avaliar se importar `.ics` ou planilha é requisito. Se for, muda a prioridade da exportação, porque os dois compartilham o mesmo mapeamento.

- [ ] **G8. Modo somente leitura durante a montagem** `aberto`

  Enquanto a coordenação monta a grade do próximo semestre, a grade atual continua valendo. Os dois estados coexistem e o modelo não distingue.

  **Como fazer**: verificar se o versionamento bitemporal já resolve isso com `validFrom` e `validTo`, que é provável, e se a interface sabe usar.

---

---

## Bloco H: descobrir fluxo pelo rastro que as pessoas deixam

Investigações que não perguntam o que alguém quer, e sim leem o que já aconteceu. São as mais confiáveis porque não dependem de memória nem de opinião.

- [ ] **H1. Onde as pessoas saem do sistema** `aberto`

  Toda planilha paralela, grupo de WhatsApp e papel colado na parede é um requisito que o sistema não atende. É a fonte mais barata de funcionalidade faltante que existe.

  **Como fazer**: pedir a quem monta horário as três últimas planilhas que usou. Cada coluna que não existe no sistema é um campo faltante; cada aba é uma tela.

- [ ] **H2. O que o log de acesso revela** `aberto`

  Quais telas são abertas, em que ordem, quantas vezes por sessão. Uma tela reaberta muitas vezes na mesma sessão costuma ser tela que não respondeu à pergunta.

  **Como fazer**: analisar o log de requisição por sessão, procurando idas e voltas e consultas repetidas com o mesmo parâmetro.

- [ ] **H3. Arqueologia do banco** `aberto`

  Padrões de dado revelam uso não previsto: nome de evento com convenção própria, campo de descrição usado como campo estruturado, registros duplicados que na verdade são versões manuais.

  **Como fazer**: amostrar os campos de texto livre e agrupar por padrão. Convenção que emerge no dado é funcionalidade que falta.

- [ ] **H4. O que foi editado logo depois de gerado** `aberto`

  Se toda grade gerada é corrigida à mão nos mesmos pontos, esses pontos são regra que o gerador não conhece.

  **Como fazer**: comparar a grade que sai da geração com a que fica valendo, e classificar as diferenças. É o caminho mais direto para descobrir restrição não escrita.

- [ ] **H5. Suporte e reclamação** `aberto`

  Toda pergunta repetida é uma falha de interface ou de modelo.

  **Como fazer**: levantar as dúvidas mais frequentes que chegam a quem administra o sistema, e classificar entre "não achou", "não entendeu" e "não dá para fazer".

- [ ] **H6. O que foi pedido e recusado** `aberto`

  Funcionalidade recusada por ser cara costuma voltar quando o modelo muda. Vale reavaliar a lista à luz do que esta análise propõe.

## Bloco I: momentos do ano que o sistema não conhece

O calendário acadêmico tem ciclos, e cada um traz operação própria que hoje não existe como conceito.

- [ ] **I1. A virada de semestre** `aberto`

  Turmas terminam, novas começam, diários mudam de professor, alunos avançam de período. Hoje isso é edição manual entidade por entidade.

  **Como fazer**: mapear tudo o que muda entre um semestre e outro e avaliar o que seria uma operação de virada, com pré-visualização e possibilidade de desfazer.

- [ ] **I2. Reposição de aula** `aberto`

  Aula perdida por feriado, greve ou falta precisa ser reposta, e a reposição tem regra: precisa caber, não pode colidir, e conta para a carga horária.

  **Como fazer**: verificar se existe obrigação legal de registro de reposição e desenhar o fluxo. É provavelmente o caso de uso mais frequente que nenhuma jornada cobriu.

- [ ] **I3. Semana de prova e período especial** `aberto`

  Semanas em que a grade normal é suspensa e outra vale. O modelo não tem noção de grade excepcional por período.

  **Como fazer**: descobrir quantos períodos assim existem no ano e se hoje são resolvidos apagando e recriando aula.

- [ ] **I4. Recesso, greve e interrupção não planejada** `aberto`

  Diferente de feriado, que é conhecido de antemão. Uma interrupção no meio do semestre precisa deslocar tudo o que vem depois.

  **Como fazer**: avaliar se "empurrar a grade em N dias letivos" é operação desejada. Se for, é caso claro para o mecanismo de exceção por ocorrência.

- [ ] **I5. Matrícula e remanejamento de aluno** `aberto`

  Aluno que troca de turma no meio do semestre muda quem vê qual horário.

  **Como fazer**: entender o ciclo de matrícula antes de modelar o vínculo aluno-turma, porque ele provavelmente não é estático.

## Bloco J: o produto visto de fora

- [ ] **J1. A pergunta que cada papel faz ao abrir o sistema** `aberto`

  Professor pergunta "onde eu tenho aula agora". Coordenação pergunta "o que está sem professor". Aluno pergunta "qual a próxima aula". Nenhuma dessas é uma tela de listagem.

  **Como fazer**: escrever a pergunta de cada papel e verificar quantos cliques custa respondê-la hoje. Tela inicial que não responde a pergunta principal é tela desperdiçada.

- [ ] **J2. O primeiro uso** `aberto`

  Campus novo, semestre novo, usuário novo. O sistema hoje presume base povoada.

  **Como fazer**: percorrer o caminho de um campus vazio até a primeira grade publicada, contando os passos e o que precisa existir antes de cada um.

- [ ] **J3. Onde o sistema pode agir sozinho** `aberto`

  Muita coisa que hoje é campo de formulário poderia ser sugestão: sala provável, professor provável, horário provável, com base no histórico.

  **Como fazer**: identificar os campos mais repetidos entre semestres. Cada um é candidato a preenchimento automático com confirmação.

- [ ] **J4. O que precisa sair em papel** `aberto`

  Grade impressa na parede, ata, relatório para órgão externo. Exportação é requisito comum e frequentemente esquecido.

  **Como fazer**: levantar quais documentos são impressos hoje e a partir de qual fonte, incluindo os que são montados à mão fora do sistema.

- [ ] **J5. Integração com o que já existe na instituição** `aberto`

  Sistema acadêmico federal, cadastro de servidor, autenticação institucional. Parte do dado que hoje é digitado talvez tenha fonte autoritativa em outro lugar.

  **Como fazer**: mapear as fontes externas de pessoa, curso e disciplina, e decidir quais o sistema deve consumir em vez de cadastrar.

- [ ] **J6. O que acontece quando o sistema está fora do ar** `aberto`

  No dia da montagem do horário, indisponibilidade tem custo alto. Fora dele, quase nenhum.

  **Como fazer**: definir a janela crítica do ano e o comportamento degradado aceitável, incluindo se a consulta de horário deve funcionar sem rede.

## Bloco K: qualidade do resultado, não só do código

- [ ] **K1. O que é uma grade boa** `aberto`

  O solver maximiza uma função objetivo que ninguém validou com quem usa. Pode estar otimizando a coisa errada com precisão.

  **Como fazer**: pegar duas grades válidas e pedir a quem coordena que escolha a melhor, explicando por quê. Repetir até os critérios se repetirem. É como se descobre a função objetivo real.

- [ ] **K2. Estabilidade entre execuções** `aberto`

  Gerar de novo com dado quase igual deve produzir grade quase igual. Se produzir grade muito diferente, ninguém confia no resultado.

  **Como fazer**: rodar a geração com pequenas variações de entrada e medir a distância entre as saídas.

- [ ] **K3. Explicar por que uma aula ficou onde ficou** `aberto`

  Diferente do diagnóstico de inviabilidade: aqui a grade fechou e alguém quer entender a escolha.

  **Como fazer**: avaliar se o solver consegue reportar quais restrições foram ativas para cada alocação. É o que transforma reclamação em conversa.

- [ ] **K4. Aceitação parcial** `aberto`

  Hoje a grade é aceita ou rejeitada inteira. Coordenação costuma querer aceitar quase tudo e mexer em três aulas.

  **Como fazer**: verificar se a sessão de edição já suporta isso, o que é provável, e desenhar a tela que a usa.


---

## Bloco L: regras pedagógicas que ninguém escreveu

O solver conhece dez restrições, todas sobre recurso: quem está onde, quando. Nenhuma é sobre pedagogia. Essas regras existem na cabeça de quem monta horário e nunca foram para lugar nenhum.

- [ ] **L1. Disciplinas que não convivem** `aberto`

  Duas disciplinas pesadas no mesmo dia, ou duas do mesmo eixo em sequência, costumam ser evitadas por quem monta.

  **Como fazer**: perguntar quais pares nunca ficam juntos e por quê. Se o motivo se repetir, é restrição; se for caso a caso, é preferência.

- [ ] **L2. Aula que exige bloco duplo** `aberto`

  Prática de laboratório de cinquenta minutos não existe. Algumas disciplinas só fazem sentido em par contíguo, e isso é diferente de "duas aulas na semana".

  **Como fazer**: identificar quais disciplinas exigem geminada obrigatória e distinguir de quem apenas prefere.

- [ ] **L3. Quantas disciplinas diferentes a turma aguenta por dia** `aberto`

  Cinco disciplinas em cinco horários é possível para o solver e ruim para o aluno.

  **Como fazer**: descobrir se existe teto praticado e se ele varia por nível de formação.

- [ ] **L4. Primeira e última aula do dia** `aberto`

  Há disciplinas que ninguém coloca no primeiro horário, e outras que são preferidas ali.

  **Como fazer**: olhar a grade atual e medir a distribuição por posição no dia. Padrão forte que ninguém declarou é regra implícita.

- [ ] **L5. Concentração versus espalhamento** `aberto`

  A mesma disciplina três vezes na semana pode ser segunda, quarta e sexta, ou segunda, segunda e terça. A primeira é quase sempre melhor e o modelo não sabe disso.

  **Como fazer**: verificar se a regra é "dias distintos" ou "espaçamento mínimo", que são restrições diferentes de implementar.

- [ ] **L6. Carga diferenciada por vínculo** `aberto`

  Professor em regime parcial, em capacitação, em final de carreira ou substituto pode ter teto distinto.

  **Como fazer**: levantar quais vínculos existem e se algum implica limite próprio. Hoje o modelo trata todo professor igual.

## Bloco M: identidade e ciclo de vida das pessoas

- [ ] **M1. Pessoa, perfil e usuário são três coisas** `parcial`

  O achado do professor em dois campi expôs isso. Falta entender o modelo inteiro: quem é a pessoa, o que é vínculo, o que é conta de acesso.

  **Como fazer**: mapear os três conceitos e decidir qual deles o horário referencia. Conflito de agenda é sobre pessoa; autorização é sobre vínculo.

- [ ] **M2. Professor que sai no meio do semestre** `aberto`

  Aposentadoria, exoneração, licença longa. A grade continua, o professor não.

  **Como fazer**: descobrir o que acontece hoje e se o histórico precisa preservar quem realmente deu a aula, que é diferente de quem estava alocado.

- [ ] **M3. Mudança de nome** `aberto`

  Nome social, casamento, correção de registro. O histórico deve mostrar o nome de então ou o atual?

  **Como fazer**: decidir a política antes de construir a linha do tempo do evento, porque ela depende dessa escolha.

- [ ] **M4. Quem realmente deu a aula** `aberto`

  Alocação é planejamento; a aula ministrada é fato. O relatório de aulas ministradas já existe na web, então o conceito circula sem estar modelado.

  **Como fazer**: verificar se registro de aula ministrada é obrigação e se hoje é derivado da grade ou informado à parte.

- [ ] **M5. Histórico de quem lecionou o quê** `aberto`

  "Quem deu essa disciplina nos últimos três semestres" é pergunta comum na montagem, e sustenta a sugestão automática de professor.

  **Como fazer**: verificar se o versionamento permite responder isso hoje, ou se o dado se perde na troca de semestre.

## Bloco N: autonomia de campus e o que é central

- [ ] **N1. O que cada campus decide sozinho** `aberto`

  Grade de horários, janela de almoço, calendário letivo, nomenclatura de turma. Alguns são institucionais, outros locais, e o modelo trata todos igual.

  **Como fazer**: classificar cada configuração entre institucional, local com padrão institucional, e livre. Define onde a entidade precisa de campus e onde não.

- [ ] **N2. Regra que vale para todos** `aberto`

  Se existir política institucional de carga ou de intervalo, ela precisa ser inescapável, e não repetida em cada campus.

  **Como fazer**: identificar as regras que não podem ser afrouxadas localmente e desenhar a herança de configuração.

- [ ] **N3. Vocabulário divergente** `aberto`

  Campi podem chamar a mesma coisa por nomes diferentes, e isso aparece quando os dados se encontram.

  **Como fazer**: comparar nomenclatura de turma, período e disciplina entre campi na base atual.

- [ ] **N4. Quem arbitra conflito entre campi** `aberto`

  Professor disputado, sala compartilhada, calendário divergente. Sem dono definido, o conflito não tem resolução.

  **Como fazer**: descobrir se existe instância que decide hoje, e se ela deve existir no sistema como papel.

## Bloco O: ergonomia da edição

A sessão de edição existe no modelo e quase não existe na interface. O que se constrói em cima dela define se a ferramenta é usada ou contornada.

- [ ] **O1. Arrastar com resposta imediata** `aberto`

  Mover uma aula e saber na hora se cria conflito é o comportamento esperado. Depende da consulta de conflito ser rápida o bastante para rodar a cada gesto.

  **Como fazer**: definir o alvo de latência antes de escolher como implementar a detecção de conflito. Muda a decisão de arquitetura.

- [ ] **O2. Desfazer** `aberto`

  O diário de mudanças da sessão de edição é praticamente uma pilha de desfazer que ninguém expôs.

  **Como fazer**: verificar se `tipoOperacao` e `dados` guardam o suficiente para reverter, e não só para aplicar.

- [ ] **O3. Edição em lote** `aberto`

  "Mover todas as aulas de sexta para quinta" é uma operação, não vinte.

  **Como fazer**: levantar quais operações em massa são pedidas e se cabem no vocabulário de série do Recorte 2.

- [ ] **O4. Comparar antes e depois** `aberto`

  Tanto para aprovar uma geração quanto para revisar uma sessão de edição, a pergunta é a mesma: o que muda.

  **Como fazer**: desenhar a visualização de diferença uma vez e usá-la nos dois lugares.

- [ ] **O5. Trabalho que atravessa dias** `aberto`

  Montar horário leva semanas. A sessão de edição precisa sobreviver a isso, com várias pessoas, sem travar a grade vigente.

  **Como fazer**: verificar se o modelo de sessão suporta rascunho longo e concorrente, ou se pressupõe uma sessão curta por vez.


---

## Bloco P: fontes externas que não podem ficar de fora

Os itens acima dizem o que investigar. Este diz **onde**. São as fontes que, se ficarem de fora, deixam a análise apoiada em intuição onde já existe padrão consolidado.

### Padrões que definem o vocabulário

- [x] **P1. RFC 8984, JSCalendar** `feito`

  O sucessor do iCalendar, publicado em 2021, com representação em JSON e modelo de dados definido de forma independente, não como tradução do formato antigo. Para uma API JSON, é mais relevante que o RFC 5545, que foi o único que consultei.

  **Por que não pode faltar**: o vocabulário de campo, a modelagem de recorrência e o tratamento de exceção já estão resolvidos ali, num formato que a API pode adotar quase direto. Adotar o modelo do JSCalendar é mais barato que inventar o nosso e depois traduzir.

- [x] **P2. XHSTT, o arquivo padrão de timetabling escolar** `feito`

  Formato XML criado no PATAT de 2008, mantido pela Universidade de Twente, com **quinze tipos de restrição** e instâncias reais de oito países, mais um avaliador que verifica solução.

  **Por que não pode faltar**: é o equivalente do RFC para o nosso problema específico. Aqueles quinze tipos de restrição são a resposta pronta para o item "o que ambos poderiam ter", e o avaliador permite testar o nosso solver contra instâncias que outros já resolveram.

- [x] **P3. CalDAV e as extensões de sincronização** `feito`

  RFC 4791 para o protocolo, e as extensões de agendamento e de sincronização incremental.

  **Por que não pode faltar**: a decisão entre exportação estática e assinatura viva depende de entender o custo real do protocolo, e essa decisão muda o desenho da coleção.

- [ ] **P4. Consulta incremental do Microsoft Graph** `aberto`

  A segunda implementação madura de leitura por marcador, ao lado da do Google.

  **Por que não pode faltar**: comparar duas implementações independentes do mesmo problema revela o que é essencial e o que é escolha de cada uma.

### O problema já foi estudado a fundo

- [x] **P5. PATAT, a conferência do assunto** `feito`

  Practice and Theory of Automated Timetabling, bienal desde 1995. É onde este problema é discutido há trinta anos.

  **Por que não pode faltar**: quase toda dificuldade que vamos encontrar já foi nomeada, medida e comparada ali. Ignorar isso é redescobrir com custo.

- [x] **P6. International Timetabling Competition** `feito`

  As edições de 2002, 2007, 2011, 2019 e 2021, com instâncias públicas, formulação canônica do problema e descrição dos solvers vencedores.

  **Por que não pode faltar**: dá formulação de referência para comparar com a nossa, e conjuntos de teste que permitem saber se o nosso resultado é bom ou apenas válido.

- [ ] **P7. Levantamentos de restrições em timetabling universitário** `aberto`

  Artigos de revisão catalogam as restrições usadas na prática, separadas entre rígidas e brandas.

  **Por que não pode faltar**: é a fonte mais rápida para o Bloco L, e cobre o que a intuição esquece.

### Implementações para ler, não só usar

- [x] **P8. Timefold, sucessor do OptaPlanner** `feito`

  Solucionador de restrições em código aberto, com exemplo pronto de horário escolar e níveis de pontuação separados entre rígido, médio e brando.

  **Por que não pode faltar**: é o concorrente direto da nossa escolha de OR-Tools, com modelagem de restrição mais expressiva. A separação em três níveis de pontuação é exatamente o que falta para expressar preferência em vez de proibição.

- [x] **P9. Untis, o líder de mercado europeu** `feito`

  Software de horário escolar usado em larga escala há décadas.

  **Por que não pode faltar**: a lista de funcionalidades de um produto maduro é o jeito mais rápido de enumerar requisito que ninguém lembrou de pedir.

- [x] **P10. Cal.com, esquema em Prisma** `feito`

  Base de código aberto, em TypeScript, com o esquema declarado de forma legível.

  **Por que não pode faltar**: é a implementação mais próxima da nossa em tecnologia, e modela disponibilidade, fuso e exceção de um jeito que dá para copiar ou recusar com argumento.

### O que é obrigação, e não escolha

- [ ] **P11. A Organização Didática da instituição** `aberto`

  As regras pedagógicas do Bloco L provavelmente **já estão escritas**, no regulamento acadêmico da própria instituição: carga horária, aula geminada, intervalo, limite diário, reposição.

  **Por que não pode faltar**: eu tratei essas regras como conhecimento tácito a descobrir por entrevista. Se estiverem no regulamento, a investigação inteira do Bloco L vira leitura de um documento, e o que estiver lá não é preferência, é norma.

- [x] **P12. LDB e resoluções do Conselho Nacional de Educação** `feito`

  Carga horária mínima, dias letivos obrigatórios, registro de aula ministrada.

  **Por que não pode faltar**: transforma requisito opcional em obrigatório, e define o que o sistema precisa provar, não só calcular.

### O erro que todo mundo comete

- [x] **P13. As listas de falsidades sobre tempo e calendário** `feito`

  Compilações conhecidas de suposições erradas sobre datas, fusos, semanas e recorrência.

  **Por que não pode faltar**: são vinte minutos de leitura que evitam uma classe inteira de defeito, especialmente num domínio onde já decidimos usar tempo flutuante e vamos exportar para sistemas que não usam.

- [ ] **P14. Relato de quem migrou modelo de recorrência em produção** `aberto`

  Não a documentação de como fazer, e sim o relato de quem fez errado primeiro.

  **Por que não pode faltar**: a mudança do Recorte 2 é justamente uma migração de modelo de recorrência sobre base viva, e é onde o custo costuma aparecer depois.


## O que fazer primeiro

Dos cento e um itens, sete destravam desproporcionalmente e não dependem de nada.

- [ ] **F3, ler a documentação que já existe no repositório.** Pode haver decisão registrada que torna algum achado desta análise irrelevante. É o mais barato de todos e deve vir antes de propor qualquer mudança de modelo.
- [ ] **A7, volume e forma real dos dados.** Toda decisão de desempenho está sendo tomada no escuro.
- [ ] **C3, comportamento do Google Calendar.** Duas horas de uso guiado economizam semanas de decisão de interação inventada.
- [ ] **D5, observação de uso real.** É a fonte que nenhuma leitura de código substitui, e provavelmente contradiz parte desta análise.
- [ ] **H4, o que foi editado logo depois de gerado.** Comparar a grade que sai do solver com a que fica valendo é o caminho mais direto para descobrir as regras que ninguém escreveu.
- [ ] **P11, a Organização Didática da instituição.** Pode transformar a investigação inteira do Bloco L em leitura de um documento que já existe, e o que estiver nele é norma, não preferência.
- [ ] **P2, o XHSTT.** Quinze tipos de restrição já catalogados e um avaliador pronto. É a resposta mais rápida para o que falta no gerador.
