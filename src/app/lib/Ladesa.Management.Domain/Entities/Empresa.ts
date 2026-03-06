import type { IEntityBase } from "@/Ladesa.Management.Application/@shared";
import { BaseDatedEntity } from "@/Ladesa.Management.Application/@shared";
import type { EmpresaCreateDto } from "@/Ladesa.Management.Domain/Dtos/EmpresaCreateDto";
import type { EmpresaUpdateDto } from "@/Ladesa.Management.Domain/Dtos/EmpresaUpdateDto";

/**
 * Interface que define a estrutura de dados de Empresa
 * Tipagem pura sem implementação de regras
 */
export interface IEmpresa extends IEntityBase {
  razaoSocial: string;
  nomeFantasia: string;
  cnpj: string;
  telefone: string;
  email: string;
  idEnderecoFk: string;
  ativo?: boolean;
}

/**
 * Entidade de Domínio: Empresa
 * Implementa a tipagem IEmpresa e adiciona regras de negócio
 */
export class Empresa extends BaseDatedEntity implements IEmpresa {
  razaoSocial!: string;
  nomeFantasia!: string;
  cnpj!: string;
  telefone!: string;
  email!: string;
  idEnderecoFk!: string;

  protected static get entityName(): string {
    return "Empresa";
  }

  // ========================================
  // Validação
  // ========================================

  /**
   * Propriedade ativa (baseada no soft delete)
   */
  get ativo(): boolean {
    return this.isAtivo();
  }

  /**
   * Cria uma nova instância válida de Empresa
   */
  static criar(dados: EmpresaCreateDto): Empresa {
    const instance = new Empresa();
    instance.razaoSocial = dados.razaoSocial.trim();
    instance.nomeFantasia = dados.nomeFantasia.trim();
    instance.cnpj = dados.cnpj.trim();
    instance.telefone = dados.telefone.trim();
    instance.email = dados.email.trim();
    instance.idEnderecoFk = dados.idEnderecoFk.trim();
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
  static fromData(dados: Record<string, any>): Empresa {
    const instance = new Empresa();
    Object.assign(instance, dados);
    return instance;
  }

  /**
   * Valida os dados da empresa
   */
  validar(): void {
    if (!this.razaoSocial || this.razaoSocial.trim().length === 0) {
      throw new Error("Razão social da empresa é obrigatória");
    }

    if (!this.nomeFantasia || this.nomeFantasia.trim().length === 0) {
      throw new Error("Nome fantasia da empresa é obrigatório");
    }

    if (!this.cnpj || this.cnpj.trim().length === 0) {
      throw new Error("CNPJ da empresa é obrigatório");
    }

    if (!this.telefone || this.telefone.trim().length === 0) {
      throw new Error("Telefone da empresa é obrigatório");
    }

    if (!this.email || this.email.trim().length === 0) {
      throw new Error("Email da empresa é obrigatório");
    }

    if (!this.idEnderecoFk || this.idEnderecoFk.trim().length === 0) {
      throw new Error("Endereço da empresa é obrigatório");
    }

    if (!this.validarCNPJ(this.cnpj)) {
      throw new Error("CNPJ inválido");
    }
  }

  /**
   * Atualiza os dados da empresa
   */
  atualizar(dados: EmpresaUpdateDto): void {
    if (dados.razaoSocial !== undefined) {
      this.razaoSocial = dados.razaoSocial.trim();
    }

    if (dados.nomeFantasia !== undefined) {
      this.nomeFantasia = dados.nomeFantasia.trim();
    }

    if (dados.cnpj !== undefined) {
      this.cnpj = dados.cnpj.trim();
    }

    if (dados.telefone !== undefined) {
      this.telefone = dados.telefone.trim();
    }

    if (dados.email !== undefined) {
      this.email = dados.email.trim();
    }

    if (dados.idEnderecoFk !== undefined) {
      this.idEnderecoFk = dados.idEnderecoFk.trim();
    }

    this.touchUpdated();
    this.validar();
  }

  // ========================================
  // Métodos de Domínio
  // ========================================

  /**
   * Verifica se a empresa tem nome
   */
  temRazaoSocial(): boolean {
    return !!this.razaoSocial && this.razaoSocial.trim().length > 0;
  }

  // ========================================
  // Métodos específicos do domínio
  // ========================================

  /**
   * Verifica se a empresa tem email
   */
  temEmail(): boolean {
    return this.email.trim().length > 0;
  }

  /**
   * Verifica se a empresa tem telefone
   */
  temTelefone(): boolean {
    return this.telefone.trim().length > 0;
  }

  /**
   * Retorna CNPJ formatado
   */
  cnpjFormatado(): string {
    const cnpj = this.cnpj.replace(/\D/g, "");
    return cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, "$1.$2.$3/$4-$5");
  }

  /**
   * Valida formato CNPJ (básico)
   */
  private validarCNPJ(cnpj: string): boolean {
    const cnpjLimpo = cnpj.replace(/\D/g, "");
    return cnpjLimpo.length === 14;
  }
}
