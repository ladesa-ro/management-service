import type { z } from "zod";
import type { ObjectUuidRef } from "@/domain/abstractions";
import type { IdUuid, ScalarDateTimeString } from "@/domain/abstractions/scalars";
import { generateUuidV7 } from "@/domain/entities/utils/generate-uuid-v7";
import { zodValidate } from "@/shared/validation/index";
import { getNowISO } from "@/utils/date";
import {
  CalendarioIndisponibilidadeProfessorCreateSchema,
  CalendarioIndisponibilidadeProfessorSchema,
} from "./calendario-indisponibilidade-professor.schemas";
import { CalendarioIndisponibilidadeProfessorTipo } from "./calendario-indisponibilidade-professor.types";

export type ICalendarioIndisponibilidadeProfessor = z.infer<
  typeof CalendarioIndisponibilidadeProfessorSchema
>;

export interface ICalendarioIndisponibilidadeProfessorCreate {
  perfil: ObjectUuidRef;
  tipo: CalendarioIndisponibilidadeProfessorTipo;
  diaSemana?: number | null;
  data?: string | null;
  inicio: string;
  fim: string;
  motivo?: string | null;
}

/**
 * Regra semanal (dia_semana definido, data nula) OU exceção pontual (data definida,
 * dia_semana nulo) de indisponibilidade de um professor. Não possui update(): uma
 * indisponibilidade é criada ou apagada, nunca editada em vigor — se a regra precisa
 * mudar, apaga-se e cria-se outra.
 */
export class CalendarioIndisponibilidadeProfessor {
  static readonly entityName = "CalendarioIndisponibilidadeProfessor";

  id!: IdUuid;
  perfil!: { id: string };
  tipo!: CalendarioIndisponibilidadeProfessorTipo;
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
    dados: ICalendarioIndisponibilidadeProfessorCreate,
  ): CalendarioIndisponibilidadeProfessor {
    const parsed = zodValidate(
      CalendarioIndisponibilidadeProfessor.entityName,
      CalendarioIndisponibilidadeProfessorCreateSchema.domain,
      dados,
    );

    const instance = new CalendarioIndisponibilidadeProfessor();

    instance.id = generateUuidV7();
    instance.perfil = dados.perfil;
    instance.tipo = parsed.tipo as CalendarioIndisponibilidadeProfessorTipo;
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

  static load(dados: unknown): CalendarioIndisponibilidadeProfessor {
    const parsed = zodValidate(
      CalendarioIndisponibilidadeProfessor.entityName,
      CalendarioIndisponibilidadeProfessorSchema,
      dados,
    );

    const instance = new CalendarioIndisponibilidadeProfessor();

    instance.id = parsed.id;
    instance.perfil = parsed.perfil;
    instance.tipo = parsed.tipo as CalendarioIndisponibilidadeProfessorTipo;
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
