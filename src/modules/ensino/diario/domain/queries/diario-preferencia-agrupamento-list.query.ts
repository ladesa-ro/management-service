import {
  createFieldMetadata,
  type IFilterAcceptableValues,
  PaginationQuery,
  SharedListFields,
} from "@/domain/abstractions";

export const DiarioPreferenciaAgrupamentoListQueryFields = {
  ...SharedListFields,
  filterDiarioId: createFieldMetadata({ description: "Filtro por ID do Diario", nullable: true }),
};

export class DiarioPreferenciaAgrupamentoListQuery extends PaginationQuery {
  "filter.id"?: IFilterAcceptableValues;
  "filter.diario.id"?: IFilterAcceptableValues;
}
