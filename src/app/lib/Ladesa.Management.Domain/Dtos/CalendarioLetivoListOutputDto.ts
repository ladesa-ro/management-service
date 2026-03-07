import { PaginationResultDto } from "@/Ladesa.Management.Domain/Abstractions/Dtos/PaginationResultDto";
import { CalendarioLetivoFindOneOutputDto } from "./CalendarioLetivoFindOneOutputDto";

export class CalendarioLetivoListOutputDto extends PaginationResultDto<CalendarioLetivoFindOneOutputDto> {}
