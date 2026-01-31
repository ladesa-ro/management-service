import { BaseEntity, type IdUuid, type ScalarDateTimeString } from "@/modules/@shared";
import type { GradeHorarioOfertaFormacao } from "@/modules/grade-horario-oferta-formacao";
import type { IntervaloDeTempo } from "@/modules/intervalo-de-tempo";
import type {
  IGradeHorarioOfertaFormacaoIntervaloDeTempo,
  IGradeHorarioOfertaFormacaoIntervaloDeTempoCreate,
} from "./grade-horario-oferta-formacao-intervalo-de-tempo.types";

/**
 * Entidade de Domínio: GradeHorarioOfertaFormacaoIntervaloDeTempo
 * Entidade de relacionamento N:N entre GradeHorarioOfertaFormacao e IntervaloDeTempo
 */
export class GradeHorarioOfertaFormacaoIntervaloDeTempo
  extends BaseEntity
  implements IGradeHorarioOfertaFormacaoIntervaloDeTempo
{
  id!: IdUuid;
  intervaloDeTempo!: IntervaloDeTempo;
  gradeHorarioOfertaFormacao!: GradeHorarioOfertaFormacao;
  dateCreated!: ScalarDateTimeString;
  dateUpdated!: ScalarDateTimeString;
  dateDeleted!: ScalarDateTimeString | null;

  protected static get entityName(): string {
    return "GradeHorarioOfertaFormacaoIntervaloDeTempo";
  }

  // ========================================
  // Factory Methods
  // ========================================

  /**
   * Cria uma nova instância válida de GradeHorarioOfertaFormacaoIntervaloDeTempo
   */
  static criar(
    _dados: IGradeHorarioOfertaFormacaoIntervaloDeTempoCreate,
  ): GradeHorarioOfertaFormacaoIntervaloDeTempo {
    const instance = new GradeHorarioOfertaFormacaoIntervaloDeTempo();
    instance.dateCreated = new Date().toISOString();
    instance.dateUpdated = new Date().toISOString();
    instance.dateDeleted = null;
    return instance;
  }

  /**
   * Reconstrói uma instância a partir de dados existentes (ex: do banco)
   */
  static fromData(
    dados: IGradeHorarioOfertaFormacaoIntervaloDeTempo,
  ): GradeHorarioOfertaFormacaoIntervaloDeTempo {
    const instance = new GradeHorarioOfertaFormacaoIntervaloDeTempo();
    Object.assign(instance, dados);
    return instance;
  }
}
