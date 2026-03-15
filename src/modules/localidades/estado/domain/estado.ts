import type { IdNumeric } from "@/domain/abstractions/scalars";
import { createValidator, throwIfInvalid } from "@/utils/validation-utils.js";

export interface IEstado {
  id: IdNumeric;
  nome: string;
  sigla: string;
}

export interface IEstadoCreate {
  id: IdNumeric;
  nome: string;
  sigla: string;
}

export interface IEstadoUpdate {
  nome?: string;
  sigla?: string;
}

export class Estado {
  static readonly entityName = "Estado";

  id!: IdNumeric;
  nome!: string;
  sigla!: string;

  constructor(dados: { id: IdNumeric; nome: string; sigla: string }) {
    this.id = dados.id;
    this.nome = dados.nome;
    this.sigla = dados.sigla;
  }

  validate(): void {
    const { result, rules } = createValidator("Estado");
    rules.required(this.nome, "nome");
    rules.minLength(this.nome, "nome", 1);
    rules.required(this.sigla, "sigla");
    rules.custom(
      this.sigla,
      "sigla",
      (v) => /^[A-Z]{2}$/.test(v),
      "sigla deve ter 2 letras maiusculas",
      "format",
    );
    throwIfInvalid("Estado", result);
  }

  static create(dados: IEstadoCreate, validar: boolean = true): Estado {
    const instance = new Estado(dados);
    if (validar) instance.validate();
    return instance;
  }

  static load(dados: Record<string, any>): Estado {
    const instance = Object.create(Estado.prototype) as Estado;
    if (dados.id !== undefined) instance.id = dados.id;
    if (dados.nome !== undefined) instance.nome = dados.nome;
    if (dados.sigla !== undefined) instance.sigla = dados.sigla;
    return instance;
  }

  update(dados: IEstadoUpdate): void {
    if (dados.nome !== undefined) this.nome = dados.nome;
    if (dados.sigla !== undefined) this.sigla = dados.sigla;
    this.validate();
  }
}
