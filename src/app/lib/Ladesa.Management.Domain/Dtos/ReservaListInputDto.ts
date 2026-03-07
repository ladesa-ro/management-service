import type { IFilterAcceptableValues } from "@/Ladesa.Management.Domain/Abstractions/Dtos/IFilterAcceptableValues";
import { PaginationInputDto } from "@/Ladesa.Management.Domain/Abstractions/Dtos/PaginationInputDto";

export class ReservaListInputDto extends PaginationInputDto {
  "filter.id"?: IFilterAcceptableValues;
  "filter.situacao"?: IFilterAcceptableValues;
  "filter.tipo"?: IFilterAcceptableValues;
  "filter.ambiente.id"?: IFilterAcceptableValues;
  "filter.ambiente.bloco.id"?: IFilterAcceptableValues;
  "filter.ambiente.bloco.campus.id"?: IFilterAcceptableValues;
  "filter.usuario.id"?: IFilterAcceptableValues;
}
