import type { z } from "zod";
import type { IdNumeric } from "@/domain/abstractions/scalars";
import type { IEstado } from "@/modules/localidades/estado";
import { zodValidate } from "@/shared/validation/index";
import { cidadeCreateSchema, cidadeSchema, cidadeUpdateSchema } from "./cidade.schemas";

export type ICidade = z.infer<typeof cidadeSchema> & { estado: IEstado };

export class Cidade {
  static readonly entityName = "Cidade";

  id!: IdNumeric;
  nome!: string;
  estado!: IEstado;

  private constructor() {}

  static create(dados: unknown): Cidade {
    const parsed = zodValidate(Cidade.entityName, cidadeCreateSchema, dados);

    const instance = new Cidade();

    instance.id = parsed.id;
    instance.nome = parsed.nome;

    return instance;
  }

  static load(dados: unknown): Cidade {
    const parsed = zodValidate(Cidade.entityName, cidadeSchema, dados);

    const instance = new Cidade();

    instance.id = parsed.id;
    instance.nome = parsed.nome;

    if ((dados as any)?.estado !== undefined) {
      instance.estado = (dados as any).estado;
    }

    return instance;
  }

  update(dados: unknown): void {
    const parsed = zodValidate(Cidade.entityName, cidadeUpdateSchema, dados);

    if (parsed.nome !== undefined) this.nome = parsed.nome;

    zodValidate(Cidade.entityName, cidadeSchema, this);
  }

  getNomeCompleto(): string {
    return `${this.nome} - ${this.estado.sigla}`;
  }
}
