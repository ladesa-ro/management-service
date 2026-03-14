import { EntityQueryResult } from "@/domain/abstractions";
import { NivelFormacaoFindOneQueryResult } from "@/modules/ensino/nivel-formacao";
import { OfertaFormacaoFindOneQueryResult } from "@/modules/ensino/oferta-formacao";

export class OfertaFormacaoNivelFormacaoFindOneQueryResult extends EntityQueryResult {
  nivelFormacao!: NivelFormacaoFindOneQueryResult;
  ofertaFormacao!: OfertaFormacaoFindOneQueryResult;
}
