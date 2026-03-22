import { EntityQueryResult, SharedFields } from "@/domain/abstractions";
import { fieldsToProperties } from "@/domain/abstractions/metadata/model-from-fields";
import {
  commonProperties,
  defineModel,
  referenceProperty,
} from "@/domain/abstractions/metadata/model-registry";
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

defineModel("CalendarioLetivoDiaFindOneQueryResult", [
  ...fieldsToProperties(CalendarioLetivoDiaFindOneQueryResultFields),
  referenceProperty("calendario", "CalendarioLetivoFindOneQueryResult"),
  ...commonProperties.dated,
]);
