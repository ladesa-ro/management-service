import { EntityOutputDto } from "@/Ladesa.Management.Domain/Abstractions/Dtos/EntityOutputDto";
import { ImagemArquivoFindOneFromImagemOutputDto } from "./ImagemArquivoFindOneFromImagemOutputDto";

export class ImagemFindOneOutputDto extends EntityOutputDto {
  descricao!: string | null;
  versoes!: ImagemArquivoFindOneFromImagemOutputDto[];
}
