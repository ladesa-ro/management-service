import type { z } from "zod";
import type { IdUuid, ScalarDateTimeString } from "@/domain/abstractions/scalars";
import { generateUuidV7 } from "@/domain/entities/utils/generate-uuid-v7";
import { zodValidate } from "@/shared/validation/index";
import { getNowISO } from "@/utils/date";
import { EnderecoCreateSchema, EnderecoSchema, EnderecoUpdateSchema } from "./endereco.schemas";

export type IEndereco = z.infer<typeof EnderecoSchema>;

export class Endereco {
  static readonly entityName = "Endereco";

  id!: IdUuid;
  cep!: string;
  logradouro!: string;
  numero!: number;
  bairro!: string;
  complemento!: string | null;
  pontoReferencia!: string | null;
  cidade!: { id: number };
  dateCreated!: ScalarDateTimeString;
  dateUpdated!: ScalarDateTimeString;
  dateDeleted!: ScalarDateTimeString | null;

  private constructor() {}

  static create(dados: unknown): Endereco {
    const parsed = zodValidate(Endereco.entityName, EnderecoCreateSchema, dados);

    const instance = new Endereco();

    instance.id = generateUuidV7();
    instance.cep = parsed.cep;
    instance.logradouro = parsed.logradouro;
    instance.numero = parsed.numero;
    instance.bairro = parsed.bairro;
    instance.complemento = parsed.complemento ?? null;
    instance.pontoReferencia = parsed.pontoReferencia ?? null;
    instance.cidade = parsed.cidade;
    instance.dateCreated = getNowISO();
    instance.dateUpdated = getNowISO();
    instance.dateDeleted = null;

    return instance;
  }

  static load(dados: unknown): Endereco {
    const parsed = zodValidate(Endereco.entityName, EnderecoSchema, dados);

    const instance = new Endereco();

    instance.id = parsed.id;
    instance.cep = parsed.cep;
    instance.logradouro = parsed.logradouro;
    instance.numero = parsed.numero;
    instance.bairro = parsed.bairro;
    instance.complemento = parsed.complemento;
    instance.pontoReferencia = parsed.pontoReferencia;
    instance.cidade = parsed.cidade;
    instance.dateCreated = parsed.dateCreated;
    instance.dateUpdated = parsed.dateUpdated;
    instance.dateDeleted = parsed.dateDeleted;

    return instance;
  }

  update(dados: unknown): void {
    const parsed = zodValidate(Endereco.entityName, EnderecoUpdateSchema, dados);

    if (parsed.cep !== undefined) this.cep = parsed.cep;
    if (parsed.logradouro !== undefined) this.logradouro = parsed.logradouro;
    if (parsed.numero !== undefined) this.numero = parsed.numero;
    if (parsed.bairro !== undefined) this.bairro = parsed.bairro;
    if (parsed.complemento !== undefined) this.complemento = parsed.complemento ?? null;
    if (parsed.pontoReferencia !== undefined) this.pontoReferencia = parsed.pontoReferencia ?? null;
    if (parsed.cidade !== undefined) this.cidade = parsed.cidade;
    this.dateUpdated = getNowISO();

    zodValidate(Endereco.entityName, EnderecoSchema, this);
  }

  getEnderecoFormatado(): string {
    const partes = [
      this.logradouro,
      this.numero.toString(),
      this.complemento,
      this.bairro,
      this.cep,
    ].filter(Boolean);
    return partes.join(", ");
  }
}
