import type { DeepPartial } from "typeorm";
import type { INivelFormacao } from "@/modules/ensino/nivel-formacao/domain/nivel-formacao";
import type { NivelFormacaoFindOneQueryResult } from "@/modules/ensino/nivel-formacao/domain/queries/nivel-formacao-find-one.query.result";
import { createMapper, pickId } from "@/shared/mapping";
import type { NivelFormacaoEntity } from "./nivel-formacao.typeorm.entity";

// ============================================================================
// Persistência → Domínio (TypeORM Entity → Domain / Query Result)
// ============================================================================

export const entityToDomain = createMapper<NivelFormacaoEntity, INivelFormacao>((e) => ({
  id: e.id,
  nome: e.nome,
  slug: e.slug,
  imagemCapa: e.imagemCapa ? pickId(e.imagemCapa) : null,
  dateCreated: e.dateCreated,
  dateUpdated: e.dateUpdated,
  dateDeleted: e.dateDeleted,
}));

export const entityToFindOneQueryResult = createMapper<
  NivelFormacaoEntity,
  NivelFormacaoFindOneQueryResult
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

export const domainToPersistence = createMapper<INivelFormacao, DeepPartial<NivelFormacaoEntity>>(
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
