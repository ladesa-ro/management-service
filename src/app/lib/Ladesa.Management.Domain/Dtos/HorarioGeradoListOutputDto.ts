import { PaginationResultDto } from "@/Ladesa.Management.Domain/Abstractions/Dtos/PaginationResultDto";
import { HorarioGeradoFindOneOutputDto } from "./HorarioGeradoFindOneOutputDto";

export class HorarioGeradoListOutputDto extends PaginationResultDto<HorarioGeradoFindOneOutputDto> {}
