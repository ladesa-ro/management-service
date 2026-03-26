import type { DeepPartial } from "typeorm";
import type { IDisciplina } from "@/modules/ensino/disciplina/domain/disciplina";
import type { DisciplinaFindOneQueryResult } from "@/modules/ensino/disciplina/domain/queries/disciplina-find-one.query.result";
import { createMapper } from "@/shared/mapping";
import { pickId } from "@/shared/mapping/transforms";
import type { DisciplinaEntity } from "./disciplina.typeorm.entity";

// ============================================================================
// Persistência → Domínio (TypeORM Entity → Domain / Query Result)
// ============================================================================

export const entityToDomain = createMapper<DisciplinaEntity, IDisciplina>((e) => ({
  id: e.id,
  nome: e.nome,
  nomeAbreviado: e.nomeAbreviado,
  cargaHoraria: e.cargaHoraria,
  imagemCapa: pickId(e.imagemCapa),
  dateCreated: e.dateCreated,
  dateUpdated: e.dateUpdated,
  dateDeleted: e.dateDeleted,
}));

export const entityToOutput = createMapper<DisciplinaEntity, DisciplinaFindOneQueryResult>((e) => ({
  id: e.id,
  nome: e.nome,
  nomeAbreviado: e.nomeAbreviado,
  cargaHoraria: e.cargaHoraria,
  imagemCapa: e.imagemCapa,
  dateCreated: e.dateCreated,
  dateUpdated: e.dateUpdated,
  dateDeleted: e.dateDeleted,
}));

// ============================================================================
// Domínio → Persistência (Domain → TypeORM Entity)
// ============================================================================

export const domainToPersistence = createMapper<IDisciplina, DeepPartial<DisciplinaEntity>>(
  (d) => ({
    id: d.id,
    nome: d.nome,
    nomeAbreviado: d.nomeAbreviado,
    cargaHoraria: d.cargaHoraria,
    imagemCapa: d.imagemCapa,
    dateCreated: d.dateCreated,
    dateUpdated: d.dateUpdated,
    dateDeleted: d.dateDeleted,
  }),
);
