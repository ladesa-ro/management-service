import { EntityQueryResult, SharedFields } from "@/domain/abstractions";
import { fieldsToProperties } from "@/domain/abstractions/metadata/model-from-fields";
import {
  commonProperties,
  defineModel,
  referenceProperty,
} from "@/domain/abstractions/metadata/model-registry";
import { ModalidadeFindOneQueryResult } from "@/modules/ensino/modalidade";
import type { DuracaoPeriodo } from "../duracao-periodo";
import { OfertaFormacaoFields } from "../oferta-formacao.fields";

export const OfertaFormacaoFindOneQueryResultFields = {
  id: SharedFields.idUuid,
  ...OfertaFormacaoFields,
};

export class OfertaFormacaoFindOneQueryResult extends EntityQueryResult {
  nome!: string;
  slug!: string;
  duracaoPeriodo!: DuracaoPeriodo | null;
  modalidade!: ModalidadeFindOneQueryResult;
}

defineModel("OfertaFormacaoFindOneQueryResult", [
  ...fieldsToProperties(OfertaFormacaoFindOneQueryResultFields),
  referenceProperty("modalidade", "ModalidadeFindOneQueryResult"),
  ...commonProperties.dated,
]);
