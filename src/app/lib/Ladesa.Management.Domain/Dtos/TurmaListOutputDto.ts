import { PaginationResultDto } from "@/Ladesa.Management.Domain/Abstractions/Dtos/PaginationResultDto";
import { TurmaFindOneOutputDto } from "./TurmaFindOneOutputDto";

export class TurmaListOutputDto extends PaginationResultDto<TurmaFindOneOutputDto> {}
