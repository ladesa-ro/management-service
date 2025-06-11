using Ladesa.Domain.v4.Generics;
using Ladesa.Domain.v4.Generics.Entities;

namespace Ladesa.Domain.v4.Schemas;

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
