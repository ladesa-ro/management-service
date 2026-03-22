import type { z } from "zod";
import type { IdNumeric } from "@/domain/abstractions/scalars";
import { zodValidate } from "@/shared/validation/index";
import { EstadoCreateSchema, EstadoSchema, EstadoUpdateSchema } from "./estado.schemas";

export type IEstado = z.infer<typeof EstadoSchema>;

export class Estado {
  static readonly entityName = "Estado";

  id!: IdNumeric;
  nome!: string;
  sigla!: string;

  private constructor() {}

  static create(dados: unknown): Estado {
    const parsed = zodValidate(Estado.entityName, EstadoCreateSchema, dados);

    const instance = new Estado();

    instance.id = parsed.id;
    instance.nome = parsed.nome;
    instance.sigla = parsed.sigla;

    return instance;
  }

  static load(dados: unknown): Estado {
    const parsed = zodValidate(Estado.entityName, EstadoSchema, dados);

    const instance = new Estado();

    instance.id = parsed.id;
    instance.nome = parsed.nome;
    instance.sigla = parsed.sigla;

    return instance;
  }

  update(dados: unknown): void {
    const parsed = zodValidate(Estado.entityName, EstadoUpdateSchema, dados);

    if (parsed.nome !== undefined) this.nome = parsed.nome;
    if (parsed.sigla !== undefined) this.sigla = parsed.sigla;

    zodValidate(Estado.entityName, EstadoSchema, this);
  }
}
