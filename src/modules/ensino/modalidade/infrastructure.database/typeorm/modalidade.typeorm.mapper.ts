import type { DeepPartial } from "typeorm";
import type { IModalidade } from "@/modules/ensino/modalidade/domain/modalidade";
import type { ModalidadeFindOneQueryResult } from "@/modules/ensino/modalidade/domain/queries/modalidade-find-one.query.result";
import { createMapper, pickId } from "@/shared/mapping";
import type { ModalidadeEntity } from "./modalidade.typeorm.entity";

// ============================================================================
// Persistência → Domínio (TypeORM Entity → Domain / Query Result)
// ============================================================================

export const entityToDomain = createMapper<ModalidadeEntity, IModalidade>((e) => ({
  id: e.id,
  nome: e.nome,
  slug: e.slug,
  imagemCapa: e.imagemCapa ? pickId(e.imagemCapa) : null,
  dateCreated: e.dateCreated,
  dateUpdated: e.dateUpdated,
  dateDeleted: e.dateDeleted,
}));

export const entityToFindOneQueryResult = createMapper<
  ModalidadeEntity,
  ModalidadeFindOneQueryResult
>((e) => ({
  id: e.id,
  nome: e.nome,
  slug: e.slug,
  imagemCapa: e.imagemCapa ?? null,
  dateCreated: e.dateCreated,
  dateUpdated: e.dateUpdated,
  dateDeleted: e.dateDeleted,
}));

// ============================================================================
// Domínio → Persistência (Domain → TypeORM Entity)
// ============================================================================

export const domainToPersistence = createMapper<IModalidade, DeepPartial<ModalidadeEntity>>(
  (d) => ({
    id: d.id,
    nome: d.nome,
    slug: d.slug,
    imagemCapa: d.imagemCapa ? pickId(d.imagemCapa) : null,
    dateCreated: d.dateCreated,
    dateUpdated: d.dateUpdated,
    dateDeleted: d.dateDeleted,
  }),
);
