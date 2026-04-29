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
  EM_FASE_INICIAL = "EM_FASE_INICIAL",
  EM_ANDAMENTO = "EM_ANDAMENTO",
  RESCINDIDO = "RESCINDIDO",
  COM_PENDENCIA = "COM_PENDENCIA",
  ENCERRADO = "ENCERRADO",
  APTO_PARA_ENCERRAMENTO = "APTO_PARA_ENCERRAMENTO",
}

export type IHorarioEstagio = z.infer<typeof HorarioEstagioSchema>;

export type IEstagio = z.infer<typeof EstagioSchema>;

export class Estagio {
  static readonly entityName = "Estagio";

  id!: IdUuid;
  empresa!: ObjectUuidRef;
  estagiario!: ObjectUuidRef | null;
  usuarioOrientador!: ObjectUuidRef | null;
  cargaHoraria!: number;
  dataInicio!: string | null;
  dataFim!: string | null;
  status!: EstagioStatus;
  nomeSupervisor!: string | null;
  emailSupervisor!: string | null;
  telefoneSupervisor!: string | null;
  aditivo!: boolean;
  tipoAditivo!: string | null;
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
    instance.usuarioOrientador = parsed.usuarioOrientador ?? null;
    instance.cargaHoraria = parsed.cargaHoraria;
    instance.dataInicio = parsed.dataInicio ?? null;
    instance.dataFim = parsed.dataFim ?? null;
    instance.status = (parsed.status ?? EstagioStatus.EM_FASE_INICIAL) as EstagioStatus;
    instance.nomeSupervisor = parsed.nomeSupervisor ?? null;
    instance.emailSupervisor = parsed.emailSupervisor ?? null;
    instance.telefoneSupervisor = parsed.telefoneSupervisor ?? null;
    instance.aditivo = parsed.aditivo ?? false;
    instance.tipoAditivo = parsed.tipoAditivo ?? null;
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
    instance.usuarioOrientador = parsed.usuarioOrientador;
    instance.cargaHoraria = parsed.cargaHoraria;
    instance.dataInicio = parsed.dataInicio;
    instance.dataFim = parsed.dataFim;
    instance.status = parsed.status as EstagioStatus;
    instance.nomeSupervisor = parsed.nomeSupervisor;
    instance.emailSupervisor = parsed.emailSupervisor;
    instance.telefoneSupervisor = parsed.telefoneSupervisor;
    instance.aditivo = parsed.aditivo;
    instance.tipoAditivo = parsed.tipoAditivo;
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
    if (parsed.usuarioOrientador !== undefined)
      this.usuarioOrientador = parsed.usuarioOrientador ?? null;
    if (parsed.cargaHoraria !== undefined) this.cargaHoraria = parsed.cargaHoraria;
    if (parsed.dataInicio !== undefined) this.dataInicio = parsed.dataInicio ?? null;
    if (parsed.dataFim !== undefined) this.dataFim = parsed.dataFim ?? null;
    if (parsed.status !== undefined) this.status = parsed.status as EstagioStatus;
    if (parsed.nomeSupervisor !== undefined) this.nomeSupervisor = parsed.nomeSupervisor ?? null;
    if (parsed.emailSupervisor !== undefined) this.emailSupervisor = parsed.emailSupervisor ?? null;
    if (parsed.telefoneSupervisor !== undefined)
      this.telefoneSupervisor = parsed.telefoneSupervisor ?? null;
    if (parsed.aditivo !== undefined) this.aditivo = parsed.aditivo;
    if (parsed.tipoAditivo !== undefined) this.tipoAditivo = parsed.tipoAditivo ?? null;
    if (parsed.horariosEstagio !== undefined) this.horariosEstagio = parsed.horariosEstagio;

    this.dateUpdated = getNowISO();

    zodValidate(Estagio.entityName, EstagioSchema, this);
  }

  isActive(): boolean {
    return this.ativo && this.dateDeleted === null;
  }
}
