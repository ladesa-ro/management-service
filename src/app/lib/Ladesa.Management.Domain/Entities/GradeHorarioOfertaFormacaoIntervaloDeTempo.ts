import type { IdUuid } from "@/Ladesa.Management.Application/@shared";
import { BaseDatedEntity } from "@/Ladesa.Management.Application/@shared";
import type { GradeHorarioOfertaFormacaoIntervaloDeTempoCreateDto } from "@/Ladesa.Management.Domain/Dtos/GradeHorarioOfertaFormacaoIntervaloDeTempoCreateDto";
import type { IntervaloDeTempo } from "@/Ladesa.Management.Domain/Entities/IntervaloDeTempo";

/**
 * Entidade de Domínio: GradeHorarioOfertaFormacaoIntervaloDeTempo
 * Entidade de relacionamento N:N entre GradeHorarioOfertaFormacao e IntervaloDeTempo
 */
export class GradeHorarioOfertaFormacaoIntervaloDeTempo extends BaseDatedEntity {
  private constructor(
    public intervaloDeTempoId: IdUuid,
    public gradeHorarioOfertaFormacaoId: IdUuid,
  ) {
    super();
  }

  protected static get entityName(): string {
    return "GradeHorarioOfertaFormacaoIntervaloDeTempo";
  }

  static criar(
    dados: GradeHorarioOfertaFormacaoIntervaloDeTempoCreateDto,
  ): GradeHorarioOfertaFormacaoIntervaloDeTempo {
    const instance = new GradeHorarioOfertaFormacaoIntervaloDeTempo(
      dados.intervaloDeTempo.id,
      dados.gradeHorarioOfertaFormacao.id,
    );
    instance.initDates();
    instance.validar();
    return instance;
  }

  static fromData(
    data: GradeHorarioOfertaFormacaoIntervaloDeTempo,
  ): GradeHorarioOfertaFormacaoIntervaloDeTempo {
    const instance = new GradeHorarioOfertaFormacaoIntervaloDeTempo(
      data.intervaloDeTempoId,
      data.gradeHorarioOfertaFormacaoId,
    );
    instance.id = data.id;
    instance.dateCreated = data.dateCreated;
    instance.dateUpdated = data.dateUpdated;
    instance.dateDeleted = data.dateDeleted;
    return instance;
  }

  validar(): void {
    // Entidade de relacionamento: sem validações de campos escalares
  }

  /**
   * Verifica se este item de grade conflita com outro (mesmo dia/horário sobreposto).
   * Usado pelo service para validar conflitos antes de inserir novos intervalos.
   *
   * @param outro - Outro item de grade para comparação
   * @param intervaloA - IntervaloDeTempo deste item
   * @param intervaloB - IntervaloDeTempo do outro item
   * @returns true se houver conflito de horário
   */
  conflitaCom(
    outro: GradeHorarioOfertaFormacaoIntervaloDeTempo,
    intervaloA: IntervaloDeTempo,
    intervaloB: IntervaloDeTempo,
  ): boolean {
    if (this.gradeHorarioOfertaFormacaoId !== outro.gradeHorarioOfertaFormacaoId) {
      return false;
    }

    return intervaloA.sobrepoe(intervaloB);
  }

  /**
   * Verifica se há conflito deste item com uma lista de itens existentes.
   * Útil para validação antes de criar/atualizar.
   *
   * @param existentes - Lista de itens de grade existentes
   * @param meuIntervalo - IntervaloDeTempo deste item
   * @param intervalosExistentes - Map de intervaloDeTempoId → IntervaloDeTempo dos existentes
   * @returns Lista de itens que conflitam com este
   */
  encontrarConflitos(
    existentes: GradeHorarioOfertaFormacaoIntervaloDeTempo[],
    meuIntervalo: IntervaloDeTempo,
    intervalosExistentes: Map<IdUuid, IntervaloDeTempo>,
  ): GradeHorarioOfertaFormacaoIntervaloDeTempo[] {
    return existentes.filter((existente) => {
      if (existente.id === this.id) return false;
      const intervaloExistente = intervalosExistentes.get(existente.intervaloDeTempoId);
      if (!intervaloExistente) return false;
      return this.conflitaCom(existente, meuIntervalo, intervaloExistente);
    });
  }
}
