import type { IdUuid, ScalarDateTimeString } from "@/domain/abstractions/scalars";
import { generateUuidV7 } from "@/domain/entities/utils/generate-uuid-v7";
import { zodValidate } from "@/shared/validation/index";
import { empresaCreateSchema, empresaSchema, empresaUpdateSchema } from "./empresa.schemas";

export interface IEmpresa {
  id: string;
  razaoSocial: string;
  nomeFantasia: string;
  cnpj: string;
  telefone: string;
  email: string;
  idEnderecoFk: string;
  ativo?: boolean;
  dateCreated: string;
  dateUpdated: string;
  dateDeleted: string | null;
}

export class Empresa {
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

  private constructor() {}

  get ativo(): boolean {
    return this.dateDeleted === null;
  }

  static create(dados: unknown): Empresa {
    const parsed = zodValidate(Empresa.entityName, empresaCreateSchema, dados);

    const instance = new Empresa();

    instance.id = generateUuidV7();
    instance.razaoSocial = parsed.razaoSocial;
    instance.nomeFantasia = parsed.nomeFantasia;
    instance.cnpj = parsed.cnpj;
    instance.telefone = parsed.telefone;
    instance.email = parsed.email;
    instance.idEnderecoFk = parsed.idEnderecoFk;
    instance.dateCreated = new Date().toISOString();
    instance.dateUpdated = new Date().toISOString();
    instance.dateDeleted = null;

    return instance;
  }

  static load(dados: unknown): Empresa {
    const parsed = zodValidate(Empresa.entityName, empresaSchema, dados);

    const instance = new Empresa();

    instance.id = parsed.id;
    instance.razaoSocial = parsed.razaoSocial;
    instance.nomeFantasia = parsed.nomeFantasia;
    instance.cnpj = parsed.cnpj;
    instance.telefone = parsed.telefone;
    instance.email = parsed.email;
    instance.idEnderecoFk = parsed.idEnderecoFk;
    instance.dateCreated = parsed.dateCreated;
    instance.dateUpdated = parsed.dateUpdated;
    instance.dateDeleted = parsed.dateDeleted;

    return instance;
  }

  update(dados: unknown): void {
    const parsed = zodValidate(Empresa.entityName, empresaUpdateSchema, dados);

    if (parsed.razaoSocial !== undefined) this.razaoSocial = parsed.razaoSocial;
    if (parsed.nomeFantasia !== undefined) this.nomeFantasia = parsed.nomeFantasia;
    if (parsed.cnpj !== undefined) this.cnpj = parsed.cnpj;
    if (parsed.telefone !== undefined) this.telefone = parsed.telefone;
    if (parsed.email !== undefined) this.email = parsed.email;
    if (parsed.idEnderecoFk !== undefined) this.idEnderecoFk = parsed.idEnderecoFk;

    this.dateUpdated = new Date().toISOString();

    zodValidate(Empresa.entityName, empresaSchema, this);
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
