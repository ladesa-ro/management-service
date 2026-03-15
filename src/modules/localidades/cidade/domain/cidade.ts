import type { IdNumeric } from "@/domain/abstractions/scalars";
import type { IEstado } from "@/modules/localidades/estado";
import { createValidator, throwIfInvalid } from "@/utils/validation-utils.js";

export interface ICidade {
  id: IdNumeric;
  nome: string;
  estado: IEstado;
}

export interface ICidadeCreate {
  id: IdNumeric;
  nome: string;
}

export interface ICidadeUpdate {
  nome?: string;
}

export class Cidade {
  static readonly entityName = "Cidade";

  id!: IdNumeric;
  nome!: string;
  estado!: IEstado;

  constructor(dados: { id: IdNumeric; nome: string }) {
    this.id = dados.id;
    this.nome = dados.nome;
  }

  validate(): void {
    const { result, rules } = createValidator("Cidade");
    rules.required(this.nome, "nome");
    rules.minLength(this.nome, "nome", 1);
    throwIfInvalid("Cidade", result);
  }

  static create(dados: ICidadeCreate, validar: boolean = true): Cidade {
    const instance = new Cidade(dados);
    if (validar) instance.validate();
    return instance;
  }

  static load(dados: Record<string, any>): Cidade {
    const instance = Object.create(Cidade.prototype) as Cidade;
    if (dados.id !== undefined) instance.id = dados.id;
    if (dados.nome !== undefined) instance.nome = dados.nome;
    if (dados.estado !== undefined) instance.estado = dados.estado;
    return instance;
  }

  update(dados: ICidadeUpdate): void {
    if (dados.nome !== undefined) this.nome = dados.nome;
    this.validate();
  }

  getNomeCompleto(): string {
    return `${this.nome} - ${this.estado.sigla}`;
  }
}
