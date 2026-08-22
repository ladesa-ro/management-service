import type { DeepPartial } from "typeorm";
import { PerfilTypeormMapper } from "@/modules/acesso/usuario/perfil/infrastructure.database/typeorm";
import type { ICalendarioIndisponibilidadeProfessor } from "@/modules/calendario/indisponibilidade-professor/domain/calendario-indisponibilidade-professor";
import { CalendarioIndisponibilidadeProfessorTipo } from "@/modules/calendario/indisponibilidade-professor/domain/calendario-indisponibilidade-professor.types";
import type { CalendarioIndisponibilidadeProfessorFindOneQueryResult } from "@/modules/calendario/indisponibilidade-professor/domain/queries/calendario-indisponibilidade-professor-find-one.query.result";
import { createMapper, pickId } from "@/shared/mapping";
import type { CalendarioIndisponibilidadeProfessorEntity } from "./calendario-indisponibilidade-professor.typeorm.entity";

// ============================================================================
// Persistência → Domínio (TypeORM Entity → Domain / Query Result)
// ============================================================================

export const entityToDomain = createMapper<
  CalendarioIndisponibilidadeProfessorEntity,
  ICalendarioIndisponibilidadeProfessor
>((e) => ({
  id: e.id,
  perfil: pickId(e.perfil),
  tipo: e.tipo,
  diaSemana: e.diaSemana,
  data: e.data,
  inicio: e.inicio,
  fim: e.fim,
  motivo: e.motivo,
  dateCreated: e.dateCreated,
  dateUpdated: e.dateUpdated,
  dateDeleted: e.dateDeleted,
}));

export const entityToFindOneQueryResult = createMapper<
  CalendarioIndisponibilidadeProfessorEntity,
  CalendarioIndisponibilidadeProfessorFindOneQueryResult
>((e) => ({
  id: e.id,
  perfil: PerfilTypeormMapper.entityToFindOneQueryResult.map(e.perfil),
  tipo: e.tipo,
  diaSemana: e.diaSemana,
  data: e.data,
  inicio: e.inicio,
  fim: e.fim,
  motivo: e.motivo,
  dateCreated: e.dateCreated,
  dateUpdated: e.dateUpdated,
  dateDeleted: e.dateDeleted,
}));

// ============================================================================
// Domínio → Persistência (Domain → TypeORM Entity)
// ============================================================================

export const domainToPersistence = createMapper<
  ICalendarioIndisponibilidadeProfessor,
  DeepPartial<CalendarioIndisponibilidadeProfessorEntity>
>((d) => ({
  id: d.id,
  perfil: pickId(d.perfil),
  tipo: d.tipo as CalendarioIndisponibilidadeProfessorTipo,
  diaSemana: d.diaSemana,
  data: d.data,
  inicio: d.inicio,
  fim: d.fim,
  motivo: d.motivo,
  dateCreated: d.dateCreated,
  dateUpdated: d.dateUpdated,
  dateDeleted: d.dateDeleted,
}));
