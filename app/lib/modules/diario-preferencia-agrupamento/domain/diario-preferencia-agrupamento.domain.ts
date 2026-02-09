import {
  BaseEntity,
  type IdUuid,
  type ScalarDate,
  type ScalarDateTimeString,
} from "@/modules/@shared";
import type { Diario } from "@/modules/diario/domain/diario.domain";
import type { IntervaloDeTempo } from "@/modules/intervalo-de-tempo/domain/intervalo-de-tempo.domain";
import type {
  IDiarioPreferenciaAgrupamento,
  IDiarioPreferenciaAgrupamentoCreate,
  IDiarioPreferenciaAgrupamentoUpdate,
} from "./diario-preferencia-agrupamento.types";

/**
 * Entidade de Domínio: DiarioPreferenciaAgrupamento
 * Implementa a tipagem IDiarioPreferenciaAgrupamento e adiciona regras de negócio
 */
export class DiarioPreferenciaAgrupamento
  extends BaseEntity
  implements IDiarioPreferenciaAgrupamento
{
  id!: IdUuid;
  dataInicio!: ScalarDate;
  dataFim!: ScalarDate | null;
  diaSemanaIso!: number;
  aulasSeguidas!: number;
  intervaloDeTempo!: IntervaloDeTempo;
  diario!: Diario;
  dateCreated!: ScalarDateTimeString;
  dateUpdated!: ScalarDateTimeString;
  dateDeleted!: ScalarDateTimeString | null;

  protected static get entityName(): string {
    return "DiarioPreferenciaAgrupamento";
  }

  // ========================================
  // Validação
  // ========================================

  validar(): void {
    const { result, rules } = DiarioPreferenciaAgrupamento.createValidation();
    rules.required(this.dataInicio, "dataInicio");
    rules.dateFormat(this.dataInicio, "dataInicio");
    rules.requiredNumber(this.diaSemanaIso, "diaSemanaIso");
    rules.range(this.diaSemanaIso, "diaSemanaIso", 1, 7);
    rules.requiredNumber(this.aulasSeguidas, "aulasSeguidas");
    rules.min(this.aulasSeguidas, "aulasSeguidas", 1);
    DiarioPreferenciaAgrupamento.throwIfInvalid(result);
  }

  // ========================================
  // Factory Methods
  // ========================================

  /**
   * Cria uma nova instância válida de DiarioPreferenciaAgrupamento
   * @throws EntityValidationError se os dados forem inválidos
   */
  static criar(dados: IDiarioPreferenciaAgrupamentoCreate): DiarioPreferenciaAgrupamento {
    const instance = new DiarioPreferenciaAgrupamento();
    instance.dataInicio = dados.dataInicio;
    instance.diaSemanaIso = dados.diaSemanaIso;
    instance.aulasSeguidas = dados.aulasSeguidas;
    instance.dataFim = dados.dataFim ?? null;
    instance.initDates();
    instance.validar();

    return instance;
  }

  /**
   * Reconstrói uma instância a partir de dados existentes (ex: do banco)
   */
  static fromData(dados: IDiarioPreferenciaAgrupamento): DiarioPreferenciaAgrupamento {
    const instance = new DiarioPreferenciaAgrupamento();
    Object.assign(instance, dados);
    return instance;
  }

  // ========================================
  // Métodos de Domínio
  // ========================================

  /**
   * Atualiza os dados da preferência de agrupamento
   * @throws EntityValidationError se os dados forem inválidos
   */
  atualizar(dados: IDiarioPreferenciaAgrupamentoUpdate): void {
    if (dados.dataInicio !== undefined) {
      this.dataInicio = dados.dataInicio;
    }

    if (dados.dataFim !== undefined) {
      this.dataFim = dados.dataFim;
    }

    if (dados.diaSemanaIso !== undefined) {
      this.diaSemanaIso = dados.diaSemanaIso;
    }

    if (dados.aulasSeguidas !== undefined) {
      this.aulasSeguidas = dados.aulasSeguidas;
    }

    this.touchUpdated();
    this.validar();
  }
}
