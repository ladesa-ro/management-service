import { BaseDatedEntity } from "@/modules/@shared";
import type { OfertaFormacao } from "@/modules/ensino/oferta-formacao";
import type { Campus } from "@/modules/sisgea/campus";
import type {
  IGradeHorarioOfertaFormacao,
  IGradeHorarioOfertaFormacaoCreate,
} from "./grade-horario-oferta-formacao.types";

/**
 * Entidade de Domínio: GradeHorarioOfertaFormacao
 * Representa uma grade horária associada a uma oferta de formação e um campus
 */
export class GradeHorarioOfertaFormacao
  extends BaseDatedEntity
  implements IGradeHorarioOfertaFormacao
{
  campus!: Campus;
  ofertaFormacao!: OfertaFormacao;

  protected static get entityName(): string {
    return "GradeHorarioOfertaFormacao";
  }

  // ========================================
  // Validação
  // ========================================

  validar(): void {
    // Entidade de relacionamento: sem validações de campos escalares
  }

  // ========================================
  // Factory Methods
  // ========================================

  /**
   * Cria uma nova instância válida de GradeHorarioOfertaFormacao
   */
  static criar(_dados: IGradeHorarioOfertaFormacaoCreate): GradeHorarioOfertaFormacao {
    const instance = new GradeHorarioOfertaFormacao();
    instance.initDates();
    instance.validar();
    return instance;
  }

  /**
   * Reconstrói uma instância a partir de dados existentes (ex: do banco)
   */
  static fromData(dados: Record<string, any>): GradeHorarioOfertaFormacao {
    const instance = new GradeHorarioOfertaFormacao();
    Object.assign(instance, dados);
    return instance;
  }
}
