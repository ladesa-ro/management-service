import { EntityQueryResult, SharedFields } from "@/domain/abstractions";
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
