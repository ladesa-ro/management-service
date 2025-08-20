using Ladesa.ManagementService.Generics;

namespace Ladesa.ManagementService;

/** Disponibilidade. */
model Disponibilidade {
  ...EntityIdUuid;

  /** Data de início. */
  dataInicio: date;

  /** Data de término. */
  dataFim: date | null;

  ...EntityDated;
}
