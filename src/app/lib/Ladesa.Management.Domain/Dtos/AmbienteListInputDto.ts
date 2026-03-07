import type { IFilterAcceptableValues } from "@/Ladesa.Management.Domain/Abstractions/Dtos/IFilterAcceptableValues";
import { PaginationInputDto } from "@/Ladesa.Management.Domain/Abstractions/Dtos/PaginationInputDto";

export class AmbienteListInputDto extends PaginationInputDto {
  "filter.id"?: IFilterAcceptableValues;
  "filter.bloco.id"?: IFilterAcceptableValues;
  "filter.bloco.campus.id"?: IFilterAcceptableValues;
}
