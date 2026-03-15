import { EntityQueryResult } from "@/domain/abstractions";

export class EstagiarioFindOneQueryResult extends EntityQueryResult {
  idPerfilFk!: string;
  idCursoFk!: string;
  idTurmaFk!: string;
  telefone!: string;
  emailInstitucional!: string | null;
  dataNascimento!: string;
  ativo!: boolean;
}
