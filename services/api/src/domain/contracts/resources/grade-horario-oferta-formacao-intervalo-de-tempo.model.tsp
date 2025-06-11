using Ladesa.Domain.v4.Generics;
using Ladesa.Domain.v4.Generics.Entities;

namespace Ladesa.ManagementService.Domain.Contracts;

/** GradeHorarioOfertaFormacaoIntervaloDeTempo. */
model GradeHorarioOfertaFormacaoIntervaloDeTempo {
  ...EntityIdUuid;

  /** Grade de horário da oferta de formação. */
  gradeHorarioOfertaFormacao: GradeHorarioOfertaFormacao;

  /** Intervalo de tempo. */
  intervaloDeTempo: IntervaloDeTempo;

  ...EntityDated;
}
