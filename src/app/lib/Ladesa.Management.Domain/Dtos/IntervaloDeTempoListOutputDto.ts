import { PaginationResultDto } from "@/Ladesa.Management.Domain/Abstractions/Dtos/PaginationResultDto";
import { IntervaloDeTempoFindOneOutputDto } from "./IntervaloDeTempoFindOneOutputDto";

export class IntervaloDeTempoListOutputDto extends PaginationResultDto<IntervaloDeTempoFindOneOutputDto> {}
