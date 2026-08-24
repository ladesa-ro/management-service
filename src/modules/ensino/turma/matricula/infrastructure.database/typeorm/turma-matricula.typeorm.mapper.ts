import type { DeepPartial } from "typeorm";
import { createMapper, pickId } from "@/shared/mapping";
import type { TurmaMatriculaFindOneQueryResult } from "../../domain/queries/turma-matricula-find-one.query.result";
import type { ITurmaMatricula } from "../../domain/turma-matricula";
import type { TurmaMatriculaEntity } from "./turma-matricula.typeorm.entity";

export const entityToDomain = createMapper<TurmaMatriculaEntity, ITurmaMatricula>((e) => ({
  id: e.id,
  turma: pickId(e.turma),
  perfil: pickId(e.perfil),
  dateCreated: e.dateCreated,
  dateUpdated: e.dateUpdated,
  dateDeleted: e.dateDeleted,
}));

export const entityToFindOneQueryResult = createMapper<
  TurmaMatriculaEntity,
  TurmaMatriculaFindOneQueryResult
>((e) => ({
  id: e.id,
  turma: pickId(e.turma),
  perfil: pickId(e.perfil),
  dateCreated: e.dateCreated,
  dateUpdated: e.dateUpdated,
  dateDeleted: e.dateDeleted,
}));

export const domainToPersistence = createMapper<
  ITurmaMatricula,
  DeepPartial<TurmaMatriculaEntity>
>((d) => ({
  id: d.id,
  turma: pickId(d.turma),
  perfil: pickId(d.perfil),
  dateCreated: d.dateCreated,
  dateUpdated: d.dateUpdated,
  dateDeleted: d.dateDeleted,
}));
