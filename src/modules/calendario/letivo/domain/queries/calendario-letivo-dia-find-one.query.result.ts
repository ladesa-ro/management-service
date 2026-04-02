import { EntityQueryResult, SharedFields } from "@/domain/abstractions";
import type { ScalarDate } from "@/domain/abstractions/scalars";
import { CalendarioLetivoDiaFields } from "../calendario-letivo-dia.fields";
import { CalendarioLetivoFindOneQueryResult } from "./calendario-letivo-find-one.query.result";

export const CalendarioLetivoDiaFindOneQueryResultFields = {
  id: SharedFields.idUuid,
  ...CalendarioLetivoDiaFields,
};

export class CalendarioLetivoDiaFindOneQueryResult extends EntityQueryResult {
  data!: ScalarDate;
  diaLetivo!: boolean;
  feriado!: string;
  diaPresencial!: boolean;
  tipo!: string;
  extraCurricular!: boolean;
  calendario!: CalendarioLetivoFindOneQueryResult;
}
