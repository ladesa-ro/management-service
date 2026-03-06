import type { IEntityBase, ScalarDateTimeString } from "@/Ladesa.Management.Application/@shared";
import { BaseDatedEntity, type ScalarDate } from "@/Ladesa.Management.Application/@shared";
import type { DiarioPreferenciaAgrupamentoCreateDto } from "@/Ladesa.Management.Domain/Dtos/DiarioPreferenciaAgrupamentoCreateDto";
import type { DiarioPreferenciaAgrupamentoUpdateDto } from "@/Ladesa.Management.Domain/Dtos/DiarioPreferenciaAgrupamentoUpdateDto";
import type { Diario, IDiario } from "@/Ladesa.Management.Domain/Entities/Diario";
import type {
  IIntervaloDeTempo,
  IntervaloDeTempo,
} from "@/Ladesa.Management.Domain/Entities/IntervaloDeTempo";

export interface IDiarioPreferenciaAgrupamento extends IEntityBase {
  dataInicio: ScalarDateTimeString;
  dataFim: ScalarDateTimeString | null;
  diaSemanaIso: number;
  aulasSeguidas: number;
  intervaloDeTempo: IIntervaloDeTempo;
  diario: IDiario;
}

/**
 * Entidade de Domínio: DiarioPreferenciaAgrupamento
 * Implementa a tipagem IDiarioPreferenciaAgrupamento e adiciona regras de negócio
 */
export class DiarioPreferenciaAgrupamento
  extends BaseDatedEntity
  implements IDiarioPreferenciaAgrupamento
{
  dataInicio!: ScalarDate;
  dataFim!: ScalarDate | null;
  diaSemanaIso!: number;
  aulasSeguidas!: number;
  intervaloDeTempo!: IntervaloDeTempo;
  diario!: Diario;

  protected static get entityName(): string {
    return "DiarioPreferenciaAgrupamento";
  }

  // ========================================
  // Validação
  // ========================================

  /**
   * Cria uma nova instância válida de DiarioPreferenciaAgrupamento
   * @throws EntityValidationError se os dados forem inválidos
   */
  static criar(dados: DiarioPreferenciaAgrupamentoCreateDto): DiarioPreferenciaAgrupamento {
    const instance = new DiarioPreferenciaAgrupamento();
    instance.dataInicio = dados.dataInicio;
    instance.diaSemanaIso = dados.diaSemanaIso;
    instance.aulasSeguidas = dados.aulasSeguidas;
    instance.dataFim = dados.dataFim ?? null;
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
  static fromData(dados: Record<string, any>): DiarioPreferenciaAgrupamento {
    const instance = new DiarioPreferenciaAgrupamento();
    Object.assign(instance, dados);
    return instance;
  }

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
  // Métodos de Domínio
  // ========================================

  /**
   * Atualiza os dados da preferência de agrupamento
   * @throws EntityValidationError se os dados forem inválidos
   */
  atualizar(dados: DiarioPreferenciaAgrupamentoUpdateDto): void {
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
