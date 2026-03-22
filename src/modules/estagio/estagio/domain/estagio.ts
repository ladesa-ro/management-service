import type { IdUuid, ScalarDateTimeString } from "@/domain/abstractions/scalars";
import { generateUuidV7 } from "@/domain/entities/utils/generate-uuid-v7";
import { zodValidate } from "@/shared/validation/index";
import { estagioCreateSchema, estagioSchema, estagioUpdateSchema } from "./estagio.schemas";

export enum EstagioStatus {
  ABERTA = "ABERTA",
  EM_ANDAMENTO = "EM_ANDAMENTO",
  CONCLUIDA = "CONCLUIDA",
}

export interface IHorarioEstagio {
  id?: string;
  diaSemana: number;
  horaInicio: string;
  horaFim: string;
}

export interface IEstagio {
  id: string;
  idEmpresaFk: string;
  idEstagiarioFk: string | null;
  cargaHoraria: number;
  dataInicio: string | null;
  dataFim: string | null;
  status: EstagioStatus;
  horariosEstagio: IHorarioEstagio[];
  dateCreated: string;
  dateUpdated: string;
  dateDeleted: string | null;
}

export class Estagio {
  static readonly entityName = "Estagio";

  id!: IdUuid;
  idEmpresaFk!: string;
  idEstagiarioFk!: string | null;
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
    const parsed = zodValidate(Estagio.entityName, estagioCreateSchema, dados);

    const instance = new Estagio();

    instance.id = generateUuidV7();
    instance.idEmpresaFk = parsed.idEmpresaFk;
    instance.idEstagiarioFk = parsed.idEstagiarioFk ?? null;
    instance.cargaHoraria = parsed.cargaHoraria;
    instance.dataInicio = parsed.dataInicio ?? null;
    instance.dataFim = parsed.dataFim ?? null;
    instance.status = (parsed.status ?? EstagioStatus.ABERTA) as EstagioStatus;
    instance.horariosEstagio = parsed.horariosEstagio ?? [];
    instance.dateCreated = new Date().toISOString();
    instance.dateUpdated = new Date().toISOString();
    instance.dateDeleted = null;

    return instance;
  }

  static load(dados: unknown): Estagio {
    const parsed = zodValidate(Estagio.entityName, estagioSchema, dados);

    const instance = new Estagio();

    instance.id = parsed.id;
    instance.idEmpresaFk = parsed.idEmpresaFk;
    instance.idEstagiarioFk = parsed.idEstagiarioFk;
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
    const parsed = zodValidate(Estagio.entityName, estagioUpdateSchema, dados);

    if (parsed.idEmpresaFk !== undefined) this.idEmpresaFk = parsed.idEmpresaFk;
    if (parsed.idEstagiarioFk !== undefined) this.idEstagiarioFk = parsed.idEstagiarioFk ?? null;
    if (parsed.cargaHoraria !== undefined) this.cargaHoraria = parsed.cargaHoraria;
    if (parsed.dataInicio !== undefined) this.dataInicio = parsed.dataInicio ?? null;
    if (parsed.dataFim !== undefined) this.dataFim = parsed.dataFim ?? null;
    if (parsed.status !== undefined) this.status = parsed.status as EstagioStatus;
    if (parsed.horariosEstagio !== undefined) this.horariosEstagio = parsed.horariosEstagio;

    this.dateUpdated = new Date().toISOString();

    zodValidate(Estagio.entityName, estagioSchema, this);
  }
}
