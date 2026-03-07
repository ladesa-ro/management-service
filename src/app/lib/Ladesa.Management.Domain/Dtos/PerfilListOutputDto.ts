import { PaginationResultDto } from "@/Ladesa.Management.Domain/Abstractions/Dtos/PaginationResultDto";
import { PerfilFindOneOutputDto } from "./PerfilFindOneOutputDto";

export class PerfilListOutputDto extends PaginationResultDto<PerfilFindOneOutputDto> {}
