import { PaginationResultDto } from "@/Ladesa.Management.Domain/Abstractions/Dtos/PaginationResultDto";
import { BlocoFindOneOutputDto } from "./BlocoFindOneOutputDto";

export class BlocoListOutputDto extends PaginationResultDto<BlocoFindOneOutputDto> {}
