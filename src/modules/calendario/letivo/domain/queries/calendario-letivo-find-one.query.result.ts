import { EntityQueryResult, SharedFields } from "@/domain/abstractions";
import { CampusFindOneQueryResult } from "@/modules/ambientes/campus";
import { OfertaFormacaoFindOneQueryResult } from "@/modules/ensino/oferta-formacao";
import { CalendarioLetivoFields } from "../calendario-letivo.fields";

export const CalendarioLetivoFindOneQueryResultFields = {
  id: SharedFields.idUuid,
  ...CalendarioLetivoFields,
};

export class CalendarioLetivoFindOneQueryResult extends EntityQueryResult {
  nome!: string;
  ano!: number;
  campus!: CampusFindOneQueryResult;
  ofertaFormacao!: OfertaFormacaoFindOneQueryResult;
  situacao!: string;
}
