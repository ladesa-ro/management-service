import { PaginationResultDto } from "@/Ladesa.Management.Domain/Abstractions/Dtos/PaginationResultDto";
import { TurmaDisponibilidadeFindOneOutputDto } from "./TurmaDisponibilidadeFindOneOutputDto";

export class TurmaDisponibilidadeListOutputDto extends PaginationResultDto<TurmaDisponibilidadeFindOneOutputDto> {}
