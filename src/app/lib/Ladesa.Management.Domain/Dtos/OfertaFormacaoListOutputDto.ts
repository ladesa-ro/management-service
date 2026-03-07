import { PaginationResultDto } from "@/Ladesa.Management.Domain/Abstractions/Dtos/PaginationResultDto";
import { OfertaFormacaoFindOneOutputDto } from "./OfertaFormacaoFindOneOutputDto";

export class OfertaFormacaoListOutputDto extends PaginationResultDto<OfertaFormacaoFindOneOutputDto> {}
