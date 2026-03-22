import {
  createFieldMetadata,
  type IFilterAcceptableValues,
  PaginationQuery,
  SharedListFields,
} from "@/domain/abstractions";

export const EmpresaListQueryFields = {
  ...SharedListFields,
  filterCnpj: createFieldMetadata({ description: "Filtro por CNPJ", nullable: true }),
  filterNomeFantasia: createFieldMetadata({
    description: "Filtro por nome fantasia",
    nullable: true,
  }),
  filterEnderecoId: createFieldMetadata({
    description: "Filtro por ID de endereço",
    nullable: true,
  }),
};

export class EmpresaListQuery extends PaginationQuery {
  "filter.id"?: IFilterAcceptableValues;
  "filter.cnpj"?: IFilterAcceptableValues;
  "filter.nomeFantasia"?: IFilterAcceptableValues;
  "filter.endereco.id"?: IFilterAcceptableValues;
}
