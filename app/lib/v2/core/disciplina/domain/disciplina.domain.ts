import { Imagem } from "../../imagem/domain/imagem.domain";

export class Disciplina {
  id!: string;
  nome!: string;
  nomeAbreviado!: string;
  cargaHoraria!: number;
  imagemCapa!: Imagem | null;
  dateCreated!: Date;
  dateUpdated!: Date;
  dateDeleted!: Date | null;
}
