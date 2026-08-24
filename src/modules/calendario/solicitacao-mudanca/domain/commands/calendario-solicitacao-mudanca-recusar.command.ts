import { CalendarioSolicitacaoMudancaFields } from "../calendario-solicitacao-mudanca.fields";

export const CalendarioSolicitacaoMudancaRecusarCommandFields = {
  motivoRecusa: CalendarioSolicitacaoMudancaFields.motivoRecusa,
};

export class CalendarioSolicitacaoMudancaRecusarCommand {
  motivoRecusa?: string | null;
}
