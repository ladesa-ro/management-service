import { type IFilterAcceptableValues, PaginationQuery } from "@/domain/abstractions";

export class EmpresaListQuery extends PaginationQuery {
  "filter.id"?: IFilterAcceptableValues;
  "filter.cnpj"?: IFilterAcceptableValues;
  "filter.nomeFantasia"?: IFilterAcceptableValues;
  "filter.idEnderecoFk"?: IFilterAcceptableValues;
}
