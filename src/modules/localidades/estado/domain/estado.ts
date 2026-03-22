import type { z } from "zod";
import type { IdNumeric } from "@/domain/abstractions/scalars";
import { zodValidate } from "@/shared/validation/index";
import { estadoCreateSchema, estadoSchema, estadoUpdateSchema } from "./estado.schemas";

export type IEstado = z.infer<typeof estadoSchema>;

export class Estado {
  static readonly entityName = "Estado";

  id!: IdNumeric;
  nome!: string;
  sigla!: string;

  private constructor() {}

  static create(dados: unknown): Estado {
    const parsed = zodValidate(Estado.entityName, estadoCreateSchema, dados);

    const instance = new Estado();

    instance.id = parsed.id;
    instance.nome = parsed.nome;
    instance.sigla = parsed.sigla;

    return instance;
  }

  static load(dados: unknown): Estado {
    const parsed = zodValidate(Estado.entityName, estadoSchema, dados);

    const instance = new Estado();

    instance.id = parsed.id;
    instance.nome = parsed.nome;
    instance.sigla = parsed.sigla;

    return instance;
  }

  update(dados: unknown): void {
    const parsed = zodValidate(Estado.entityName, estadoUpdateSchema, dados);

    if (parsed.nome !== undefined) this.nome = parsed.nome;
    if (parsed.sigla !== undefined) this.sigla = parsed.sigla;

    zodValidate(Estado.entityName, estadoSchema, this);
  }
}
