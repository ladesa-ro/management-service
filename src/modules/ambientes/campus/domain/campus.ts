import type { IEntityBaseUuid } from "@/domain/abstractions/entities";
import type { IdNumeric, IdUuid, ScalarDateTimeString } from "@/domain/abstractions/scalars";
import { generateUuidV7 } from "@/domain/entities/utils/generate-uuid-v7.js";
import type { IEndereco } from "@/modules/localidades/endereco";
import { createValidator, throwIfInvalid, touchUpdated } from "@/utils/validation-utils.js";

export interface ICampus extends IEntityBaseUuid {
  nomeFantasia: string;
  razaoSocial: string;
  apelido: string;
  cnpj: string;
  endereco: IEndereco;
}

export interface ICampusCreate {
  nomeFantasia: string;
  razaoSocial: string;
  apelido: string;
  cnpj: string;
  endereco: {
    cep: string;
    logradouro: string;
    numero: number;
    bairro: string;
    complemento?: string | null;
    pontoReferencia?: string | null;
    cidade: { id: IdNumeric };
  };
}

export interface ICampusUpdate {
  nomeFantasia?: string;
  razaoSocial?: string;
  apelido?: string;
  cnpj?: string;
  endereco?: {
    cep?: string;
    logradouro?: string;
    numero?: number;
    bairro?: string;
    complemento?: string | null;
    pontoReferencia?: string | null;
    cidade?: { id: IdNumeric };
  };
}

export class Campus implements IEntityBaseUuid {
  static readonly entityName = "Campus";

  id!: IdUuid;
  nomeFantasia!: string;
  razaoSocial!: string;
  apelido!: string;
  cnpj!: string;
  endereco!: IEndereco;
  dateCreated!: ScalarDateTimeString;
  dateUpdated!: ScalarDateTimeString;
  dateDeleted!: ScalarDateTimeString | null;

  constructor(dados: { nomeFantasia: string; razaoSocial: string; apelido: string; cnpj: string }) {
    this.id = generateUuidV7();
    this.nomeFantasia = dados.nomeFantasia;
    this.razaoSocial = dados.razaoSocial;
    this.apelido = dados.apelido;
    this.cnpj = dados.cnpj;
    this.dateCreated = new Date().toISOString();
    this.dateUpdated = new Date().toISOString();
    this.dateDeleted = null;
  }

  validate(): void {
    const { result, rules } = createValidator("Campus");
    rules.required(this.nomeFantasia, "nomeFantasia");
    rules.minLength(this.nomeFantasia, "nomeFantasia", 1);
    rules.required(this.razaoSocial, "razaoSocial");
    rules.minLength(this.razaoSocial, "razaoSocial", 1);
    throwIfInvalid("Campus", result);
  }

  static create(dados: ICampusCreate, validar: boolean = true): Campus {
    const instance = new Campus(dados);
    if (validar) instance.validate();
    return instance;
  }

  static load(dados: Record<string, any>): Campus {
    const instance = Object.create(Campus.prototype) as Campus;
    if (dados.id !== undefined) instance.id = dados.id;
    if (dados.nomeFantasia !== undefined) instance.nomeFantasia = dados.nomeFantasia;
    if (dados.razaoSocial !== undefined) instance.razaoSocial = dados.razaoSocial;
    if (dados.apelido !== undefined) instance.apelido = dados.apelido;
    if (dados.cnpj !== undefined) instance.cnpj = dados.cnpj;
    if (dados.endereco !== undefined) instance.endereco = dados.endereco;
    if (dados.dateCreated !== undefined) instance.dateCreated = dados.dateCreated;
    if (dados.dateUpdated !== undefined) instance.dateUpdated = dados.dateUpdated;
    if (dados.dateDeleted !== undefined) instance.dateDeleted = dados.dateDeleted;
    return instance;
  }

  update(dados: ICampusUpdate): void {
    if (dados.nomeFantasia !== undefined) this.nomeFantasia = dados.nomeFantasia;
    if (dados.razaoSocial !== undefined) this.razaoSocial = dados.razaoSocial;
    if (dados.apelido !== undefined) this.apelido = dados.apelido;
    if (dados.cnpj !== undefined) this.cnpj = dados.cnpj;
    touchUpdated(this);
    this.validate();
  }

  isCnpjValido(): boolean {
    const cnpjLimpo = this.cnpj.replace(/\D/g, "");
    return /^\d{14}$/.test(cnpjLimpo);
  }
}
