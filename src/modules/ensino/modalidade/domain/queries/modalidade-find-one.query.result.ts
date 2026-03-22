import { EntityQueryResult, SharedFields } from "@/domain/abstractions";
import { fieldsToProperties } from "@/infrastructure.database/typeorm/metadata/model-from-fields";
import {
  commonProperties,
  defineModel,
} from "@/infrastructure.database/typeorm/metadata/model-registry";
import { ModalidadeFields } from "../modalidade.fields";

export const ModalidadeFindOneQueryResultFields = {
  id: SharedFields.idUuid,
  ...ModalidadeFields,
};

export class ModalidadeFindOneQueryResult extends EntityQueryResult {
  nome!: string;
  slug!: string;
}

defineModel("ModalidadeFindOneQueryResult", [
  ...fieldsToProperties(ModalidadeFindOneQueryResultFields),
  ...commonProperties.dated,
]);
