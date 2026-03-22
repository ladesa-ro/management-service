import { EntityQueryResult, SharedFields } from "@/domain/abstractions";
import type { ScalarDate } from "@/domain/abstractions/scalars";
import { fieldsToProperties } from "@/infrastructure.database/typeorm/metadata/model-from-fields";
import {
  commonProperties,
  defineModel,
  referenceProperty,
} from "@/infrastructure.database/typeorm/metadata/model-registry";
import { DiarioFindOneQueryResult } from "@/modules/ensino/diario";
import { DiarioPreferenciaAgrupamentoFields } from "../diario-preferencia-agrupamento.fields";

export const DiarioPreferenciaAgrupamentoFindOneQueryResultFields = {
  id: SharedFields.idUuid,
  ...DiarioPreferenciaAgrupamentoFields,
};

export class DiarioPreferenciaAgrupamentoFindOneQueryResult extends EntityQueryResult {
  dataInicio!: ScalarDate;
  dataFim!: ScalarDate | null;
  diaSemanaIso!: number;
  aulasSeguidas!: number;
  diario!: DiarioFindOneQueryResult;
}

defineModel("DiarioPreferenciaAgrupamentoFindOneQueryResult", [
  ...fieldsToProperties(DiarioPreferenciaAgrupamentoFindOneQueryResultFields),
  referenceProperty("diario", "DiarioFindOneQueryResult"),
  ...commonProperties.dated,
]);
