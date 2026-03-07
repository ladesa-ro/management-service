import { PaginationResultDto } from "@/Ladesa.Management.Domain/Abstractions/Dtos/PaginationResultDto";
import { ReservaFindOneOutputDto } from "./ReservaFindOneOutputDto";

export class ReservaListOutputDto extends PaginationResultDto<ReservaFindOneOutputDto> {}
