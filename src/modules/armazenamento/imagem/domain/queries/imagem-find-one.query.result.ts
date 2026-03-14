import { EntityQueryResult } from "@/domain/abstractions";
import { ImagemArquivoFindOneFromImagemQueryResult } from "./imagem-arquivo-from-imagem.query.result";

export class ImagemFindOneQueryResult extends EntityQueryResult {
  descricao!: string | null;
  versoes!: ImagemArquivoFindOneFromImagemQueryResult[];
}
