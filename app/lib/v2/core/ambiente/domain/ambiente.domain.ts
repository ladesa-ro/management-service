import { Bloco } from "../../bloco/domain/bloco.domain";
import { Imagem } from "../../imagem/domain/imagem.domain";

export class Ambiente {
  id!: string;
  nome!: string;
  descricao!: string | null;
  codigo!: string;
  capacidade!: number | null;
  tipo!: string | null;
  bloco!: Bloco;
  imagemCapa!: Imagem | null;
  dateCreated!: Date;
  dateUpdated!: Date;
  dateDeleted!: Date | null;
}
