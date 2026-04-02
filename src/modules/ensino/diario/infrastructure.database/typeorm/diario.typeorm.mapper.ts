import type { DeepPartial } from "typeorm";
import { AmbienteTypeormMapper } from "@/modules/ambientes/ambiente/infrastructure.database/typeorm";
import { CalendarioLetivoTypeormMapper } from "@/modules/calendario/letivo/infrastructure.database/typeorm";
import type { IDiario } from "@/modules/ensino/diario/domain/diario";
import type { DiarioFindOneQueryResult } from "@/modules/ensino/diario/domain/queries";
import { DisciplinaTypeormMapper } from "@/modules/ensino/disciplina/infrastructure.database/typeorm";
import { TurmaTypeormMapper } from "@/modules/ensino/turma/infrastructure.database/typeorm";
import { createMapper, pickId } from "@/shared/mapping";
import type { DiarioEntity } from "./diario.typeorm.entity";

// ============================================================================
// Persistencia -> Dominio (TypeORM Entity -> Domain / Query Result)
// ============================================================================

export const entityToDomain = createMapper<DiarioEntity, DeepPartial<DiarioEntity>>((e) => ({
  id: e.id,
  ativo: e.ativo,
  calendarioLetivo: pickId(e.calendarioLetivo),
  turma: pickId(e.turma),
  disciplina: pickId(e.disciplina),
  ambientePadrao: e.ambientePadrao ? pickId(e.ambientePadrao) : null,
  imagemCapa: e.imagemCapa ? pickId(e.imagemCapa) : null,
  dateCreated: e.dateCreated,
  dateUpdated: e.dateUpdated,
  dateDeleted: e.dateDeleted,
}));

export const entityToFindOneQueryResult = createMapper<DiarioEntity, DiarioFindOneQueryResult>(
  (e) => ({
    id: e.id,
    ativo: e.ativo,
    calendarioLetivo: CalendarioLetivoTypeormMapper.entityToFindOneQueryResult.map(
      e.calendarioLetivo,
    ),
    turma: TurmaTypeormMapper.entityToFindOneQueryResult.map(e.turma),
    disciplina: DisciplinaTypeormMapper.entityToFindOneQueryResult.map(e.disciplina),
    ambientePadrao: e.ambientePadrao
      ? AmbienteTypeormMapper.entityToFindOneQueryResult.map(e.ambientePadrao)
      : null,
    imagemCapa: e.imagemCapa ?? null,
    dateCreated: e.dateCreated,
    dateUpdated: e.dateUpdated,
    dateDeleted: e.dateDeleted,
  }),
);

// ============================================================================
// Dominio -> Persistencia (Domain -> TypeORM Entity)
// ============================================================================

export const domainToPersistence = createMapper<IDiario, DeepPartial<DiarioEntity>>((d) => ({
  id: d.id,
  ativo: d.ativo,
  calendarioLetivo: pickId(d.calendarioLetivo),
  turma: pickId(d.turma),
  disciplina: pickId(d.disciplina),
  ambientePadrao: d.ambientePadrao ? pickId(d.ambientePadrao) : null,
  imagemCapa: d.imagemCapa ? pickId(d.imagemCapa) : null,
  dateCreated: d.dateCreated,
  dateUpdated: d.dateUpdated,
  dateDeleted: d.dateDeleted,
}));
