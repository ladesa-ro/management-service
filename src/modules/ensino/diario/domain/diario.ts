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
import { DiarioCreateSchema, DiarioSchema, DiarioUpdateSchema } from "./diario.schemas";

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
    instance.calendarioLetivo = parsed.calendarioLetivo as unknown as ICalendarioLetivo;
    instance.turma = parsed.turma as unknown as ITurma;
    instance.disciplina = parsed.disciplina as unknown as IDisciplina;
    instance.ambientePadrao = parsed.ambientePadrao
      ? (parsed.ambientePadrao as unknown as IAmbiente)
      : null;
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
    instance.calendarioLetivo = parsed.calendarioLetivo as unknown as ICalendarioLetivo;
    instance.turma = parsed.turma as unknown as ITurma;
    instance.disciplina = parsed.disciplina as unknown as IDisciplina;
    instance.ambientePadrao = parsed.ambientePadrao as unknown as IAmbiente | null;
    instance.imagemCapa = parsed.imagemCapa as unknown as IImagem | null;
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
}
