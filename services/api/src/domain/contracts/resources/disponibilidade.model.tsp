using Ladesa.Domain.v4.Generics;
using Ladesa.Domain.v4.Generics.Entities;

namespace Ladesa.Domain.v4.Schemas;

/** Disponibilidade. */
model Disponibilidade {
  ...EntityIdUuid;

  /** Data de início. */
  dataInicio: date;

  /** Data de término. */
  dataFim: date | null;

  ...EntityDated;
}
