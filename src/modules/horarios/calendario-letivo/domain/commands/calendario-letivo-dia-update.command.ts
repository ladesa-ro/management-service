import { CalendarioLetivoDiaFields } from "../calendario-letivo-dia.fields";

export const CalendarioLetivoDiaUpdateCommandFields = {
  diaLetivo: CalendarioLetivoDiaFields.diaLetivo,
  feriado: CalendarioLetivoDiaFields.feriado,
  diaPresencial: CalendarioLetivoDiaFields.diaPresencial,
  tipo: CalendarioLetivoDiaFields.tipo,
  extraCurricular: CalendarioLetivoDiaFields.extraCurricular,
};

export class CalendarioLetivoDiaUpdateCommand {
  diaLetivo?: boolean;
  feriado?: string;
  diaPresencial?: boolean;
  tipo?: string;
  extraCurricular?: boolean;
}
