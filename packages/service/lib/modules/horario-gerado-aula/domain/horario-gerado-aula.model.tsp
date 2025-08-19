using Ladesa.ManagementService.Generics;

namespace Ladesa.ManagementService;

/** HorarioGeradoAula. */
model HorarioGeradoAula {
  ...EntityIdUuid;

  /** Data da aula gerada. */
  data: date;

  /** Intervalo de tempo. */
  intervaloDeTempo: IntervaloDeTempo;

  /** Vínculo de diário e professor. */
  diarioProfessor: DiarioProfessor;

  /** Horário ao qual a aula pertence. */
  horarioGerado: HorarioGerado;
}
