using Ladesa.Domain.v4.Generics;
using Ladesa.Domain.v4.Generics.Entities;

namespace Ladesa.Domain.v4.Schemas;

/** Reserva. */
model Reserva {
  ...EntityIdUuid;

  /** Situação da reserva. */
  @minLength(1)
  situacao: string;

  /** Motivo da reserva. */
  @minLength(1)
  motivo: string | null;

  /** Tipo da reserva. */
  @minLength(1)
  tipo: string | null;

  /** Regra RRule para a recorrência da reserva. Segue a RFC 5545 do iCalendar. */
  rrule: string;

  /** Usuário que fez a reserva. */
  usuario: Usuario;

  /** Ambiente reservado. */
  ambiente: Ambiente;

  ...EntityDated;
}
