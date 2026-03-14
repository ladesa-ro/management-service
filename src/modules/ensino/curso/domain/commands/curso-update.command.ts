import { CampusInputRef } from "@/modules/ambientes/campus";
import { ImagemInputRef } from "@/modules/armazenamento/imagem";
import { OfertaFormacaoInputRef } from "@/modules/ensino/oferta-formacao";

export class CursoUpdateCommand {
  nome?: string;
  nomeAbreviado?: string;
  campus?: CampusInputRef;
  ofertaFormacao?: OfertaFormacaoInputRef;
  imagemCapa?: ImagemInputRef | null;
}
