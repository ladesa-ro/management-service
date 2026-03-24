import type { IPaginationSpec } from "@/application/pagination";
import { PaginationFilter } from "@/application/pagination";
import type { IQueryHandler } from "@/domain/abstractions";
import { createOperationMetadata } from "@/domain/abstractions";
import type { EstagioListQuery } from "./estagio-list.query";
import type { EstagioListQueryResult } from "./estagio-list.query.result";

export const EstagioListQueryMetadata = createOperationMetadata({
  operationId: "estagioFindAll",
  summary: "Lista estágios",
});

export const IEstagioListQueryHandler = Symbol("IEstagioListQueryHandler");

export type IEstagioListQueryHandler = IQueryHandler<
  EstagioListQuery | null,
  EstagioListQueryResult
>;

export const estagioPaginationSpec: IPaginationSpec = {
  sortableColumns: ["status", "cargaHoraria", "dataInicio", "dataFim", "dateCreated"],
  searchableColumns: ["status"],
  defaultSortBy: [["dateCreated", "DESC"]],
  filterableColumns: {
    "empresa.id": [PaginationFilter.EQ],
    "estagiario.id": [PaginationFilter.EQ],
    status: [PaginationFilter.EQ],
  },
};
