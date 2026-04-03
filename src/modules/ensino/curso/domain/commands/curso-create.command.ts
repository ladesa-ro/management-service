import { CampusInputRef } from "@/modules/ambientes/campus";
import { ImagemInputRef } from "@/modules/armazenamento/imagem";
import { OfertaFormacaoInputRef } from "@/modules/ensino/oferta-formacao";
import { CursoFields } from "../curso.fields";
import { CursoPeriodoDisciplinaPeriodoFields } from "../curso-periodo-disciplina.fields";

export const CursoCreateCommandFields = {
  nome: CursoFields.nome,
  nomeAbreviado: CursoFields.nomeAbreviado,
  quantidadePeriodos: CursoFields.quantidadePeriodos,
  campus: CursoFields.campus,
  ofertaFormacao: CursoFields.ofertaFormacao,
  periodos: CursoPeriodoDisciplinaPeriodoFields.disciplinas,
};

export interface CursoPeriodoDisciplinaInput {
  disciplinaId: string;
  cargaHoraria?: number;
}

export interface CursoPeriodoInput {
  numeroPeriodo: number;
  disciplinas: CursoPeriodoDisciplinaInput[];
}

export class CursoCreateCommand {
  nome!: string;
  nomeAbreviado!: string;
  quantidadePeriodos!: number;
  campus!: CampusInputRef;
  ofertaFormacao!: OfertaFormacaoInputRef;
  imagemCapa?: ImagemInputRef | null;
  periodos?: CursoPeriodoInput[];
}
