import {
  BaseEntity,
  type IdUuid,
  type ScalarDate,
  type ScalarDateTimeString,
} from "@/modules/@shared";
import type { CalendarioLetivo } from "@/modules/calendario-letivo";
import type { IEtapa, IEtapaCreate, IEtapaUpdate } from "./etapa.types";

/**
 * Entidade de Domínio: Etapa
 * Implementa a tipagem IEtapa e adiciona regras de negócio
 */
export class Etapa extends BaseEntity implements IEtapa {
  id!: IdUuid;
  numero!: number | null;
  dataInicio!: ScalarDate;
  dataTermino!: ScalarDate;
  cor!: string | null;
  calendario!: CalendarioLetivo;
  dateCreated!: ScalarDateTimeString;
  dateUpdated!: ScalarDateTimeString;
  dateDeleted!: ScalarDateTimeString | null;

  protected static get entityName(): string {
    return "Etapa";
  }

  // ========================================
  // Validação
  // ========================================

  validar(): void {
    const { result, rules } = Etapa.createValidation();
    rules.required(this.dataInicio, "dataInicio");
    rules.dateFormat(this.dataInicio, "dataInicio");
    rules.required(this.dataTermino, "dataTermino");
    rules.dateFormat(this.dataTermino, "dataTermino");
    Etapa.throwIfInvalid(result);
  }

  // ========================================
  // Factory Methods
  // ========================================

  /**
   * Cria uma nova instância válida de Etapa
   * @throws EntityValidationError se os dados forem inválidos
   */
  static criar(dados: IEtapaCreate): Etapa {
    const instance = new Etapa();
    instance.dataInicio = dados.dataInicio;
    instance.dataTermino = dados.dataTermino;
    instance.numero = dados.numero ?? null;
    instance.cor = dados.cor?.trim() || null;
    instance.initDates();
    instance.validar();

    return instance;
  }

  /**
   * Reconstrói uma instância a partir de dados existentes (ex: do banco)
   */
  static fromData(dados: IEtapa): Etapa {
    const instance = new Etapa();
    Object.assign(instance, dados);
    return instance;
  }

  // ========================================
  // Métodos de Domínio
  // ========================================

  /**
   * Atualiza os dados da etapa
   * @throws EntityValidationError se os dados forem inválidos
   */
  atualizar(dados: IEtapaUpdate): void {
    if (dados.dataInicio !== undefined) {
      this.dataInicio = dados.dataInicio;
    }

    if (dados.dataTermino !== undefined) {
      this.dataTermino = dados.dataTermino;
    }

    if (dados.numero !== undefined) {
      this.numero = dados.numero;
    }

    if (dados.cor !== undefined) {
      this.cor = dados.cor?.trim() || null;
    }

    this.touchUpdated();
    this.validar();
  }
}
