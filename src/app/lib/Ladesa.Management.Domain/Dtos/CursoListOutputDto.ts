import { PaginationResultDto } from "@/Ladesa.Management.Domain/Abstractions/Dtos/PaginationResultDto";
import { CursoFindOneOutputDto } from "./CursoFindOneOutputDto";

export class CursoListOutputDto extends PaginationResultDto<CursoFindOneOutputDto> {}
