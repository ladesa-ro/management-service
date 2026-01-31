import { BaseEntity, type ScalarDateTimeString } from "@/core/@shared";
import type { Campus } from "@/core/campus";
import type { OfertaFormacao } from "@/core/oferta-formacao";
import type {
  IGradeHorarioOfertaFormacao,
  IGradeHorarioOfertaFormacaoCreate,
} from "./grade-horario-oferta-formacao.types";

/**
 * Entidade de dominio GradeHorarioOfertaFormacao
 * Representa uma grade horaria associada a uma oferta de formacao e um campus
 */
export class GradeHorarioOfertaFormacao extends BaseEntity implements IGradeHorarioOfertaFormacao {
  id!: string;
  campus!: Campus;
  ofertaFormacao!: OfertaFormacao;
  dateCreated!: ScalarDateTimeString;
  dateUpdated!: ScalarDateTimeString;
  dateDeleted!: ScalarDateTimeString | null;

  /**
   * Cria uma nova instancia de GradeHorarioOfertaFormacao
   */
  static criar(dados: IGradeHorarioOfertaFormacaoCreate): GradeHorarioOfertaFormacao {
    const gradeHorarioOfertaFormacao = new GradeHorarioOfertaFormacao();
    return gradeHorarioOfertaFormacao;
  }

  /**
   * Reconstroi uma entidade a partir de dados existentes
   */
  static fromData(dados: IGradeHorarioOfertaFormacao): GradeHorarioOfertaFormacao {
    const gradeHorarioOfertaFormacao = new GradeHorarioOfertaFormacao();
    Object.assign(gradeHorarioOfertaFormacao, dados);
    return gradeHorarioOfertaFormacao;
  }
}
