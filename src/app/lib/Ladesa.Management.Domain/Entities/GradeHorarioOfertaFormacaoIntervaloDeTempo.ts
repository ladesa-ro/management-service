import type { IEntityBase } from "@/Ladesa.Management.Application/@shared";
import { BaseDatedEntity } from "@/Ladesa.Management.Application/@shared";
import type {
  GradeHorarioOfertaFormacao,
  IGradeHorarioOfertaFormacao,
} from "@/Ladesa.Management.Application/horarios/grade-horario-oferta-formacao";
import type { IIntervaloDeTempo } from "@/Ladesa.Management.Application/horarios/intervalo-de-tempo";
import { IntervaloDeTempo } from "@/Ladesa.Management.Application/horarios/intervalo-de-tempo";
import type { GradeHorarioOfertaFormacaoIntervaloDeTempoCreateDto } from "@/Ladesa.Management.Domain/Dtos/GradeHorarioOfertaFormacaoIntervaloDeTempoCreateDto";

export interface IGradeHorarioOfertaFormacaoIntervaloDeTempo extends IEntityBase {
  intervaloDeTempo: IIntervaloDeTempo | null;
  gradeHorarioOfertaFormacao: IGradeHorarioOfertaFormacao | null;
}

/**
 * Entidade de Domínio: GradeHorarioOfertaFormacaoIntervaloDeTempo
 * Entidade de relacionamento N:N entre GradeHorarioOfertaFormacao e IntervaloDeTempo
 */
export class GradeHorarioOfertaFormacaoIntervaloDeTempo
  extends BaseDatedEntity
  implements IGradeHorarioOfertaFormacaoIntervaloDeTempo
{
  intervaloDeTempo!: IntervaloDeTempo;
  gradeHorarioOfertaFormacao!: GradeHorarioOfertaFormacao;

  protected static get entityName(): string {
    return "GradeHorarioOfertaFormacaoIntervaloDeTempo";
  }

  // ========================================
  // Validação
  // ========================================

  /**
   * Cria uma nova instância válida de GradeHorarioOfertaFormacaoIntervaloDeTempo
   */
  static criar(
    _dados: GradeHorarioOfertaFormacaoIntervaloDeTempoCreateDto,
  ): GradeHorarioOfertaFormacaoIntervaloDeTempo {
    const instance = new GradeHorarioOfertaFormacaoIntervaloDeTempo();
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
  static fromData(dados: Record<string, any>): GradeHorarioOfertaFormacaoIntervaloDeTempo {
    const instance = new GradeHorarioOfertaFormacaoIntervaloDeTempo();
    Object.assign(instance, dados);
    return instance;
  }

  validar(): void {
    // Entidade de relacionamento: sem validações de campos escalares
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
