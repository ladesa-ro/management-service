using Ladesa.Domain.v4.Generics;
using Ladesa.Domain.v4.Generics.Entities;

namespace Ladesa.Domain.v4.Schemas;

/** DiaCalendario. */
model DiaCalendario {
  ...EntityIdUuid;

  /** Data. */
  data: date;

  /** Define que o dia é letivo. */
  diaLetivo: boolean;

  /** Define que o dia é feriado. */
  feriado: boolean;

  /** Calendario. */
  calendario: CalendarioLetivo;

  ...EntityDated;
}
