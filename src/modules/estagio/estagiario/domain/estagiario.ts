import type { ObjectUuidRef } from "@/domain/abstractions";
import type { IdUuid, ScalarDateTimeString } from "@/domain/abstractions/scalars";
import { generateUuidV7 } from "@/domain/entities/utils/generate-uuid-v7";
import { zodValidate } from "@/shared/validation/index";
import { getNowISO } from "@/utils/date";
import {
  EstagiarioCreateSchema,
  EstagiarioSchema,
  EstagiarioUpdateSchema,
} from "./estagiario.schemas";

export interface IEstagiario {
  id: string;
  perfil: { id: string };
  curso: { id: string };
  turma: { id: string };
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
  perfil!: ObjectUuidRef;
  curso!: ObjectUuidRef;
  turma!: ObjectUuidRef;
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
    const parsed = zodValidate(Estagiario.entityName, EstagiarioCreateSchema.domain, dados);

    const instance = new Estagiario();

    instance.id = generateUuidV7();
    instance.perfil = parsed.perfil;
    instance.curso = parsed.curso;
    instance.turma = parsed.turma;
    instance.telefone = parsed.telefone;
    instance.emailInstitucional = parsed.emailInstitucional ?? null;
    instance.dataNascimento = parsed.dataNascimento;
    instance.dateCreated = getNowISO();
    instance.dateUpdated = getNowISO();
    instance.dateDeleted = null;

    return instance;
  }

  static load(dados: unknown): Estagiario {
    const parsed = zodValidate(Estagiario.entityName, EstagiarioSchema, dados);

    const instance = new Estagiario();

    instance.id = parsed.id;
    instance.perfil = parsed.perfil;
    instance.curso = parsed.curso;
    instance.turma = parsed.turma;
    instance.telefone = parsed.telefone;
    instance.emailInstitucional = parsed.emailInstitucional;
    instance.dataNascimento = parsed.dataNascimento;
    instance.dateCreated = parsed.dateCreated;
    instance.dateUpdated = parsed.dateUpdated;
    instance.dateDeleted = parsed.dateDeleted;

    return instance;
  }

  update(dados: unknown): void {
    const parsed = zodValidate(Estagiario.entityName, EstagiarioUpdateSchema.domain, dados);

    if (parsed.perfil !== undefined) this.perfil = parsed.perfil;
    if (parsed.curso !== undefined) this.curso = parsed.curso;
    if (parsed.turma !== undefined) this.turma = parsed.turma;
    if (parsed.telefone !== undefined) this.telefone = parsed.telefone;
    if (parsed.emailInstitucional !== undefined)
      this.emailInstitucional = parsed.emailInstitucional ?? null;
    if (parsed.dataNascimento !== undefined) this.dataNascimento = parsed.dataNascimento;

    this.dateUpdated = getNowISO();

    zodValidate(Estagiario.entityName, EstagiarioSchema, this);
  }

  isActive(): boolean {
    return this.ativo && this.dateDeleted === null;
  }
}
