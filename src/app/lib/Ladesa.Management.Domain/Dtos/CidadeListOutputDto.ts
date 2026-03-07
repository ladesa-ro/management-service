import { PaginationResultDto } from "@/Ladesa.Management.Domain/Abstractions/Dtos/PaginationResultDto";
import { CidadeFindOneOutputDto } from "./CidadeFindOneOutputDto";

export class CidadeListOutputDto extends PaginationResultDto<CidadeFindOneOutputDto> {}
