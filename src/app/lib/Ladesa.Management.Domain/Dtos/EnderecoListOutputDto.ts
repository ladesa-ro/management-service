import { PaginationResultDto } from "@/Ladesa.Management.Domain/Abstractions/Dtos/PaginationResultDto";
import { EnderecoFindOneOutputDto } from "./EnderecoFindOneOutputDto";

export class EnderecoListOutputDto extends PaginationResultDto<EnderecoFindOneOutputDto> {}
