import { z } from "zod";
import { createFieldMetadata, createSchema } from "@/domain/abstractions";
import { uuidSchema } from "@/shared/validation/schemas";
import { CalendarioSolicitacaoMudancaStatus } from "./calendario-solicitacao-mudanca.types";

export const CalendarioSolicitacaoMudancaTipoOperacaoValues = ["MOVER", "REMOVER"] as const;

export const CalendarioSolicitacaoMudancaTipoOperacaoSchema = z.enum(
  CalendarioSolicitacaoMudancaTipoOperacaoValues,
);

export const CalendarioSolicitacaoMudancaStatusValues = ["ABERTA", "APROVADA", "RECUSADA"] as const;

export const CalendarioSolicitacaoMudancaStatusSchema = z.enum(
  CalendarioSolicitacaoMudancaStatusValues,
);

const dadosPropostosSchema = z.record(z.string(), z.unknown());

export const CalendarioSolicitacaoMudancaFields = {
  autor: createFieldMetadata({
    description: "Usuário autor da solicitação",
  }),
  calendarioAgendamentoId: createFieldMetadata({
    description: "ID do agendamento alvo da solicitação",
    schema: createSchema(() => uuidSchema),
  }),
  tipoOperacao: createFieldMetadata({
    description: "Tipo de operação proposta: MOVER (alterar campos) ou REMOVER",
    schema: createSchema(() => CalendarioSolicitacaoMudancaTipoOperacaoSchema),
  }),
  dadosPropostos: createFieldMetadata({
    description:
      "Patch parcial dos campos propostos para o agendamento (nome, cor, dataInicio, dataFim, horarioInicio, horarioFim, diaInteiro)",
    schema: createSchema(() => dadosPropostosSchema),
  }),
  justificativa: createFieldMetadata({
    description: "Justificativa da solicitação",
    schema: createSchema(() => z.string().min(1, "justificativa é obrigatória")),
  }),
  status: createFieldMetadata({
    description: "Status da solicitação",
    schema: createSchema(() => CalendarioSolicitacaoMudancaStatusSchema),
    defaultValue: CalendarioSolicitacaoMudancaStatus.ABERTA,
  }),
  motivoRecusa: createFieldMetadata({
    description: "Motivo da recusa, preenchido quando status é RECUSADA",
    nullable: true,
    schema: createSchema(() => z.string().nullable()),
  }),
  sessaoEdicaoId: createFieldMetadata({
    description: "ID da sessão de edição aberta ao aprovar a solicitação",
    nullable: true,
    schema: createSchema(() => uuidSchema.nullable()),
  }),
};
