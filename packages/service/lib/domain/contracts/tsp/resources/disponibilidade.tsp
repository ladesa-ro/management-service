using Ladesa.ManagementService.Domain.Generics;

namespace Ladesa.ManagementService.Domain.Contracts;

/** Disponibilidade. */
model Disponibilidade {
  ...EntityIdUuid;

  /** Data de início. */
  dataInicio: date;

  /** Data de término. */
  dataFim: date | null;

  ...EntityDated;
}
