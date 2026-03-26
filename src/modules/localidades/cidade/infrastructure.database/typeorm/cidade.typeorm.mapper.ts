import type { CidadeFindOneQueryResult } from "@/modules/localidades/cidade/domain/queries";
import { createMapper } from "@/shared/mapping";
import type { CidadeEntity } from "./cidade.typeorm.entity";

// ============================================================================
// Persistência → Domínio (TypeORM Entity → Query Result)
// ============================================================================

export const entityToFindOneQueryResult = createMapper<CidadeEntity, CidadeFindOneQueryResult>(
  (e) => ({
    id: e.id,
    nome: e.nome,
    estado: e.estado,
  }),
);
