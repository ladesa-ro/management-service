import type { DeepPartial } from "typeorm";
import type { IBloco } from "@/modules/ambientes/bloco/domain/bloco";
import type { BlocoFindOneQueryResult } from "@/modules/ambientes/bloco/domain/queries";
import { CampusTypeormMapper } from "@/modules/ambientes/campus/infrastructure.database/typeorm";
import { createMapper, pickId } from "@/shared/mapping";
import type { BlocoEntity } from "./bloco.typeorm.entity";

// ============================================================================
// Persistencia -> Dominio (TypeORM Entity -> Domain / Query Result)
// ============================================================================

export const entityToDomain = createMapper<BlocoEntity, IBloco>((e) => ({
  id: e.id,
  nome: e.nome,
  codigo: e.codigo,
  campus: pickId(e.campus),
  imagemCapa: e.imagemCapa ? pickId(e.imagemCapa) : null,
  dateCreated: e.dateCreated,
  dateUpdated: e.dateUpdated,
  dateDeleted: e.dateDeleted,
}));

export const entityToFindOneQueryResult = createMapper<BlocoEntity, BlocoFindOneQueryResult>(
  (e) => ({
    id: e.id,
    nome: e.nome,
    codigo: e.codigo,
    campus: CampusTypeormMapper.entityToFindOneQueryResult.map(e.campus),
    imagemCapa: e.imagemCapa ?? null,
    dateCreated: e.dateCreated,
    dateUpdated: e.dateUpdated,
    dateDeleted: e.dateDeleted,
  }),
);

// ============================================================================
// Dominio -> Persistencia (Domain -> TypeORM Entity)
// ============================================================================

export const domainToPersistence = createMapper<IBloco, DeepPartial<BlocoEntity>>((d) => ({
  id: d.id,
  nome: d.nome,
  codigo: d.codigo,
  campus: pickId(d.campus),
  imagemCapa: d.imagemCapa ? pickId(d.imagemCapa) : null,
  dateCreated: d.dateCreated,
  dateUpdated: d.dateUpdated,
  dateDeleted: d.dateDeleted,
}));
