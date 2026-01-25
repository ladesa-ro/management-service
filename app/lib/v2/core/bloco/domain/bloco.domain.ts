import { Campus } from "../../campus/domain/campus.domain";
import { Imagem } from "../../imagem/domain/imagem.domain";

export class Bloco {
  id!: string;
  nome!: string;
  codigo!: string;
  campus!: Campus;
  imagemCapa!: Imagem | null;
  dateCreated!: Date;
  dateUpdated!: Date;
  dateDeleted!: Date | null;
}
