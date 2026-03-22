import { EntityQueryResult, SharedFields } from "@/domain/abstractions";
import { fieldsToProperties } from "@/domain/abstractions/metadata/model-from-fields";
import {
  commonProperties,
  defineModel,
  referenceProperty,
} from "@/domain/abstractions/metadata/model-registry";
import { NivelFormacaoFindOneQueryResult } from "@/modules/ensino/nivel-formacao";
import { OfertaFormacaoFindOneQueryResult } from "@/modules/ensino/oferta-formacao";
import { OfertaFormacaoNivelFormacaoFields } from "../oferta-formacao-nivel-formacao.fields";

export const OfertaFormacaoNivelFormacaoFindOneQueryResultFields = {
  id: SharedFields.idUuid,
  ...OfertaFormacaoNivelFormacaoFields,
};

export class OfertaFormacaoNivelFormacaoFindOneQueryResult extends EntityQueryResult {
  nivelFormacao!: NivelFormacaoFindOneQueryResult;
  ofertaFormacao!: OfertaFormacaoFindOneQueryResult;
}

defineModel("OfertaFormacaoNivelFormacaoFindOneQueryResult", [
  ...fieldsToProperties(OfertaFormacaoNivelFormacaoFindOneQueryResultFields),
  referenceProperty("nivelFormacao", "NivelFormacaoFindOneQueryResult"),
  referenceProperty("ofertaFormacao", "OfertaFormacaoFindOneQueryResult"),
  ...commonProperties.dated,
]);
