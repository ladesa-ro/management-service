import { CampusInputRef } from "@/modules/ambientes/campus";
import { ImagemInputRef } from "@/modules/armazenamento/imagem";
import { OfertaFormacaoInputRef } from "@/modules/ensino/oferta-formacao";
import { CursoFields } from "../curso.fields";

export const CursoUpdateCommandFields = {
  nome: CursoFields.nome,
  nomeAbreviado: CursoFields.nomeAbreviado,
  campus: CursoFields.campus,
  ofertaFormacao: CursoFields.ofertaFormacao,
};

export class CursoUpdateCommand {
  nome?: string;
  nomeAbreviado?: string;
  campus?: CampusInputRef;
  ofertaFormacao?: OfertaFormacaoInputRef;
  imagemCapa?: ImagemInputRef | null;
}
