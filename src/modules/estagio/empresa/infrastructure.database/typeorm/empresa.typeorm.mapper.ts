import type { DeepPartial } from "typeorm";
import type { IEmpresa } from "@/modules/estagio/empresa/domain/empresa";
import type { EmpresaFindOneQueryResult } from "@/modules/estagio/empresa/domain/queries";
import { createMapper, pickId } from "@/shared/mapping";
import type { EmpresaTypeormEntity } from "./empresa.typeorm.entity";

// ============================================================================
// Persistência → Domínio (TypeORM Entity → Domain / Query Result)
// ============================================================================

export const entityToDomain = createMapper<EmpresaTypeormEntity, IEmpresa>((e) => ({
  id: e.id,
  razaoSocial: e.razaoSocial,
  nomeFantasia: e.nomeFantasia,
  cnpj: e.cnpj,
  telefone: e.telefone,
  email: e.email,
  endereco: pickId(e.endereco),
  dateCreated: e.dateCreated,
  dateUpdated: e.dateUpdated,
  dateDeleted: e.dateDeleted,
}));

export const entityToOutput = createMapper<EmpresaTypeormEntity, EmpresaFindOneQueryResult>(
  (e) => ({
    id: e.id,
    razaoSocial: e.razaoSocial,
    nomeFantasia: e.nomeFantasia,
    cnpj: e.cnpj,
    telefone: e.telefone,
    email: e.email,
    endereco: e.endereco,
    ativo: e.dateDeleted === null,
    dateCreated: e.dateCreated,
    dateUpdated: e.dateUpdated,
    dateDeleted: e.dateDeleted,
  }),
);

// ============================================================================
// Domínio → Persistência (Domain → TypeORM Entity)
// ============================================================================

export const domainToPersistence = createMapper<IEmpresa, DeepPartial<EmpresaTypeormEntity>>(
  (d) => ({
    id: d.id,
    razaoSocial: d.razaoSocial,
    nomeFantasia: d.nomeFantasia,
    cnpj: d.cnpj,
    telefone: d.telefone,
    email: d.email,
    endereco: pickId(d.endereco),
    dateCreated: d.dateCreated,
    dateUpdated: d.dateUpdated,
    dateDeleted: d.dateDeleted,
  }),
);
