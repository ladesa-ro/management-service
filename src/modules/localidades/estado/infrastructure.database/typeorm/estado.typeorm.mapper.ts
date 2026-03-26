import { EstadoFindOneQueryResult } from "@/modules/localidades/estado/domain/queries";
import { createMapper, into } from "@/shared/mapping";
import type { EstadoEntity } from "./estado.typeorm.entity";

// ============================================================================
// Persistência → Domínio (TypeORM Entity → Query Result)
// ============================================================================

export const entityToOutput = createMapper<EstadoEntity, EstadoFindOneQueryResult>((e) => {
  const result = new EstadoFindOneQueryResult();
  into(result).from(e).field("id").field("nome").field("sigla");
  return result;
});
