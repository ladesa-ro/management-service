using Ladesa.ManagementService.Generics;

namespace Ladesa.ManagementService;

/** DisponibilidadeDia. */
model DisponibilidadeDia {
  ...EntityIdUuid;

  /** Regra RRule para a recorrência do evento. Segue a RFC 5545 do iCalendar. */
  rrule: string;

  /** Intervalo de tempo. */
  intervaloDeTempo: IntervaloDeTempo;

  /** Disponibilidade. */
  disponibilidade: Disponibilidade;

  ...EntityDated;
}
