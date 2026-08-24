# Geração de horário

O gerador de horário era um serviço à parte, em C#, com API HTTP própria e mensageria própria, conversando com esta aplicação por RabbitMQ. Ele foi aposentado e o algoritmo passou a viver aqui, como monólito modular.

```
API (bun)  --job na fila-->  worker (bun)
                                 |
                       contrato do .proto, stdin/stdout
                                 v
                        console C# self-contained
```

Três pastas, três papéis. `proto/` guarda o contrato e o código gerado nos dois lados. `core/` é o C#, do domínio ao console. `worker/` é o processo que consome a fila e executa o console como processo filho.

## Por que o console, e não um serviço

O algoritmo é C# e depende do [Google OR-Tools](https://developers.google.com/optimization), que traz bibliotecas nativas e pesa cerca de 150MB publicado. Mantê-lo como serviço em rede significaria um segundo runtime, um segundo contrato de transporte e um segundo ciclo de release para algo que roda por segundos, algumas vezes por semana.

Como processo filho, ele não tem servidor, não tem porta, não tem estado e não fala com fila nenhuma: recebe uma requisição pelo stdin, resolve, escreve a resposta no stdout e morre. Quem cuida de fila, repetição e concorrência é o worker, em TypeScript, onde essas ferramentas já existem.

Um efeito colateral bom: como o C# não toca em fila, trocar a tecnologia de fila deixou de exigir um cliente novo em C#. Foi o que permitiu sair do RabbitMQ para o BullMQ sem tocar numa linha do gerador.

**Todo log do console vai para stderr.** O stdout carrega o payload, e uma única linha de log ali dentro o corromperia.

## Como o worker se protege

O solver não tem limite natural de tempo, e a API espera resposta. O worker define um orçamento por variável de ambiente, `TIMETABLE_WORKER_SOLVER_BUDGET_SECONDS`, repassado ao console, que o entrega ao CP-SAT como `max_time_in_seconds`. Com limite, o solver devolve a melhor solução encontrada até ali em vez de nada.

Acima disso existe uma rede de segurança independente: `TIMETABLE_WORKER_PROCESS_TIMEOUT_SECONDS` mata o processo filho caso ele trave fora do solver. Os padrões, 55s e 58s, ficam abaixo do timeout de 60s que a API aplica, deixando margem para serialização.

## Configuração

| Variável | Padrão | Papel |
|---|---|---|
| `QUEUE_DATABASE_URL` | obrigatória | Postgres onde o BullMQ guarda as filas |
| `QUEUE_SCHEMA` | `bullmq` | schema isolado do resto do banco |
| `QUEUE_TIMETABLE_GENERATE` | `timetable-generate` | fila dos pedidos de geração |
| `TIMETABLE_WORKER_BINARY` | `/opt/ladesa/ladesa-timetable-generator` | caminho do console publicado |
| `TIMETABLE_WORKER_SOLVER_BUDGET_SECONDS` | `55` | orçamento entregue ao solver |
| `TIMETABLE_WORKER_PROCESS_TIMEOUT_SECONDS` | `58` | quando matar o processo filho |
| `TIMETABLE_WORKER_CONCURRENCY` | `1` | jobs simultâneos |

Concorrência maior que um exige atenção: cada job ocupa um processo do solver, que é limitado por CPU, e o node é compartilhado com a API.

## Como rodar, sem instalar nada no host

Compilar e testar o core:

```bash
docker buildx bake --file src/infrastructure.timetable-generator/core/docker-bake.hcl test
```

Regerar o código do contrato depois de mexer no `.proto`:

```bash
bash src/infrastructure.timetable-generator/proto/.commands/generate
```

Exercitar o console com uma requisição real, que é justamente o que a escolha por JSON no fio torna possível:

```bash
docker run --rm -i --entrypoint /opt/ladesa/ladesa-timetable-generator timetable-worker:local < core/exemplo-request.json
```

