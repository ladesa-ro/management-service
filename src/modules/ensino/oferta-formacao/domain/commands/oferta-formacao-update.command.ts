import { ModalidadeInputRef } from "@/modules/ensino/modalidade";
import { OfertaFormacaoFields } from "../oferta-formacao.fields";

export const OfertaFormacaoUpdateCommandFields = {
  nome: OfertaFormacaoFields.nome,
  slug: OfertaFormacaoFields.slug,
  duracaoPeriodoEmMeses: OfertaFormacaoFields.duracaoPeriodoEmMeses,
  modalidade: OfertaFormacaoFields.modalidade,
};

export class OfertaFormacaoUpdateCommand {
  nome?: string;
  slug?: string;
  duracaoPeriodoEmMeses?: number | null;
  modalidade?: ModalidadeInputRef;
}
