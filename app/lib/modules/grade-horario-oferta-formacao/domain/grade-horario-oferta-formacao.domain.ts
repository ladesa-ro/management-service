import { BaseEntity, type IdUuid, type ScalarDateTimeString } from "@/modules/@shared";
import type { Campus } from "@/modules/campus";
import type { OfertaFormacao } from "@/modules/oferta-formacao";
import type {
  IGradeHorarioOfertaFormacao,
  IGradeHorarioOfertaFormacaoCreate,
} from "./grade-horario-oferta-formacao.types";

/**
 * Entidade de Domínio: GradeHorarioOfertaFormacao
 * Representa uma grade horária associada a uma oferta de formação e um campus
 */
export class GradeHorarioOfertaFormacao extends BaseEntity implements IGradeHorarioOfertaFormacao {
  id!: IdUuid;
  campus!: Campus;
  ofertaFormacao!: OfertaFormacao;
  dateCreated!: ScalarDateTimeString;
  dateUpdated!: ScalarDateTimeString;
  dateDeleted!: ScalarDateTimeString | null;

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
  static fromData(dados: IGradeHorarioOfertaFormacao): GradeHorarioOfertaFormacao {
    const instance = new GradeHorarioOfertaFormacao();
    Object.assign(instance, dados);
    return instance;
  }
}
