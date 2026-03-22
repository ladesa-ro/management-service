import { EntityQueryResult, SharedFields } from "@/domain/abstractions";
import { fieldsToProperties } from "@/infrastructure.database/typeorm/metadata/model-from-fields";
import {
  commonProperties,
  defineModel,
  referenceProperty,
  simpleProperty,
} from "@/infrastructure.database/typeorm/metadata/model-registry";
import { EnderecoFindOneQueryResult } from "@/modules/localidades/endereco";
import { EmpresaFields } from "../empresa.fields";

export const EmpresaFindOneQueryResultFields = {
  id: SharedFields.idUuid,
  ...EmpresaFields,
};

export class EmpresaFindOneQueryResult extends EntityQueryResult {
  razaoSocial!: string;
  nomeFantasia!: string;
  cnpj!: string;
  telefone!: string;
  email!: string;
  endereco!: EnderecoFindOneQueryResult;
  ativo!: boolean;
}

defineModel("EmpresaFindOneQueryResult", [
  ...fieldsToProperties(EmpresaFindOneQueryResultFields),
  referenceProperty("endereco", "EnderecoFindOneQueryResult"),
  simpleProperty("ativo"),
  ...commonProperties.dated,
]);
