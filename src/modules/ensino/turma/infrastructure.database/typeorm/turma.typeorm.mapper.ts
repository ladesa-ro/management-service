import type { DeepPartial } from "typeorm";
import { AmbienteTypeormMapper } from "@/modules/ambientes/ambiente/infrastructure.database/typeorm";
import { CursoTypeormMapper } from "@/modules/ensino/curso/infrastructure.database/typeorm";
import type { TurmaFindOneQueryResult } from "@/modules/ensino/turma/domain/queries";
import type { ITurma } from "@/modules/ensino/turma/domain/turma";
import { createMapper, pickId } from "@/shared/mapping";
import type { TurmaEntity } from "./turma.typeorm.entity";

// ============================================================================
// Persistencia -> Dominio (TypeORM Entity -> Domain / Query Result)
// ============================================================================

export const entityToDomain = createMapper<TurmaEntity, ITurma>((e) => ({
  id: e.id,
  periodo: e.periodo,
  curso: pickId(e.curso),
  ambientePadraoAula: e.ambientePadraoAula ? pickId(e.ambientePadraoAula) : null,
  imagemCapa: e.imagemCapa ? pickId(e.imagemCapa) : null,
  dateCreated: e.dateCreated,
  dateUpdated: e.dateUpdated,
  dateDeleted: e.dateDeleted,
}));

export const entityToOutput = createMapper<TurmaEntity, TurmaFindOneQueryResult>((e) => ({
  id: e.id,
  periodo: e.periodo,
  nome: e.nome ?? null,
  curso: CursoTypeormMapper.entityToOutput.map(e.curso),
  ambientePadraoAula: e.ambientePadraoAula
    ? AmbienteTypeormMapper.entityToOutput.map(e.ambientePadraoAula)
    : null,
  imagemCapa: e.imagemCapa ?? null,
  dateCreated: e.dateCreated,
  dateUpdated: e.dateUpdated,
  dateDeleted: e.dateDeleted,
}));

// ============================================================================
// Dominio -> Persistencia (Domain -> TypeORM Entity)
// ============================================================================

export const domainToPersistence = createMapper<ITurma, DeepPartial<TurmaEntity>>((d) => ({
  id: d.id,
  periodo: d.periodo,
  curso: pickId(d.curso),
  ambientePadraoAula: d.ambientePadraoAula ? pickId(d.ambientePadraoAula) : null,
  imagemCapa: d.imagemCapa ? pickId(d.imagemCapa) : null,
  dateCreated: d.dateCreated,
  dateUpdated: d.dateUpdated,
  dateDeleted: d.dateDeleted,
}));
