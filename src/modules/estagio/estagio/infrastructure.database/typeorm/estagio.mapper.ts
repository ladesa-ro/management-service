import { generateUuidV7 } from "@/domain/entities/utils/generate-uuid-v7.js";
import type { IHorarioEstagio } from "@/modules/estagio/estagio/domain/estagio";
import { Estagio } from "@/modules/estagio/estagio/domain/estagio";
import type { EstagioFindOneQueryResult } from "@/modules/estagio/estagio/domain/queries";
import { EstagioTypeormEntity } from "./estagio.typeorm.entity";
import { HorarioEstagioTypeormEntity } from "./horario-estagio.typeorm.entity";

export class EstagioMapper {
  static toDomain(entity: EstagioTypeormEntity): Estagio {
    const formatDateToISOString = (date: Date | string | null | undefined): string | null => {
      if (!date) return null;
      if (typeof date === "string") return date;
      return date.toISOString();
    };

    const formatDateOnly = (date: Date | string | null | undefined): string | null => {
      if (!date) return null;
      if (typeof date === "string") return date;
      return date.toISOString().split("T")[0];
    };

    return Estagio.load({
      id: entity.id,
      idEmpresaFk: entity.idEmpresaFk,
      idEstagiarioFk: entity.idEstagiarioFk,
      cargaHoraria: entity.cargaHoraria,
      dataInicio: formatDateOnly(entity.dataInicio),
      dataFim: formatDateOnly(entity.dataFim),
      status: entity.status,
      horariosEstagio: (entity.horariosEstagio ?? [])
        .filter((horario) => !horario.dateDeleted)
        .map((horario) => ({
          id: horario.id,
          diaSemana: horario.diaSemana,
          horaInicio: horario.horaInicio,
          horaFim: horario.horaFim,
        })),
      dateCreated: formatDateToISOString(entity.dateCreated),
      dateUpdated: formatDateToISOString(entity.dateUpdated),
      dateDeleted: formatDateToISOString(entity.dateDeleted),
    });
  }

  static toPersistence(estagio: Estagio): EstagioTypeormEntity {
    const entity = new EstagioTypeormEntity();
    entity.id = estagio.id || generateUuidV7();
    entity.idEmpresaFk = estagio.idEmpresaFk;
    entity.idEstagiarioFk = estagio.idEstagiarioFk;
    entity.cargaHoraria = estagio.cargaHoraria;
    entity.dataInicio = estagio.dataInicio ? new Date(estagio.dataInicio) : null;
    entity.dataFim = estagio.dataFim ? new Date(estagio.dataFim) : null;
    entity.status = estagio.status;
    entity.empresa = { id: estagio.idEmpresaFk } as any;
    entity.estagiario = estagio.idEstagiarioFk ? ({ id: estagio.idEstagiarioFk } as any) : null;
    entity.dateCreated = new Date(estagio.dateCreated);
    entity.dateUpdated = new Date(estagio.dateUpdated);
    entity.dateDeleted = estagio.dateDeleted ? new Date(estagio.dateDeleted) : null;
    return entity;
  }

  static toHorarioPersistence(
    idEstagioFk: string,
    horario: IHorarioEstagio,
  ): HorarioEstagioTypeormEntity {
    const entity = new HorarioEstagioTypeormEntity();
    entity.id = horario.id || generateUuidV7();
    entity.idEstagioFk = idEstagioFk;
    entity.estagio = { id: idEstagioFk } as any;
    entity.diaSemana = horario.diaSemana;
    entity.horaInicio = horario.horaInicio;
    entity.horaFim = horario.horaFim;
    entity.dateCreated = new Date();
    entity.dateUpdated = new Date();
    entity.dateDeleted = null;
    return entity;
  }

  static toOutputDto(entity: EstagioTypeormEntity): EstagioFindOneQueryResult {
    const formatDateToISOString = (date: Date | string | null | undefined): string => {
      if (!date) return new Date().toISOString();
      if (typeof date === "string") return date;
      return date.toISOString();
    };

    const formatDateOnly = (date: Date | string | null | undefined): string | null => {
      if (!date) return null;
      if (typeof date === "string") return date;
      return date.toISOString().split("T")[0];
    };

    return {
      id: entity.id,
      idEmpresaFk: entity.idEmpresaFk,
      idEstagiarioFk: entity.idEstagiarioFk,
      cargaHoraria: entity.cargaHoraria,
      dataInicio: formatDateOnly(entity.dataInicio),
      dataFim: formatDateOnly(entity.dataFim),
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
      dateCreated: formatDateToISOString(entity.dateCreated),
      dateUpdated: formatDateToISOString(entity.dateUpdated),
    };
  }
}
