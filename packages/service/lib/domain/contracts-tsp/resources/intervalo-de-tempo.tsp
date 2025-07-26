using Ladesa.ManagementService.Domain.Generics;

namespace Ladesa.ManagementService.Domain.Contracts;

/** Intervalo de Tempo. */
model IntervaloDeTempo {
  ...EntityIdUuid;

  /** Horário que o intervalo de tempo inicia. */
  periodoInicio: time;

  /** Horário que o intervalo de tempo termina. */
  periodoFim: time;

  ...EntityDated;
}
