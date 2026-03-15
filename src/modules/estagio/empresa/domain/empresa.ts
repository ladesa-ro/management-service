import type { IEntityBaseUuid } from "@/domain/abstractions/entities";
import type { IdUuid, ScalarDateTimeString } from "@/domain/abstractions/scalars";
import { generateUuidV7 } from "@/domain/entities/utils/generate-uuid-v7.js";
import { createValidator, throwIfInvalid, touchUpdated } from "@/utils/validation-utils.js";

export interface IEmpresa extends IEntityBaseUuid {
  razaoSocial: string;
  nomeFantasia: string;
  cnpj: string;
  telefone: string;
  email: string;
  idEnderecoFk: string;
  ativo?: boolean;
}

export interface IEmpresaCreate {
  razaoSocial: string;
  nomeFantasia: string;
  cnpj: string;
  telefone: string;
  email: string;
  idEnderecoFk: string;
}

export interface IEmpresaUpdate {
  razaoSocial?: string;
  nomeFantasia?: string;
  cnpj?: string;
  telefone?: string;
  email?: string;
  idEnderecoFk?: string;
}

export class Empresa implements IEntityBaseUuid {
  static readonly entityName = "Empresa";

  id!: IdUuid;
  razaoSocial!: string;
  nomeFantasia!: string;
  cnpj!: string;
  telefone!: string;
  email!: string;
  idEnderecoFk!: string;
  dateCreated!: ScalarDateTimeString;
  dateUpdated!: ScalarDateTimeString;
  dateDeleted!: ScalarDateTimeString | null;

  constructor(dados: {
    razaoSocial: string;
    nomeFantasia: string;
    cnpj: string;
    telefone: string;
    email: string;
    idEnderecoFk: string;
  }) {
    this.id = generateUuidV7();
    this.razaoSocial = dados.razaoSocial;
    this.nomeFantasia = dados.nomeFantasia;
    this.cnpj = dados.cnpj;
    this.telefone = dados.telefone;
    this.email = dados.email;
    this.idEnderecoFk = dados.idEnderecoFk;
    this.dateCreated = new Date().toISOString();
    this.dateUpdated = new Date().toISOString();
    this.dateDeleted = null;
  }

  get ativo(): boolean {
    return this.dateDeleted === null;
  }

  validate(): void {
    const { result, rules } = createValidator("Empresa");
    rules.required(this.razaoSocial, "razaoSocial", "Razao social da empresa e obrigatoria");
    rules.required(this.nomeFantasia, "nomeFantasia", "Nome fantasia da empresa e obrigatorio");
    rules.required(this.cnpj, "cnpj", "CNPJ da empresa e obrigatorio");
    rules.required(this.telefone, "telefone", "Telefone da empresa e obrigatorio");
    rules.required(this.email, "email", "Email da empresa e obrigatorio");
    rules.required(this.idEnderecoFk, "idEnderecoFk", "Endereco da empresa e obrigatorio");
    rules.custom(this.cnpj, "cnpj", (v) => this.validarCNPJ(v), "CNPJ invalido", "cnpj");
    throwIfInvalid("Empresa", result);
  }

  private validarCNPJ(cnpj: string): boolean {
    const cnpjLimpo = cnpj.replace(/\D/g, "");
    return cnpjLimpo.length === 14;
  }

  static create(dados: IEmpresaCreate, validar: boolean = true): Empresa {
    const instance = new Empresa(dados);
    if (validar) instance.validate();
    return instance;
  }

  static load(dados: Record<string, any>): Empresa {
    const instance = Object.create(Empresa.prototype) as Empresa;
    if (dados.id !== undefined) instance.id = dados.id;
    if (dados.razaoSocial !== undefined) instance.razaoSocial = dados.razaoSocial;
    if (dados.nomeFantasia !== undefined) instance.nomeFantasia = dados.nomeFantasia;
    if (dados.cnpj !== undefined) instance.cnpj = dados.cnpj;
    if (dados.telefone !== undefined) instance.telefone = dados.telefone;
    if (dados.email !== undefined) instance.email = dados.email;
    if (dados.idEnderecoFk !== undefined) instance.idEnderecoFk = dados.idEnderecoFk;
    if (dados.dateCreated !== undefined) instance.dateCreated = dados.dateCreated;
    if (dados.dateUpdated !== undefined) instance.dateUpdated = dados.dateUpdated;
    if (dados.dateDeleted !== undefined) instance.dateDeleted = dados.dateDeleted;
    return instance;
  }

  update(dados: IEmpresaUpdate): void {
    if (dados.razaoSocial !== undefined) this.razaoSocial = dados.razaoSocial;
    if (dados.nomeFantasia !== undefined) this.nomeFantasia = dados.nomeFantasia;
    if (dados.cnpj !== undefined) this.cnpj = dados.cnpj;
    if (dados.telefone !== undefined) this.telefone = dados.telefone;
    if (dados.email !== undefined) this.email = dados.email;
    if (dados.idEnderecoFk !== undefined) this.idEnderecoFk = dados.idEnderecoFk;
    touchUpdated(this);
    this.validate();
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
}
