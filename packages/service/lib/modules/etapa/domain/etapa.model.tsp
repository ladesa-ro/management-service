using Ladesa.ManagementService.Generics;

namespace Ladesa.ManagementService;

/** Etapa. */
model Etapa {
  ...EntityIdUuid;

  /** Número da etapa. */
  numero: uint8 | null;

  /** Data de início. */
  dataInicio: date;

  /** Data de término. */
  dataTermino: date;

  /** Cor da etapa. */
  cor: string | null;

  /** Calendario. */
  calendario: CalendarioLetivo;

  ...EntityDated;
}
