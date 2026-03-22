import { EntityQueryResult, SharedFields } from "@/domain/abstractions";
import { fieldsToProperties } from "@/infrastructure.database/typeorm/metadata/model-from-fields";
import {
  commonProperties,
  defineModel,
} from "@/infrastructure.database/typeorm/metadata/model-registry";
import { NivelFormacaoFields } from "../nivel-formacao.fields";

export const NivelFormacaoFindOneQueryResultFields = {
  id: SharedFields.idUuid,
  ...NivelFormacaoFields,
};

export class NivelFormacaoFindOneQueryResult extends EntityQueryResult {
  slug!: string;
}

defineModel("NivelFormacaoFindOneQueryResult", [
  ...fieldsToProperties(NivelFormacaoFindOneQueryResultFields),
  ...commonProperties.dated,
]);
