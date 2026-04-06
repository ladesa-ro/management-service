import { PerfilTypeormMapper } from "@/modules/acesso/usuario/perfil/infrastructure.database/typeorm";
import type { DiarioProfessorFindOneQueryResult } from "@/modules/ensino/diario/domain/queries";
import { createMapper } from "@/shared/mapping";
import * as DiarioTypeormMapper from "./diario.typeorm.mapper";
import type { DiarioProfessorEntity } from "./diario-professor.typeorm.entity";

// ============================================================================
// Persistência → Domínio (TypeORM Entity → Query Result)
// ============================================================================

export const entityToFindOneQueryResult = createMapper<
  DiarioProfessorEntity,
  DiarioProfessorFindOneQueryResult
>((e) => ({
  id: e.id,
  situacao: e.situacao,
  diario: DiarioTypeormMapper.entityToFindOneQueryResult.map(e.diario),
  perfil: PerfilTypeormMapper.entityToFindOneQueryResult.map(e.perfil),
  dateCreated: e.dateCreated,
  dateUpdated: e.dateUpdated,
  dateDeleted: e.dateDeleted,
}));
