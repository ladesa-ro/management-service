import type { IFilterAcceptableValues } from "@/domain/abstractions";
import { createOperationMetadata, PaginationQuery } from "@/domain/abstractions";

export const FolhaPontoListQueryMetadata = createOperationMetadata({
  operationId: "folhaPontoFindAll",
  summary: "Busca folhas de ponto paginadas",
});

export class FolhaPontoListQuery extends PaginationQuery {
  "filter.id"?: IFilterAcceptableValues;
  "filter.status"?: IFilterAcceptableValues;
  "filter.estagio.id"?: IFilterAcceptableValues;
  "filter.estagio.estagiario.perfil.usuario.id"?: IFilterAcceptableValues;
}
