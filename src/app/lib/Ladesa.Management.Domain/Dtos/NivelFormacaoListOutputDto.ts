import { PaginationResultDto } from "@/Ladesa.Management.Domain/Abstractions/Dtos/PaginationResultDto";
import { NivelFormacaoFindOneOutputDto } from "./NivelFormacaoFindOneOutputDto";

export class NivelFormacaoListOutputDto extends PaginationResultDto<NivelFormacaoFindOneOutputDto> {}
