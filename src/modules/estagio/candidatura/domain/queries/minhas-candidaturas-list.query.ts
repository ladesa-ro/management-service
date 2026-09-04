import { createFieldMetadata, PaginationQuery, SharedListFields } from "@/domain/abstractions";

export const MinhasCandidaturasListQueryFields = {
  ...SharedListFields,
  filterSituacao: createFieldMetadata({
    description: "Filtro por situação da candidatura (ex: PENDING, OFFERED, ACCEPTED)",
    nullable: true,
  }),
};

export class MinhasCandidaturasListQuery extends PaginationQuery {
  "filter.situacao"?: string;
}
