import { EntityQueryResult, SharedFields } from "@/domain/abstractions";
import { fieldsToProperties } from "@/domain/abstractions/metadata/model-from-fields";
import { commonProperties, defineModel } from "@/domain/abstractions/metadata/model-registry";
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
