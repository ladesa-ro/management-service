import type { z } from "zod";
import type { IFilterAcceptableValues } from "@/domain/abstractions";
import { createOperationMetadata, PaginationQuery } from "@/domain/abstractions";
import type { folhaPontoListQueryFilterSchema } from "./folha-ponto-list.query.schemas";

export const FolhaPontoListQueryMetadata = createOperationMetadata({
  operationId: "folhaPontoFindAll",
  summary: "Busca folhas de ponto paginadas",
});

export type IFolhaPontoListQueryFilter = z.infer<typeof folhaPontoListQueryFilterSchema> &
  Record<string, IFilterAcceptableValues>;

export class FolhaPontoListQuery extends PaginationQuery {
  filter?: IFolhaPontoListQueryFilter;
}
