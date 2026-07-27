import type { FolhaPontoStatus } from "../domain/folha-ponto";
import type { FolhaPontoFindOneQueryResult } from "../domain/queries";
import type { FolhaPontoFindOneOutputGraphQlDto } from "./folha-ponto.graphql.dto";

export class FolhaPontoGraphqlMapper {
  static readonly queryResultToGqlDto = (
    result: FolhaPontoFindOneQueryResult,
  ): FolhaPontoFindOneOutputGraphQlDto => ({
    id: result.id,
    estagio: result.estagio,
    data: result.data,
    horaInicio: result.horaInicio,
    horaFim: result.horaFim,
    quantidadeHoras: result.quantidadeHoras,
    observacoes: result.observacoes,
    status: result.status as FolhaPontoStatus,
    dataSolicitacao: result.dataSolicitacao,
    dataAprovacao: result.dataAprovacao,
    dataRejeicao: result.dataRejeicao,
    dateCreated: new Date(result.dateCreated),
    dateUpdated: new Date(result.dateUpdated),
    dateDeleted: null,
  });
}
