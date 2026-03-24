import { CampusInputRef } from "@/modules/ambientes/campus";
import { ModalidadeInputRef } from "@/modules/ensino/modalidade";
import { NivelFormacaoInputRef } from "@/modules/ensino/nivel-formacao";
import type { IOfertaFormacaoPeriodo } from "../oferta-formacao";
import { OfertaFormacaoFields } from "../oferta-formacao.fields";

export const OfertaFormacaoUpdateCommandFields = {
  nome: OfertaFormacaoFields.nome,
  slug: OfertaFormacaoFields.slug,
  duracaoPeriodoEmMeses: OfertaFormacaoFields.duracaoPeriodoEmMeses,
  modalidade: OfertaFormacaoFields.modalidade,
  campus: OfertaFormacaoFields.campus,
  niveisFormacoes: OfertaFormacaoFields.niveisFormacoes,
  periodos: OfertaFormacaoFields.periodos,
};

export class OfertaFormacaoUpdateCommand {
  nome?: string;
  slug?: string;
  duracaoPeriodoEmMeses?: number;
  modalidade?: ModalidadeInputRef;
  campus?: CampusInputRef;
  niveisFormacoes?: NivelFormacaoInputRef[];
  periodos?: IOfertaFormacaoPeriodo[];
}
