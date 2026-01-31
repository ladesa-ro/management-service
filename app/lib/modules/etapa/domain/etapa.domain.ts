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
  // Factory Methods
  // ========================================

  /**
   * Cria uma nova instância válida de Etapa
   * @throws EntityValidationError se os dados forem inválidos
   */
  static criar(dados: IEtapaCreate): Etapa {
    const { result, rules } = this.createValidation();

    const instance = new Etapa();
    instance.dataInicio = rules.required(dados.dataInicio, "dataInicio");
    instance.dataInicio = rules.dateFormat(instance.dataInicio, "dataInicio");

    instance.dataTermino = rules.required(dados.dataTermino, "dataTermino");
    instance.dataTermino = rules.dateFormat(instance.dataTermino, "dataTermino");

    this.throwIfInvalid(result);

    instance.numero = dados.numero ?? null;
    instance.cor = rules.optional(dados.cor);
    instance.dateCreated = new Date().toISOString();
    instance.dateUpdated = new Date().toISOString();
    instance.dateDeleted = null;

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
    const { result, rules } = Etapa.createValidation();

    if (dados.dataInicio !== undefined) {
      this.dataInicio = rules.required(dados.dataInicio, "dataInicio");
      this.dataInicio = rules.dateFormat(this.dataInicio, "dataInicio");
    }

    if (dados.dataTermino !== undefined) {
      this.dataTermino = rules.required(dados.dataTermino, "dataTermino");
      this.dataTermino = rules.dateFormat(this.dataTermino, "dataTermino");
    }

    if (dados.numero !== undefined) {
      this.numero = dados.numero;
    }

    if (dados.cor !== undefined) {
      this.cor = rules.optional(dados.cor);
    }

    Etapa.throwIfInvalid(result);

    this.dateUpdated = new Date().toISOString();
  }
}
