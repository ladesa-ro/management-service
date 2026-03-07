import { PaginationResultDto } from "@/Ladesa.Management.Domain/Abstractions/Dtos/PaginationResultDto";
import { AmbienteFindOneOutputDto } from "./AmbienteFindOneOutputDto";

export class AmbienteListOutputDto extends PaginationResultDto<AmbienteFindOneOutputDto> {}
