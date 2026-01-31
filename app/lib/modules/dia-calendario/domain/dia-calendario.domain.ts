import {
  BaseEntity,
  type IdUuid,
  type ScalarDate,
  type ScalarDateTimeString,
} from "@/modules/@shared";
import type { CalendarioLetivo } from "@/modules/calendario-letivo";
import type {
  IDiaCalendario,
  IDiaCalendarioCreate,
  IDiaCalendarioUpdate,
} from "./dia-calendario.types";

/**
 * Entidade de Domínio: DiaCalendario
 * Implementa a tipagem IDiaCalendario e adiciona regras de negócio
 */
export class DiaCalendario extends BaseEntity implements IDiaCalendario {
  id!: IdUuid;
  data!: ScalarDate;
  diaLetivo!: boolean;
  feriado!: string;
  diaPresencial!: boolean;
  tipo!: string;
  extraCurricular!: boolean;
  calendario!: CalendarioLetivo;
  dateCreated!: ScalarDateTimeString;
  dateUpdated!: ScalarDateTimeString;
  dateDeleted!: ScalarDateTimeString | null;

  protected static get entityName(): string {
    return "DiaCalendario";
  }

  // ========================================
  // Factory Methods
  // ========================================

  /**
   * Cria uma nova instância válida de DiaCalendario
   * @throws EntityValidationError se os dados forem inválidos
   */
  static criar(dados: IDiaCalendarioCreate): DiaCalendario {
    const { result, rules } = this.createValidation();

    const instance = new DiaCalendario();
    instance.data = rules.required(dados.data, "data");
    instance.data = rules.dateFormat(instance.data, "data");

    instance.tipo = rules.required(dados.tipo, "tipo");

    this.throwIfInvalid(result);

    instance.diaLetivo = dados.diaLetivo;
    instance.feriado = dados.feriado;
    instance.diaPresencial = dados.diaPresencial;
    instance.extraCurricular = dados.extraCurricular;
    instance.dateCreated = new Date().toISOString();
    instance.dateUpdated = new Date().toISOString();
    instance.dateDeleted = null;

    return instance;
  }

  /**
   * Reconstrói uma instância a partir de dados existentes (ex: do banco)
   */
  static fromData(dados: IDiaCalendario): DiaCalendario {
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
    const { result, rules } = DiaCalendario.createValidation();

    if (dados.data !== undefined) {
      this.data = rules.required(dados.data, "data");
      this.data = rules.dateFormat(this.data, "data");
    }

    if (dados.tipo !== undefined) {
      this.tipo = rules.required(dados.tipo, "tipo");
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

    DiaCalendario.throwIfInvalid(result);

    this.dateUpdated = new Date().toISOString();
  }
}
