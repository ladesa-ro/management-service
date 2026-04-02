import type { z } from "zod";
import type { IdUuid, ScalarDateTimeString } from "@/domain/abstractions/scalars";
import { generateUuidV7 } from "@/domain/entities/utils/generate-uuid-v7";
import { zodValidate } from "@/shared/validation/index";
import { getNowISO } from "@/utils/date";
import {
  ModalidadeCreateSchema,
  ModalidadeSchema,
  ModalidadeUpdateSchema,
} from "./modalidade.schemas";

export type IModalidade = z.infer<typeof ModalidadeSchema>;

export class Modalidade {
  static readonly entityName = "Modalidade";

  id!: IdUuid;
  nome!: string;
  slug!: string;
  imagemCapa!: { id: string } | null;
  dateCreated!: ScalarDateTimeString;
  dateUpdated!: ScalarDateTimeString;
  dateDeleted!: ScalarDateTimeString | null;

  private constructor() {}

  static create(dados: unknown): Modalidade {
    const parsed = zodValidate(Modalidade.entityName, ModalidadeCreateSchema.domain, dados);

    const instance = new Modalidade();

    instance.id = generateUuidV7();
    instance.nome = parsed.nome;
    instance.slug = parsed.slug;
    instance.imagemCapa = null;
    instance.dateCreated = getNowISO();
    instance.dateUpdated = getNowISO();
    instance.dateDeleted = null;

    return instance;
  }

  static load(dados: unknown): Modalidade {
    const parsed = zodValidate(Modalidade.entityName, ModalidadeSchema, dados);

    const instance = new Modalidade();

    instance.id = parsed.id;
    instance.nome = parsed.nome;
    instance.slug = parsed.slug;
    instance.imagemCapa = parsed.imagemCapa;
    instance.dateCreated = parsed.dateCreated;
    instance.dateUpdated = parsed.dateUpdated;
    instance.dateDeleted = parsed.dateDeleted;

    return instance;
  }

  update(dados: unknown): void {
    const parsed = zodValidate(Modalidade.entityName, ModalidadeUpdateSchema.domain, dados);

    if (parsed.nome !== undefined) this.nome = parsed.nome;
    if (parsed.slug !== undefined) this.slug = parsed.slug;

    this.dateUpdated = getNowISO();

    zodValidate(Modalidade.entityName, ModalidadeSchema, this);
  }

  isActive(): boolean {
    return this.dateDeleted === null;
  }
}
