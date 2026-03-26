import { generateUuidV7 } from "@/domain/entities/utils/generate-uuid-v7";
import type { IHorarioEstagio } from "@/modules/estagio/estagio/domain/estagio";
import { Estagio } from "@/modules/estagio/estagio/domain/estagio";
import type { EstagioFindOneQueryResult } from "@/modules/estagio/estagio/domain/queries";
import { createMapper } from "@/shared/mapping";
import { getNowISO } from "@/utils/date";
import { EstagioTypeormEntity } from "./estagio.typeorm.entity";
import { HorarioEstagioTypeormEntity } from "./horario-estagio.typeorm.entity";

// ============================================================================
// Persistência → Domínio (TypeORM Entity → Domain Aggregate)
// ============================================================================

export const entityToDomain = createMapper<EstagioTypeormEntity, Estagio>((entity) =>
  Estagio.load({
    id: entity.id,
    empresa: { id: entity.empresa.id },
    estagiario: entity.estagiario ? { id: entity.estagiario.id } : null,
    cargaHoraria: entity.cargaHoraria,
    dataInicio: entity.dataInicio,
    dataFim: entity.dataFim,
    status: entity.status,
    horariosEstagio: (entity.horariosEstagio ?? [])
      .filter((horario) => !horario.dateDeleted)
      .map((horario) => ({
        id: horario.id,
        diaSemana: horario.diaSemana,
        horaInicio: horario.horaInicio,
        horaFim: horario.horaFim,
      })),
    dateCreated: entity.dateCreated,
    dateUpdated: entity.dateUpdated,
    dateDeleted: entity.dateDeleted,
  }),
);

// ============================================================================
// Domínio → Persistência (Domain Aggregate → TypeORM Entity)
// ============================================================================

export const domainToPersistence = createMapper<Estagio, EstagioTypeormEntity>((estagio) => {
  const entity = Object.assign(Object.create(EstagioTypeormEntity.prototype), {
    id: estagio.id || generateUuidV7(),
    empresa: { id: estagio.empresa.id },
    estagiario: estagio.estagiario ? { id: estagio.estagiario.id } : null,
    cargaHoraria: estagio.cargaHoraria,
    dataInicio: estagio.dataInicio,
    dataFim: estagio.dataFim,
    status: estagio.status,
    dateCreated: estagio.dateCreated,
    dateUpdated: estagio.dateUpdated,
    dateDeleted: estagio.dateDeleted,
  });
  return entity;
});

// ============================================================================
// Horário → Persistência
// ============================================================================

export function horarioToPersistence(
  idEstagioFk: string,
  horario: IHorarioEstagio,
): HorarioEstagioTypeormEntity {
  const entity = new HorarioEstagioTypeormEntity();
  entity.id = horario.id || generateUuidV7();
  Object.assign(entity, { estagio: { id: idEstagioFk } });
  entity.diaSemana = horario.diaSemana;
  entity.horaInicio = horario.horaInicio;
  entity.horaFim = horario.horaFim;
  entity.dateCreated = getNowISO();
  entity.dateUpdated = getNowISO();
  entity.dateDeleted = null;
  return entity;
}

// ============================================================================
// Persistência → Query Result (TypeORM Entity → Query Result)
// ============================================================================

export const entityToOutput = createMapper<EstagioTypeormEntity, EstagioFindOneQueryResult>(
  (entity) => ({
    id: entity.id,
    empresa: { id: entity.empresa.id },
    estagiario: entity.estagiario ? { id: entity.estagiario.id } : null,
    cargaHoraria: entity.cargaHoraria,
    dataInicio: entity.dataInicio,
    dataFim: entity.dataFim,
    status: entity.status,
    horariosEstagio: (entity.horariosEstagio ?? [])
      .filter((horario) => !horario.dateDeleted)
      .map((horario) => ({
        id: horario.id,
        diaSemana: horario.diaSemana,
        horaInicio: horario.horaInicio,
        horaFim: horario.horaFim,
      })),
    ativo: !entity.dateDeleted,
    dateCreated: entity.dateCreated,
    dateUpdated: entity.dateUpdated,
  }),
);
