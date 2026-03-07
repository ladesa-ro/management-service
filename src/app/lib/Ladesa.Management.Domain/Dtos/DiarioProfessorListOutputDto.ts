import { PaginationResultDto } from "@/Ladesa.Management.Domain/Abstractions/Dtos/PaginationResultDto";
import { DiarioProfessorFindOneOutputDto } from "./DiarioProfessorFindOneOutputDto";

export class DiarioProfessorListOutputDto extends PaginationResultDto<DiarioProfessorFindOneOutputDto> {}
