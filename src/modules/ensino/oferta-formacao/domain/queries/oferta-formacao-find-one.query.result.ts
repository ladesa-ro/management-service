import { EntityQueryResult } from "@/domain/abstractions";
import { ModalidadeFindOneQueryResult } from "@/modules/ensino/modalidade";
import type { DuracaoPeriodo } from "../../infrastructure.database/typeorm/oferta-formacao.typeorm.entity";

export class OfertaFormacaoFindOneQueryResult extends EntityQueryResult {
  nome!: string;
  slug!: string;
  duracaoPeriodo!: DuracaoPeriodo | null;
  modalidade!: ModalidadeFindOneQueryResult;
}
