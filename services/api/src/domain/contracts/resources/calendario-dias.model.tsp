using Ladesa.Domain.v4.Generics;
using Ladesa.Domain.v4.Generics.Entities;

/** Tipos de dias possíveis no calendário. */

union TipoDiaCalendario {
  "Aula Presencial";
  "Aula Não Presencial (Letiva)";
  "Feriado";
  "Sábado";
  "Domingo";
  "Outro";
}
/** Representa um dia no calendário. */
model DiaCalendario {
  /** Data */
  data: date;

  /** Indica se o dia é letivo */
  diaLetivo: boolean;

  /** Indica se o dia é presencial*/
  diaPresencial: boolean;

  /** Tipo do dia (presencial, feriado, sábado, etc.) */
  tipo: TipoDiaCalendario;

  /** Nome do feriado (ou null se não for) */
  feriado: string | null;
}

/** Input para obter o calendário de um determinado ano e mês. */
model GetCalendarioInput {
  /** Identificador do calendário */
  idCalendario: int32;

  /** Ano a ser consultado */
  ano: int16;

  /** Mês a ser consultado (opcional) */
  mes?: int8;
}


/** Retorno da consulta de calendário. */
model GetCalendarioOutput {
  /** Lista dos dias do calendário */
  dias: DiaCalendario[];
}
