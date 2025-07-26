using Ladesa.ManagementService.Domain.Generics;

namespace Ladesa.ManagementService.Domain.Contracts;

/** Tipos de dias possíveis no calendário. */
union TipoDiaCalendario {
  "Aula Presencial",
  "Aula Não Presencial (Letiva)",
  "Feriado",
  "Sábado",
  "Domingo",
  "Outro",
}

/** DiaCalendario. */
model DiaCalendario {
  ...EntityIdUuid;

   /** Data */
  data: date;

  /** Indica se o dia é letivo */
  diaLetivo: boolean;

  /** Indica se o dia é presencial */
  diaPresencial: boolean;

  /** Tipo do dia (presencial, feriado, sábado, etc.) */
  tipo: TipoDiaCalendario;

  /** Nome do feriado (ou null se não for) */
  feriado: string | null;
  
  /** Calendario. */
  calendario: CalendarioLetivo;

  ...EntityDated;
}
