import { PaginationResultDto } from "@/Ladesa.Management.Domain/Abstractions/Dtos/PaginationResultDto";
import { DisponibilidadeFindOneOutputDto } from "./DisponibilidadeFindOneOutputDto";

export class DisponibilidadeListOutputDto extends PaginationResultDto<DisponibilidadeFindOneOutputDto> {}
