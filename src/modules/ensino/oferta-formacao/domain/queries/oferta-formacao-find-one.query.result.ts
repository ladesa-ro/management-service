import { EntityQueryResult, SharedFields } from "@/domain/abstractions";
import { CampusFindOneQueryResult } from "@/modules/ambientes/campus";
import { ModalidadeFindOneQueryResult } from "@/modules/ensino/modalidade";
import { NivelFormacaoFindOneQueryResult } from "@/modules/ensino/nivel-formacao";
import { OfertaFormacaoFields } from "../oferta-formacao.fields";

export const OfertaFormacaoFindOneQueryResultFields = {
  id: SharedFields.idUuid,
  ...OfertaFormacaoFields,
};

export type IOfertaFormacaoPeriodoEtapaQueryResult = {
  id: string;
  nome: string;
  cor: string;
};

export type IOfertaFormacaoPeriodoQueryResult = {
  id: string;
  numeroPeriodo: number;
  etapas: IOfertaFormacaoPeriodoEtapaQueryResult[];
};

export class OfertaFormacaoFindOneQueryResult extends EntityQueryResult {
  nome!: string;
  slug!: string;
  duracaoPeriodoEmMeses!: number;
  modalidade!: ModalidadeFindOneQueryResult;
  campus!: CampusFindOneQueryResult;
  niveisFormacoes!: NivelFormacaoFindOneQueryResult[];
  periodos!: IOfertaFormacaoPeriodoQueryResult[];
}
