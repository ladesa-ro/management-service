import { EntityQueryResult, SharedFields } from "@/domain/abstractions";
import { fieldsToProperties } from "@/infrastructure.database/typeorm/metadata/model-from-fields";
import {
  commonProperties,
  defineModel,
  referenceProperty,
} from "@/infrastructure.database/typeorm/metadata/model-registry";
import { CampusFindOneQueryResult } from "@/modules/ambientes/campus";
import { OfertaFormacaoFindOneQueryResult } from "@/modules/ensino/oferta-formacao";
import { CalendarioLetivoFields } from "../calendario-letivo.fields";

export const CalendarioLetivoFindOneQueryResultFields = {
  id: SharedFields.idUuid,
  ...CalendarioLetivoFields,
};

export class CalendarioLetivoFindOneQueryResult extends EntityQueryResult {
  nome!: string;
  ano!: number;
  campus!: CampusFindOneQueryResult;
  ofertaFormacao!: OfertaFormacaoFindOneQueryResult;
}

defineModel("CalendarioLetivoFindOneQueryResult", [
  ...fieldsToProperties(CalendarioLetivoFindOneQueryResultFields),
  referenceProperty("campus", "CampusFindOneQueryResult"),
  referenceProperty("ofertaFormacao", "OfertaFormacaoFindOneQueryResult"),
  ...commonProperties.dated,
]);
