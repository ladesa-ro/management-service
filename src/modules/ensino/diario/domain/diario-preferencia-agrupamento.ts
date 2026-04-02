import type { z } from "zod";
import type { IdUuid, ScalarDateTimeString } from "@/domain/abstractions/scalars";
import { generateUuidV7 } from "@/domain/entities/utils/generate-uuid-v7";
import { zodValidate } from "@/shared/validation/index";
import { getNowISO } from "@/utils/date";
import {
  DiarioPreferenciaAgrupamentoCreateSchema,
  DiarioPreferenciaAgrupamentoSchema,
  DiarioPreferenciaAgrupamentoUpdateSchema,
} from "./diario-preferencia-agrupamento.schemas";

export type IDiarioPreferenciaAgrupamento = z.infer<typeof DiarioPreferenciaAgrupamentoSchema>;

export interface IDiarioPreferenciaAgrupamentoCreate {
  dataInicio: ScalarDateTimeString;
  dataFim?: ScalarDateTimeString | null;
  diaSemanaIso: number;
  aulasSeguidas: number;
  diario: { id: IdUuid };
}

export interface IDiarioPreferenciaAgrupamentoUpdate {
  dataInicio?: ScalarDateTimeString;
  dataFim?: ScalarDateTimeString | null;
  diaSemanaIso?: number;
  aulasSeguidas?: number;
  diario?: { id: IdUuid };
}

export class DiarioPreferenciaAgrupamento {
  static readonly entityName = "DiarioPreferenciaAgrupamento";

  id!: IdUuid;
  dataInicio!: ScalarDateTimeString;
  dataFim!: ScalarDateTimeString | null;
  diaSemanaIso!: number;
  aulasSeguidas!: number;
  diario!: { id: string };
  dateCreated!: ScalarDateTimeString;
  dateUpdated!: ScalarDateTimeString;
  dateDeleted!: ScalarDateTimeString | null;

  private constructor() {}

  static create(dados: IDiarioPreferenciaAgrupamentoCreate): DiarioPreferenciaAgrupamento {
    const parsed = zodValidate(
      DiarioPreferenciaAgrupamento.entityName,
      DiarioPreferenciaAgrupamentoCreateSchema.domain,
      dados,
    );

    const instance = new DiarioPreferenciaAgrupamento();

    instance.id = generateUuidV7();
    instance.dataInicio = parsed.dataInicio;
    instance.dataFim = parsed.dataFim ?? null;
    instance.diaSemanaIso = parsed.diaSemanaIso;
    instance.aulasSeguidas = parsed.aulasSeguidas;
    instance.diario = parsed.diario;
    instance.dateCreated = getNowISO();
    instance.dateUpdated = getNowISO();
    instance.dateDeleted = null;

    return instance;
  }

  static load(dados: unknown): DiarioPreferenciaAgrupamento {
    const parsed = zodValidate(
      DiarioPreferenciaAgrupamento.entityName,
      DiarioPreferenciaAgrupamentoSchema,
      dados,
    );

    const instance = new DiarioPreferenciaAgrupamento();

    instance.id = parsed.id;
    instance.dataInicio = parsed.dataInicio;
    instance.dataFim = parsed.dataFim;
    instance.diaSemanaIso = parsed.diaSemanaIso;
    instance.aulasSeguidas = parsed.aulasSeguidas;
    instance.diario = parsed.diario;
    instance.dateCreated = parsed.dateCreated;
    instance.dateUpdated = parsed.dateUpdated;
    instance.dateDeleted = parsed.dateDeleted;
    return instance;
  }

  update(dados: unknown): void {
    const parsed = zodValidate(
      DiarioPreferenciaAgrupamento.entityName,
      DiarioPreferenciaAgrupamentoUpdateSchema.domain,
      dados,
    );

    if (parsed.dataInicio !== undefined) this.dataInicio = parsed.dataInicio;
    if (parsed.dataFim !== undefined) this.dataFim = parsed.dataFim ?? null;
    if (parsed.diaSemanaIso !== undefined) this.diaSemanaIso = parsed.diaSemanaIso;
    if (parsed.aulasSeguidas !== undefined) this.aulasSeguidas = parsed.aulasSeguidas;

    this.dateUpdated = getNowISO();
    zodValidate(DiarioPreferenciaAgrupamento.entityName, DiarioPreferenciaAgrupamentoSchema, this);
  }

  isActive(): boolean {
    return this.dateDeleted === null;
  }
}
