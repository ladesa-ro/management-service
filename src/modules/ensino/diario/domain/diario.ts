import type { IEntityBaseUuid } from "@/domain/abstractions/entities";
import type { IdUuid, ScalarDateTimeString } from "@/domain/abstractions/scalars";
import { generateUuidV7 } from "@/domain/entities/utils/generate-uuid-v7";
import type { IAmbiente } from "@/modules/ambientes/ambiente";
import type { IImagem } from "@/modules/armazenamento/imagem/domain/imagem";
import type { IDisciplina } from "@/modules/ensino/disciplina/domain/disciplina";
import type { ITurma } from "@/modules/ensino/turma/domain/turma";
import type { ICalendarioLetivo } from "@/modules/horarios/calendario-letivo";
import { zodValidate } from "@/shared/validation/index";
import { getNowISO } from "@/utils/date";
import { DiarioCreateSchema, DiarioUpdateSchema } from "./diario.schemas";

export interface IDiario extends IEntityBaseUuid {
  ativo: boolean;
  calendarioLetivo: ICalendarioLetivo;
  turma: ITurma;
  disciplina: IDisciplina;
  ambientePadrao: IAmbiente | null;
  imagemCapa: IImagem | null;
}

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

export class Diario implements IEntityBaseUuid {
  static readonly entityName = "Diario";

  id!: IdUuid;
  ativo!: boolean;
  calendarioLetivo!: ICalendarioLetivo;
  turma!: ITurma;
  disciplina!: IDisciplina;
  ambientePadrao!: IAmbiente | null;
  imagemCapa!: IImagem | null;
  dateCreated!: ScalarDateTimeString;
  dateUpdated!: ScalarDateTimeString;
  dateDeleted!: ScalarDateTimeString | null;

  private constructor() {}

  static create(dados: IDiarioCreate): Diario {
    const parsed = zodValidate(Diario.entityName, DiarioCreateSchema.domain, dados);

    const instance = new Diario();

    instance.id = generateUuidV7();
    instance.ativo = parsed.ativo;
    instance.ambientePadrao = null;
    instance.imagemCapa = null;
    instance.dateCreated = getNowISO();
    instance.dateUpdated = getNowISO();
    instance.dateDeleted = null;

    return instance;
  }

  static load(dados: Record<string, any>): Diario {
    const instance = Object.create(Diario.prototype) as Diario;
    if (dados.id !== undefined) instance.id = dados.id;
    if (dados.ativo !== undefined) instance.ativo = dados.ativo;
    if (dados.calendarioLetivo !== undefined) instance.calendarioLetivo = dados.calendarioLetivo;
    if (dados.turma !== undefined) instance.turma = dados.turma;
    if (dados.disciplina !== undefined) instance.disciplina = dados.disciplina;
    if (dados.ambientePadrao !== undefined) instance.ambientePadrao = dados.ambientePadrao;
    if (dados.imagemCapa !== undefined) instance.imagemCapa = dados.imagemCapa;
    if (dados.dateCreated !== undefined) instance.dateCreated = dados.dateCreated;
    if (dados.dateUpdated !== undefined) instance.dateUpdated = dados.dateUpdated;
    if (dados.dateDeleted !== undefined) instance.dateDeleted = dados.dateDeleted;
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
}
