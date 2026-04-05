import type { z } from "zod";
import type { IdUuid, ScalarDateTimeString } from "@/domain/abstractions/scalars";
import { generateUuidV7 } from "@/domain/entities/utils/generate-uuid-v7";
import { zodValidate } from "@/shared/validation/index";
import { getNowISO } from "@/utils/date";
import {
  CalendarioLetivoCreateSchema,
  CalendarioLetivoSchema,
  CalendarioLetivoUpdateSchema,
} from "./calendario-letivo.schemas";
import type { ICalendarioLetivoEtapaInput } from "./commands/calendario-letivo-create.command";

export enum CalendarioLetivoSituacao {
  ATIVO = "ATIVO",
  INATIVO = "INATIVO",
}

export type ICalendarioLetivo = z.infer<typeof CalendarioLetivoSchema>;

export interface ICalendarioLetivoCreate {
  nome: string;
  ano: number;
  campus: { id: IdUuid };
  ofertaFormacao?: { id: IdUuid };
  situacao?: CalendarioLetivoSituacao;
  etapas?: ICalendarioLetivoEtapaInput[];
}

export interface ICalendarioLetivoUpdate {
  nome?: string;
  ano?: number;
  campus?: { id: IdUuid };
  ofertaFormacao?: { id: IdUuid } | null;
  situacao?: CalendarioLetivoSituacao;
  etapas?: ICalendarioLetivoEtapaInput[];
}

export class CalendarioLetivo {
  static readonly entityName = "CalendarioLetivo";

  id!: IdUuid;
  nome!: string;
  ano!: number;
  campus!: { id: string };
  ofertaFormacao!: { id: string } | null;
  situacao!: CalendarioLetivoSituacao;
  dateCreated!: ScalarDateTimeString;
  dateUpdated!: ScalarDateTimeString;
  dateDeleted!: ScalarDateTimeString | null;

  private constructor() {}

  static create(dados: ICalendarioLetivoCreate): CalendarioLetivo {
    const parsed = zodValidate(
      CalendarioLetivo.entityName,
      CalendarioLetivoCreateSchema.domain,
      dados,
    );

    const instance = new CalendarioLetivo();

    instance.id = generateUuidV7();
    instance.nome = parsed.nome;
    instance.ano = parsed.ano;
    instance.campus = parsed.campus;
    instance.ofertaFormacao = parsed.ofertaFormacao ?? null;
    instance.situacao = (parsed.situacao ??
      CalendarioLetivoSituacao.ATIVO) as CalendarioLetivoSituacao;
    instance.dateCreated = getNowISO();
    instance.dateUpdated = getNowISO();
    instance.dateDeleted = null;

    return instance;
  }

  static load(dados: unknown): CalendarioLetivo {
    const parsed = zodValidate(CalendarioLetivo.entityName, CalendarioLetivoSchema, dados);

    const instance = new CalendarioLetivo();

    instance.id = parsed.id;
    instance.nome = parsed.nome;
    instance.ano = parsed.ano;
    instance.campus = parsed.campus;
    instance.ofertaFormacao = parsed.ofertaFormacao;
    instance.situacao = parsed.situacao as CalendarioLetivoSituacao;
    instance.dateCreated = parsed.dateCreated;
    instance.dateUpdated = parsed.dateUpdated;
    instance.dateDeleted = parsed.dateDeleted;
    return instance;
  }

  update(dados: unknown): void {
    const parsed = zodValidate(
      CalendarioLetivo.entityName,
      CalendarioLetivoUpdateSchema.domain,
      dados,
    );

    if (parsed.nome !== undefined) this.nome = parsed.nome;
    if (parsed.ano !== undefined) this.ano = parsed.ano;
    if (parsed.situacao !== undefined) this.situacao = parsed.situacao as CalendarioLetivoSituacao;

    this.dateUpdated = getNowISO();
  }

  isActive(): boolean {
    return this.dateDeleted === null;
  }
}
