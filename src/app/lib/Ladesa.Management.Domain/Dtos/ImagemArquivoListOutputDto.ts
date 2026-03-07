import { PaginationResultDto } from "@/Ladesa.Management.Domain/Abstractions/Dtos/PaginationResultDto";
import { ImagemArquivoFindOneOutputDto } from "./ImagemArquivoFindOneOutputDto";

export class ImagemArquivoListOutputDto extends PaginationResultDto<ImagemArquivoFindOneOutputDto> {}
