import type { IEntityBaseUuid } from "@/domain/abstractions/entities";
import type { IdUuid, ScalarDateTimeString } from "@/domain/abstractions/scalars";
import { generateUuidV7 } from "@/domain/entities/utils/generate-uuid-v7.js";
import type { IDiario } from "@/modules/ensino/diario/domain/diario";
import { createValidator, throwIfInvalid, touchUpdated } from "@/utils/validation-utils.js";

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

  constructor(dados: {
    dataInicio: ScalarDateTimeString;
    dataFim?: ScalarDateTimeString | null;
    diaSemanaIso: number;
    aulasSeguidas: number;
  }) {
    this.id = generateUuidV7();
    this.dataInicio = dados.dataInicio;
    this.dataFim = dados.dataFim ?? null;
    this.diaSemanaIso = dados.diaSemanaIso;
    this.aulasSeguidas = dados.aulasSeguidas;
    this.dateCreated = new Date().toISOString();
    this.dateUpdated = new Date().toISOString();
    this.dateDeleted = null;
  }

  validate(): void {
    const { result, rules } = createValidator("DiarioPreferenciaAgrupamento");
    rules.required(this.dataInicio, "dataInicio");
    rules.dateFormat(this.dataInicio, "dataInicio");
    rules.requiredNumber(this.diaSemanaIso, "diaSemanaIso");
    rules.range(this.diaSemanaIso, "diaSemanaIso", 1, 7);
    rules.requiredNumber(this.aulasSeguidas, "aulasSeguidas");
    rules.min(this.aulasSeguidas, "aulasSeguidas", 1);
    throwIfInvalid("DiarioPreferenciaAgrupamento", result);
  }

  static create(
    dados: IDiarioPreferenciaAgrupamentoCreate,
    validar: boolean = true,
  ): DiarioPreferenciaAgrupamento {
    const instance = new DiarioPreferenciaAgrupamento(dados);
    if (validar) instance.validate();
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

  update(dados: IDiarioPreferenciaAgrupamentoUpdate): void {
    if (dados.dataInicio !== undefined) this.dataInicio = dados.dataInicio;
    if (dados.dataFim !== undefined) this.dataFim = dados.dataFim;
    if (dados.diaSemanaIso !== undefined) this.diaSemanaIso = dados.diaSemanaIso;
    if (dados.aulasSeguidas !== undefined) this.aulasSeguidas = dados.aulasSeguidas;
    touchUpdated(this);
    this.validate();
  }
}
