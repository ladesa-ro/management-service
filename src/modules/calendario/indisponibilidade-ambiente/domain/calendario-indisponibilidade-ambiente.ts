import type { z } from "zod";
import type { ObjectUuidRef } from "@/domain/abstractions";
import type { IdUuid, ScalarDateTimeString } from "@/domain/abstractions/scalars";
import { generateUuidV7 } from "@/domain/entities/utils/generate-uuid-v7";
import { zodValidate } from "@/shared/validation/index";
import { getNowISO } from "@/utils/date";
import {
  CalendarioIndisponibilidadeAmbienteCreateSchema,
  CalendarioIndisponibilidadeAmbienteSchema,
} from "./calendario-indisponibilidade-ambiente.schemas";
import { CalendarioIndisponibilidadeAmbienteTipo } from "./calendario-indisponibilidade-ambiente.types";

export type ICalendarioIndisponibilidadeAmbiente = z.infer<
  typeof CalendarioIndisponibilidadeAmbienteSchema
>;

export interface ICalendarioIndisponibilidadeAmbienteCreate {
  ambiente: ObjectUuidRef;
  tipo: CalendarioIndisponibilidadeAmbienteTipo;
  diaSemana?: number | null;
  data?: string | null;
  inicio: string;
  fim: string;
  motivo?: string | null;
}

export class CalendarioIndisponibilidadeAmbiente {
  static readonly entityName = "CalendarioIndisponibilidadeAmbiente";

  id!: IdUuid;
  ambiente!: { id: string };
  tipo!: CalendarioIndisponibilidadeAmbienteTipo;
  diaSemana!: number | null;
  data!: string | null;
  inicio!: string;
  fim!: string;
  motivo!: string | null;
  dateCreated!: ScalarDateTimeString;
  dateUpdated!: ScalarDateTimeString;
  dateDeleted!: ScalarDateTimeString | null;

  private constructor() {}

  static create(
    dados: ICalendarioIndisponibilidadeAmbienteCreate,
  ): CalendarioIndisponibilidadeAmbiente {
    const parsed = zodValidate(
      CalendarioIndisponibilidadeAmbiente.entityName,
      CalendarioIndisponibilidadeAmbienteCreateSchema.domain,
      dados,
    );

    const instance = new CalendarioIndisponibilidadeAmbiente();

    instance.id = generateUuidV7();
    instance.ambiente = dados.ambiente;
    instance.tipo = parsed.tipo as CalendarioIndisponibilidadeAmbienteTipo;
    instance.diaSemana = parsed.diaSemana ?? null;
    instance.data = parsed.data ?? null;
    instance.inicio = parsed.inicio;
    instance.fim = parsed.fim;
    instance.motivo = parsed.motivo ?? null;
    instance.dateCreated = getNowISO();
    instance.dateUpdated = getNowISO();
    instance.dateDeleted = null;

    return instance;
  }

  static load(dados: unknown): CalendarioIndisponibilidadeAmbiente {
    const parsed = zodValidate(
      CalendarioIndisponibilidadeAmbiente.entityName,
      CalendarioIndisponibilidadeAmbienteSchema,
      dados,
    );

    const instance = new CalendarioIndisponibilidadeAmbiente();

    instance.id = parsed.id;
    instance.ambiente = parsed.ambiente;
    instance.tipo = parsed.tipo as CalendarioIndisponibilidadeAmbienteTipo;
    instance.diaSemana = parsed.diaSemana;
    instance.data = parsed.data;
    instance.inicio = parsed.inicio;
    instance.fim = parsed.fim;
    instance.motivo = parsed.motivo;
    instance.dateCreated = parsed.dateCreated;
    instance.dateUpdated = parsed.dateUpdated;
    instance.dateDeleted = parsed.dateDeleted;

    return instance;
  }

  isActive(): boolean {
    return this.dateDeleted === null;
  }
}
