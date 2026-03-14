import { EntityQueryResult } from "@/domain/abstractions";
import { ModalidadeFindOneQueryResult } from "@/modules/ensino/modalidade";

export class OfertaFormacaoFindOneQueryResult extends EntityQueryResult {
  nome!: string;
  slug!: string;
  modalidade!: ModalidadeFindOneQueryResult;
}
