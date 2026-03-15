import type { IEntityBaseUuid } from "@/domain/abstractions/entities";
import type { IdUuid, ScalarDateTimeString } from "@/domain/abstractions/scalars";
import { generateUuidV7 } from "@/domain/entities/utils/generate-uuid-v7.js";
import type { IBloco } from "@/modules/ambientes/bloco";
import { createValidator, throwIfInvalid, touchUpdated } from "@/utils/validation-utils.js";

export interface IAmbiente extends IEntityBaseUuid {
  nome: string;
  descricao: string | null;
  codigo: string;
  capacidade: number | null;
  tipo: string | null;
  bloco: IBloco;
  imagemCapa: { id: IdUuid } | null;
}

export interface IAmbienteCreate {
  nome: string;
  descricao?: string | null;
  codigo: string;
  capacidade?: number | null;
  tipo?: string | null;
  bloco: { id: IdUuid };
}

export interface IAmbienteUpdate {
  nome?: string;
  descricao?: string | null;
  codigo?: string;
  capacidade?: number | null;
  tipo?: string | null;
}

export class Ambiente implements IEntityBaseUuid {
  static readonly entityName = "Ambiente";

  id!: IdUuid;
  nome!: string;
  descricao!: string | null;
  codigo!: string;
  capacidade!: number | null;
  tipo!: string | null;
  bloco!: IBloco;
  imagemCapa!: { id: string } | null;
  dateCreated!: ScalarDateTimeString;
  dateUpdated!: ScalarDateTimeString;
  dateDeleted!: ScalarDateTimeString | null;

  constructor(dados: {
    nome: string;
    descricao?: string | null;
    codigo: string;
    capacidade: number;
    tipo: string;
  }) {
    this.id = generateUuidV7();
    this.nome = dados.nome;
    this.descricao = dados.descricao ?? null;
    this.codigo = dados.codigo;
    this.capacidade = dados.capacidade;
    this.tipo = dados.tipo;
    this.imagemCapa = null;
    this.dateCreated = new Date().toISOString();
    this.dateUpdated = new Date().toISOString();
    this.dateDeleted = null;
  }

  validate(): void {
    const { result, rules } = createValidator("Ambiente");
    rules.required(this.nome, "nome");
    rules.minLength(this.nome, "nome", 1);
    rules.required(this.codigo, "codigo");
    rules.minLength(this.codigo, "codigo", 1);
    throwIfInvalid("Ambiente", result);
  }

  static create(dados: IAmbienteCreate, validar: boolean = true): Ambiente {
    const instance = new Ambiente({
      ...dados,
      capacidade: dados.capacidade ?? 0,
      tipo: dados.tipo ?? "",
    });
    if (validar) instance.validate();
    return instance;
  }

  static load(dados: Record<string, any>): Ambiente {
    const instance = Object.create(Ambiente.prototype) as Ambiente;
    if (dados.id !== undefined) instance.id = dados.id;
    if (dados.nome !== undefined) instance.nome = dados.nome;
    if (dados.descricao !== undefined) instance.descricao = dados.descricao;
    if (dados.codigo !== undefined) instance.codigo = dados.codigo;
    if (dados.capacidade !== undefined) instance.capacidade = dados.capacidade;
    if (dados.tipo !== undefined) instance.tipo = dados.tipo;
    if (dados.bloco !== undefined) instance.bloco = dados.bloco;
    if (dados.imagemCapa !== undefined) instance.imagemCapa = dados.imagemCapa;
    if (dados.dateCreated !== undefined) instance.dateCreated = dados.dateCreated;
    if (dados.dateUpdated !== undefined) instance.dateUpdated = dados.dateUpdated;
    if (dados.dateDeleted !== undefined) instance.dateDeleted = dados.dateDeleted;
    return instance;
  }

  update(dados: IAmbienteUpdate): void {
    if (dados.nome !== undefined) this.nome = dados.nome;
    if (dados.descricao !== undefined) this.descricao = dados.descricao;
    if (dados.codigo !== undefined) this.codigo = dados.codigo;
    if (dados.capacidade !== undefined) this.capacidade = dados.capacidade;
    if (dados.tipo !== undefined) this.tipo = dados.tipo;
    touchUpdated(this);
    this.validate();
  }
}
