import type { DeepPartial } from "typeorm";
import { PerfilTypeormMapper } from "@/modules/acesso/usuario/perfil/infrastructure.database/typeorm";
import { CursoTypeormMapper } from "@/modules/ensino/curso/infrastructure.database/typeorm";
import type { IEstagiario } from "@/modules/estagio/estagiario/domain/estagiario";
import type { EstagiarioFindOneQueryResult } from "@/modules/estagio/estagiario/domain/queries";
import { createMapper, pickId } from "@/shared/mapping";
import type { EstagiarioTypeormEntity } from "./estagiario.typeorm.entity";

// ============================================================================
// Persistencia -> Dominio (TypeORM Entity -> Domain / Query Result)
// ============================================================================

export const entityToDomain = createMapper<EstagiarioTypeormEntity, IEstagiario>((e) => ({
  id: e.id,
  perfil: pickId(e.perfil ?? null),
  curso: pickId(e.curso ?? null),
  periodo: e.periodo,
  telefone: e.telefone,
  emailInstitucional: e.emailInstitucional,
  dataNascimento: e.dataNascimento,
  dateCreated: e.dateCreated,
  dateUpdated: e.dateUpdated,
  dateDeleted: e.dateDeleted,
}));

/**
 * Entity -> Query Result (read side).
 *
 * Perfil is passed through structurally: the loaded PerfilEntity with full
 * relations is runtime-compatible with PerfilFindOneQueryResult.
 */

export const entityToFindOneQueryResult = createMapper<
  EstagiarioTypeormEntity,
  EstagiarioFindOneQueryResult
>((e) => ({
  id: e.id,
  perfil: e.perfil ? PerfilTypeormMapper.entityToFindOneQueryResult.map(e.perfil) : null,
  curso: e.curso ? CursoTypeormMapper.entityToFindOneQueryResult.map(e.curso) : null,
  periodo: e.periodo,
  telefone: e.telefone,
  emailInstitucional: e.emailInstitucional,
  dataNascimento: e.dataNascimento,
  ativo: e.dateDeleted === null,
  dateCreated: e.dateCreated,
  dateUpdated: e.dateUpdated,
  dateDeleted: e.dateDeleted,
}));

// ============================================================================
// Dominio -> Persistencia (Domain -> TypeORM Entity)
// ============================================================================

export const domainToPersistence = createMapper<IEstagiario, DeepPartial<EstagiarioTypeormEntity>>(
  (d) => ({
    id: d.id,
    perfil: pickId(d.perfil),
    curso: pickId(d.curso),
    periodo: d.periodo,
    telefone: d.telefone,
    emailInstitucional: d.emailInstitucional,
    dataNascimento: d.dataNascimento,
    dateCreated: d.dateCreated,
    dateUpdated: d.dateUpdated,
    dateDeleted: d.dateDeleted,
  }),
);
