import { EntityQueryResult, SharedFields } from "@/domain/abstractions";
import { fieldsToProperties } from "@/infrastructure.database/typeorm/metadata/model-from-fields";
import {
  commonProperties,
  defineModel,
  referenceProperty,
} from "@/infrastructure.database/typeorm/metadata/model-registry";
import { ModalidadeFindOneQueryResult } from "@/modules/ensino/modalidade";
import type { DuracaoPeriodo } from "../../infrastructure.database/typeorm/oferta-formacao.typeorm.entity";
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
