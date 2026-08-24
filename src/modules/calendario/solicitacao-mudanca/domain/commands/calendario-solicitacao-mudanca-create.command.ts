import { CalendarioSolicitacaoMudancaFields } from "../calendario-solicitacao-mudanca.fields";
import type { CalendarioSolicitacaoMudancaTipoOperacao } from "../calendario-solicitacao-mudanca.types";

export const CalendarioSolicitacaoMudancaCreateCommandFields = {
  calendarioAgendamentoId: CalendarioSolicitacaoMudancaFields.calendarioAgendamentoId,
  tipoOperacao: CalendarioSolicitacaoMudancaFields.tipoOperacao,
  dadosPropostos: CalendarioSolicitacaoMudancaFields.dadosPropostos,
  justificativa: CalendarioSolicitacaoMudancaFields.justificativa,
};

export class CalendarioSolicitacaoMudancaCreateCommand {
  calendarioAgendamentoId!: string;
  tipoOperacao!: CalendarioSolicitacaoMudancaTipoOperacao;
  dadosPropostos!: Record<string, unknown>;
  justificativa!: string;
}
