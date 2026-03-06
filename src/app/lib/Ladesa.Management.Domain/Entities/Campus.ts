import type { IEntityBase } from "@/Ladesa.Management.Application/@shared";
import { BaseDatedEntity } from "@/Ladesa.Management.Application/@shared";
import type { IEndereco } from "@/Ladesa.Management.Application/localidades/endereco";
import type { CampusCreateDto } from "@/Ladesa.Management.Domain/Dtos/CampusCreateDto";
import type { CampusUpdateDto } from "@/Ladesa.Management.Domain/Dtos/CampusUpdateDto";

/**
 * Tipagem da entidade Campus
 * Define a estrutura de dados sem comportamento
 */
export interface ICampus extends IEntityBase {
  /** Nome fantasia do campus */
  nomeFantasia: string;

  /** Razão social do campus */
  razaoSocial: string;

  /** Apelido/nome curto do campus */
  apelido: string;

  /** CNPJ do campus */
  cnpj: string;

  /** Endereço do campus */
  endereco: IEndereco;
}

/**
 * Entidade de Domínio: Campus
 * Implementa a tipagem ICampus e adiciona regras de negócio
 */
export class Campus extends BaseDatedEntity implements ICampus {
  nomeFantasia!: string;
  razaoSocial!: string;
  apelido!: string;
  cnpj!: string;
  endereco!: IEndereco;

  protected static get entityName(): string {
    return "Campus";
  }

  // ========================================
  // Validação
  // ========================================

  /**
   * Cria uma nova instância válida de Campus
   * @throws EntityValidationError se os dados forem inválidos
   */
  static criar(dados: CampusCreateDto): Campus {
    const instance = new Campus();
    instance.nomeFantasia = dados.nomeFantasia?.trim() ?? "";
    instance.razaoSocial = dados.razaoSocial?.trim() ?? "";
    instance.apelido = dados.apelido?.trim() || "";
    instance.cnpj = dados.cnpj;
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
  static fromData(dados: Record<string, any>): Campus {
    const instance = new Campus();
    Object.assign(instance, dados);
    return instance;
  }

  validar(): void {
    const { result, rules } = Campus.createValidation();
    rules.required(this.nomeFantasia, "nomeFantasia");
    rules.minLength(this.nomeFantasia, "nomeFantasia", 1);
    rules.required(this.razaoSocial, "razaoSocial");
    rules.minLength(this.razaoSocial, "razaoSocial", 1);
    Campus.throwIfInvalid(result);
  }

  // ========================================
  // Métodos de Domínio
  // ========================================

  /**
   * Atualiza os dados do campus
   * @throws EntityValidationError se os dados forem inválidos
   */
  atualizar(dados: CampusUpdateDto): void {
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
