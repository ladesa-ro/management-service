import { EntityQueryResult } from "@/domain/abstractions";
import type { ScalarDate } from "@/domain/abstractions/scalars";
import { CalendarioLetivoFindOneQueryResult } from "./calendario-letivo-find-one.query.result";

export class CalendarioLetivoDiaFindOneQueryResult extends EntityQueryResult {
  data!: ScalarDate;
  diaLetivo!: boolean;
  feriado!: string;
  diaPresencial!: boolean;
  tipo!: string;
  extraCurricular!: boolean;
  calendario!: CalendarioLetivoFindOneQueryResult;
}
