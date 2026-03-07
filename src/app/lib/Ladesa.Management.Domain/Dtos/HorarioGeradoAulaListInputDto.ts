import type { IFilterAcceptableValues } from "@/Ladesa.Management.Domain/Abstractions/Dtos/IFilterAcceptableValues";
import { PaginationInputDto } from "@/Ladesa.Management.Domain/Abstractions/Dtos/PaginationInputDto";

export class HorarioGeradoAulaListInputDto extends PaginationInputDto {
  "filter.id"?: IFilterAcceptableValues;
  "filter.horarioGerado.id"?: IFilterAcceptableValues;
}
