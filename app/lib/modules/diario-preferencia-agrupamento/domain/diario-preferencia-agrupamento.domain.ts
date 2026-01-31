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
  // Factory Methods
  // ========================================

  /**
   * Cria uma nova instância válida de DiarioPreferenciaAgrupamento
   * @throws EntityValidationError se os dados forem inválidos
   */
  static criar(dados: IDiarioPreferenciaAgrupamentoCreate): DiarioPreferenciaAgrupamento {
    const { result, rules } = this.createValidation();

    const instance = new DiarioPreferenciaAgrupamento();
    instance.dataInicio = rules.required(dados.dataInicio, "dataInicio");
    instance.dataInicio = rules.dateFormat(instance.dataInicio, "dataInicio");

    instance.diaSemanaIso = rules.requiredNumber(dados.diaSemanaIso, "diaSemanaIso");
    instance.diaSemanaIso = rules.range(instance.diaSemanaIso, "diaSemanaIso", 1, 7);

    instance.aulasSeguidas = rules.requiredNumber(dados.aulasSeguidas, "aulasSeguidas");
    instance.aulasSeguidas = rules.min(instance.aulasSeguidas, "aulasSeguidas", 1);

    this.throwIfInvalid(result);

    instance.dataFim = dados.dataFim ?? null;
    instance.dateCreated = new Date().toISOString();
    instance.dateUpdated = new Date().toISOString();
    instance.dateDeleted = null;

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
    const { result, rules } = DiarioPreferenciaAgrupamento.createValidation();

    if (dados.dataInicio !== undefined) {
      this.dataInicio = rules.required(dados.dataInicio, "dataInicio");
      this.dataInicio = rules.dateFormat(this.dataInicio, "dataInicio");
    }

    if (dados.dataFim !== undefined) {
      this.dataFim = dados.dataFim;
    }

    if (dados.diaSemanaIso !== undefined) {
      this.diaSemanaIso = rules.requiredNumber(dados.diaSemanaIso, "diaSemanaIso");
      this.diaSemanaIso = rules.range(this.diaSemanaIso, "diaSemanaIso", 1, 7);
    }

    if (dados.aulasSeguidas !== undefined) {
      this.aulasSeguidas = rules.requiredNumber(dados.aulasSeguidas, "aulasSeguidas");
      this.aulasSeguidas = rules.min(this.aulasSeguidas, "aulasSeguidas", 1);
    }

    DiarioPreferenciaAgrupamento.throwIfInvalid(result);

    this.dateUpdated = new Date().toISOString();
  }
}
