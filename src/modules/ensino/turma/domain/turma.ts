import type { z } from "zod";
import type { IdUuid, ScalarDateTimeString } from "@/domain/abstractions/scalars";
import { generateUuidV7 } from "@/domain/entities/utils/generate-uuid-v7";
import { zodValidate } from "@/shared/validation/index";
import { getNowISO } from "@/utils/date";
import { TurmaCreateSchema, TurmaSchema, TurmaUpdateSchema } from "./turma.schemas";

export type ITurma = z.infer<typeof TurmaSchema>;

export class Turma {
  static readonly entityName = "Turma";

  id!: IdUuid;
  periodo!: string;
  curso!: { id: string };
  ambientePadraoAula!: { id: string } | null;
  imagemCapa!: { id: string } | null;
  dateCreated!: ScalarDateTimeString;
  dateUpdated!: ScalarDateTimeString;
  dateDeleted!: ScalarDateTimeString | null;

  private constructor() {}

  static create(dados: unknown): Turma {
    const parsed = zodValidate(Turma.entityName, TurmaCreateSchema.domain, dados);

    const instance = new Turma();

    instance.id = generateUuidV7();
    instance.periodo = parsed.periodo;
    instance.curso = parsed.curso;
    instance.ambientePadraoAula = parsed.ambientePadraoAula ?? null;
    instance.imagemCapa = parsed.imagemCapa ?? null;
    instance.dateCreated = getNowISO();
    instance.dateUpdated = getNowISO();
    instance.dateDeleted = null;

    return instance;
  }

  static load(dados: unknown): Turma {
    const parsed = zodValidate(Turma.entityName, TurmaSchema, dados);

    const instance = new Turma();

    instance.id = parsed.id;
    instance.periodo = parsed.periodo;
    instance.curso = parsed.curso;
    instance.ambientePadraoAula = parsed.ambientePadraoAula;
    instance.imagemCapa = parsed.imagemCapa;
    instance.dateCreated = parsed.dateCreated;
    instance.dateUpdated = parsed.dateUpdated;
    instance.dateDeleted = parsed.dateDeleted;

    return instance;
  }

  update(dados: unknown): void {
    const parsed = zodValidate(Turma.entityName, TurmaUpdateSchema.domain, dados);

    if (parsed.periodo !== undefined) this.periodo = parsed.periodo;
    if (parsed.curso !== undefined) this.curso = parsed.curso;
    if (parsed.ambientePadraoAula !== undefined)
      this.ambientePadraoAula = parsed.ambientePadraoAula ?? null;
    if (parsed.imagemCapa !== undefined) this.imagemCapa = parsed.imagemCapa ?? null;

    this.dateUpdated = getNowISO();

    zodValidate(Turma.entityName, TurmaSchema, this);
  }

  temAmbientePadraoAula(): boolean {
    return this.ambientePadraoAula !== null;
  }

  temImagemCapa(): boolean {
    return this.imagemCapa !== null;
  }
}
