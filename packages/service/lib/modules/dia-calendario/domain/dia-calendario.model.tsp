using Ladesa.ManagementService.Generics;

namespace Ladesa.ManagementService;

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

  //** Indica se o dia é aula presecial ou não presencial*/
  DiaPresencial: boolean;

  /** Indica o tipo do feriado, se é nacional, estadual ou municipal*/
  Tipo: TipoDiaCalendario;

  /** Indica se o dia é extracurricular */
  extraCurricular: boolean;

  ...EntityDated;
}
