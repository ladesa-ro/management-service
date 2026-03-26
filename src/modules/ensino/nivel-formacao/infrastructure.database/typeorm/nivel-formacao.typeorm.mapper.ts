import type { INivelFormacao } from "@/modules/ensino/nivel-formacao/domain/nivel-formacao";
import type { NivelFormacaoFindOneQueryResult } from "@/modules/ensino/nivel-formacao/domain/queries/nivel-formacao-find-one.query.result";
import { createMapper } from "@/shared/mapping";
import type { NivelFormacaoEntity } from "./nivel-formacao.typeorm.entity";

// ============================================================================
// Persistência → Domínio (TypeORM Entity → Domain / Query Result)
// ============================================================================

export const entityToDomain = createMapper<NivelFormacaoEntity, INivelFormacao>((e) => ({
  id: e.id,
  slug: e.slug,
  dateCreated: e.dateCreated,
  dateUpdated: e.dateUpdated,
  dateDeleted: e.dateDeleted,
}));

export const entityToOutput = createMapper<NivelFormacaoEntity, NivelFormacaoFindOneQueryResult>(
  (e) => ({
    id: e.id,
    slug: e.slug,
    dateCreated: e.dateCreated,
    dateUpdated: e.dateUpdated,
    dateDeleted: e.dateDeleted,
  }),
);

// ============================================================================
// Domínio → Persistência (Domain → TypeORM Entity)
// ============================================================================

export const domainToPersistence = createMapper<INivelFormacao, Partial<NivelFormacaoEntity>>(
  (d) => ({
    id: d.id,
    slug: d.slug,
    dateCreated: d.dateCreated,
    dateUpdated: d.dateUpdated,
    dateDeleted: d.dateDeleted,
  }),
);
