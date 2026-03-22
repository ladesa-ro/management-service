import { EntityQueryResult, SharedFields } from "@/domain/abstractions";
import { fieldsToProperties } from "@/domain/abstractions/metadata/model-from-fields";
import {
  commonProperties,
  defineModel,
  referenceProperty,
} from "@/domain/abstractions/metadata/model-registry";
import { PerfilFindOneQueryResult } from "@/modules/acesso/perfil/domain/queries/perfil-find-one.query.result";
import { CursoFindOneQueryResult } from "@/modules/ensino/curso/domain/queries/curso-find-one.query.result";
import { TurmaFindOneQueryResult } from "@/modules/ensino/turma/domain/queries/turma-find-one.query.result";
import { EstagiarioFields } from "../estagiario.fields";

export const EstagiarioFindOneQueryResultFields = {
  id: SharedFields.idUuid,
  ...EstagiarioFields,
};

export class EstagiarioFindOneQueryResult extends EntityQueryResult {
  perfil!: PerfilFindOneQueryResult;
  curso!: CursoFindOneQueryResult;
  turma!: TurmaFindOneQueryResult;
  telefone!: string;
  emailInstitucional!: string | null;
  dataNascimento!: string;
  ativo!: boolean;
}

defineModel("EstagiarioFindOneQueryResult", [
  ...fieldsToProperties(EstagiarioFindOneQueryResultFields),
  referenceProperty("perfil", "PerfilFindOneQueryResult"),
  referenceProperty("curso", "CursoFindOneQueryResult"),
  referenceProperty("turma", "TurmaFindOneQueryResult"),
  ...commonProperties.dated,
]);
