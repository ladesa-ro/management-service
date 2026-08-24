import type { z } from "zod";
import type { ObjectUuidRef } from "@/domain/abstractions";
import type { IdUuid, ScalarDateTimeString } from "@/domain/abstractions/scalars";
import { generateUuidV7 } from "@/domain/entities/utils/generate-uuid-v7";
import { zodValidate } from "@/shared/validation/index";
import { getNowISO } from "@/utils/date";
import {
  CalendarioSolicitacaoMudancaCreateSchema,
  CalendarioSolicitacaoMudancaSchema,
} from "./calendario-solicitacao-mudanca.schemas";
import {
  CalendarioSolicitacaoMudancaStatus,
  CalendarioSolicitacaoMudancaTipoOperacao,
} from "./calendario-solicitacao-mudanca.types";

export type ICalendarioSolicitacaoMudanca = z.infer<typeof CalendarioSolicitacaoMudancaSchema>;

export interface ICalendarioSolicitacaoMudancaCreate {
  autor: ObjectUuidRef;
  calendarioAgendamentoId: string;
  tipoOperacao: CalendarioSolicitacaoMudancaTipoOperacao;
  dadosPropostos: Record<string, unknown>;
  justificativa: string;
}

export class CalendarioSolicitacaoMudanca {
  static readonly entityName = "CalendarioSolicitacaoMudanca";

  id!: IdUuid;
  autor!: { id: string };
  calendarioAgendamentoId!: string;
  tipoOperacao!: CalendarioSolicitacaoMudancaTipoOperacao;
  dadosPropostos!: Record<string, unknown>;
  justificativa!: string;
  status!: CalendarioSolicitacaoMudancaStatus;
  motivoRecusa!: string | null;
  sessaoEdicaoId!: string | null;
  dateCreated!: ScalarDateTimeString;
  dateUpdated!: ScalarDateTimeString;
  dateDeleted!: ScalarDateTimeString | null;

  private constructor() {}

  static create(dados: ICalendarioSolicitacaoMudancaCreate): CalendarioSolicitacaoMudanca {
    const parsed = zodValidate(
      CalendarioSolicitacaoMudanca.entityName,
      CalendarioSolicitacaoMudancaCreateSchema.domain,
      dados,
    );

    const instance = new CalendarioSolicitacaoMudanca();

    instance.id = generateUuidV7();
    instance.autor = dados.autor;
    instance.calendarioAgendamentoId = parsed.calendarioAgendamentoId;
    instance.tipoOperacao = parsed.tipoOperacao as CalendarioSolicitacaoMudancaTipoOperacao;
    instance.dadosPropostos = parsed.dadosPropostos;
    instance.justificativa = parsed.justificativa;
    instance.status = CalendarioSolicitacaoMudancaStatus.ABERTA;
    instance.motivoRecusa = null;
    instance.sessaoEdicaoId = null;
    instance.dateCreated = getNowISO();
    instance.dateUpdated = getNowISO();
    instance.dateDeleted = null;

    return instance;
  }

  static load(dados: unknown): CalendarioSolicitacaoMudanca {
    const parsed = zodValidate(
      CalendarioSolicitacaoMudanca.entityName,
      CalendarioSolicitacaoMudancaSchema,
      dados,
    );

    const instance = new CalendarioSolicitacaoMudanca();

    instance.id = parsed.id;
    instance.autor = parsed.autor;
    instance.calendarioAgendamentoId = parsed.calendarioAgendamentoId;
    instance.tipoOperacao = parsed.tipoOperacao as CalendarioSolicitacaoMudancaTipoOperacao;
    instance.dadosPropostos = parsed.dadosPropostos;
    instance.justificativa = parsed.justificativa;
    instance.status = parsed.status as CalendarioSolicitacaoMudancaStatus;
    instance.motivoRecusa = parsed.motivoRecusa;
    instance.sessaoEdicaoId = parsed.sessaoEdicaoId;
    instance.dateCreated = parsed.dateCreated;
    instance.dateUpdated = parsed.dateUpdated;
    instance.dateDeleted = parsed.dateDeleted;

    return instance;
  }

  isActive(): boolean {
    return this.dateDeleted === null;
  }
}
