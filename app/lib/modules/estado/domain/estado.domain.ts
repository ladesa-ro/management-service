import { BaseEntity, type IdNumeric } from "@/modules/@shared";
import type { IEstado, IEstadoCreate, IEstadoUpdate } from "./estado.types";

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
  // Factory Methods
  // ========================================

  /**
   * Cria uma nova instância válida de Estado
   * @throws EntityValidationError se os dados forem inválidos
   */
  static criar(dados: IEstadoCreate): Estado {
    const instance = new Estado();
    instance.id = dados.id;
    instance.nome = dados.nome?.trim() ?? "";
    instance.sigla = dados.sigla?.trim().toUpperCase() ?? "";
    instance.validar();
    return instance;
  }

  /**
   * Reconstrói uma instância a partir de dados existentes (ex: do banco)
   */
  static fromData(dados: Record<string, any>): Estado {
    const instance = new Estado();
    Object.assign(instance, dados);
    return instance;
  }

  // ========================================
  // Métodos de Domínio
  // ========================================

  /**
   * Atualiza os dados do estado
   * @throws EntityValidationError se os dados forem inválidos
   */
  atualizar(dados: IEstadoUpdate): void {
    if (dados.nome !== undefined) {
      this.nome = dados.nome?.trim() ?? "";
    }
    if (dados.sigla !== undefined) {
      this.sigla = dados.sigla?.trim().toUpperCase() ?? "";
    }
    this.validar();
  }
}
