import type { IFilterAcceptableValues } from "@/domain/abstractions";
import { createOperationMetadata, PaginationQuery } from "@/domain/abstractions";

export const RelatorioListQueryMetadata = createOperationMetadata({
  operationId: "relatorioFindAll",
  summary: "Busca relatórios de estágio paginados",
});

export class RelatorioListQuery extends PaginationQuery {
  "filter.id"?: IFilterAcceptableValues;
  "filter.estagio.id"?: IFilterAcceptableValues;
}
