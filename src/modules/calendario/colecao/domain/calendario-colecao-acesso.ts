import type { z } from "zod";
import type { ObjectUuidRef } from "@/domain/abstractions";
import type { IdUuid, ScalarDateTimeString } from "@/domain/abstractions/scalars";
import { generateUuidV7 } from "@/domain/entities/utils/generate-uuid-v7";
import { zodValidate } from "@/shared/validation/index";
import { getNowISO } from "@/utils/date";
import {
  CalendarioColecaoAcessoCreateSchema,
  CalendarioColecaoAcessoSchema,
} from "./calendario-colecao-acesso.schemas";
import type {
  CalendarioColecaoAcessoEscopo,
  CalendarioColecaoAcessoPapel,
} from "./calendario-colecao-acesso.types";

export type ICalendarioColecaoAcesso = z.infer<typeof CalendarioColecaoAcessoSchema>;

export interface ICalendarioColecaoAcessoCreate {
  colecao: ObjectUuidRef;
  escopo: CalendarioColecaoAcessoEscopo;
  usuario?: ObjectUuidRef | null;
  campus?: ObjectUuidRef | null;
  papel: CalendarioColecaoAcessoPapel;
}

export class CalendarioColecaoAcesso {
  static readonly entityName = "CalendarioColecaoAcesso";

  id!: IdUuid;
  colecao!: { id: string };
  escopo!: CalendarioColecaoAcessoEscopo;
  usuario!: { id: string } | null;
  campus!: { id: string } | null;
  papel!: CalendarioColecaoAcessoPapel;
  dateCreated!: ScalarDateTimeString;
  dateUpdated!: ScalarDateTimeString;
  dateDeleted!: ScalarDateTimeString | null;

  private constructor() {}

  static create(dados: ICalendarioColecaoAcessoCreate): CalendarioColecaoAcesso {
    const parsed = zodValidate(
      CalendarioColecaoAcesso.entityName,
      CalendarioColecaoAcessoCreateSchema.domain,
      dados,
    );

    const instance = new CalendarioColecaoAcesso();

    instance.id = generateUuidV7();
    instance.colecao = dados.colecao;
    instance.escopo = parsed.escopo as CalendarioColecaoAcessoEscopo;
    instance.usuario = parsed.usuario ?? null;
    instance.campus = parsed.campus ?? null;
    instance.papel = parsed.papel as CalendarioColecaoAcessoPapel;
    instance.dateCreated = getNowISO();
    instance.dateUpdated = getNowISO();
    instance.dateDeleted = null;

    return instance;
  }

  static load(dados: unknown): CalendarioColecaoAcesso {
    const parsed = zodValidate(
      CalendarioColecaoAcesso.entityName,
      CalendarioColecaoAcessoSchema,
      dados,
    );

    const instance = new CalendarioColecaoAcesso();

    instance.id = parsed.id;
    instance.colecao = parsed.colecao;
    instance.escopo = parsed.escopo as CalendarioColecaoAcessoEscopo;
    instance.usuario = parsed.usuario;
    instance.campus = parsed.campus;
    instance.papel = parsed.papel as CalendarioColecaoAcessoPapel;
    instance.dateCreated = parsed.dateCreated;
    instance.dateUpdated = parsed.dateUpdated;
    instance.dateDeleted = parsed.dateDeleted;

    return instance;
  }

  isActive(): boolean {
    return this.dateDeleted === null;
  }
}
