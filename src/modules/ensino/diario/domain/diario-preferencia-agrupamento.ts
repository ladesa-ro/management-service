import type { IEntityBaseUuid } from "@/domain/abstractions/entities";
import type { IdUuid, ScalarDateTimeString } from "@/domain/abstractions/scalars";
import { generateUuidV7 } from "@/domain/entities/utils/generate-uuid-v7";
import type { IDiario } from "@/modules/ensino/diario/domain/diario";
import { zodValidate } from "@/shared/validation/index";
import { getNowISO } from "@/utils/date";
import {
  DiarioPreferenciaAgrupamentoCreateSchema,
  DiarioPreferenciaAgrupamentoSchema,
  DiarioPreferenciaAgrupamentoUpdateSchema,
} from "./diario-preferencia-agrupamento.schemas";

export interface IDiarioPreferenciaAgrupamento extends IEntityBaseUuid {
  dataInicio: ScalarDateTimeString;
  dataFim: ScalarDateTimeString | null;
  diaSemanaIso: number;
  aulasSeguidas: number;
  diario: IDiario;
}

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

export class DiarioPreferenciaAgrupamento implements IEntityBaseUuid {
  static readonly entityName = "DiarioPreferenciaAgrupamento";

  id!: IdUuid;
  dataInicio!: ScalarDateTimeString;
  dataFim!: ScalarDateTimeString | null;
  diaSemanaIso!: number;
  aulasSeguidas!: number;
  diario!: IDiario;
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

    const instance = Object.create(
      DiarioPreferenciaAgrupamento.prototype,
    ) as DiarioPreferenciaAgrupamento;

    instance.id = generateUuidV7();
    instance.dataInicio = parsed.dataInicio;
    instance.dataFim = parsed.dataFim ?? null;
    instance.diaSemanaIso = parsed.diaSemanaIso;
    instance.aulasSeguidas = parsed.aulasSeguidas;
    instance.dateCreated = getNowISO();
    instance.dateUpdated = getNowISO();
    instance.dateDeleted = null;

    return instance;
  }

  static load(dados: Record<string, any>): DiarioPreferenciaAgrupamento {
    const instance = Object.create(
      DiarioPreferenciaAgrupamento.prototype,
    ) as DiarioPreferenciaAgrupamento;
    if (dados.id !== undefined) instance.id = dados.id;
    if (dados.dataInicio !== undefined) instance.dataInicio = dados.dataInicio;
    if (dados.dataFim !== undefined) instance.dataFim = dados.dataFim;
    if (dados.diaSemanaIso !== undefined) instance.diaSemanaIso = dados.diaSemanaIso;
    if (dados.aulasSeguidas !== undefined) instance.aulasSeguidas = dados.aulasSeguidas;
    if (dados.diario !== undefined) instance.diario = dados.diario;
    if (dados.dateCreated !== undefined) instance.dateCreated = dados.dateCreated;
    if (dados.dateUpdated !== undefined) instance.dateUpdated = dados.dateUpdated;
    if (dados.dateDeleted !== undefined) instance.dateDeleted = dados.dateDeleted;
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
}
