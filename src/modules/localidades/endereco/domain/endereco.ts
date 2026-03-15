import type { IEntityBaseUuid } from "@/domain/abstractions/entities";
import type { IdNumeric, IdUuid, ScalarDateTimeString } from "@/domain/abstractions/scalars";
import { generateUuidV7 } from "@/domain/entities/utils/generate-uuid-v7.js";
import type { ICidade } from "@/modules/localidades/cidade";
import { createValidator, throwIfInvalid, touchUpdated } from "@/utils/validation-utils.js";

export interface IEndereco extends IEntityBaseUuid {
  cep: string;
  logradouro: string;
  numero: number;
  bairro: string;
  complemento: string | null;
  pontoReferencia: string | null;
  cidade: ICidade;
}

export interface IEnderecoInput {
  cep: string;
  logradouro: string;
  numero: number;
  bairro: string;
  complemento?: string | null;
  pontoReferencia?: string | null;
  cidade: { id: IdNumeric };
}

export interface IEnderecoCreate {
  cep: string;
  logradouro: string;
  numero: number;
  bairro: string;
  complemento?: string | null;
  pontoReferencia?: string | null;
  cidade: { id: IdNumeric };
}

export interface IEnderecoUpdate {
  cep?: string;
  logradouro?: string;
  numero?: number;
  bairro?: string;
  complemento?: string | null;
  pontoReferencia?: string | null;
  cidade?: { id: IdNumeric };
}

export class Endereco implements IEntityBaseUuid {
  static readonly entityName = "Endereco";

  id!: IdUuid;
  cep!: string;
  logradouro!: string;
  numero!: number;
  bairro!: string;
  complemento!: string | null;
  pontoReferencia!: string | null;
  cidade!: ICidade;
  dateCreated!: ScalarDateTimeString;
  dateUpdated!: ScalarDateTimeString;
  dateDeleted!: ScalarDateTimeString | null;

  constructor(dados: {
    cep: string;
    logradouro: string;
    numero: number;
    bairro: string;
    complemento?: string | null;
    pontoReferencia?: string | null;
  }) {
    this.id = generateUuidV7();
    this.cep = dados.cep;
    this.logradouro = dados.logradouro;
    this.numero = dados.numero;
    this.bairro = dados.bairro;
    this.complemento = dados.complemento ?? null;
    this.pontoReferencia = dados.pontoReferencia ?? null;
    this.dateCreated = new Date().toISOString();
    this.dateUpdated = new Date().toISOString();
    this.dateDeleted = null;
  }

  validate(): void {
    const { result, rules } = createValidator("Endereco");
    rules.required(this.cep, "cep");
    rules.required(this.logradouro, "logradouro");
    rules.minLength(this.logradouro, "logradouro", 1);
    rules.requiredNumber(this.numero, "numero");
    rules.required(this.bairro, "bairro");
    rules.minLength(this.bairro, "bairro", 1);
    throwIfInvalid("Endereco", result);
  }

  static create(dados: IEnderecoCreate, validar: boolean = true): Endereco {
    const instance = new Endereco(dados);
    if (validar) instance.validate();
    return instance;
  }

  static load(dados: Record<string, any>): Endereco {
    const instance = Object.create(Endereco.prototype) as Endereco;
    if (dados.id !== undefined) instance.id = dados.id;
    if (dados.cep !== undefined) instance.cep = dados.cep;
    if (dados.logradouro !== undefined) instance.logradouro = dados.logradouro;
    if (dados.numero !== undefined) instance.numero = dados.numero;
    if (dados.bairro !== undefined) instance.bairro = dados.bairro;
    if (dados.complemento !== undefined) instance.complemento = dados.complemento;
    if (dados.pontoReferencia !== undefined) instance.pontoReferencia = dados.pontoReferencia;
    if (dados.cidade !== undefined) instance.cidade = dados.cidade;
    if (dados.dateCreated !== undefined) instance.dateCreated = dados.dateCreated;
    if (dados.dateUpdated !== undefined) instance.dateUpdated = dados.dateUpdated;
    if (dados.dateDeleted !== undefined) instance.dateDeleted = dados.dateDeleted;
    return instance;
  }

  update(dados: IEnderecoUpdate): void {
    if (dados.cep !== undefined) this.cep = dados.cep;
    if (dados.logradouro !== undefined) this.logradouro = dados.logradouro;
    if (dados.numero !== undefined) this.numero = dados.numero;
    if (dados.bairro !== undefined) this.bairro = dados.bairro;
    if (dados.complemento !== undefined) this.complemento = dados.complemento ?? null;
    if (dados.pontoReferencia !== undefined) this.pontoReferencia = dados.pontoReferencia ?? null;
    touchUpdated(this);
    this.validate();
  }

  getEnderecoFormatado(): string {
    const partes = [
      this.logradouro,
      this.numero.toString(),
      this.complemento,
      this.bairro,
      this.cidade?.nome,
      this.cidade?.estado?.sigla,
      this.cep,
    ].filter(Boolean);

    return partes.join(", ");
  }

  isCepValido(): boolean {
    const cepLimpo = this.cep.replace(/\D/g, "");
    return /^\d{8}$/.test(cepLimpo);
  }
}
