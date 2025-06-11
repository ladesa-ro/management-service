using Ladesa.Domain.v4.Generics;
using Ladesa.Domain.v4.Generics.Entities;

namespace Ladesa.Domain.v4.Schemas;

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