## Uma instabilidade conhecida em Apple Silicon

Dentro do Docker Desktop em arm64, sem limite de CPU, o compilador do .NET e o NuGet morrem de forma intermitente com SIGILL. O contorno é limitar CPU (`--cpus`) e reduzir o que o runtime enxerga (`DOTNET_PROCESSOR_COUNT`, `DOTNET_gcServer=0`, `DOTNET_EnableWriteXorExecute=0`).

O `docker buildx bake` não aceita limite de CPU por `RUN`, então o bake é confiável no CI, onde o runner é amd64, mas pode falhar localmente em Mac. Para verificação local, rodar os mesmos comandos via `docker run` com `--cpus` resolve.

## Como o pedido é montado a partir do banco

`GerarHorarioRequestBuilder`, no módulo `gerar-horario`, traduz o escopo da solicitação em `GenerateRequest`. O caminho é este:

As **turmas** saem das ofertas de formação pedidas, atravessando `Curso`, que é quem carrega a oferta. Sem oferta informada, entram todas as turmas não apagadas.

Os **diários** são os ativos daquelas turmas, filtrados pelos calendários letivos pedidos quando houver algum.

Os **professores** vêm de `DiarioProfessor` com `situacao` verdadeira, e o identificador usado é o do perfil.

Os **horários** vêm da `GradeHoraria` ativa e vigente na data de início, ou da mais recente se nenhuma cobrir a data. Cada `GradeHorariaIntervalo` vira um `TimeSlot`.

### As duas derivações que o banco não dá pronto

O contrato pede `remaining` e `week_limit` por diário, e nenhum dos dois existe como coluna.

`remaining` é o total de aulas que o diário precisa ocupar no período, e sai direto de `Disciplina.cargaHoraria`, tratando uma hora de carga como uma aula. É esse número que o solver usa como teto de propostas aceitas para aquele diário.

`week_limit` é o teto por semana ISO, e sai de `cargaHoraria` dividida pelo número de semanas do período, arredondado para cima e com piso de um. A alternativa seria somar `aulasSeguidas` das preferências de agrupamento do diário, o que expressa melhor a intenção de quem cadastrou, mas essas preferências são opcionais e hoje raramente preenchidas. Distribuir a carga uniformemente é o comportamento previsível na ausência delas.

Nos dois casos, valor negativo desliga a restrição no solver. Não é o que fazemos aqui, mas vale saber ao depurar.

### Um diário por professor

O contrato modela `Diary` com um `teacher_id` único, enquanto o banco permite vários professores no mesmo diário. Um diário com dois professores vira duas entradas com o mesmo `id` e `group_id`, diferindo no professor.

A consequência é que `remaining` e `week_limit` passam a valer por professor, não por diário, o que na prática permite ao solver dobrar a carga. Se isso não for o desejado, a correção é dividir a carga entre os professores na montagem, e não no solver.

Diário sem professor vinculado é descartado: sem professor não há proposta possível, e mandá-lo apenas inflaria o modelo.

### Disponibilidade

O banco guarda quando a turma **está** disponível, na forma `{diaSemana, inicio, fim}`. O solver espera o oposto, regras de indisponibilidade em RRULE, porque `IsAvailable` devolve falso quando a ocorrência conflita com o horário testado.

A conversão é o complemento, calculado sobre os horários reais da grade: para cada dia da semana e cada intervalo, se nenhuma janela cadastrada cobre aquele intervalo por inteiro, nasce uma regra `FREQ=WEEKLY;BYDAY=<dia>` marcando aquele intervalo como indisponível. Turma sem configuração ativa fica sem regra nenhuma, ou seja, disponível o tempo todo.

**Professores não têm disponibilidade cadastrada** em lugar nenhum do sistema, então a única fonte de bloqueio deles são os agendamentos existentes, descritos abaixo. Enquanto não existir cadastro próprio, não há como expressar "este professor não trabalha de manhã".

