import { ArquivoInputRef } from "@/modules/armazenamento/arquivo";
import { ImagemInputRef } from "@/modules/armazenamento/imagem";

export class ImagemArquivoCreateCommand {
  largura!: number;
  altura!: number;
  formato!: string;
  mimeType!: string;
  imagem!: ImagemInputRef;
  arquivo!: ArquivoInputRef;
}
