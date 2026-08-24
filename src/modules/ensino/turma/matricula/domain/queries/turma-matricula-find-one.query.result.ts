import { EntityQueryResult, SharedFields } from "@/domain/abstractions";
import { TurmaMatriculaFields } from "../turma-matricula.fields";

export const TurmaMatriculaFindOneQueryResultFields = {
  id: SharedFields.idUuid,
  ...TurmaMatriculaFields,
};

export class TurmaMatriculaFindOneQueryResult extends EntityQueryResult {
  turma!: { id: string };
  perfil!: { id: string };
}
