import type { DeepPartial } from "typeorm";
import type { ICampus } from "@/modules/ambientes/campus/domain/campus";
import type { CampusFindOneQueryResult } from "@/modules/ambientes/campus/domain/queries";
import { createMapper, pickId } from "@/shared/mapping";
import type { CampusEntity } from "./campus.typeorm.entity";

// ============================================================================
// Persistência → Domínio (TypeORM Entity → Domain / Query Result)
// ============================================================================

export const entityToDomain = createMapper<CampusEntity, ICampus>((e) => ({
  id: e.id,
  nomeFantasia: e.nomeFantasia,
  razaoSocial: e.razaoSocial,
  apelido: e.apelido,
  cnpj: e.cnpj,
  endereco: {
    id: e.endereco.id,
    cep: e.endereco.cep,
    logradouro: e.endereco.logradouro,
    numero: e.endereco.numero,
    bairro: e.endereco.bairro,
    complemento: e.endereco.complemento,
    pontoReferencia: e.endereco.pontoReferencia,
    cidade: pickId(e.endereco.cidade),
  },
  dateCreated: e.dateCreated,
  dateUpdated: e.dateUpdated,
  dateDeleted: e.dateDeleted,
}));

export const entityToFindOneQueryResult = createMapper<CampusEntity, CampusFindOneQueryResult>(
  (e) => ({
    id: e.id,
    nomeFantasia: e.nomeFantasia,
    razaoSocial: e.razaoSocial,
    apelido: e.apelido,
    cnpj: e.cnpj,
    endereco: e.endereco,
    dateCreated: e.dateCreated,
    dateUpdated: e.dateUpdated,
    dateDeleted: e.dateDeleted,
  }),
);

// ============================================================================
// Domínio → Persistência (Domain → TypeORM Entity)
// ============================================================================

export const domainToPersistence = createMapper<ICampus, DeepPartial<CampusEntity>>((d) => ({
  id: d.id,
  nomeFantasia: d.nomeFantasia,
  razaoSocial: d.razaoSocial,
  apelido: d.apelido,
  cnpj: d.cnpj,
  endereco: pickId(d.endereco),
  dateCreated: d.dateCreated,
  dateUpdated: d.dateUpdated,
  dateDeleted: d.dateDeleted,
}));
