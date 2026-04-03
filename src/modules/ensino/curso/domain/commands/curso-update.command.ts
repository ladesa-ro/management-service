import { CampusInputRef } from "@/modules/ambientes/campus";
import { ImagemInputRef } from "@/modules/armazenamento/imagem";
import { OfertaFormacaoInputRef } from "@/modules/ensino/oferta-formacao";
import { CursoFields } from "../curso.fields";

export const CursoUpdateCommandFields = {
  nome: CursoFields.nome,
  nomeAbreviado: CursoFields.nomeAbreviado,
  quantidadePeriodos: CursoFields.quantidadePeriodos,
  campus: CursoFields.campus,
  ofertaFormacao: CursoFields.ofertaFormacao,
};

export class CursoUpdateCommand {
  nome?: string;
  nomeAbreviado?: string;
  quantidadePeriodos?: number;
  campus?: CampusInputRef;
  ofertaFormacao?: OfertaFormacaoInputRef;
  imagemCapa?: ImagemInputRef | null;
}
