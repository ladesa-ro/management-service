import type { z } from "zod";
import type { IdNumeric } from "@/domain/abstractions/scalars";
import type { IEstado } from "@/modules/localidades/estado";
import { zodValidate } from "@/shared/validation/index";
import { CidadeCreateSchema, CidadeSchema, CidadeUpdateSchema } from "./cidade.schemas";

interface ICidadeLoadInput {
  estado?: IEstado;
  [key: string]: unknown;
}

export type ICidade = z.infer<typeof CidadeSchema> & { estado: IEstado };

export class Cidade {
  static readonly entityName = "Cidade";

  id!: IdNumeric;
  nome!: string;
  estado!: IEstado;

  private constructor() {}

  static create(dados: unknown): Cidade {
    const parsed = zodValidate(Cidade.entityName, CidadeCreateSchema, dados);

    const instance = new Cidade();

    instance.id = parsed.id;
    instance.nome = parsed.nome;

    return instance;
  }

  static load(dados: ICidadeLoadInput): Cidade {
    const parsed = zodValidate(Cidade.entityName, CidadeSchema, dados);

    const instance = new Cidade();

    instance.id = parsed.id;
    instance.nome = parsed.nome;

    if (dados.estado !== undefined) {
      instance.estado = dados.estado;
    }

    return instance;
  }

  update(dados: unknown): void {
    const parsed = zodValidate(Cidade.entityName, CidadeUpdateSchema, dados);

    if (parsed.nome !== undefined) this.nome = parsed.nome;

    zodValidate(Cidade.entityName, CidadeSchema, this);
  }

  getNomeCompleto(): string {
    return `${this.nome} - ${this.estado.sigla}`;
  }
}
