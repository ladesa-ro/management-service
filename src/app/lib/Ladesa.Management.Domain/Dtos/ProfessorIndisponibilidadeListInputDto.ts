import type { IFilterAcceptableValues } from "@/Ladesa.Management.Domain/Abstractions/Dtos/IFilterAcceptableValues";
import { PaginationInputDto } from "@/Ladesa.Management.Domain/Abstractions/Dtos/PaginationInputDto";

export class ProfessorIndisponibilidadeListInputDto extends PaginationInputDto {
  "filter.id"?: IFilterAcceptableValues;
  "filter.perfil.id"?: IFilterAcceptableValues;
}
