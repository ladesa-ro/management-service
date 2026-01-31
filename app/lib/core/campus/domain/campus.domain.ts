import { BaseEntity, type IdUuid, type ScalarDateTimeString } from "@/core/@shared";
import type { IEndereco } from "@/core/endereco";
import type { ICampus, ICampusCreate, ICampusUpdate } from "./campus.types";

/**
 * Entidade de Domínio: Campus
 * Implementa a tipagem ICampus e adiciona regras de negócio
 */
export class Campus extends BaseEntity implements ICampus {
  id!: IdUuid;
  nomeFantasia!: string;
  razaoSocial!: string;
  apelido!: string;
  cnpj!: string;
  endereco!: IEndereco;
  dateCreated!: ScalarDateTimeString;
  dateUpdated!: ScalarDateTimeString;
  dateDeleted!: ScalarDateTimeString | null;

  protected static get entityName(): string {
    return "Campus";
  }

  // ========================================
  // Factory Methods
  // ========================================

  /**
   * Cria uma nova instância válida de Campus
   * @throws EntityValidationError se os dados forem inválidos
   */
  static criar(dados: ICampusCreate): Campus {
    const { result, rules } = this.createValidation();

    const instance = new Campus();
    instance.nomeFantasia = rules.required(dados.nomeFantasia, "nomeFantasia");
    instance.nomeFantasia = rules.minLength(instance.nomeFantasia, "nomeFantasia", 1);

    instance.razaoSocial = rules.required(dados.razaoSocial, "razaoSocial");
    instance.razaoSocial = rules.minLength(instance.razaoSocial, "razaoSocial", 1);

    this.throwIfInvalid(result);

    instance.apelido = rules.optional(dados.apelido) ?? "";
    instance.cnpj = dados.cnpj;
    instance.dateCreated = new Date().toISOString();
    instance.dateUpdated = new Date().toISOString();
    instance.dateDeleted = null;

    return instance;
  }

  /**
   * Reconstrói uma instância a partir de dados existentes (ex: do banco)
   */
  static fromData(dados: ICampus): Campus {
    const instance = new Campus();
    Object.assign(instance, dados);
    return instance;
  }

  // ========================================
  // Métodos de Domínio
  // ========================================

  /**
   * Atualiza os dados do campus
   * @throws EntityValidationError se os dados forem inválidos
   */
  atualizar(dados: ICampusUpdate): void {
    const { result, rules } = Campus.createValidation();

    if (dados.nomeFantasia !== undefined) {
      this.nomeFantasia = rules.required(dados.nomeFantasia, "nomeFantasia");
      this.nomeFantasia = rules.minLength(this.nomeFantasia, "nomeFantasia", 1);
    }

    if (dados.razaoSocial !== undefined) {
      this.razaoSocial = rules.required(dados.razaoSocial, "razaoSocial");
      this.razaoSocial = rules.minLength(this.razaoSocial, "razaoSocial", 1);
    }

    if (dados.apelido !== undefined) {
      this.apelido = rules.optional(dados.apelido) ?? "";
    }

    if (dados.cnpj !== undefined) {
      this.cnpj = dados.cnpj;
    }

    Campus.throwIfInvalid(result);

    this.dateUpdated = new Date().toISOString();
  }

  // ========================================
  // Métodos específicos do domínio Campus
  // ========================================

  /**
   * Valida se o CNPJ tem formato válido (apenas números, 14 dígitos)
   */
  isCnpjValido(): boolean {
    const cnpjLimpo = this.cnpj.replace(/\D/g, "");
    return /^\d{14}$/.test(cnpjLimpo);
  }
}
