import { BaseEntity, type IdNumeric } from "@/Ladesa.Management.Application/@shared";
import type { IEstado } from "@/Ladesa.Management.Application/localidades/estado";
import type { CidadeCreateDto } from "@/Ladesa.Management.Domain/Dtos/CidadeCreateDto";
import type { CidadeUpdateDto } from "@/Ladesa.Management.Domain/Dtos/CidadeUpdateDto";

export interface ICidade {
  /** Identificador da cidade (numérico - IBGE) */
  id: IdNumeric;

  /** Nome da cidade */
  nome: string;

  /** Estado ao qual a cidade pertence */
  estado: IEstado;
}

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

  /**
   * Cria uma nova instância válida de Cidade
   * @throws EntityValidationError se os dados forem inválidos
   */
  static criar(dados: CidadeCreateDto): Cidade {
    const instance = new Cidade();
    instance.id = dados.id;
    instance.nome = dados.nome?.trim() ?? "";
    instance.validar();
    return instance;
  }

  // ========================================
  // Factory Methods
  // ========================================

  /**
   * Reconstrói uma instância a partir de dados existentes (ex: do banco)
   */
  static fromData(dados: Record<string, any>): Cidade {
    const instance = new Cidade();
    Object.assign(instance, dados);
    return instance;
  }

  validar(): void {
    const { result, rules } = Cidade.createValidation();
    rules.required(this.nome, "nome");
    rules.minLength(this.nome, "nome", 1);
    Cidade.throwIfInvalid(result);
  }

  // ========================================
  // Métodos de Domínio
  // ========================================

  /**
   * Atualiza os dados da cidade
   * @throws EntityValidationError se os dados forem inválidos
   */
  atualizar(dados: CidadeUpdateDto): void {
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
