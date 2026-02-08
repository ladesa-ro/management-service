import { BaseEntity, type IdUuid, type ScalarDateTimeString } from "@/modules/@shared";
import type {
  IIntervaloDeTempo,
  IIntervaloDeTempoCreate,
  IIntervaloDeTempoUpdate,
} from "./intervalo-de-tempo.types";

/**
 * Entidade de Domínio: IntervaloDeTempo
 * Implementa a tipagem IIntervaloDeTempo e adiciona regras de negócio
 */
export class IntervaloDeTempo extends BaseEntity implements IIntervaloDeTempo {
  id!: IdUuid;
  periodoInicio!: string;
  periodoFim!: string;
  dateCreated!: ScalarDateTimeString;
  dateUpdated!: ScalarDateTimeString;
  dateDeleted!: ScalarDateTimeString | null;

  protected static get entityName(): string {
    return "IntervaloDeTempo";
  }

  // ========================================
  // Factory Methods
  // ========================================

  /**
   * Cria uma nova instância válida de IntervaloDeTempo
   * @throws EntityValidationError se os dados forem inválidos
   */
  static criar(dados: IIntervaloDeTempoCreate): IntervaloDeTempo {
    const { result, rules } = this.createValidation();

    const instance = new IntervaloDeTempo();
    instance.periodoInicio = rules.required(dados.periodoInicio, "periodoInicio");
    instance.periodoInicio = rules.timeFormat(instance.periodoInicio, "periodoInicio");

    instance.periodoFim = rules.required(dados.periodoFim, "periodoFim");
    instance.periodoFim = rules.timeFormat(instance.periodoFim, "periodoFim");

    this.throwIfInvalid(result);

    instance.dateCreated = new Date().toISOString();
    instance.dateUpdated = new Date().toISOString();
    instance.dateDeleted = null;

    return instance;
  }

  /**
   * Reconstrói uma instância a partir de dados existentes (ex: do banco)
   */
  static fromData(dados: IIntervaloDeTempo): IntervaloDeTempo {
    const instance = new IntervaloDeTempo();
    Object.assign(instance, dados);
    return instance;
  }

  // ========================================
  // Métodos de Domínio
  // ========================================

  /**
   * Atualiza os dados do intervalo de tempo
   * @throws EntityValidationError se os dados forem inválidos
   */
  atualizar(dados: IIntervaloDeTempoUpdate): void {
    const { result, rules } = IntervaloDeTempo.createValidation();

    if (dados.periodoInicio !== undefined) {
      this.periodoInicio = rules.required(dados.periodoInicio, "periodoInicio");
      this.periodoInicio = rules.timeFormat(this.periodoInicio, "periodoInicio");
    }

    if (dados.periodoFim !== undefined) {
      this.periodoFim = rules.required(dados.periodoFim, "periodoFim");
      this.periodoFim = rules.timeFormat(this.periodoFim, "periodoFim");
    }

    IntervaloDeTempo.throwIfInvalid(result);

    this.dateUpdated = new Date().toISOString();
  }

  // ========================================
  // Métodos específicos do domínio
  // ========================================

  /**
   * Calcula a duração do intervalo em minutos
   */
  getDuracaoEmMinutos(): number {
    const [inicioHora, inicioMin] = this.periodoInicio.split(":").map(Number);
    const [fimHora, fimMin] = this.periodoFim.split(":").map(Number);
    const inicioTotalMin = inicioHora * 60 + inicioMin;
    const fimTotalMin = fimHora * 60 + fimMin;
    return fimTotalMin - inicioTotalMin;
  }

  /**
   * Converte horário string (HH:MM ou HH:MM:SS) para minutos totais
   */
  private static horarioParaMinutos(horario: string): number {
    const [hora, min] = horario.split(":").map(Number);
    return hora * 60 + min;
  }

  /**
   * Verifica se este intervalo sobrepõe outro intervalo de tempo.
   * Usado para detecção de conflitos de horário em grades e reservas.
   *
   * @param outro - Outro intervalo de tempo para comparação
   * @returns true se houver sobreposição
   */
  sobrepoe(outro: IntervaloDeTempo | IIntervaloDeTempo): boolean {
    const inicioA = IntervaloDeTempo.horarioParaMinutos(this.periodoInicio);
    const fimA = IntervaloDeTempo.horarioParaMinutos(this.periodoFim);
    const inicioB = IntervaloDeTempo.horarioParaMinutos(outro.periodoInicio);
    const fimB = IntervaloDeTempo.horarioParaMinutos(outro.periodoFim);

    // Dois intervalos se sobrepõem se um começa antes do outro terminar
    // e termina depois do outro começar
    return inicioA < fimB && fimA > inicioB;
  }

  /**
   * Verifica se um horário específico está contido neste intervalo.
   *
   * @param horario - Horário no formato HH:MM ou HH:MM:SS
   * @returns true se o horário está dentro do intervalo
   */
  contemHorario(horario: string): boolean {
    const minutos = IntervaloDeTempo.horarioParaMinutos(horario);
    const inicio = IntervaloDeTempo.horarioParaMinutos(this.periodoInicio);
    const fim = IntervaloDeTempo.horarioParaMinutos(this.periodoFim);
    return minutos >= inicio && minutos < fim;
  }

  /**
   * Verifica se este intervalo está completamente contido em outro.
   *
   * @param outro - Intervalo de tempo que possivelmente contém este
   * @returns true se este intervalo está dentro do outro
   */
  estaContidoEm(outro: IntervaloDeTempo | IIntervaloDeTempo): boolean {
    const inicioA = IntervaloDeTempo.horarioParaMinutos(this.periodoInicio);
    const fimA = IntervaloDeTempo.horarioParaMinutos(this.periodoFim);
    const inicioB = IntervaloDeTempo.horarioParaMinutos(outro.periodoInicio);
    const fimB = IntervaloDeTempo.horarioParaMinutos(outro.periodoFim);

    return inicioA >= inicioB && fimA <= fimB;
  }
}
