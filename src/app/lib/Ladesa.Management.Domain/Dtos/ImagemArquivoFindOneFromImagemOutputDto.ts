import { ArquivoFindOneOutputDto } from "./ArquivoFindOneOutputDto";

export class ImagemArquivoFindOneFromImagemOutputDto {
  id!: string;
  largura!: number | null;
  altura!: number | null;
  formato!: string | null;
  mimeType!: string | null;
  arquivo!: ArquivoFindOneOutputDto;
}
