using Ladesa.Domain.v4.Generics;
using Ladesa.Domain.v4.Generics.Entities;

namespace Ladesa.Domain.v4.Schemas;

/** Intervalo de Tempo. */
model IntervaloDeTempo {
  ...EntityIdUuid;

  /** Horário que o intervalo de tempo inicia. */
  periodoInicio: time;

  /** Horário que o intervalo de tempo termina. */
  periodoFim: time;

  ...EntityDated;
}
