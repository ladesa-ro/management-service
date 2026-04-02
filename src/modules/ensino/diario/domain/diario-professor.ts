import type { z } from "zod";
import type { IdUuid, ScalarDateTimeString } from "@/domain/abstractions/scalars";
import { generateUuidV7 } from "@/domain/entities/utils/generate-uuid-v7";
import { zodValidate } from "@/shared/validation/index";
import { getNowISO } from "@/utils/date";
import {
  DiarioProfessorCreateSchema,
  DiarioProfessorSchema,
  DiarioProfessorUpdateSchema,
} from "./diario-professor.schemas";

export type IDiarioProfessor = z.infer<typeof DiarioProfessorSchema>;

export interface IDiarioProfessorCreate {
  situacao: boolean;
  diario: { id: IdUuid };
  perfil: { id: IdUuid };
}

export interface IDiarioProfessorUpdate {
  situacao?: boolean;
  diario?: { id: IdUuid };
  perfil?: { id: IdUuid };
}

export class DiarioProfessor {
  static readonly entityName = "DiarioProfessor";

  id!: IdUuid;
  situacao!: boolean;
  diario!: { id: string };
  perfil!: { id: string };
  dateCreated!: ScalarDateTimeString;
  dateUpdated!: ScalarDateTimeString;
  dateDeleted!: ScalarDateTimeString | null;

  private constructor() {}

  static create(dados: IDiarioProfessorCreate): DiarioProfessor {
    const parsed = zodValidate(
      DiarioProfessor.entityName,
      DiarioProfessorCreateSchema.domain,
      dados,
    );

    const instance = new DiarioProfessor();

    instance.id = generateUuidV7();
    instance.situacao = parsed.situacao;
    instance.diario = parsed.diario;
    instance.perfil = parsed.perfil;
    instance.dateCreated = getNowISO();
    instance.dateUpdated = getNowISO();
    instance.dateDeleted = null;

    return instance;
  }

  static load(dados: unknown): DiarioProfessor {
    const parsed = zodValidate(DiarioProfessor.entityName, DiarioProfessorSchema, dados);

    const instance = new DiarioProfessor();

    instance.id = parsed.id;
    instance.situacao = parsed.situacao;
    instance.diario = parsed.diario;
    instance.perfil = parsed.perfil;
    instance.dateCreated = parsed.dateCreated;
    instance.dateUpdated = parsed.dateUpdated;
    instance.dateDeleted = parsed.dateDeleted;
    return instance;
  }

  update(dados: unknown): void {
    const parsed = zodValidate(
      DiarioProfessor.entityName,
      DiarioProfessorUpdateSchema.domain,
      dados,
    );

    if (parsed.situacao !== undefined) this.situacao = parsed.situacao;

    this.dateUpdated = getNowISO();
  }

  isActive(): boolean {
    return this.dateDeleted === null;
  }
}
