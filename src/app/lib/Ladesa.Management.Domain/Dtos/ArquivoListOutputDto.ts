import { PaginationResultDto } from "@/Ladesa.Management.Domain/Abstractions/Dtos/PaginationResultDto";
import { ArquivoFindOneOutputDto } from "./ArquivoFindOneOutputDto";

export class ArquivoListOutputDto extends PaginationResultDto<ArquivoFindOneOutputDto> {}
