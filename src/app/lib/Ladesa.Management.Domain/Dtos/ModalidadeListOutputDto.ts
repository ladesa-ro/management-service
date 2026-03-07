import { PaginationResultDto } from "@/Ladesa.Management.Domain/Abstractions/Dtos/PaginationResultDto";
import { ModalidadeFindOneOutputDto } from "./ModalidadeFindOneOutputDto";

export class ModalidadeListOutputDto extends PaginationResultDto<ModalidadeFindOneOutputDto> {}
