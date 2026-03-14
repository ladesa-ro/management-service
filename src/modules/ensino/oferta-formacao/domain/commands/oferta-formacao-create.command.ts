import { ModalidadeInputRef } from "@/modules/ensino/modalidade";

export class OfertaFormacaoCreateCommand {
  nome!: string;
  slug!: string;
  modalidade!: ModalidadeInputRef;
}
