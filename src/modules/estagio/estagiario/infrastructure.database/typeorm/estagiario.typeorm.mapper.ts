import type { DeepPartial } from "typeorm";
import type { PerfilFindOneQueryResult } from "@/modules/acesso/usuario/perfil/domain/queries/perfil-find-one.query.result";
import { CursoTypeormMapper } from "@/modules/ensino/curso/infrastructure.database/typeorm";
import { TurmaTypeormMapper } from "@/modules/ensino/turma/infrastructure.database/typeorm";
import type { IEstagiario } from "@/modules/estagio/estagiario/domain/estagiario";
import type { EstagiarioFindOneQueryResult } from "@/modules/estagio/estagiario/domain/queries";
import { createMapper, pickId } from "@/shared/mapping";
import type { EstagiarioTypeormEntity } from "./estagiario.typeorm.entity";

// ============================================================================
// Persistencia -> Dominio (TypeORM Entity -> Domain / Query Result)
// ============================================================================

export const entityToDomain = createMapper<EstagiarioTypeormEntity, IEstagiario>((e) => ({
  id: e.id,
  perfil: pickId(e.perfil),
  curso: pickId(e.curso),
  turma: pickId(e.turma),
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
  perfil: e.perfil satisfies { id: string } as unknown as PerfilFindOneQueryResult,
  curso: CursoTypeormMapper.entityToFindOneQueryResult.map(e.curso),
  turma: TurmaTypeormMapper.entityToFindOneQueryResult.map(e.turma),
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
    turma: pickId(d.turma),
    telefone: d.telefone,
    emailInstitucional: d.emailInstitucional,
    dataNascimento: d.dataNascimento,
    dateCreated: d.dateCreated,
    dateUpdated: d.dateUpdated,
    dateDeleted: d.dateDeleted,
  }),
);
