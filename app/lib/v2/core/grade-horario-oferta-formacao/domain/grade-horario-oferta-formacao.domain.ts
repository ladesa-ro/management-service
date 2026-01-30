import type { Campus } from "@/v2/core/campus/domain/campus.domain";
import type { OfertaFormacao } from "@/v2/core/oferta-formacao/domain/oferta-formacao.domain";
import type {
  IGradeHorarioOfertaFormacao,
  IGradeHorarioOfertaFormacaoCreate,
} from "./grade-horario-oferta-formacao.types";

export class GradeHorarioOfertaFormacao implements IGradeHorarioOfertaFormacao {
  id!: string;
  campus!: Campus;
  ofertaFormacao!: OfertaFormacao;
  dateCreated!: Date;
  dateUpdated!: Date;
  dateDeleted!: Date | null;

  static criar(dados: IGradeHorarioOfertaFormacaoCreate): GradeHorarioOfertaFormacao {
    const gradeHorarioOfertaFormacao = new GradeHorarioOfertaFormacao();
    return gradeHorarioOfertaFormacao;
  }

  static fromData(dados: IGradeHorarioOfertaFormacao): GradeHorarioOfertaFormacao {
    const gradeHorarioOfertaFormacao = new GradeHorarioOfertaFormacao();
    Object.assign(gradeHorarioOfertaFormacao, dados);
    return gradeHorarioOfertaFormacao;
  }

  isAtivo(): boolean {
    return this.dateDeleted === null;
  }
}
