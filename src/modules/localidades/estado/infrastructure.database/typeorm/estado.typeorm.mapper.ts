import { EstadoFindOneQueryResult } from "@/modules/localidades/estado/domain/queries";
import { createMapper, into } from "@/shared/mapping";
import type { EstadoEntity } from "./estado.typeorm.entity";

// ============================================================================
// Persistência → Domínio (TypeORM Entity → Query Result)
// ============================================================================

export const entityToFindOneQueryResult = createMapper<EstadoEntity, EstadoFindOneQueryResult>(
  (entity) => {
    const queryResult = new EstadoFindOneQueryResult();
    into(queryResult).from(entity).field("id").field("nome").field("sigla");
    return queryResult;
  },
);
