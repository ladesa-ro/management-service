import { Campus } from "../../campus/domain/campus.domain";
import { Imagem } from "../../imagem/domain/imagem.domain";
import { OfertaFormacao } from "../../oferta-formacao/domain/oferta-formacao.domain";

export class Curso {
  id!: string;
  nome!: string;
  nomeAbreviado!: string;
  campus!: Campus;
  ofertaFormacao!: OfertaFormacao;
  imagemCapa!: Imagem | null;
  dateCreated!: Date;
  dateUpdated!: Date;
  dateDeleted!: Date | null;
}
