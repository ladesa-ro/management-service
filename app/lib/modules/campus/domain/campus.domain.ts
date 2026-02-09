import { BaseEntity, type IdUuid, type ScalarDateTimeString } from "@/modules/@shared";
import type { IEndereco } from "@/modules/endereco";
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
  // Validação
  // ========================================

  validar(): void {
    const { result, rules } = Campus.createValidation();
    rules.required(this.nomeFantasia, "nomeFantasia");
    rules.minLength(this.nomeFantasia, "nomeFantasia", 1);
    rules.required(this.razaoSocial, "razaoSocial");
    rules.minLength(this.razaoSocial, "razaoSocial", 1);
    Campus.throwIfInvalid(result);
  }

  // ========================================
  // Factory Methods
  // ========================================

  /**
   * Cria uma nova instância válida de Campus
   * @throws EntityValidationError se os dados forem inválidos
   */
  static criar(dados: ICampusCreate): Campus {
    const instance = new Campus();
    instance.nomeFantasia = dados.nomeFantasia?.trim() ?? "";
    instance.razaoSocial = dados.razaoSocial?.trim() ?? "";
    instance.apelido = dados.apelido?.trim() || "";
    instance.cnpj = dados.cnpj;
    instance.initDates();
    instance.validar();

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
    if (dados.nomeFantasia !== undefined) {
      this.nomeFantasia = dados.nomeFantasia?.trim() ?? "";
    }

    if (dados.razaoSocial !== undefined) {
      this.razaoSocial = dados.razaoSocial?.trim() ?? "";
    }

    if (dados.apelido !== undefined) {
      this.apelido = dados.apelido?.trim() || "";
    }

    if (dados.cnpj !== undefined) {
      this.cnpj = dados.cnpj;
    }

    this.touchUpdated();
    this.validar();
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
