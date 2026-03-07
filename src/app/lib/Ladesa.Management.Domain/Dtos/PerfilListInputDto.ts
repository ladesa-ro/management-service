import type { IFilterAcceptableValues } from "@/Ladesa.Management.Domain/Abstractions/Dtos/IFilterAcceptableValues";
import { PaginationInputDto } from "@/Ladesa.Management.Domain/Abstractions/Dtos/PaginationInputDto";

export class PerfilListInputDto extends PaginationInputDto {
  "filter.id"?: IFilterAcceptableValues;
  "filter.ativo"?: IFilterAcceptableValues;
  "filter.cargo"?: IFilterAcceptableValues;
  "filter.campus.id"?: IFilterAcceptableValues;
  "filter.usuario.id"?: IFilterAcceptableValues;
}
