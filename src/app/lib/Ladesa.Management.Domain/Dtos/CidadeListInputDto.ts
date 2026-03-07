import type { IFilterAcceptableValues } from "@/Ladesa.Management.Domain/Abstractions/Dtos/IFilterAcceptableValues";
import { PaginationInputDto } from "@/Ladesa.Management.Domain/Abstractions/Dtos/PaginationInputDto";

export class CidadeListInputDto extends PaginationInputDto {
  "filter.id"?: IFilterAcceptableValues;
  "filter.estado.id"?: IFilterAcceptableValues;
  "filter.estado.nome"?: IFilterAcceptableValues;
  "filter.estado.sigla"?: IFilterAcceptableValues;
}
