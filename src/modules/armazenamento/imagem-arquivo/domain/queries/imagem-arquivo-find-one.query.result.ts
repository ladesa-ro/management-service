import { EntityQueryResult } from "@/domain/abstractions";
import { ArquivoFindOneQueryResult } from "@/modules/armazenamento/arquivo";
import { ImagemFindOneQueryResult } from "@/modules/armazenamento/imagem";

export class ImagemArquivoFindOneQueryResult extends EntityQueryResult {
  largura!: number;
  altura!: number;
  formato!: string;
  mimeType!: string;
  imagem!: ImagemFindOneQueryResult;
  arquivo!: ArquivoFindOneQueryResult;
}
