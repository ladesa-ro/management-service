import { EntityQueryResult, SharedFields } from "@/domain/abstractions";
import { CampusFindOneQueryResult } from "@/modules/ambientes/campus";
import { OfertaFormacaoFindOneQueryResult } from "@/modules/ensino/oferta-formacao";
import { CalendarioLetivoFields } from "../calendario-letivo.fields";

export const CalendarioLetivoFindOneQueryResultFields = {
  id: SharedFields.idUuid,
  ...CalendarioLetivoFields,
};

export interface CalendarioLetivoEtapaQueryResult {
  id: string;
  identificadorExterno: string;
  version: number;
  ofertaFormacaoPeriodoEtapaId: string;
  nome: string;
  cor: string;
  ordem: number;
  numeroPeriodo: number;
  dataInicio: string;
  dataTermino: string;
}

export class CalendarioLetivoFindOneQueryResult extends EntityQueryResult {
  nome!: string;
  ano!: number;
  campus!: CampusFindOneQueryResult;
  ofertaFormacao!: OfertaFormacaoFindOneQueryResult;
  situacao!: string;
  etapas!: CalendarioLetivoEtapaQueryResult[];
}
