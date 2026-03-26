import {
  createFieldMetadata,
  type IFilterAcceptableValues,
  PaginationQuery,
  SharedListFields,
} from "@/domain/abstractions";

export const UsuarioListQueryFields = {
  ...SharedListFields,
  filterVinculosCargo: createFieldMetadata({
    description: "Filtro por nome do cargo do vinculo (ex: professor)",
    nullable: true,
  }),
};

export class UsuarioListQuery extends PaginationQuery {
  "filter.id"?: IFilterAcceptableValues;
  "filter.vinculos.cargo.nome"?: IFilterAcceptableValues;
}
