import { EntityQueryResult, SharedFields } from "@/domain/abstractions";
import { fieldsToProperties } from "@/domain/abstractions/metadata/model-from-fields";
import {
  commonProperties,
  defineModel,
  referenceProperty,
} from "@/domain/abstractions/metadata/model-registry";
import { UsuarioFindOneQueryResult } from "@/modules/acesso/usuario";
import { CampusFindOneQueryResult } from "@/modules/ambientes/campus";
import { PerfilFields } from "../perfil.fields";

export const PerfilFindOneQueryResultFields = {
  id: SharedFields.idUuid,
  ...PerfilFields,
};

export class PerfilFindOneQueryResult extends EntityQueryResult {
  ativo!: boolean;
  cargo!: string;
  campus!: CampusFindOneQueryResult;
  usuario!: UsuarioFindOneQueryResult;
}

defineModel("PerfilFindOneQueryResult", [
  ...fieldsToProperties(PerfilFindOneQueryResultFields),
  referenceProperty("campus", "CampusFindOneQueryResult"),
  referenceProperty("usuario", "UsuarioFindOneQueryResult"),
  ...commonProperties.dated,
]);
