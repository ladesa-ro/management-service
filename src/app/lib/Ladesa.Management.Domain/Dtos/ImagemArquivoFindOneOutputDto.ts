import { EntityOutputDto } from "@/Ladesa.Management.Domain/Abstractions/Dtos/EntityOutputDto";
import { ArquivoFindOneOutputDto } from "./ArquivoFindOneOutputDto";
import { ImagemFindOneOutputDto } from "./ImagemFindOneOutputDto";

export class ImagemArquivoFindOneOutputDto extends EntityOutputDto {
  largura!: number;
  altura!: number;
  formato!: string;
  mimeType!: string;
  imagem!: ImagemFindOneOutputDto;
  arquivo!: ArquivoFindOneOutputDto;
}
