import { Arquivo } from "../../arquivo/domain/arquivo.domain";
import { Imagem } from "../../imagem/domain/imagem.domain";

export class ImagemArquivo {
  id!: string;
  largura!: number;
  altura!: number;
  formato!: string;
  mimeType!: string;
  imagem!: Imagem;
  arquivo!: Arquivo;
  dateCreated!: Date;
  dateUpdated!: Date;
  dateDeleted!: Date | null;
}
