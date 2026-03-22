import {
  createFieldMetadata,
  type IFilterAcceptableValues,
  PaginationQuery,
  SharedListFields,
} from "@/domain/abstractions";

export const AmbienteListQueryFields = {
  ...SharedListFields,
  filterBlocoId: createFieldMetadata({ description: "Filtro por ID do Bloco", nullable: true }),
  filterBlocoCampusId: createFieldMetadata({
    description: "Filtro por ID do Campus do Bloco",
    nullable: true,
  }),
};

export class AmbienteListQuery extends PaginationQuery {
  "filter.id"?: IFilterAcceptableValues;
  "filter.bloco.id"?: IFilterAcceptableValues;
  "filter.bloco.campus.id"?: IFilterAcceptableValues;
}
