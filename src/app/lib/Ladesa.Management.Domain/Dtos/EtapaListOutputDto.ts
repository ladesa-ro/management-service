import { PaginationResultDto } from "@/Ladesa.Management.Domain/Abstractions/Dtos/PaginationResultDto";
import { EtapaFindOneOutputDto } from "./EtapaFindOneOutputDto";

export class EtapaListOutputDto extends PaginationResultDto<EtapaFindOneOutputDto> {}
