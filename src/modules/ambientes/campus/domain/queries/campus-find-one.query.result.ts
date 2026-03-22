import { EntityQueryResult, SharedFields } from "@/domain/abstractions";
import { fieldsToProperties } from "@/domain/abstractions/metadata/model-from-fields";
import {
  commonProperties,
  defineModel,
  referenceProperty,
} from "@/domain/abstractions/metadata/model-registry";
import { EnderecoFindOneQueryResult } from "@/modules/localidades/endereco";
import { CampusFields } from "../campus.fields";

export const CampusFindOneQueryResultFields = {
  id: SharedFields.idUuid,
  ...CampusFields,
};

export class CampusFindOneQueryResult extends EntityQueryResult {
  nomeFantasia!: string;
  razaoSocial!: string;
  apelido!: string;
  cnpj!: string;
  endereco!: EnderecoFindOneQueryResult;
}

defineModel("CampusFindOneQueryResult", [
  ...fieldsToProperties(CampusFindOneQueryResultFields),
  referenceProperty("endereco", "EnderecoFindOneQueryResult"),
  ...commonProperties.dated,
]);
