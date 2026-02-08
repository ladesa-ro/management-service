import { BaseEntity, type IdUuid, type ScalarDateTimeString } from "@/modules/@shared";
import type { GradeHorarioOfertaFormacao } from "@/modules/grade-horario-oferta-formacao";
import { IntervaloDeTempo } from "@/modules/intervalo-de-tempo";
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

  // ========================================
  // Métodos de Domínio
  // ========================================

  /**
   * Verifica se este item de grade conflita com outro (mesmo dia/horário sobreposto).
   * Usado pelo service para validar conflitos antes de inserir novos intervalos.
   *
   * @param outro - Outro item de grade para comparação
   * @returns true se houver conflito de horário
   */
  conflitaCom(outro: GradeHorarioOfertaFormacaoIntervaloDeTempo): boolean {
    // Se são da mesma grade e os intervalos de tempo se sobrepõem, há conflito
    if (this.gradeHorarioOfertaFormacao?.id !== outro.gradeHorarioOfertaFormacao?.id) {
      return false;
    }

    // Usa o método sobrepoe do IntervaloDeTempo para verificar conflito
    const intervaloA =
      this.intervaloDeTempo instanceof IntervaloDeTempo
        ? this.intervaloDeTempo
        : IntervaloDeTempo.fromData(this.intervaloDeTempo);

    return intervaloA.sobrepoe(outro.intervaloDeTempo);
  }

  /**
   * Verifica se há conflito deste item com uma lista de itens existentes.
   * Útil para validação antes de criar/atualizar.
   *
   * @param existentes - Lista de itens de grade existentes
   * @returns Lista de itens que conflitam com este
   */
  encontrarConflitos(
    existentes: GradeHorarioOfertaFormacaoIntervaloDeTempo[],
  ): GradeHorarioOfertaFormacaoIntervaloDeTempo[] {
    return existentes.filter(
      (existente) => existente.id !== this.id && this.conflitaCom(existente),
    );
  }
}
