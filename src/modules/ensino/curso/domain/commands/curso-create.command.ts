import { CampusInputRef } from "@/modules/ambientes/campus";
import { ImagemInputRef } from "@/modules/armazenamento/imagem";
import { OfertaFormacaoInputRef } from "@/modules/ensino/oferta-formacao";
import { CursoFields } from "../curso.fields";

export const CursoCreateCommandFields = {
  nome: CursoFields.nome,
  nomeAbreviado: CursoFields.nomeAbreviado,
  campus: CursoFields.campus,
  ofertaFormacao: CursoFields.ofertaFormacao,
};

export class CursoCreateCommand {
  nome!: string;
  nomeAbreviado!: string;
  campus!: CampusInputRef;
  ofertaFormacao!: OfertaFormacaoInputRef;
  imagemCapa?: ImagemInputRef | null;
}
