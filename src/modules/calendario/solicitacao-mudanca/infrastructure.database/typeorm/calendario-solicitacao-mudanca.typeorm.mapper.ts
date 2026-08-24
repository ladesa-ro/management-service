import type { DeepPartial } from "typeorm";
import { UsuarioTypeormMapper } from "@/modules/acesso/usuario/infrastructure.database/typeorm";
import type { ICalendarioSolicitacaoMudanca } from "@/modules/calendario/solicitacao-mudanca/domain/calendario-solicitacao-mudanca";
import {
  CalendarioSolicitacaoMudancaStatus,
  CalendarioSolicitacaoMudancaTipoOperacao,
} from "@/modules/calendario/solicitacao-mudanca/domain/calendario-solicitacao-mudanca.types";
import type { CalendarioSolicitacaoMudancaFindOneQueryResult } from "@/modules/calendario/solicitacao-mudanca/domain/queries/calendario-solicitacao-mudanca-find-one.query.result";
import { createMapper, pickId } from "@/shared/mapping";
import type { CalendarioSolicitacaoMudancaEntity } from "./calendario-solicitacao-mudanca.typeorm.entity";

export const entityToDomain = createMapper<
  CalendarioSolicitacaoMudancaEntity,
  ICalendarioSolicitacaoMudanca
>((e) => ({
  id: e.id,
  autor: pickId(e.autor),
  calendarioAgendamentoId: e.calendarioAgendamento.id,
  tipoOperacao: e.tipoOperacao,
  dadosPropostos: e.dadosPropostos,
  justificativa: e.justificativa,
  status: e.status,
  motivoRecusa: e.motivoRecusa,
  sessaoEdicaoId: e.sessaoEdicao ? e.sessaoEdicao.id : null,
  dateCreated: e.dateCreated,
  dateUpdated: e.dateUpdated,
  dateDeleted: e.dateDeleted,
}));

export const entityToFindOneQueryResult = createMapper<
  CalendarioSolicitacaoMudancaEntity,
  CalendarioSolicitacaoMudancaFindOneQueryResult
>((e) => ({
  id: e.id,
  autor: UsuarioTypeormMapper.entityToFindOneQueryResult.map(e.autor),
  calendarioAgendamentoId: e.calendarioAgendamento.id,
  tipoOperacao: e.tipoOperacao,
  dadosPropostos: e.dadosPropostos,
  justificativa: e.justificativa,
  status: e.status,
  motivoRecusa: e.motivoRecusa,
  sessaoEdicaoId: e.sessaoEdicao ? e.sessaoEdicao.id : null,
  dateCreated: e.dateCreated,
  dateUpdated: e.dateUpdated,
  dateDeleted: e.dateDeleted,
}));

export const domainToPersistence = createMapper<
  ICalendarioSolicitacaoMudanca,
  DeepPartial<CalendarioSolicitacaoMudancaEntity>
>((d) => ({
  id: d.id,
  autor: pickId(d.autor),
  calendarioAgendamento: { id: d.calendarioAgendamentoId },
  tipoOperacao: d.tipoOperacao as CalendarioSolicitacaoMudancaTipoOperacao,
  dadosPropostos: d.dadosPropostos,
  justificativa: d.justificativa,
  status: d.status as CalendarioSolicitacaoMudancaStatus,
  motivoRecusa: d.motivoRecusa,
  sessaoEdicao: d.sessaoEdicaoId ? { id: d.sessaoEdicaoId } : null,
  dateCreated: d.dateCreated,
  dateUpdated: d.dateUpdated,
  dateDeleted: d.dateDeleted,
}));
