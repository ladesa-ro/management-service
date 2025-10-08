using Ladesa.ManagementService.Generics;

namespace Ladesa.ManagementService;

/** Intervalo de Tempo. */
model IntervaloDeTempo {
  ...EntityIdUuid;

  /** Horário que o intervalo de tempo inicia. */
  periodoInicio: time;

  /** Horário que o intervalo de tempo termina. */
  periodoFim: time;

  ...EntityDated;
}
