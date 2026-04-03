import { EntityQueryResult, SharedFields } from "@/domain/abstractions";
import { CampusFindOneQueryResult } from "@/modules/ambientes/campus";
import { ImagemFindOneQueryResult } from "@/modules/armazenamento/imagem";
import { OfertaFormacaoFindOneQueryResult } from "@/modules/ensino/oferta-formacao";
import { CursoFields } from "../curso.fields";

export const CursoFindOneQueryResultFields = {
  id: SharedFields.idUuid,
  ...CursoFields,
};

export interface CursoPeriodoDisciplinaQueryResult {
  id: string;
  disciplinaId: string;
  disciplinaNome: string | null;
  cargaHoraria: number | null;
}

export interface CursoPeriodoQueryResult {
  numeroPeriodo: number;
  disciplinas: CursoPeriodoDisciplinaQueryResult[];
}

export class CursoFindOneQueryResult extends EntityQueryResult {
  nome!: string;
  nomeAbreviado!: string;
  quantidadePeriodos!: number;
  campus!: CampusFindOneQueryResult;
  ofertaFormacao!: OfertaFormacaoFindOneQueryResult;
  imagemCapa!: ImagemFindOneQueryResult | null;
  periodos!: CursoPeriodoQueryResult[];
}
