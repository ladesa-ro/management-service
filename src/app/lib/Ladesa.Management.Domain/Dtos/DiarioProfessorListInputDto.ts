import type { IFilterAcceptableValues } from "@/Ladesa.Management.Domain/Abstractions/Dtos/IFilterAcceptableValues";
import { PaginationInputDto } from "@/Ladesa.Management.Domain/Abstractions/Dtos/PaginationInputDto";

export class DiarioProfessorListInputDto extends PaginationInputDto {
  "filter.id"?: IFilterAcceptableValues;
  "filter.diario.id"?: IFilterAcceptableValues;
  "filter.perfil.id"?: IFilterAcceptableValues;
  "filter.perfil.usuario.id"?: IFilterAcceptableValues;
}
