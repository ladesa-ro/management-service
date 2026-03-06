import { BaseEntity, type IdNumeric } from "@/Ladesa.Management.Application/@shared";
import type { EstadoCreateDto } from "@/Ladesa.Management.Domain/Dtos/EstadoCreateDto";
import type { EstadoUpdateDto } from "@/Ladesa.Management.Domain/Dtos/EstadoUpdateDto";

/**
 * Tipagem da entidade Estado
 * Define a estrutura de dados sem comportamento
 */
export interface IEstado {
  /** Identificador do estado (numérico - IBGE) */
  id: IdNumeric;

  /** Nome oficial do estado */
  nome: string;

  /** Sigla do estado (ex: SP, RJ, MG) */
  sigla: string;
}

/**
 * Entidade de Domínio: Estado
 * Entidade de referência (códigos IBGE)
 */
export class Estado extends BaseEntity implements IEstado {
  id!: IdNumeric;
  nome!: string;
  sigla!: string;

  protected static get entityName(): string {
    return "Estado";
  }

  // ========================================
  // Validação
  // ========================================

  /**
   * Cria uma nova instância válida de Estado
   * @throws EntityValidationError se os dados forem inválidos
   */
  static criar(dados: EstadoCreateDto): Estado {
    const instance = new Estado();
    instance.id = dados.id;
    instance.nome = dados.nome?.trim() ?? "";
    instance.sigla = dados.sigla?.trim().toUpperCase() ?? "";
    instance.validar();
    return instance;
  }

  // ========================================
  // Factory Methods
  // ========================================

  /**
   * Reconstrói uma instância a partir de dados existentes (ex: do banco)
   */
  static fromData(dados: Record<string, any>): Estado {
    const instance = new Estado();
    Object.assign(instance, dados);
    return instance;
  }

  validar(): void {
    const { result, rules } = Estado.createValidation();

    rules.required(this.nome, "nome");
    rules.minLength(this.nome, "nome", 1);
    rules.required(this.sigla, "sigla");

    rules.custom(
      this.sigla,
      "sigla",
      (v) => /^[A-Z]{2}$/.test(v),
      "sigla deve ter 2 letras maiusculas",
      "format",
    );

    Estado.throwIfInvalid(result);
  }

  // ========================================
  // Métodos de Domínio
  // ========================================

  /**
   * Atualiza os dados do estado
   * @throws EntityValidationError se os dados forem inválidos
   */
  atualizar(dados: EstadoUpdateDto): void {
    if (dados.nome !== undefined) {
      this.nome = dados.nome?.trim() ?? "";
    }
    if (dados.sigla !== undefined) {
      this.sigla = dados.sigla?.trim().toUpperCase() ?? "";
    }
    this.validar();
  }
}
