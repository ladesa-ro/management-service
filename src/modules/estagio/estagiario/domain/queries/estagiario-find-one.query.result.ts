import { createFieldMetadata, EntityQueryResult, SharedFields } from "@/domain/abstractions";
import { PerfilFindOneQueryResult } from "@/modules/acesso/usuario/perfil/domain/queries/perfil-find-one.query.result";
import { CursoFindOneQueryResult } from "@/modules/ensino/curso/domain/queries/curso-find-one.query.result";
import { TurmaFindOneQueryResult } from "@/modules/ensino/turma/domain/queries/turma-find-one.query.result";
import { EstagiarioFields } from "../estagiario.fields";

export const EstagiarioFindOneQueryResultFields = {
  id: SharedFields.idUuid,
  ...EstagiarioFields,
  perfil: createFieldMetadata({ description: "Perfil vinculado ao estagiário", nullable: true }),
  curso: createFieldMetadata({ description: "Curso vinculado ao estagiário", nullable: true }),
  turma: createFieldMetadata({ description: "Turma vinculada ao estagiário", nullable: true }),
  emailInstitucional: createFieldMetadata({
    description: "Email institucional do estagiário",
    nullable: true,
  }),
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