## Agendamentos existentes: aula fixa ou bloqueio

Gerar horário para um escopo parcial, uma turma ou um professor, exige tratar o que já está agendado. São dois mecanismos diferentes, e a escolha entre eles é automática.

Um agendamento do tipo `AULA` com exatamente **um** diário, **uma** turma e **um** professor vira **aula fixa**: entra em `fixed_schedules` e o solver força aquela proposta a verdadeira. A vantagem de forçar em vez de pré-alocar é que todas as restrições passam a contá-la sozinhas, ocupando professor e turma, consumindo `remaining` e `week_limit`, sem código adicional.

Qualquer outro caso, incluindo `EVENTO`, `RESERVA`, `INDISPONIBILIDADE` e aula com vínculo ambíguo, vira **regra de indisponibilidade** no professor e na turma envolvidos. A exigência de unicidade não é capricho: `fixed_schedules` precisa determinar exatamente uma proposta, e uma aula com dois professores não determina.

Aula cujo diário está fora do escopo pedido também cai no caminho de bloqueio, porque não existe proposta no modelo para fixar. Se existisse e não fosse fixável, o gerador levanta `FixedScheduleNotSchedulable` em vez de descartar em silêncio.

Uma limitação conhecida: o encaixe exige que o intervalo da grade caiba inteiro na janela do agendamento. Um evento de vinte minutos no meio de uma aula de cinquenta não bloqueia nada, porque decidir se ele invalida a aula inteira é regra de negócio, não detalhe técnico.

## Dias não letivos

O gerador iterava todos os dias do período, um a um, e agendaria aula em feriado e domingo. Agora recebe `non_school_dates` e os pula.

A lista sai de `CalendarioLetivoDia`: dia com `dia_letivo` falso entra. Data sem registro no calendário cai numa regra de fallback, sábado e domingo entram, dia útil não. Assim um calendário incompleto degrada para o comportamento razoável em vez de agendar aula em feriado não cadastrado.

## Turnos e almoço deixaram de ser constante

Manhã, tarde, noite e as duas janelas de almoço eram constantes fixas no C#, e as restrições `TeacherLunch`, `GroupLunch`, `TeacherNoOppositeTurns` e `Teacher12Hours` dependiam delas. Um campus com outro horário de almoço tinha a restrição silenciosamente errada.

Agora são `shift_settings` no contrato, com os valores antigos como padrão quando o campo não vem. Nada muda para quem não informa.

## Sala

O gerador não tinha conceito de ambiente, então duas turmas podiam receber a mesma sala no mesmo horário sem que nada reclamasse. `Diary` ganhou `room_id`, `TimetableGridSchedule` também, e existe a restrição `RoomOneScheduleAtSameTime`, que impede duas aulas simultâneas na mesma sala.

A sala vem do `ambientePadrao` do diário, com o `ambientePadraoAula` da turma como reserva. Diário sem nenhum dos dois fica sem sala e a restrição simplesmente não se aplica a ele.

## Aulas seguidas

`DiarioPreferenciaAgrupamento` guarda quantas aulas seguidas a disciplina quer. Quando o diário tem preferências cadastradas, a soma de `aulasSeguidas` vira o `week_limit`, porque expressa a intenção de quem cadastrou melhor que a divisão uniforme. Sem preferência, continua valendo a carga dividida pelas semanas.

O que ainda **não** existe é a adjacência: o gerador garante o total por semana, mas não que as aulas fiquem coladas. Isso exigiria uma restrição nova, de sequência, e ficou de fora.

## Grade anterior

Os cinco boosts existem para pontuar semelhança com a grade anterior, e enquanto `previous_timetable_grid` era sempre nulo eles não tinham efeito nenhum. Agora a última solicitação em status `ACEITO` é lida de `respostaGerador` e enviada como grade anterior, o que finalmente dá função aos boosts.
