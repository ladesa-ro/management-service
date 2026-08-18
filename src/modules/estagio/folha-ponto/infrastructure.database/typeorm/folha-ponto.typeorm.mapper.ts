import { createMapper } from "@/shared/mapping";
import { FolhaPonto } from "../../domain/folha-ponto";
import type { FolhaPontoFindOneQueryResult } from "../../domain/queries";
import { FolhaPontoTypeormEntity } from "./folha-ponto.typeorm.entity";

const formatTime = (time: string | null | undefined) => {
  if (!time) return time;
  // TypeORM returns time fields as 'HH:MM:SS' strings from Postgres.
  return time.length > 5 ? time.substring(0, 5) : time;
};

const formatDate = (date: string | Date | null | undefined): string | null => {
  if (!date) return null;
  // TypeORM might return JS Date objects for timestamptz fields
  return date instanceof Date ? date.toISOString() : (date as string);
};

export const FolhaPontoTypeormMapper = {
  domainToPersistence: createMapper<FolhaPonto, FolhaPontoTypeormEntity>((domain) => {
    const entity = new FolhaPontoTypeormEntity();
    entity.id = domain.id;
    entity.estagio = { id: domain.estagio.id } as any;
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
      estagio: { id: entity.estagio?.id || entity["id_estagio_fk"] },
      data: formatDate(entity.data) as string,
      horaInicio: formatTime(entity.horaInicio) as string,
      horaFim: formatTime(entity.horaFim) as string,
      quantidadeHoras: Number(entity.quantidadeHoras), // PostgreSQL Decimal vem como string em algumas libs
      observacoes: entity.observacoes,
      status: entity.status,
      dataSolicitacao: formatDate(entity.dataSolicitacao) as string,
      dataAprovacao: formatDate(entity.dataAprovacao),
      dataRejeicao: formatDate(entity.dataRejeicao),
      dateCreated: formatDate(entity.dateCreated) as string,
      dateUpdated: formatDate(entity.dateUpdated) as string,
      dateDeleted: formatDate(entity.dateDeleted),
    });
  }),

  entityToFindOneQueryResult: createMapper<FolhaPontoTypeormEntity, FolhaPontoFindOneQueryResult>(
    (entity) => {
      return {
        id: entity.id,
        estagio: { id: entity.estagio?.id || entity["id_estagio_fk"] },
        data: formatDate(entity.data) as string,
        horaInicio: formatTime(entity.horaInicio) as string,
        horaFim: formatTime(entity.horaFim) as string,
        quantidadeHoras: Number(entity.quantidadeHoras),
        observacoes: entity.observacoes,
        status: entity.status as any,
        dataSolicitacao: formatDate(entity.dataSolicitacao) as string,
        dataAprovacao: formatDate(entity.dataAprovacao),
        dataRejeicao: formatDate(entity.dataRejeicao),
        dateCreated: formatDate(entity.dateCreated) as string,
        dateUpdated: formatDate(entity.dateUpdated) as string,
        dateDeleted: formatDate(entity.dateDeleted),
      };
    },
  ),
};
