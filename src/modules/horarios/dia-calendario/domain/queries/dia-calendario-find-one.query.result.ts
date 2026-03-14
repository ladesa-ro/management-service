import { EntityQueryResult } from "@/domain/abstractions";
import type { ScalarDate } from "@/modules/@shared";
import { CalendarioLetivoFindOneQueryResult } from "@/modules/horarios/calendario-letivo";

export class DiaCalendarioFindOneQueryResult extends EntityQueryResult {
  data!: ScalarDate;
  diaLetivo!: boolean;
  feriado!: string;
  diaPresencial!: boolean;
  tipo!: string;
  extraCurricular!: boolean;
  calendario!: CalendarioLetivoFindOneQueryResult;
}
