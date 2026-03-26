import type { IModalidade } from "@/modules/ensino/modalidade/domain/modalidade";
import type { ModalidadeFindOneQueryResult } from "@/modules/ensino/modalidade/domain/queries/modalidade-find-one.query.result";
import { createMapper } from "@/shared/mapping";
import type { ModalidadeEntity } from "./modalidade.typeorm.entity";

// ============================================================================
// Persistência → Domínio (TypeORM Entity → Domain / Query Result)
// ============================================================================

export const entityToDomain = createMapper<ModalidadeEntity, IModalidade>((e) => ({
  id: e.id,
  nome: e.nome,
  slug: e.slug,
  dateCreated: e.dateCreated,
  dateUpdated: e.dateUpdated,
  dateDeleted: e.dateDeleted,
}));

export const entityToOutput = createMapper<ModalidadeEntity, ModalidadeFindOneQueryResult>((e) => ({
  id: e.id,
  nome: e.nome,
  slug: e.slug,
  dateCreated: e.dateCreated,
  dateUpdated: e.dateUpdated,
  dateDeleted: e.dateDeleted,
}));

// ============================================================================
// Domínio → Persistência (Domain → TypeORM Entity)
// ============================================================================

export const domainToPersistence = createMapper<IModalidade, Partial<ModalidadeEntity>>((d) => ({
  id: d.id,
  nome: d.nome,
  slug: d.slug,
  dateCreated: d.dateCreated,
  dateUpdated: d.dateUpdated,
  dateDeleted: d.dateDeleted,
}));
