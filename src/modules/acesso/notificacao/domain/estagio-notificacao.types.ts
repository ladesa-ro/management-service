/**
 * Tipos centralizados das notificações push do módulo de Estágio.
 *
 * Define os eventos e o payload padrão emitido via WebSocket (Socket.IO).
 * Serve como contrato entre o serviço de push e os clientes front-end.
 */

// Rooms WebSocket — um cliente se inscreve nos rooms relevantes ao seu perfil
export const ESTAGIO_WS_ROOMS = {
  STATUS: "estagio:status",
  PRAZOS: "estagio:prazos",
  DOCUMENTOS: "estagio:documentos",
  VISITAS: "estagio:visitas",
  IMPORTACAO: "estagio:importacao",
  APROVACOES: "estagio:aprovacoes",
  ALERTAS: "estagio:alertas",
} as const;

export type EstagioWsRoom = (typeof ESTAGIO_WS_ROOMS)[keyof typeof ESTAGIO_WS_ROOMS];

// Prioridades — usadas pelo cliente para exibir a notificação adequadamente
export type EstagioNotificacaoPrioridade = "baixa" | "media" | "alta" | "critica";

// Categorias — agrupamento semântico
export type EstagioNotificacaoCategoria =
  | "status"
  | "prazo"
  | "documento"
  | "visita"
  | "importacao"
  | "aprovacao"
  | "alerta";

/**
 * Payload padrão emitido em todos os eventos de notificação WebSocket.
 * O campo `evento` identifica o tipo exato (ex: "estagio_rescindido").
 */
export interface EstagioNotificacaoPayload {
  evento: string;
  titulo: string;
  conteudo: string;
  prioridade: EstagioNotificacaoPrioridade;
  categoria: EstagioNotificacaoCategoria;
  room: EstagioWsRoom;
  estagioId?: string;
  estagiarioNome?: string;
  timestamp: string; // ISO 8601
  metadata?: Record<string, unknown>;
}

// Evento emitido pelo gateway a todos os clientes de um room
export const ESTAGIO_WS_EVENT = "notificacao" as const;

// Mensagem que o cliente envia para entrar em um room
export const ESTAGIO_WS_JOIN_ROOM = "join_room" as const;

// Mensagem que o cliente envia para sair de um room
export const ESTAGIO_WS_LEAVE_ROOM = "leave_room" as const;
