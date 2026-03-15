import type { IEntityBaseUuid } from "@/domain/abstractions/entities";
import type { IdUuid, ScalarDateTimeString } from "@/domain/abstractions/scalars";
import { generateUuidV7 } from "@/domain/entities/utils/generate-uuid-v7.js";
import { createValidator, throwIfInvalid, touchUpdated } from "@/utils/validation-utils.js";

export interface IModalidade extends IEntityBaseUuid {
  nome: string;
  slug: string;
}

export interface IModalidadeCreate {
  nome: string;
  slug: string;
}

export interface IModalidadeUpdate {
  nome?: string;
  slug?: string;
}

export class Modalidade implements IEntityBaseUuid {
  static readonly entityName = "Modalidade";

  id!: IdUuid;
  nome!: string;
  slug!: string;
  dateCreated!: ScalarDateTimeString;
  dateUpdated!: ScalarDateTimeString;
  dateDeleted!: ScalarDateTimeString | null;

  constructor(dados: { nome: string; slug: string }) {
    this.id = generateUuidV7();
    this.nome = dados.nome;
    this.slug = dados.slug;
    this.dateCreated = new Date().toISOString();
    this.dateUpdated = new Date().toISOString();
    this.dateDeleted = null;
  }

  validate(): void {
    const { result, rules } = createValidator("Modalidade");
    rules.required(this.nome, "nome");
    rules.minLength(this.nome, "nome", 1);
    rules.required(this.slug, "slug");
    rules.slug(this.slug, "slug");
    throwIfInvalid("Modalidade", result);
  }

  static create(dados: IModalidadeCreate, validar: boolean = true): Modalidade {
    const instance = new Modalidade(dados);
    if (validar) instance.validate();
    return instance;
  }

  static load(dados: Record<string, any>): Modalidade {
    const instance = Object.create(Modalidade.prototype) as Modalidade;
    if (dados.id !== undefined) instance.id = dados.id;
    if (dados.nome !== undefined) instance.nome = dados.nome;
    if (dados.slug !== undefined) instance.slug = dados.slug;
    if (dados.dateCreated !== undefined) instance.dateCreated = dados.dateCreated;
    if (dados.dateUpdated !== undefined) instance.dateUpdated = dados.dateUpdated;
    if (dados.dateDeleted !== undefined) instance.dateDeleted = dados.dateDeleted;
    return instance;
  }

  update(dados: IModalidadeUpdate): void {
    if (dados.nome !== undefined) this.nome = dados.nome;
    if (dados.slug !== undefined) this.slug = dados.slug;
    touchUpdated(this);
    this.validate();
  }
}
