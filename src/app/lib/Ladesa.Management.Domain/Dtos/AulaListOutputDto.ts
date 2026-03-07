import { PaginationResultDto } from "@/Ladesa.Management.Domain/Abstractions/Dtos/PaginationResultDto";
import { AulaFindOneOutputDto } from "./AulaFindOneOutputDto";

export class AulaListOutputDto extends PaginationResultDto<AulaFindOneOutputDto> {}
