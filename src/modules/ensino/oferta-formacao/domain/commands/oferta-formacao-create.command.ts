import { ModalidadeInputRef } from "@/modules/ensino/modalidade";
import type { DuracaoPeriodo } from "../duracao-periodo";
import { OfertaFormacaoFields } from "../oferta-formacao.fields";

export const OfertaFormacaoCreateCommandFields = {
  nome: OfertaFormacaoFields.nome,
  slug: OfertaFormacaoFields.slug,
  duracaoPeriodo: OfertaFormacaoFields.duracaoPeriodo,
  modalidade: OfertaFormacaoFields.modalidade,
};

export class OfertaFormacaoCreateCommand {
  nome!: string;
  slug!: string;
  duracaoPeriodo?: DuracaoPeriodo | null;
  modalidade!: ModalidadeInputRef;
}
