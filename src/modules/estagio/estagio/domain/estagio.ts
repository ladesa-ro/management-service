import type { z } from "zod";
import type { ObjectUuidRef } from "@/domain/abstractions";
import type { IdUuid, ScalarDateTimeString } from "@/domain/abstractions/scalars";
import { generateUuidV7 } from "@/domain/entities/utils/generate-uuid-v7";
import { zodValidate } from "@/shared/validation/index";
import { getNowISO } from "@/utils/date";
import {
  EstagioCreateSchema,
  EstagioSchema,
  EstagioUpdateSchema,
  HorarioEstagioSchema,
} from "./estagio.schemas";

export enum EstagioStatus {
  ABERTA = "ABERTA",
  EM_ANDAMENTO = "EM_ANDAMENTO",
  CONCLUIDA = "CONCLUIDA",
}

export type IHorarioEstagio = z.infer<typeof HorarioEstagioSchema>;

export type IEstagio = z.infer<typeof EstagioSchema>;

export class Estagio {
  static readonly entityName = "Estagio";

  id!: IdUuid;
  empresa!: ObjectUuidRef;
  estagiario!: ObjectUuidRef | null;
  cargaHoraria!: number;
  dataInicio!: string | null;
  dataFim!: string | null;
  status!: EstagioStatus;
  horariosEstagio!: IHorarioEstagio[];
  dateCreated!: ScalarDateTimeString;
  dateUpdated!: ScalarDateTimeString;
  dateDeleted!: ScalarDateTimeString | null;

  private constructor() {}

  get ativo(): boolean {
    return this.dateDeleted === null;
  }

  static create(dados: unknown): Estagio {
    const parsed = zodValidate(Estagio.entityName, EstagioCreateSchema.domain, dados);

    const instance = new Estagio();

    instance.id = generateUuidV7();
    instance.empresa = parsed.empresa;
    instance.estagiario = parsed.estagiario ?? null;
    instance.cargaHoraria = parsed.cargaHoraria;
    instance.dataInicio = parsed.dataInicio ?? null;
    instance.dataFim = parsed.dataFim ?? null;
    instance.status = (parsed.status ?? EstagioStatus.ABERTA) as EstagioStatus;
    instance.horariosEstagio = parsed.horariosEstagio ?? [];
    instance.dateCreated = getNowISO();
    instance.dateUpdated = getNowISO();
    instance.dateDeleted = null;

    return instance;
  }

  static load(dados: unknown): Estagio {
    const parsed = zodValidate(Estagio.entityName, EstagioSchema, dados);

    const instance = new Estagio();

    instance.id = parsed.id;
    instance.empresa = parsed.empresa;
    instance.estagiario = parsed.estagiario;
    instance.cargaHoraria = parsed.cargaHoraria;
    instance.dataInicio = parsed.dataInicio;
    instance.dataFim = parsed.dataFim;
    instance.status = parsed.status as EstagioStatus;
    instance.horariosEstagio = parsed.horariosEstagio;
    instance.dateCreated = parsed.dateCreated;
    instance.dateUpdated = parsed.dateUpdated;
    instance.dateDeleted = parsed.dateDeleted;

    return instance;
  }

  update(dados: unknown): void {
    const parsed = zodValidate(Estagio.entityName, EstagioUpdateSchema.domain, dados);

    if (parsed.empresa !== undefined) this.empresa = parsed.empresa;
    if (parsed.estagiario !== undefined) this.estagiario = parsed.estagiario ?? null;
    if (parsed.cargaHoraria !== undefined) this.cargaHoraria = parsed.cargaHoraria;
    if (parsed.dataInicio !== undefined) this.dataInicio = parsed.dataInicio ?? null;
    if (parsed.dataFim !== undefined) this.dataFim = parsed.dataFim ?? null;
    if (parsed.status !== undefined) this.status = parsed.status as EstagioStatus;
    if (parsed.horariosEstagio !== undefined) this.horariosEstagio = parsed.horariosEstagio;

    this.dateUpdated = getNowISO();

    zodValidate(Estagio.entityName, EstagioSchema, this);
  }
}
