using Ladesa.ManagementService.Generics;

namespace Ladesa.ManagementService;

/** GradeHorarioOfertaFormacaoIntervaloDeTempo. */
model GradeHorarioOfertaFormacaoIntervaloDeTempo {
  ...EntityIdUuid;

  /** Grade de horário da oferta de formação. */
  gradeHorarioOfertaFormacao: GradeHorarioOfertaFormacao;

  /** Intervalo de tempo. */
  intervaloDeTempo: IntervaloDeTempo;

  ...EntityDated;
}
