import { PaginationResultDto } from "@/Ladesa.Management.Domain/Abstractions/Dtos/PaginationResultDto";
import { HorarioGeradoAulaFindOneOutputDto } from "./HorarioGeradoAulaFindOneOutputDto";

export class HorarioGeradoAulaListOutputDto extends PaginationResultDto<HorarioGeradoAulaFindOneOutputDto> {}
