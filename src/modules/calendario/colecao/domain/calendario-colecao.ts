import type { z } from "zod";
import { ObjectIdUuidFactory } from "@/domain/abstractions";
import type { ObjectUuidRef } from "@/domain/abstractions";
import type { IdUuid, ScalarDateTimeString } from "@/domain/abstractions/scalars";
import { generateUuidV7 } from "@/domain/entities/utils/generate-uuid-v7";
import { EntityValidationError } from "@/domain/errors";
import { zodValidate } from "@/shared/validation/index";
import { getNowISO } from "@/utils/date";
import {
  CalendarioColecaoCreateSchema,
  CalendarioColecaoSchema,
  CalendarioColecaoUpdateSchema,
} from "./calendario-colecao.schemas";
import { CalendarioColecaoVisibilidade } from "./calendario-colecao.types";

export type ICalendarioColecao = z.infer<typeof CalendarioColecaoSchema>;

export interface ICalendarioColecaoCreate {
  dono: ObjectUuidRef;
  campus?: ObjectUuidRef | null;
  nome: string;
  cor?: string | null;
  visibilidade?: CalendarioColecaoVisibilidade;
}

export class CalendarioColecao {
  static readonly entityName = "CalendarioColecao";

  id!: IdUuid;
  dono!: { id: string };
  campus!: { id: string } | null;
  nome!: string;
  cor!: string | null;
  visibilidade!: CalendarioColecaoVisibilidade;
  dateCreated!: ScalarDateTimeString;
  dateUpdated!: ScalarDateTimeString;
  dateDeleted!: ScalarDateTimeString | null;

  private constructor() {}

  static create(dados: ICalendarioColecaoCreate): CalendarioColecao {
    const parsed = zodValidate(
      CalendarioColecao.entityName,
      CalendarioColecaoCreateSchema.domain,
      dados,
    );

    const instance = new CalendarioColecao();

    instance.id = generateUuidV7();
    instance.dono = dados.dono;
    instance.campus = parsed.campus ?? null;
    instance.nome = parsed.nome;
    instance.cor = parsed.cor ?? null;
    instance.visibilidade = parsed.visibilidade as CalendarioColecaoVisibilidade;
    instance.dateCreated = getNowISO();
    instance.dateUpdated = getNowISO();
    instance.dateDeleted = null;

    return instance;
  }

  static load(dados: unknown): CalendarioColecao {
    const parsed = zodValidate(CalendarioColecao.entityName, CalendarioColecaoSchema, dados);

    const instance = new CalendarioColecao();

    instance.id = parsed.id;
    instance.dono = parsed.dono;
    instance.campus = parsed.campus;
    instance.nome = parsed.nome;
    instance.cor = parsed.cor;
    instance.visibilidade = parsed.visibilidade as CalendarioColecaoVisibilidade;
    instance.dateCreated = parsed.dateCreated;
    instance.dateUpdated = parsed.dateUpdated;
    instance.dateDeleted = parsed.dateDeleted;

    return instance;
  }

  update(dados: unknown): void {
    const parsed = zodValidate(
      CalendarioColecao.entityName,
      CalendarioColecaoUpdateSchema.domain,
      dados,
    );

    if (parsed.campus !== undefined) this.campus = parsed.campus;
    if (parsed.nome !== undefined) this.nome = parsed.nome;
    if (parsed.cor !== undefined) this.cor = parsed.cor;
    if (parsed.visibilidade !== undefined) {
      this.visibilidade = parsed.visibilidade as CalendarioColecaoVisibilidade;
    }

    if (this.visibilidade === CalendarioColecaoVisibilidade.CAMPUS && this.campus === null) {
      throw new EntityValidationError(CalendarioColecao.entityName, [
        {
          field: "campus",
          message: "campus é obrigatório quando visibilidade é CAMPUS",
          rule: "custom",
        },
      ]);
    }

    this.dateUpdated = getNowISO();
  }

  transferirDono(novoDono: ObjectUuidRef): void {
    const parsed = zodValidate(CalendarioColecao.entityName, ObjectIdUuidFactory.domain, novoDono);

    this.dono = parsed;
    this.dateUpdated = getNowISO();
  }

  isActive(): boolean {
    return this.dateDeleted === null;
  }
}
