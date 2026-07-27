import { createMapper } from "@/shared/mapping";
import { FolhaPonto } from "../../domain/folha-ponto";
import type { FolhaPontoFindOneQueryResult } from "../../domain/queries";
import { FolhaPontoTypeormEntity } from "./folha-ponto.typeorm.entity";

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
      data: entity.data,
      horaInicio: entity.horaInicio,
      horaFim: entity.horaFim,
      quantidadeHoras: Number(entity.quantidadeHoras), // PostgreSQL Decimal vem como string em algumas libs
      observacoes: entity.observacoes,
      status: entity.status,
      dataSolicitacao: entity.dataSolicitacao,
      dataAprovacao: entity.dataAprovacao,
      dataRejeicao: entity.dataRejeicao,
      dateCreated: entity.dateCreated,
      dateUpdated: entity.dateUpdated,
      dateDeleted: entity.dateDeleted,
    });
  }),

  entityToFindOneQueryResult: createMapper<FolhaPontoTypeormEntity, FolhaPontoFindOneQueryResult>(
    (entity) => {
      return {
        id: entity.id,
        estagio: { id: entity.estagio?.id || entity["id_estagio_fk"] },
        data: entity.data,
        horaInicio: entity.horaInicio,
        horaFim: entity.horaFim,
        quantidadeHoras: Number(entity.quantidadeHoras),
        observacoes: entity.observacoes,
        status: entity.status as any,
        dataSolicitacao: entity.dataSolicitacao,
        dataAprovacao: entity.dataAprovacao,
        dataRejeicao: entity.dataRejeicao,
        dateCreated: entity.dateCreated,
        dateUpdated: entity.dateUpdated,
        dateDeleted: entity.dateDeleted,
      };
    },
  ),
};
