import type { CalendarioAgendamentoFindOneQueryResult } from "@/modules/calendario/agendamento/domain/queries/calendario-agendamento-find-one.query.result";

export class CalendarioColecaoMudancasDesdeQueryResult {
  /** Marcador de sincronização atual da coleção (RFC 6578). */
  syncToken!: number;

  /**
   * Agendamentos considerados "mudados" desde o marcador informado.
   *
   * Sem tabela de auditoria por trás do `sync_token`, não há como saber
   * exatamente quais agendamentos mudaram em cada incremento — apenas que
   * a coleção mudou. Por isso a resposta é conservadora: quando
   * `desde < syncToken`, devolve o snapshot completo dos agendamentos ativos
   * da coleção (o cliente reconcilia por cima); quando `desde >= syncToken`
   * (cliente já está em dia), devolve lista vazia.
   */
  agendamentos!: CalendarioAgendamentoFindOneQueryResult[];
}
