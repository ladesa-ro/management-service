import type { ScalarDate } from "@/modules/@shared";
import { CalendarioLetivoInputRef } from "@/modules/horarios/calendario-letivo";

export class DiaCalendarioUpdateCommand {
  data?: ScalarDate;
  diaLetivo?: boolean;
  feriado?: string;
  diaPresencial?: boolean;
  tipo?: string;
  extraCurricular?: boolean;
  calendario?: CalendarioLetivoInputRef;
}
