import type { IEntityBaseUuid } from "@/domain/abstractions/entities";
import type { IdUuid, ScalarDateTimeString } from "@/domain/abstractions/scalars";
import { generateUuidV7 } from "@/domain/entities/utils/generate-uuid-v7.js";
import { createValidator, throwIfInvalid, touchUpdated } from "@/utils/validation-utils.js";

export interface INivelFormacao extends IEntityBaseUuid {
  slug: string;
}

export interface INivelFormacaoCreate {
  slug: string;
}

export interface INivelFormacaoUpdate {
  slug?: string;
}

export class NivelFormacao implements IEntityBaseUuid {
  static readonly entityName = "NivelFormacao";

  id!: IdUuid;
  slug!: string;
  dateCreated!: ScalarDateTimeString;
  dateUpdated!: ScalarDateTimeString;
  dateDeleted!: ScalarDateTimeString | null;

  constructor(dados: { slug: string }) {
    this.id = generateUuidV7();
    this.slug = dados.slug;
    this.dateCreated = new Date().toISOString();
    this.dateUpdated = new Date().toISOString();
    this.dateDeleted = null;
  }

  validate(): void {
    const { result, rules } = createValidator("NivelFormacao");
    rules.required(this.slug, "slug");
    rules.slug(this.slug, "slug");
    throwIfInvalid("NivelFormacao", result);
  }

  static create(dados: INivelFormacaoCreate, validar: boolean = true): NivelFormacao {
    const instance = new NivelFormacao(dados);
    if (validar) instance.validate();
    return instance;
  }

  static load(dados: Record<string, any>): NivelFormacao {
    const instance = Object.create(NivelFormacao.prototype) as NivelFormacao;
    if (dados.id !== undefined) instance.id = dados.id;
    if (dados.slug !== undefined) instance.slug = dados.slug;
    if (dados.dateCreated !== undefined) instance.dateCreated = dados.dateCreated;
    if (dados.dateUpdated !== undefined) instance.dateUpdated = dados.dateUpdated;
    if (dados.dateDeleted !== undefined) instance.dateDeleted = dados.dateDeleted;
    return instance;
  }

  update(dados: INivelFormacaoUpdate): void {
    if (dados.slug !== undefined) this.slug = dados.slug;
    touchUpdated(this);
    this.validate();
  }
}
