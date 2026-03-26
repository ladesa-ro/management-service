import type { DeepPartial } from "typeorm";
import type { IEndereco } from "@/modules/localidades/endereco/domain/endereco";
import type { EnderecoFindOneQueryResult } from "@/modules/localidades/endereco/domain/queries";
import { createMapper, pickId } from "@/shared/mapping";
import type { EnderecoEntity } from "./endereco.typeorm.entity";

// ============================================================================
// Persistência → Domínio (TypeORM Entity → Domain / Query Result)
// ============================================================================

export const entityToDomain = createMapper<EnderecoEntity, IEndereco>((e) => ({
  id: e.id,
  cep: e.cep,
  logradouro: e.logradouro,
  numero: e.numero,
  bairro: e.bairro,
  complemento: e.complemento,
  pontoReferencia: e.pontoReferencia,
  cidade: pickId(e.cidade),
  dateCreated: e.dateCreated,
  dateUpdated: e.dateUpdated,
  dateDeleted: e.dateDeleted,
}));

export const entityToOutput = createMapper<EnderecoEntity, EnderecoFindOneQueryResult>((e) => ({
  id: e.id,
  cep: e.cep,
  logradouro: e.logradouro,
  numero: e.numero,
  bairro: e.bairro,
  complemento: e.complemento,
  pontoReferencia: e.pontoReferencia,
  cidade: e.cidade,
  dateCreated: e.dateCreated,
  dateUpdated: e.dateUpdated,
  dateDeleted: e.dateDeleted,
}));

// ============================================================================
// Domínio → Persistência (Domain → TypeORM Entity)
// ============================================================================

export const domainToPersistence = createMapper<IEndereco, DeepPartial<EnderecoEntity>>((d) => ({
  id: d.id,
  cep: d.cep,
  logradouro: d.logradouro,
  numero: d.numero,
  bairro: d.bairro,
  complemento: d.complemento,
  pontoReferencia: d.pontoReferencia,
  cidade: pickId(d.cidade),
  dateCreated: d.dateCreated,
  dateUpdated: d.dateUpdated,
  dateDeleted: d.dateDeleted,
}));
