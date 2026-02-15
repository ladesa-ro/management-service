import { BaseEntity, type IdNumeric } from "@/modules/@shared";
import type { IEstado } from "@/modules/base/localidades/estado";
import type { ICidade, ICidadeCreate, ICidadeUpdate } from "./cidade.types";

/**
 * Entidade de Domínio: Cidade
 * Entidade de referência (códigos IBGE)
 */
export class Cidade extends BaseEntity implements ICidade {
  id!: IdNumeric;
  nome!: string;
  estado!: IEstado;

  protected static get entityName(): string {
    return "Cidade";
  }

  // ========================================
  // Validação
  // ========================================

  validar(): void {
    const { result, rules } = Cidade.createValidation();
    rules.required(this.nome, "nome");
    rules.minLength(this.nome, "nome", 1);
    Cidade.throwIfInvalid(result);
  }

  // ========================================
  // Factory Methods
  // ========================================

  /**
   * Cria uma nova instância válida de Cidade
   * @throws EntityValidationError se os dados forem inválidos
   */
  static criar(dados: ICidadeCreate): Cidade {
    const instance = new Cidade();
    instance.id = dados.id;
    instance.nome = dados.nome?.trim() ?? "";
    instance.validar();
    return instance;
  }

  /**
   * Reconstrói uma instância a partir de dados existentes (ex: do banco)
   */
  static fromData(dados: Record<string, any>): Cidade {
    const instance = new Cidade();
    Object.assign(instance, dados);
    return instance;
  }

  // ========================================
  // Métodos de Domínio
  // ========================================

  /**
   * Atualiza os dados da cidade
   * @throws EntityValidationError se os dados forem inválidos
   */
  atualizar(dados: ICidadeUpdate): void {
    if (dados.nome !== undefined) {
      this.nome = dados.nome?.trim() ?? "";
    }
    this.validar();
  }

  // ========================================
  // Métodos específicos do domínio
  // ========================================

  getNomeCompleto(): string {
    return `${this.nome} - ${this.estado.sigla}`;
  }
}
