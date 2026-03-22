import type { z } from "zod";
import type { IdUuid, ScalarDateTimeString } from "@/domain/abstractions/scalars";
import { generateUuidV7 } from "@/domain/entities/utils/generate-uuid-v7";
import { zodValidate } from "@/shared/validation/index";
import {
  NivelFormacaoCreateSchema,
  NivelFormacaoSchema,
  NivelFormacaoUpdateSchema,
} from "./nivel-formacao.schemas";

export type INivelFormacao = z.infer<typeof NivelFormacaoSchema>;

export class NivelFormacao {
  static readonly entityName = "NivelFormacao";

  id!: IdUuid;
  slug!: string;
  dateCreated!: ScalarDateTimeString;
  dateUpdated!: ScalarDateTimeString;
  dateDeleted!: ScalarDateTimeString | null;

  private constructor() {}

  static create(dados: unknown): NivelFormacao {
    const parsed = zodValidate(NivelFormacao.entityName, NivelFormacaoCreateSchema, dados);

    const instance = new NivelFormacao();

    instance.id = generateUuidV7();
    instance.slug = parsed.slug;
    instance.dateCreated = new Date().toISOString();
    instance.dateUpdated = new Date().toISOString();
    instance.dateDeleted = null;

    return instance;
  }

  static load(dados: unknown): NivelFormacao {
    const parsed = zodValidate(NivelFormacao.entityName, NivelFormacaoSchema, dados);

    const instance = new NivelFormacao();

    instance.id = parsed.id;
    instance.slug = parsed.slug;
    instance.dateCreated = parsed.dateCreated;
    instance.dateUpdated = parsed.dateUpdated;
    instance.dateDeleted = parsed.dateDeleted;

    return instance;
  }

  update(dados: unknown): void {
    const parsed = zodValidate(NivelFormacao.entityName, NivelFormacaoUpdateSchema, dados);

    if (parsed.slug !== undefined) this.slug = parsed.slug;

    this.dateUpdated = new Date().toISOString();

    zodValidate(NivelFormacao.entityName, NivelFormacaoSchema, this);
  }
}
