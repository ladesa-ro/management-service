import { generateUuidV7 } from "@/domain/entities/utils/generate-uuid-v7";
import type { IHorarioEstagio } from "@/modules/estagio/estagio/domain/estagio";
import { Estagio } from "@/modules/estagio/estagio/domain/estagio";
import type { EstagioFindOneQueryResult } from "@/modules/estagio/estagio/domain/queries";
import { dateToDateString, dateToISO, isoToDate } from "@/shared/mapping/transforms";
import { getNow } from "@/utils/date";
import { EstagioTypeormEntity } from "./estagio.typeorm.entity";
import { HorarioEstagioTypeormEntity } from "./horario-estagio.typeorm.entity";

export class EstagioMapper {
  static toDomain(entity: EstagioTypeormEntity): Estagio {
    return Estagio.load({
      id: entity.id,
      empresa: { id: entity.empresa.id },
      estagiario: entity.estagiario ? { id: entity.estagiario.id } : null,
      cargaHoraria: entity.cargaHoraria,
      dataInicio: dateToDateString(entity.dataInicio) as string | null,
      dataFim: dateToDateString(entity.dataFim) as string | null,
      status: entity.status,
      horariosEstagio: (entity.horariosEstagio ?? [])
        .filter((horario) => !horario.dateDeleted)
        .map((horario) => ({
          id: horario.id,
          diaSemana: horario.diaSemana,
          horaInicio: horario.horaInicio,
          horaFim: horario.horaFim,
        })),
      dateCreated: dateToISO(entity.dateCreated) as string,
      dateUpdated: dateToISO(entity.dateUpdated) as string,
      dateDeleted: dateToISO(entity.dateDeleted) as string | null,
    });
  }

  static toPersistence(estagio: Estagio): EstagioTypeormEntity {
    const entity = new EstagioTypeormEntity();
    entity.id = estagio.id || generateUuidV7();
    Object.assign(entity, { empresa: { id: estagio.empresa.id } });
    Object.assign(entity, {
      estagiario: estagio.estagiario ? { id: estagio.estagiario.id } : null,
    });
    entity.cargaHoraria = estagio.cargaHoraria;
    entity.dataInicio = estagio.dataInicio ? (isoToDate(estagio.dataInicio) as Date) : null;
    entity.dataFim = estagio.dataFim ? (isoToDate(estagio.dataFim) as Date) : null;
    entity.status = estagio.status;
    entity.dateCreated = isoToDate(estagio.dateCreated) as Date;
    entity.dateUpdated = isoToDate(estagio.dateUpdated) as Date;
    entity.dateDeleted = isoToDate(estagio.dateDeleted) as Date | null;
    return entity;
  }

  static toHorarioPersistence(
    idEstagioFk: string,
    horario: IHorarioEstagio,
  ): HorarioEstagioTypeormEntity {
    const entity = new HorarioEstagioTypeormEntity();
    entity.id = horario.id || generateUuidV7();
    Object.assign(entity, { estagio: { id: idEstagioFk } });
    entity.diaSemana = horario.diaSemana;
    entity.horaInicio = horario.horaInicio;
    entity.horaFim = horario.horaFim;
    entity.dateCreated = getNow();
    entity.dateUpdated = getNow();
    entity.dateDeleted = null;
    return entity;
  }

  static toPersistenceFromRecord(data: Record<string, unknown>): Partial<EstagioTypeormEntity> {
    const entity: Partial<EstagioTypeormEntity> = {};
    if (data.id !== undefined) entity.id = data.id as string;
    if (data.empresa !== undefined) Object.assign(entity, { empresa: data.empresa });
    if (data.estagiario !== undefined) Object.assign(entity, { estagiario: data.estagiario });
    if (data.cargaHoraria !== undefined) entity.cargaHoraria = data.cargaHoraria as number;
    if (data.dataInicio !== undefined)
      entity.dataInicio = data.dataInicio ? (isoToDate(data.dataInicio as string) as Date) : null;
    if (data.dataFim !== undefined)
      entity.dataFim = data.dataFim ? (isoToDate(data.dataFim as string) as Date) : null;
    if (data.status !== undefined) entity.status = data.status as EstagioTypeormEntity["status"];
    if (data.dateCreated !== undefined)
      entity.dateCreated = isoToDate(data.dateCreated as string) as Date;
    if (data.dateUpdated !== undefined)
      entity.dateUpdated = isoToDate(data.dateUpdated as string) as Date;
    if (data.dateDeleted !== undefined)
      entity.dateDeleted = data.dateDeleted
        ? (isoToDate(data.dateDeleted as string) as Date)
        : null;
    return entity;
  }

  static toOutputDto(entity: EstagioTypeormEntity): EstagioFindOneQueryResult {
    return {
      id: entity.id,
      empresa: { id: entity.empresa.id },
      estagiario: entity.estagiario ? { id: entity.estagiario.id } : null,
      cargaHoraria: entity.cargaHoraria,
      dataInicio: dateToDateString(entity.dataInicio) as string | null,
      dataFim: dateToDateString(entity.dataFim) as string | null,
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
      dateCreated: dateToISO(entity.dateCreated) as string,
      dateUpdated: dateToISO(entity.dateUpdated) as string,
    };
  }
}
