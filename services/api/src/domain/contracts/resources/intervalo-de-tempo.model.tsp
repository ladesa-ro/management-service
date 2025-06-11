using Ladesa.Domain.v4.Generics;
using Ladesa.Domain.v4.Generics.Entities;

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
