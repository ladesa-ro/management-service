import type { z } from "zod";
import type { IdUuid, ScalarDateTimeString } from "@/domain/abstractions/scalars";
import { generateUuidV7 } from "@/domain/entities/utils/generate-uuid-v7";
import { zodValidate } from "@/shared/validation/index";
import {
  DisciplinaCreateSchema,
  DisciplinaSchema,
  DisciplinaUpdateSchema,
} from "./disciplina.schemas";

export type IDisciplina = z.infer<typeof DisciplinaSchema>;

export class Disciplina {
  static readonly entityName = "Disciplina";

  id!: IdUuid;
  nome!: string;
  nomeAbreviado!: string;
  cargaHoraria!: number;
  imagemCapa!: { id: string } | null;
  dateCreated!: ScalarDateTimeString;
  dateUpdated!: ScalarDateTimeString;
  dateDeleted!: ScalarDateTimeString | null;

  private constructor() {}

  static create(dados: unknown): Disciplina {
    const parsed = zodValidate(Disciplina.entityName, DisciplinaCreateSchema, dados);

    const instance = new Disciplina();

    instance.id = generateUuidV7();
    instance.nome = parsed.nome;
    instance.nomeAbreviado = parsed.nomeAbreviado;
    instance.cargaHoraria = parsed.cargaHoraria;
    instance.imagemCapa = parsed.imagemCapa ?? null;
    instance.dateCreated = new Date().toISOString();
    instance.dateUpdated = new Date().toISOString();
    instance.dateDeleted = null;

    return instance;
  }

  static load(dados: unknown): Disciplina {
    const parsed = zodValidate(Disciplina.entityName, DisciplinaSchema, dados);

    const instance = new Disciplina();

    instance.id = parsed.id;
    instance.nome = parsed.nome;
    instance.nomeAbreviado = parsed.nomeAbreviado;
    instance.cargaHoraria = parsed.cargaHoraria;
    instance.imagemCapa = parsed.imagemCapa;
    instance.dateCreated = parsed.dateCreated;
    instance.dateUpdated = parsed.dateUpdated;
    instance.dateDeleted = parsed.dateDeleted;

    return instance;
  }

  update(dados: unknown): void {
    const parsed = zodValidate(Disciplina.entityName, DisciplinaUpdateSchema, dados);

    if (parsed.nome !== undefined) this.nome = parsed.nome;
    if (parsed.nomeAbreviado !== undefined) this.nomeAbreviado = parsed.nomeAbreviado;
    if (parsed.cargaHoraria !== undefined) this.cargaHoraria = parsed.cargaHoraria;
    if (parsed.imagemCapa !== undefined) this.imagemCapa = parsed.imagemCapa ?? null;

    this.dateUpdated = new Date().toISOString();

    zodValidate(Disciplina.entityName, DisciplinaSchema, this);
  }

  temImagemCapa(): boolean {
    return this.imagemCapa !== null;
  }

  temCargaHorariaValida(): boolean {
    return this.cargaHoraria > 0;
  }
}
