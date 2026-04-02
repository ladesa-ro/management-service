import type { z } from "zod";
import type { IdUuid, ScalarDateTimeString } from "@/domain/abstractions/scalars";
import { generateUuidV7 } from "@/domain/entities/utils/generate-uuid-v7";
import { zodValidate } from "@/shared/validation/index";
import { getNowISO } from "@/utils/date";
import { DiarioCreateSchema, DiarioSchema, DiarioUpdateSchema } from "./diario.schemas";

export type IDiario = z.infer<typeof DiarioSchema>;

export interface IDiarioCreate {
  ativo?: boolean;
  calendarioLetivo: { id: IdUuid };
  turma: { id: IdUuid };
  disciplina: { id: IdUuid };
  ambientePadrao?: { id: IdUuid } | null;
}

export interface IDiarioUpdate {
  ativo?: boolean;
  calendarioLetivo?: { id: IdUuid };
  turma?: { id: IdUuid };
  disciplina?: { id: IdUuid };
  ambientePadrao?: { id: IdUuid } | null;
}

export class Diario {
  static readonly entityName = "Diario";

  id!: IdUuid;
  ativo!: boolean;
  calendarioLetivo!: { id: string };
  turma!: { id: string };
  disciplina!: { id: string };
  ambientePadrao!: { id: string } | null;
  imagemCapa!: { id: string } | null;
  dateCreated!: ScalarDateTimeString;
  dateUpdated!: ScalarDateTimeString;
  dateDeleted!: ScalarDateTimeString | null;

  private constructor() {}

  static create(dados: IDiarioCreate): Diario {
    const parsed = zodValidate(Diario.entityName, DiarioCreateSchema.domain, dados);

    const instance = new Diario();

    instance.id = generateUuidV7();
    instance.ativo = parsed.ativo;
    instance.calendarioLetivo = parsed.calendarioLetivo;
    instance.turma = parsed.turma;
    instance.disciplina = parsed.disciplina;
    instance.ambientePadrao = parsed.ambientePadrao ?? null;
    instance.imagemCapa = null;
    instance.dateCreated = getNowISO();
    instance.dateUpdated = getNowISO();
    instance.dateDeleted = null;

    return instance;
  }

  static load(dados: unknown): Diario {
    const parsed = zodValidate(Diario.entityName, DiarioSchema, dados);

    const instance = new Diario();

    instance.id = parsed.id;
    instance.ativo = parsed.ativo;
    instance.calendarioLetivo = parsed.calendarioLetivo;
    instance.turma = parsed.turma;
    instance.disciplina = parsed.disciplina;
    instance.ambientePadrao = parsed.ambientePadrao;
    instance.imagemCapa = parsed.imagemCapa;
    instance.dateCreated = parsed.dateCreated;
    instance.dateUpdated = parsed.dateUpdated;
    instance.dateDeleted = parsed.dateDeleted;
    return instance;
  }

  update(dados: unknown): void {
    const parsed = zodValidate(Diario.entityName, DiarioUpdateSchema.domain, dados);

    if (parsed.ativo !== undefined) this.ativo = parsed.ativo;

    this.dateUpdated = getNowISO();
  }

  isAtivo(): boolean {
    return this.ativo && this.dateDeleted === null;
  }

  ativar(): void {
    this.ativo = true;
    this.dateUpdated = getNowISO();
  }

  desativar(): void {
    this.ativo = false;
    this.dateUpdated = getNowISO();
  }

  isActive(): boolean {
    return this.ativo && this.dateDeleted === null;
  }
}
