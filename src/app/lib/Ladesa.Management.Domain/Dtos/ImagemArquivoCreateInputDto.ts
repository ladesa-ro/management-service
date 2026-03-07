import type { ArquivoInputRefDto } from "./ArquivoInputRefDto";
import type { ImagemInputRefDto } from "./ImagemInputRefDto";

export class ImagemArquivoCreateInputDto {
  largura!: number;
  altura!: number;
  formato!: string;
  mimeType!: string;
  imagem!: ImagemInputRefDto;
  arquivo!: ArquivoInputRefDto;
}
