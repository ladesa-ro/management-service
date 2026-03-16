import { ModalidadeInputRef } from "@/modules/ensino/modalidade";
import type { DuracaoPeriodo } from "../../infrastructure.database/typeorm/oferta-formacao.typeorm.entity";

export class OfertaFormacaoUpdateCommand {
  nome?: string;
  slug?: string;
  duracaoPeriodo?: DuracaoPeriodo | null;
  modalidade?: ModalidadeInputRef;
}
