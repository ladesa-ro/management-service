import type { DeepPartial } from "typeorm";
import type { IAmbiente } from "@/modules/ambientes/ambiente/domain/ambiente";
import type { AmbienteFindOneQueryResult } from "@/modules/ambientes/ambiente/domain/queries";
import { BlocoTypeormMapper } from "@/modules/ambientes/bloco/infrastructure.database/typeorm";
import { createMapper, pickId } from "@/shared/mapping";
import type { AmbienteEntity } from "./ambiente.typeorm.entity";

// ============================================================================
// Persistencia -> Dominio (TypeORM Entity -> Domain / Query Result)
// ============================================================================

export const entityToDomain = createMapper<AmbienteEntity, IAmbiente>((e) => ({
  id: e.id,
  nome: e.nome,
  descricao: e.descricao,
  codigo: e.codigo,
  capacidade: e.capacidade,
  tipo: e.tipo,
  bloco: pickId(e.bloco),
  imagemCapa: e.imagemCapa ? pickId(e.imagemCapa) : null,
  dateCreated: e.dateCreated,
  dateUpdated: e.dateUpdated,
  dateDeleted: e.dateDeleted,
}));

export const entityToFindOneQueryResult = createMapper<AmbienteEntity, AmbienteFindOneQueryResult>(
  (e) => ({
    id: e.id,
    nome: e.nome,
    descricao: e.descricao,
    codigo: e.codigo,
    capacidade: e.capacidade,
    tipo: e.tipo,
    bloco: BlocoTypeormMapper.entityToFindOneQueryResult.map(e.bloco),
    imagemCapa: e.imagemCapa ?? null,
    dateCreated: e.dateCreated,
    dateUpdated: e.dateUpdated,
    dateDeleted: e.dateDeleted,
  }),
);

// ============================================================================
// Dominio -> Persistencia (Domain -> TypeORM Entity)
// ============================================================================

export const domainToPersistence = createMapper<IAmbiente, DeepPartial<AmbienteEntity>>((d) => ({
  id: d.id,
  nome: d.nome,
  descricao: d.descricao,
  codigo: d.codigo,
  capacidade: d.capacidade,
  tipo: d.tipo,
  bloco: pickId(d.bloco),
  imagemCapa: d.imagemCapa ? pickId(d.imagemCapa) : null,
  dateCreated: d.dateCreated,
  dateUpdated: d.dateUpdated,
  dateDeleted: d.dateDeleted,
}));
