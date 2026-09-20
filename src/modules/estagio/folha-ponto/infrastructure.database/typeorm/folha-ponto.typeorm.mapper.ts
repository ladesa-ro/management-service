import { createMapper } from "@/shared/mapping";
import { FolhaPonto } from "../../domain/folha-ponto";
import type { FolhaPontoFindOneQueryResult } from "../../domain/queries";
import { FolhaPontoTypeormEntity } from "./folha-ponto.typeorm.entity";

const formatTime = (time: string | null | undefined) => {
  if (!time) return time;
  // TypeORM returns time fields as 'HH:MM:SS' strings from Postgres.
  return time.length > 5 ? time.substring(0, 5) : time;
};

const formatDateOnly = (date: string | Date | null | undefined): string | null => {
  if (!date) return null;
  if (typeof date === "string") {
    return date.slice(0, 10);
  }
  if (date instanceof Date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }
  return null;
};

const formatDateTime = (date: string | Date | null | undefined): string | null => {
  if (!date) return null;
  // TypeORM might return JS Date objects for timestamptz fields
  return date instanceof Date ? date.toISOString() : (date as string);
};

export const FolhaPontoTypeormMapper = {
  domainToPersistence: createMapper<FolhaPonto, FolhaPontoTypeormEntity>((domain) => {
    const entity = new FolhaPontoTypeormEntity();
    entity.id = domain.id;
    entity.estagio = { id: domain.estagio.id } as any;
    entity.estagioId = domain.estagio.id;
    entity.data = domain.data;
    entity.horaInicio = domain.horaInicio;
    entity.horaFim = domain.horaFim;
    entity.quantidadeHoras = domain.quantidadeHoras;
    entity.observacoes = domain.observacoes;
    entity.status = domain.status;
    entity.dataSolicitacao = domain.dataSolicitacao;
    entity.dataAprovacao = domain.dataAprovacao;
    entity.dataRejeicao = domain.dataRejeicao;
    entity.dateCreated = domain.dateCreated;
    entity.dateUpdated = domain.dateUpdated;
    entity.dateDeleted = domain.dateDeleted;
    return entity;
  }),

  entityToDomain: createMapper<FolhaPontoTypeormEntity, FolhaPonto>((entity) => {
    return FolhaPonto.load({
      id: entity.id,
      estagio: { id: entity.estagio?.id ?? entity.estagioId },
      data: formatDateOnly(entity.data) as string,
      horaInicio: formatTime(entity.horaInicio) as string,
      horaFim: formatTime(entity.horaFim) as string,
      quantidadeHoras: Number(entity.quantidadeHoras), // PostgreSQL Decimal vem como string em algumas libs
      observacoes: entity.observacoes,
      status: entity.status,
      dataSolicitacao: formatDateTime(entity.dataSolicitacao) as string,
      dataAprovacao: formatDateTime(entity.dataAprovacao),
      dataRejeicao: formatDateTime(entity.dataRejeicao),
      dateCreated: formatDateTime(entity.dateCreated) as string,
      dateUpdated: formatDateTime(entity.dateUpdated) as string,
      dateDeleted: formatDateTime(entity.dateDeleted),
    });
  }),

  entityToFindOneQueryResult: createMapper<FolhaPontoTypeormEntity, FolhaPontoFindOneQueryResult>(
    (entity) => {
      return {
        id: entity.id,
        estagio: { id: entity.estagio?.id ?? entity.estagioId },
        data: formatDateOnly(entity.data) as string,
        horaInicio: formatTime(entity.horaInicio) as string,
        horaFim: formatTime(entity.horaFim) as string,
        quantidadeHoras: Number(entity.quantidadeHoras),
        observacoes: entity.observacoes,
        status: entity.status as any,
        dataSolicitacao: formatDateTime(entity.dataSolicitacao) as string,
        dataAprovacao: formatDateTime(entity.dataAprovacao),
        dataRejeicao: formatDateTime(entity.dataRejeicao),
        dateCreated: formatDateTime(entity.dateCreated) as string,
        dateUpdated: formatDateTime(entity.dateUpdated) as string,
        dateDeleted: formatDateTime(entity.dateDeleted),
      };
    },
  ),
};
