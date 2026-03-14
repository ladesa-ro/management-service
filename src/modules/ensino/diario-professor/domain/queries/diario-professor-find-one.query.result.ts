import { EntityQueryResult } from "@/domain/abstractions";
import { PerfilFindOneQueryResult } from "@/modules/acesso/perfil";
import { DiarioFindOneQueryResult } from "@/modules/ensino/diario";

export class DiarioProfessorFindOneQueryResult extends EntityQueryResult {
  situacao!: boolean;
  diario!: DiarioFindOneQueryResult;
  perfil!: PerfilFindOneQueryResult;
}
