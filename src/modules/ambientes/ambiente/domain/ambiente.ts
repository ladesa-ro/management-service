import type { z } from "zod";
import type { IdUuid, ScalarDateTimeString } from "@/domain/abstractions/scalars";
import { generateUuidV7 } from "@/domain/entities/utils/generate-uuid-v7";
import { zodValidate } from "@/shared/validation/index";
import { getNowISO } from "@/utils/date";
import { AmbienteCreateSchema, AmbienteSchema, AmbienteUpdateSchema } from "./ambiente.schemas";

export type IAmbiente = z.infer<typeof AmbienteSchema>;

export class Ambiente {
  static readonly entityName = "Ambiente";

  id!: IdUuid;
  nome!: string;
  descricao!: string | null;
  codigo!: string;
  capacidade!: number | null;
  tipo!: string | null;
  bloco!: IAmbiente["bloco"];
  imagemCapa!: { id: string } | null;
  dateCreated!: ScalarDateTimeString;
  dateUpdated!: ScalarDateTimeString;
  dateDeleted!: ScalarDateTimeString | null;

  private constructor() {}

  static create(dados: unknown): Ambiente {
    const parsed = zodValidate(Ambiente.entityName, AmbienteCreateSchema, dados);

    const instance = new Ambiente();

    instance.id = generateUuidV7();
    instance.nome = parsed.nome;
    instance.descricao = parsed.descricao ?? null;
    instance.codigo = parsed.codigo;
    instance.capacidade = parsed.capacidade ?? null;
    instance.tipo = parsed.tipo ?? null;
    instance.imagemCapa = null;
    instance.dateCreated = getNowISO();
    instance.dateUpdated = getNowISO();
    instance.dateDeleted = null;

    return instance;
  }

  static load(dados: unknown): Ambiente {
    const parsed = zodValidate(Ambiente.entityName, AmbienteSchema, dados);

    const instance = new Ambiente();

    instance.id = parsed.id;
    instance.nome = parsed.nome;
    instance.descricao = parsed.descricao;
    instance.codigo = parsed.codigo;
    instance.capacidade = parsed.capacidade;
    instance.tipo = parsed.tipo;
    instance.bloco = parsed.bloco;
    instance.imagemCapa = parsed.imagemCapa;
    instance.dateCreated = parsed.dateCreated;
    instance.dateUpdated = parsed.dateUpdated;
    instance.dateDeleted = parsed.dateDeleted;

    return instance;
  }

  update(dados: unknown): void {
    const parsed = zodValidate(Ambiente.entityName, AmbienteUpdateSchema, dados);

    if (parsed.nome !== undefined) this.nome = parsed.nome;
    if (parsed.descricao !== undefined) this.descricao = parsed.descricao ?? null;
    if (parsed.codigo !== undefined) this.codigo = parsed.codigo;
    if (parsed.capacidade !== undefined) this.capacidade = parsed.capacidade ?? null;
    if (parsed.tipo !== undefined) this.tipo = parsed.tipo ?? null;

    this.dateUpdated = getNowISO();

    zodValidate(Ambiente.entityName, AmbienteSchema, this);
  }
}
