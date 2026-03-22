import type { z } from "zod";
import type { IdUuid, ScalarDateTimeString } from "@/domain/abstractions/scalars";
import { generateUuidV7 } from "@/domain/entities/utils/generate-uuid-v7";
import { zodValidate } from "@/shared/validation/index";
import { BlocoCreateSchema, BlocoSchema, BlocoUpdateSchema } from "./bloco.schemas";

export type IBloco = z.infer<typeof BlocoSchema>;

export class Bloco {
  static readonly entityName = "Bloco";

  id!: IdUuid;
  nome!: string;
  codigo!: string;
  campus!: IBloco["campus"];
  imagemCapa!: { id: string } | null;
  dateCreated!: ScalarDateTimeString;
  dateUpdated!: ScalarDateTimeString;
  dateDeleted!: ScalarDateTimeString | null;

  private constructor() {}

  static create(dados: unknown): Bloco {
    const parsed = zodValidate(Bloco.entityName, BlocoCreateSchema, dados);

    const instance = new Bloco();

    instance.id = generateUuidV7();
    instance.nome = parsed.nome;
    instance.codigo = parsed.codigo;
    instance.imagemCapa = null;
    instance.dateCreated = new Date().toISOString();
    instance.dateUpdated = new Date().toISOString();
    instance.dateDeleted = null;

    return instance;
  }

  static load(dados: unknown): Bloco {
    const parsed = zodValidate(Bloco.entityName, BlocoSchema, dados);

    const instance = new Bloco();

    instance.id = parsed.id;
    instance.nome = parsed.nome;
    instance.codigo = parsed.codigo;
    instance.campus = parsed.campus;
    instance.imagemCapa = parsed.imagemCapa;
    instance.dateCreated = parsed.dateCreated;
    instance.dateUpdated = parsed.dateUpdated;
    instance.dateDeleted = parsed.dateDeleted;

    return instance;
  }

  update(dados: unknown): void {
    const parsed = zodValidate(Bloco.entityName, BlocoUpdateSchema, dados);

    if (parsed.nome !== undefined) this.nome = parsed.nome;
    if (parsed.codigo !== undefined) this.codigo = parsed.codigo;

    this.dateUpdated = new Date().toISOString();

    zodValidate(Bloco.entityName, BlocoSchema, this);
  }
}
