import type { IFilterAcceptableValues } from "@/Ladesa.Management.Domain/Abstractions/Dtos/IFilterAcceptableValues";
import { PaginationInputDto } from "@/Ladesa.Management.Domain/Abstractions/Dtos/PaginationInputDto";

export class DiarioListInputDto extends PaginationInputDto {
  "filter.id"?: IFilterAcceptableValues;
  "filter.turma.id"?: IFilterAcceptableValues;
  "filter.disciplina.id"?: IFilterAcceptableValues;
  "filter.calendarioLetivo.id"?: IFilterAcceptableValues;
}
