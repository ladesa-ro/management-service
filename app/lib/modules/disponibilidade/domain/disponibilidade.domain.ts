import { BaseEntity, type IdUuid, type ScalarDateTimeString } from "@/modules/@shared";
import type {
  IDisponibilidade,
  IDisponibilidadeCreate,
  IDisponibilidadeUpdate,
} from "./disponibilidade.types";

/**
 * Entidade de Domínio: Disponibilidade
 * Implementa a tipagem IDisponibilidade e adiciona regras de negócio
 */
export class Disponibilidade extends BaseEntity implements IDisponibilidade {
  id!: IdUuid;
  dataInicio!: ScalarDateTimeString;
  dataFim!: ScalarDateTimeString | null;
  dateCreated!: ScalarDateTimeString;
  dateUpdated!: ScalarDateTimeString;
  dateDeleted!: ScalarDateTimeString | null;

  protected static get entityName(): string {
    return "Disponibilidade";
  }

  // ========================================
  // Validação
  // ========================================

  validar(): void {
    const { result, rules } = Disponibilidade.createValidation();
    rules.required(this.dataInicio, "dataInicio");
    Disponibilidade.throwIfInvalid(result);
  }

  // ========================================
  // Factory Methods
  // ========================================

  /**
   * Cria uma nova instância válida de Disponibilidade
   * @throws EntityValidationError se os dados forem inválidos
   */
  static criar(dados: IDisponibilidadeCreate): Disponibilidade {
    const instance = new Disponibilidade();
    instance.dataInicio = dados.dataInicio;
    instance.dataFim = dados.dataFim ?? null;
    instance.initDates();
    instance.validar();

    return instance;
  }

  /**
   * Reconstrói uma instância a partir de dados existentes (ex: do banco)
   */
  static fromData(dados: IDisponibilidade): Disponibilidade {
    const instance = new Disponibilidade();
    Object.assign(instance, dados);
    return instance;
  }

  // ========================================
  // Métodos de Domínio
  // ========================================

  /**
   * Atualiza os dados da disponibilidade
   * @throws EntityValidationError se os dados forem inválidos
   */
  atualizar(dados: IDisponibilidadeUpdate): void {
    if (dados.dataInicio !== undefined) {
      this.dataInicio = dados.dataInicio;
    }

    if (dados.dataFim !== undefined) {
      this.dataFim = dados.dataFim;
    }

    this.touchUpdated();
    this.validar();
  }
}
