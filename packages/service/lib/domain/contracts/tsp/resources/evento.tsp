using Ladesa.ManagementService.Domain.Generics;

namespace Ladesa.ManagementService.Domain.Contracts;

/** Evento. */
model Evento {
  ...EntityIdUuid;

  /** Nome do evento. */
  nome: string | null;

  /** Regra RRule para a recorrência do evento. Segue a RFC 5545 do iCalendar. */
  rrule: string;

  /** Cor da Evento. */
  cor: string | null;

  /** Calendario. */
  calendario: CalendarioLetivo;

  /** Data de início do evento. */
  data_inicio: date | null;
  
  /** Data de Termino do evento. */
  data_fim: date | null;
  
  ...EntityDated;
}
