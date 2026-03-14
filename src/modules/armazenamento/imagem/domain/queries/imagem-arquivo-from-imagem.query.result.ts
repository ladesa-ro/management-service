import { ArquivoFindOneQueryResult } from "@/modules/armazenamento/arquivo";

export class ImagemArquivoFindOneFromImagemQueryResult {
  id!: string;
  largura!: number | null;
  altura!: number | null;
  formato!: string | null;
  mimeType!: string | null;
  arquivo!: ArquivoFindOneQueryResult;
}
