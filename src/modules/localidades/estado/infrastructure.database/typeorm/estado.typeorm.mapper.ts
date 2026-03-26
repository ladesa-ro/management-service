import type { EstadoFindOneQueryResult } from "@/modules/localidades/estado/domain/queries";
import { createMapper } from "@/shared/mapping";
import type { EstadoEntity } from "./estado.typeorm.entity";

// ============================================================================
// Persistência → Domínio (TypeORM Entity → Query Result)
// ============================================================================

export const entityToOutput = createMapper<EstadoEntity, EstadoFindOneQueryResult>((e) => ({
  id: e.id,
  nome: e.nome,
  sigla: e.sigla,
}));
