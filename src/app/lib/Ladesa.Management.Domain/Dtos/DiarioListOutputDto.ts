import { PaginationResultDto } from "@/Ladesa.Management.Domain/Abstractions/Dtos/PaginationResultDto";
import { DiarioFindOneOutputDto } from "./DiarioFindOneOutputDto";

export class DiarioListOutputDto extends PaginationResultDto<DiarioFindOneOutputDto> {}
