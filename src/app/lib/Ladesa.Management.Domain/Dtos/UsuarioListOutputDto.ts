import { PaginationResultDto } from "@/Ladesa.Management.Domain/Abstractions/Dtos/PaginationResultDto";
import { UsuarioFindOneOutputDto } from "./UsuarioFindOneOutputDto";

export class UsuarioListOutputDto extends PaginationResultDto<UsuarioFindOneOutputDto> {}
