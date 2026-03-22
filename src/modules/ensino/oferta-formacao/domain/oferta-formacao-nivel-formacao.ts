import type { IdUuid, ScalarDateTimeString } from "@/domain/abstractions/scalars";
import { generateUuidV7 } from "@/domain/entities/utils/generate-uuid-v7";
import { zodValidate } from "@/shared/validation/index";
import {
  OfertaFormacaoNivelFormacaoCreateSchema,
  OfertaFormacaoNivelFormacaoSchema,
} from "./oferta-formacao-nivel-formacao.schemas";

export type IOfertaFormacaoNivelFormacao = OfertaFormacaoNivelFormacao;

export class OfertaFormacaoNivelFormacao {
  static readonly entityName = "OfertaFormacaoNivelFormacao";

  id!: IdUuid;
  nivelFormacao!: { id: string };
  ofertaFormacao!: { id: string };
  dateCreated!: ScalarDateTimeString;
  dateUpdated!: ScalarDateTimeString;
  dateDeleted!: ScalarDateTimeString | null;

  private constructor() {}

  static create(dados: unknown): OfertaFormacaoNivelFormacao {
    const parsed = zodValidate(
      OfertaFormacaoNivelFormacao.entityName,
      OfertaFormacaoNivelFormacaoCreateSchema,
      dados,
    );

    const instance = new OfertaFormacaoNivelFormacao();

    instance.id = generateUuidV7();
    instance.nivelFormacao = parsed.nivelFormacao;
    instance.ofertaFormacao = parsed.ofertaFormacao;
    instance.dateCreated = new Date().toISOString();
    instance.dateUpdated = new Date().toISOString();
    instance.dateDeleted = null;

    return instance;
  }

  static load(dados: unknown): OfertaFormacaoNivelFormacao {
    const parsed = zodValidate(
      OfertaFormacaoNivelFormacao.entityName,
      OfertaFormacaoNivelFormacaoSchema,
      dados,
    );

    const instance = new OfertaFormacaoNivelFormacao();

    instance.id = parsed.id;
    instance.nivelFormacao = parsed.nivelFormacao;
    instance.ofertaFormacao = parsed.ofertaFormacao;
    instance.dateCreated = parsed.dateCreated;
    instance.dateUpdated = parsed.dateUpdated;
    instance.dateDeleted = parsed.dateDeleted;

    return instance;
  }
}
