import { PaginationResultDto } from "@/Ladesa.Management.Domain/Abstractions/Dtos/PaginationResultDto";
import { DiaCalendarioFindOneOutputDto } from "./DiaCalendarioFindOneOutputDto";

export class DiaCalendarioListOutputDto extends PaginationResultDto<DiaCalendarioFindOneOutputDto> {}
