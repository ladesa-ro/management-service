import { EntityQueryResult, SharedFields } from "@/domain/abstractions";
import { UsuarioFindOneQueryResult } from "@/modules/acesso/usuario";
import { CalendarioSolicitacaoMudancaFields } from "../calendario-solicitacao-mudanca.fields";

export const CalendarioSolicitacaoMudancaFindOneQueryResultFields = {
  id: SharedFields.idUuid,
  ...CalendarioSolicitacaoMudancaFields,
};

export class CalendarioSolicitacaoMudancaFindOneQueryResult extends EntityQueryResult {
  autor!: UsuarioFindOneQueryResult;
  calendarioAgendamentoId!: string;
  tipoOperacao!: string;
  dadosPropostos!: Record<string, unknown>;
  justificativa!: string;
  status!: string;
  motivoRecusa!: string | null;
  sessaoEdicaoId!: string | null;
}
