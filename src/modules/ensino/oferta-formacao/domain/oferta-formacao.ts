import type { IEntityBaseUuid } from "@/domain/abstractions/entities";
import type { IdUuid, ScalarDateTimeString } from "@/domain/abstractions/scalars";
import { generateUuidV7 } from "@/domain/entities/utils/generate-uuid-v7.js";
import type { IModalidade } from "@/modules/ensino/modalidade";
import { createValidator, throwIfInvalid, touchUpdated } from "@/utils/validation-utils.js";

export interface IOfertaFormacao extends IEntityBaseUuid {
  nome: string;
  slug: string;
  modalidade: IModalidade | null;
}

export interface IOfertaFormacaoCreate {
  nome: string;
  slug: string;
  modalidade?: { id: IdUuid };
}

export interface IOfertaFormacaoUpdate {
  nome?: string;
  slug?: string;
  modalidade?: { id: IdUuid } | null;
}

export class OfertaFormacao implements IEntityBaseUuid {
  static readonly entityName = "OfertaFormacao";

  id!: IdUuid;
  nome!: string;
  slug!: string;
  modalidade!: IModalidade | null;
  dateCreated!: ScalarDateTimeString;
  dateUpdated!: ScalarDateTimeString;
  dateDeleted!: ScalarDateTimeString | null;

  constructor(dados: { nome: string; slug: string }) {
    this.id = generateUuidV7();
    this.nome = dados.nome;
    this.slug = dados.slug;
    this.modalidade = null;
    this.dateCreated = new Date().toISOString();
    this.dateUpdated = new Date().toISOString();
    this.dateDeleted = null;
  }

  validate(): void {
    const { result, rules } = createValidator("OfertaFormacao");
    rules.required(this.nome, "nome");
    rules.minLength(this.nome, "nome", 1);
    rules.required(this.slug, "slug");
    rules.slug(this.slug, "slug");
    throwIfInvalid("OfertaFormacao", result);
  }

  static create(dados: IOfertaFormacaoCreate, validar: boolean = true): OfertaFormacao {
    const instance = new OfertaFormacao(dados);
    if (validar) instance.validate();
    return instance;
  }

  static load(dados: Record<string, any>): OfertaFormacao {
    const instance = Object.create(OfertaFormacao.prototype) as OfertaFormacao;
    if (dados.id !== undefined) instance.id = dados.id;
    if (dados.nome !== undefined) instance.nome = dados.nome;
    if (dados.slug !== undefined) instance.slug = dados.slug;
    if (dados.modalidade !== undefined) instance.modalidade = dados.modalidade;
    if (dados.dateCreated !== undefined) instance.dateCreated = dados.dateCreated;
    if (dados.dateUpdated !== undefined) instance.dateUpdated = dados.dateUpdated;
    if (dados.dateDeleted !== undefined) instance.dateDeleted = dados.dateDeleted;
    return instance;
  }

  update(dados: IOfertaFormacaoUpdate): void {
    if (dados.nome !== undefined) this.nome = dados.nome;
    if (dados.slug !== undefined) this.slug = dados.slug;
    touchUpdated(this);
    this.validate();
  }
}
