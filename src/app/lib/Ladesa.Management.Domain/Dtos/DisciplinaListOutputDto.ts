import { PaginationResultDto } from "@/Ladesa.Management.Domain/Abstractions/Dtos/PaginationResultDto";
import { DisciplinaFindOneOutputDto } from "./DisciplinaFindOneOutputDto";

export class DisciplinaListOutputDto extends PaginationResultDto<DisciplinaFindOneOutputDto> {}
