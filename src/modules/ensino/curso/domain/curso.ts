import type { z } from "zod";
import type { IdUuid, ScalarDateTimeString } from "@/domain/abstractions/scalars";
import { generateUuidV7 } from "@/domain/entities/utils/generate-uuid-v7";
import { zodValidate } from "@/shared/validation/index";
import { getNowISO } from "@/utils/date";
import { CursoCreateSchema, CursoSchema, CursoUpdateSchema } from "./curso.schemas";

export type ICurso = z.infer<typeof CursoSchema>;

export class Curso {
  static readonly entityName = "Curso";

  id!: IdUuid;
  nome!: string;
  nomeAbreviado!: string;
  campus!: { id: string };
  ofertaFormacao!: { id: string };
  imagemCapa!: { id: string } | null;
  dateCreated!: ScalarDateTimeString;
  dateUpdated!: ScalarDateTimeString;
  dateDeleted!: ScalarDateTimeString | null;

  private constructor() {}

  static create(dados: unknown): Curso {
    const parsed = zodValidate(Curso.entityName, CursoCreateSchema.domain, dados);

    const instance = new Curso();

    instance.id = generateUuidV7();
    instance.nome = parsed.nome;
    instance.nomeAbreviado = parsed.nomeAbreviado;
    instance.campus = parsed.campus;
    instance.ofertaFormacao = parsed.ofertaFormacao;
    instance.imagemCapa = null;
    instance.dateCreated = getNowISO();
    instance.dateUpdated = getNowISO();
    instance.dateDeleted = null;

    return instance;
  }

  static load(dados: unknown): Curso {
    const parsed = zodValidate(Curso.entityName, CursoSchema, dados);

    const instance = new Curso();

    instance.id = parsed.id;
    instance.nome = parsed.nome;
    instance.nomeAbreviado = parsed.nomeAbreviado;
    instance.campus = parsed.campus;
    instance.ofertaFormacao = parsed.ofertaFormacao;
    instance.imagemCapa = parsed.imagemCapa;
    instance.dateCreated = parsed.dateCreated;
    instance.dateUpdated = parsed.dateUpdated;
    instance.dateDeleted = parsed.dateDeleted;

    return instance;
  }

  update(dados: unknown): void {
    const parsed = zodValidate(Curso.entityName, CursoUpdateSchema.domain, dados);

    if (parsed.nome !== undefined) this.nome = parsed.nome;
    if (parsed.nomeAbreviado !== undefined) this.nomeAbreviado = parsed.nomeAbreviado;
    if (parsed.campus !== undefined) this.campus = parsed.campus;
    if (parsed.ofertaFormacao !== undefined) this.ofertaFormacao = parsed.ofertaFormacao;

    this.dateUpdated = getNowISO();

    zodValidate(Curso.entityName, CursoSchema, this);
  }

  temImagemCapa(): boolean {
    return this.imagemCapa !== null;
  }

  isActive(): boolean {
    return this.dateDeleted === null;
  }
}
