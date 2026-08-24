export interface CalendarioColecaoSyncPayload {
  colecaoId: string;
  agendamentoId: string;
  tipoOperacao: string;
  syncToken: number;
}
