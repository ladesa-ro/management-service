/**
 * Payload emitido na room WebSocket `calendario:{colecaoId}` sempre que um
 * agendamento vinculado à coleção é escrito (criado, atualizado, ocorrência
 * editada/cancelada, série dividida).
 *
 * `syncToken` é o contador da coleção logo após o incremento — o mesmo valor
 * que a consulta `calendario-colecao-mudancas-desde` devolve como `syncToken`
 * atual, permitindo ao cliente reconciliar o que recebeu via WS com o que
 * viria de um poll.
 */
export interface CalendarioColecaoSyncPayload {
  colecaoId: string;
  agendamentoId: string;
  tipoOperacao: string;
  syncToken: number;
}
