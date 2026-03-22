import { EntityQueryResult, SharedFields } from "@/domain/abstractions";
import type { ScalarDate } from "@/domain/abstractions/scalars";
import { fieldsToProperties } from "@/infrastructure.database/typeorm/metadata/model-from-fields";
import {
  commonProperties,
  defineModel,
  referenceProperty,
} from "@/infrastructure.database/typeorm/metadata/model-registry";
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
