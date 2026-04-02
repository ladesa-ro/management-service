import type { z } from "zod";
import type { IdUuid, ScalarDateTimeString } from "@/domain/abstractions/scalars";
import { generateUuidV7 } from "@/domain/entities/utils/generate-uuid-v7";
import { zodValidate } from "@/shared/validation/index";
import { getNowISO } from "@/utils/date";
import { CalendarioAgendamentoMetadataSchema } from "./calendario-agendamento.schemas";

export type ICalendarioAgendamentoMetadata = z.infer<typeof CalendarioAgendamentoMetadataSchema>;

export class CalendarioAgendamentoMetadata {
  static readonly entityName = "CalendarioAgendamentoMetadata";

  id!: IdUuid;
  identificadorExternoCalendarioAgendamento!: IdUuid;
  nome!: string | null;
  cor!: string | null;
  dateUpdated!: ScalarDateTimeString;

  private constructor() {}

  static create(dados: {
    identificadorExternoCalendarioAgendamento: string;
    nome?: string | null;
    cor?: string | null;
  }): CalendarioAgendamentoMetadata {
    const instance = new CalendarioAgendamentoMetadata();

    instance.id = generateUuidV7();
    instance.identificadorExternoCalendarioAgendamento =
      dados.identificadorExternoCalendarioAgendamento;
    instance.nome = dados.nome ?? null;
    instance.cor = dados.cor ?? null;
    instance.dateUpdated = getNowISO();

    return instance;
  }

  static load(dados: ICalendarioAgendamentoMetadata): CalendarioAgendamentoMetadata {
    const parsed = zodValidate(
      CalendarioAgendamentoMetadata.entityName,
      CalendarioAgendamentoMetadataSchema,
      dados,
    );

    const instance = new CalendarioAgendamentoMetadata();

    instance.id = parsed.id;
    instance.identificadorExternoCalendarioAgendamento =
      parsed.identificadorExternoCalendarioAgendamento;
    instance.nome = parsed.nome;
    instance.cor = parsed.cor;
    instance.dateUpdated = parsed.dateUpdated;

    return instance;
  }

  update(dados: { nome?: string | null; cor?: string | null }): void {
    if (dados.nome !== undefined) this.nome = dados.nome;
    if (dados.cor !== undefined) this.cor = dados.cor;
    this.dateUpdated = getNowISO();
  }
}
