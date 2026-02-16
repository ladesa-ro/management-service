import { BaseDatedEntity, type ScalarDate } from "@/modules/@shared";
import type { CalendarioLetivo } from "@/modules/horarios/calendario-letivo";
import type {
  IDiaCalendario,
  IDiaCalendarioCreate,
  IDiaCalendarioUpdate,
} from "./dia-calendario.types";

/**
 * Entidade de Domínio: DiaCalendario
 * Implementa a tipagem IDiaCalendario e adiciona regras de negócio
 */
export class DiaCalendario extends BaseDatedEntity implements IDiaCalendario {
  data!: ScalarDate;
  diaLetivo!: boolean;
  feriado!: string;
  diaPresencial!: boolean;
  tipo!: string;
  extraCurricular!: boolean;
  calendario!: CalendarioLetivo;

  protected static get entityName(): string {
    return "DiaCalendario";
  }

  // ========================================
  // Validação
  // ========================================

  validar(): void {
    const { result, rules } = DiaCalendario.createValidation();
    rules.required(this.data, "data");
    rules.dateFormat(this.data, "data");
    rules.required(this.tipo, "tipo");
    DiaCalendario.throwIfInvalid(result);
  }

  // ========================================
  // Factory Methods
  // ========================================

  /**
   * Cria uma nova instância válida de DiaCalendario
   * @throws EntityValidationError se os dados forem inválidos
   */
  static criar(dados: IDiaCalendarioCreate): DiaCalendario {
    const instance = new DiaCalendario();
    instance.data = dados.data;
    instance.tipo = dados.tipo;
    instance.diaLetivo = dados.diaLetivo;
    instance.feriado = dados.feriado;
    instance.diaPresencial = dados.diaPresencial;
    instance.extraCurricular = dados.extraCurricular;
    instance.initDates();
    instance.validar();

    return instance;
  }

  /**
   * Reconstrói uma instância a partir de dados existentes (ex: do banco)
   */
  static fromData(dados: Record<string, any>): DiaCalendario {
    const instance = new DiaCalendario();
    Object.assign(instance, dados);
    return instance;
  }

  // ========================================
  // Métodos de Domínio
  // ========================================

  /**
   * Atualiza os dados do dia do calendário
   * @throws EntityValidationError se os dados forem inválidos
   */
  atualizar(dados: IDiaCalendarioUpdate): void {
    if (dados.data !== undefined) {
      this.data = dados.data;
    }

    if (dados.tipo !== undefined) {
      this.tipo = dados.tipo;
    }

    if (dados.diaLetivo !== undefined) {
      this.diaLetivo = dados.diaLetivo;
    }

    if (dados.feriado !== undefined) {
      this.feriado = dados.feriado;
    }

    if (dados.diaPresencial !== undefined) {
      this.diaPresencial = dados.diaPresencial;
    }

    if (dados.extraCurricular !== undefined) {
      this.extraCurricular = dados.extraCurricular;
    }

    this.touchUpdated();
    this.validar();
  }
}
