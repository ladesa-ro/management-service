import { PaginationResultDto } from "@/Ladesa.Management.Domain/Abstractions/Dtos/PaginationResultDto";
import { CampusFindOneOutputDto } from "./CampusFindOneOutputDto";

export class CampusListOutputDto extends PaginationResultDto<CampusFindOneOutputDto> {}
