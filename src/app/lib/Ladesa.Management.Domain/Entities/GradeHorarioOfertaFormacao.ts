import type { IEntityBase } from "@/Ladesa.Management.Application/@shared";
import { BaseDatedEntity } from "@/Ladesa.Management.Application/@shared";
import type { Campus, ICampus } from "@/Ladesa.Management.Application/ambientes/campus";
import type {
  IOfertaFormacao,
  OfertaFormacao,
} from "@/Ladesa.Management.Application/ensino/oferta-formacao";
import type { GradeHorarioOfertaFormacaoCreateDto } from "@/Ladesa.Management.Domain/Dtos/GradeHorarioOfertaFormacaoCreateDto";

/**
 * Interface que define a estrutura de dados de GradeHorarioOfertaFormacao
 * Tipagem pura sem implementacao de regras
 */
export interface IGradeHorarioOfertaFormacao extends IEntityBase {
  /** Campus associado */
  campus: ICampus | null;

  /** Oferta de formacao associada */
  ofertaFormacao: IOfertaFormacao | null;
}

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

  /**
   * Cria uma nova instância válida de GradeHorarioOfertaFormacao
   */
  static criar(_dados: GradeHorarioOfertaFormacaoCreateDto): GradeHorarioOfertaFormacao {
    const instance = new GradeHorarioOfertaFormacao();
    instance.initDates();
    instance.validar();
    return instance;
  }

  // ========================================
  // Factory Methods
  // ========================================

  /**
   * Reconstrói uma instância a partir de dados existentes (ex: do banco)
   */
  static fromData(dados: Record<string, any>): GradeHorarioOfertaFormacao {
    const instance = new GradeHorarioOfertaFormacao();
    Object.assign(instance, dados);
    return instance;
  }

  validar(): void {
    // Entidade de relacionamento: sem validações de campos escalares
  }
}
