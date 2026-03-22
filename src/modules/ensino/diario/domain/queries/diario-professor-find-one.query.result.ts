import { EntityQueryResult, SharedFields } from "@/domain/abstractions";
import { fieldsToProperties } from "@/infrastructure.database/typeorm/metadata/model-from-fields";
import {
  commonProperties,
  defineModel,
  referenceProperty,
} from "@/infrastructure.database/typeorm/metadata/model-registry";
import { PerfilFindOneQueryResult } from "@/modules/acesso/perfil";
import { DiarioFindOneQueryResult } from "@/modules/ensino/diario";
import { DiarioProfessorFields } from "../diario-professor.fields";

export const DiarioProfessorFindOneQueryResultFields = {
  id: SharedFields.idUuid,
  ...DiarioProfessorFields,
};

export class DiarioProfessorFindOneQueryResult extends EntityQueryResult {
  situacao!: boolean;
  diario!: DiarioFindOneQueryResult;
  perfil!: PerfilFindOneQueryResult;
}

defineModel("DiarioProfessorFindOneQueryResult", [
  ...fieldsToProperties(DiarioProfessorFindOneQueryResultFields),
  referenceProperty("perfil", "PerfilFindOneQueryResult"),
  referenceProperty("diario", "DiarioFindOneQueryResult"),
  ...commonProperties.dated,
]);
