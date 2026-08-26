/**
 * Relatorio — entidade de dominio.
 *
 * Encapsula as regras de negocio do relatorio de estagio.
 * Nao depende de infraestrutura — e puro dominio.
 */
import type { ObjectUuidRef } from "@/domain/abstractions";
import type { IdUuid, ScalarDateTimeString } from "@/domain/abstractions/scalars";
import { generateUuidV7 } from "@/domain/entities/utils/generate-uuid-v7";
import { zodValidate } from "@/shared/validation/index";
import { getNowISO } from "@/utils/date";
import { RelatorioCreateSchema, RelatorioSchema } from "./relatorio.schemas";

export class Relatorio {
  static readonly entityName = "Relatorio";

  id!: IdUuid;
  estagio!: ObjectUuidRef;
  arquivo!: ObjectUuidRef | null;
  conteudoJson!: Record<string, any> | null;
  dateCreated!: ScalarDateTimeString;
  dateUpdated!: ScalarDateTimeString;
  dateDeleted!: ScalarDateTimeString | null;

  private constructor() {}

  /**
   * Cria um novo Relatorio a partir de dados externos.
   */
  static create(dados: unknown): Relatorio {
    const parsed = zodValidate(Relatorio.entityName, RelatorioCreateSchema, dados);

    const instance = new Relatorio();
    instance.id = generateUuidV7();
    instance.estagio = parsed.estagio;
    instance.arquivo = parsed.arquivo ? { id: parsed.arquivo.id } : null;
    instance.conteudoJson = (parsed.conteudoJson as Record<string, any>) ?? null;
    instance.dateCreated = getNowISO();
    instance.dateUpdated = getNowISO();
    instance.dateDeleted = null;

    return instance;
  }

  /**
   * Reconstitui um Relatorio a partir de dados persistidos.
   */
  static load(dados: unknown): Relatorio {
    const parsed = zodValidate(Relatorio.entityName, RelatorioSchema, dados);
    const instance = new Relatorio();
    Object.assign(instance, {
      ...parsed,
      arquivo: parsed.arquivo ? { id: parsed.arquivo.id } : null,
      conteudoJson: parsed.conteudoJson ?? null,
    });
    return instance;
  }

  /**
   * Atualiza o conteudo e/ou arquivo do relatorio.
   */
  update(conteudoJson?: Record<string, any> | null, arquivo?: ObjectUuidRef | null): void {
    if (conteudoJson !== undefined) {
      this.conteudoJson = conteudoJson;
    }
    if (arquivo !== undefined) {
      this.arquivo = arquivo;
    }
    this.dateUpdated = getNowISO();
  }
}
