import { PaginationResultDto } from "@/Ladesa.Management.Domain/Abstractions/Dtos/PaginationResultDto";
import { ImagemFindOneOutputDto } from "./ImagemFindOneOutputDto";

export class ImagemListOutputDto extends PaginationResultDto<ImagemFindOneOutputDto> {}
