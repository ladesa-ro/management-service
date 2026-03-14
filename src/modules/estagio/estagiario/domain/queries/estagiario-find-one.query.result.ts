export class EstagiarioFindOneQueryResult {
  id!: string;
  idPerfilFk!: string;
  idCursoFk!: string;
  idTurmaFk!: string;
  telefone!: string;
  emailInstitucional!: string | null;
  dataNascimento!: string;
  ativo!: boolean;
  dateCreated!: string;
  dateUpdated!: string;
}
