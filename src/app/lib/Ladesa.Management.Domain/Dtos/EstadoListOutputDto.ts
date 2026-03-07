import { PaginationResultDto } from "@/Ladesa.Management.Domain/Abstractions/Dtos/PaginationResultDto";
import { EstadoFindOneOutputDto } from "./EstadoFindOneOutputDto";

export class EstadoListOutputDto extends PaginationResultDto<EstadoFindOneOutputDto> {}
