import type { ModalidadeInputRefDto } from "./ModalidadeInputRefDto";

export class OfertaFormacaoCreateInputDto {
  nome!: string;
  slug!: string;
  modalidade!: ModalidadeInputRefDto;
}
