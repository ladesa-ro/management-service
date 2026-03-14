import { EntityQueryResult } from "@/domain/abstractions";
import { CampusFindOneQueryResult } from "@/modules/ambientes/campus";
import { OfertaFormacaoFindOneQueryResult } from "@/modules/ensino/oferta-formacao";

export class CalendarioLetivoFindOneQueryResult extends EntityQueryResult {
  nome!: string;
  ano!: number;
  campus!: CampusFindOneQueryResult;
  ofertaFormacao!: OfertaFormacaoFindOneQueryResult;
}
