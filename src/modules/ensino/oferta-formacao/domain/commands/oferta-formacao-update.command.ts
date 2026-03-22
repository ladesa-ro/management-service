import { ModalidadeInputRef } from "@/modules/ensino/modalidade";
import type { DuracaoPeriodo } from "../../infrastructure.database/typeorm/oferta-formacao.typeorm.entity";
import { OfertaFormacaoFields } from "../oferta-formacao.fields";

export const OfertaFormacaoUpdateCommandFields = {
  nome: OfertaFormacaoFields.nome,
  slug: OfertaFormacaoFields.slug,
  duracaoPeriodo: OfertaFormacaoFields.duracaoPeriodo,
  modalidade: OfertaFormacaoFields.modalidade,
};

export class OfertaFormacaoUpdateCommand {
  nome?: string;
  slug?: string;
  duracaoPeriodo?: DuracaoPeriodo | null;
  modalidade?: ModalidadeInputRef;
}
