import type { IdUuid, ScalarDateTimeString } from "@/domain/abstractions/scalars";
import { generateUuidV7 } from "@/domain/entities/utils/generate-uuid-v7";
import { zodValidate } from "@/shared/validation/index";
import {
  estagiarioCreateSchema,
  estagiarioSchema,
  estagiarioUpdateSchema,
} from "./estagiario.schemas";

export interface IEstagiario {
  id: string;
  idPerfilFk: string;
  idCursoFk: string;
  idTurmaFk: string;
  telefone: string;
  emailInstitucional: string | null;
  dataNascimento: string;
  ativo?: boolean;
  dateCreated: string;
  dateUpdated: string;
  dateDeleted: string | null;
}

export class Estagiario {
  static readonly entityName = "Estagiario";

  id!: IdUuid;
  idPerfilFk!: string;
  idCursoFk!: string;
  idTurmaFk!: string;
  telefone!: string;
  emailInstitucional!: string | null;
  dataNascimento!: string;
  dateCreated!: ScalarDateTimeString;
  dateUpdated!: ScalarDateTimeString;
  dateDeleted!: ScalarDateTimeString | null;

  private constructor() {}

  get ativo(): boolean {
    return this.dateDeleted === null;
  }

  static create(dados: unknown): Estagiario {
    const parsed = zodValidate(Estagiario.entityName, estagiarioCreateSchema, dados);

    const instance = new Estagiario();

    instance.id = generateUuidV7();
    instance.idPerfilFk = parsed.idPerfilFk;
    instance.idCursoFk = parsed.idCursoFk;
    instance.idTurmaFk = parsed.idTurmaFk;
    instance.telefone = parsed.telefone;
    instance.emailInstitucional = parsed.emailInstitucional ?? null;
    instance.dataNascimento = parsed.dataNascimento;
    instance.dateCreated = new Date().toISOString();
    instance.dateUpdated = new Date().toISOString();
    instance.dateDeleted = null;

    return instance;
  }

  static load(dados: unknown): Estagiario {
    const parsed = zodValidate(Estagiario.entityName, estagiarioSchema, dados);

    const instance = new Estagiario();

    instance.id = parsed.id;
    instance.idPerfilFk = parsed.idPerfilFk;
    instance.idCursoFk = parsed.idCursoFk;
    instance.idTurmaFk = parsed.idTurmaFk;
    instance.telefone = parsed.telefone;
    instance.emailInstitucional = parsed.emailInstitucional;
    instance.dataNascimento = parsed.dataNascimento;
    instance.dateCreated = parsed.dateCreated;
    instance.dateUpdated = parsed.dateUpdated;
    instance.dateDeleted = parsed.dateDeleted;

    return instance;
  }

  update(dados: unknown): void {
    const parsed = zodValidate(Estagiario.entityName, estagiarioUpdateSchema, dados);

    if (parsed.idPerfilFk !== undefined) this.idPerfilFk = parsed.idPerfilFk;
    if (parsed.idCursoFk !== undefined) this.idCursoFk = parsed.idCursoFk;
    if (parsed.idTurmaFk !== undefined) this.idTurmaFk = parsed.idTurmaFk;
    if (parsed.telefone !== undefined) this.telefone = parsed.telefone;
    if (parsed.emailInstitucional !== undefined)
      this.emailInstitucional = parsed.emailInstitucional ?? null;
    if (parsed.dataNascimento !== undefined) this.dataNascimento = parsed.dataNascimento;

    this.dateUpdated = new Date().toISOString();

    zodValidate(Estagiario.entityName, estagiarioSchema, this);
  }
}
