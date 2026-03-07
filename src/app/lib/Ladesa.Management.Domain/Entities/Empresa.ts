import { BaseDatedEntity } from "@/Ladesa.Management.Application/@shared";
import type { EmpresaCreateDto } from "@/Ladesa.Management.Domain/Dtos/EmpresaCreateDto";
import type { EmpresaUpdateDto } from "@/Ladesa.Management.Domain/Dtos/EmpresaUpdateDto";

/**
 * Entidade de Domínio: Empresa
 * Implementa a tipagem IEmpresa e adiciona regras de negócio
 */
export class Empresa extends BaseDatedEntity {
  private constructor(
    public razaoSocial: string,
    public nomeFantasia: string,
    public cnpj: string,
    public telefone: string,
    public email: string,
    public idEnderecoFk: string,
  ) {
    super();
  }

  protected static get entityName(): string {
    return "Empresa";
  }

  /**
   * Propriedade ativa (baseada no soft delete)
   */
  get ativo(): boolean {
    return this.isAtivo();
  }

  static criar(dados: EmpresaCreateDto): Empresa {
    const instance = new Empresa(
      dados.razaoSocial.trim(),
      dados.nomeFantasia.trim(),
      dados.cnpj.trim(),
      dados.telefone.trim(),
      dados.email.trim(),
      dados.idEnderecoFk.trim(),
    );
    instance.initDates();
    instance.validar();
    return instance;
  }

  static fromData(data: Empresa): Empresa {
    const instance = new Empresa(
      data.razaoSocial,
      data.nomeFantasia,
      data.cnpj,
      data.telefone,
      data.email,
      data.idEnderecoFk,
    );
    instance.id = data.id;
    instance.dateCreated = data.dateCreated;
    instance.dateUpdated = data.dateUpdated;
    instance.dateDeleted = data.dateDeleted;
    return instance;
  }

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

  temRazaoSocial(): boolean {
    return !!this.razaoSocial && this.razaoSocial.trim().length > 0;
  }

  temEmail(): boolean {
    return this.email.trim().length > 0;
  }

  temTelefone(): boolean {
    return this.telefone.trim().length > 0;
  }

  cnpjFormatado(): string {
    const cnpj = this.cnpj.replace(/\D/g, "");
    return cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, "$1.$2.$3/$4-$5");
  }

  private validarCNPJ(cnpj: string): boolean {
    const cnpjLimpo = cnpj.replace(/\D/g, "");
    return cnpjLimpo.length === 14;
  }
}
