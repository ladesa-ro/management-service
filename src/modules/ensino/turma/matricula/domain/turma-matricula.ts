import type { z } from "zod";
import type { ObjectUuidRef } from "@/domain/abstractions";
import type { IdUuid, ScalarDateTimeString } from "@/domain/abstractions/scalars";
import { generateUuidV7 } from "@/domain/entities/utils/generate-uuid-v7";
import { zodValidate } from "@/shared/validation/index";
import { getNowISO } from "@/utils/date";
import { TurmaMatriculaCreateSchema, TurmaMatriculaSchema } from "./turma-matricula.schemas";

export type ITurmaMatricula = z.infer<typeof TurmaMatriculaSchema>;

export interface ITurmaMatriculaCreate {
  turma: ObjectUuidRef;
  perfil: ObjectUuidRef;
}

export class TurmaMatricula {
  static readonly entityName = "TurmaMatricula";

  id!: IdUuid;
  turma!: { id: string };
  perfil!: { id: string };
  dateCreated!: ScalarDateTimeString;
  dateUpdated!: ScalarDateTimeString;
  dateDeleted!: ScalarDateTimeString | null;

  private constructor() {}

  static create(dados: ITurmaMatriculaCreate): TurmaMatricula {
    const parsed = zodValidate(TurmaMatricula.entityName, TurmaMatriculaCreateSchema.domain, dados);

    const instance = new TurmaMatricula();

    instance.id = generateUuidV7();
    instance.turma = parsed.turma;
    instance.perfil = parsed.perfil;
    instance.dateCreated = getNowISO();
    instance.dateUpdated = getNowISO();
    instance.dateDeleted = null;

    return instance;
  }

  static load(dados: unknown): TurmaMatricula {
    const parsed = zodValidate(TurmaMatricula.entityName, TurmaMatriculaSchema, dados);

    const instance = new TurmaMatricula();

    instance.id = parsed.id;
    instance.turma = parsed.turma;
    instance.perfil = parsed.perfil;
    instance.dateCreated = parsed.dateCreated;
    instance.dateUpdated = parsed.dateUpdated;
    instance.dateDeleted = parsed.dateDeleted;

    return instance;
  }

  isActive(): boolean {
    return this.dateDeleted === null;
  }
}
