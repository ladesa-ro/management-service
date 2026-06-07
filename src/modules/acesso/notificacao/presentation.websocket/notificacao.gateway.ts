import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets";
import type { Server, Socket } from "socket.io";
import type { EstagioNotificacaoPayload, EstagioWsRoom } from "../domain/estagio-notificacao.types";
import {
  ESTAGIO_WS_EVENT,
  ESTAGIO_WS_JOIN_ROOM,
  ESTAGIO_WS_LEAVE_ROOM,
  ESTAGIO_WS_ROOMS,
} from "../domain/estagio-notificacao.types";

/**
 * Gateway WebSocket para notificações do módulo de Estágio.
 *
 * Usa Socket.IO com rooms para que cada cliente receba apenas
 * as notificações dos contextos em que está inscrito.
 *
 * Rooms disponíveis:
 *  - estagio:status      — mudanças de status
 *  - estagio:prazos      — alertas de prazo
 *  - estagio:documentos  — documentos e seguros
 *  - estagio:visitas     — visitas de orientação
 *  - estagio:importacao  — jobs de importação CSV
 *  - estagio:aprovacoes  — fluxo de aprovação
 *  - estagio:alertas     — alertas gerais
 */
@WebSocketGateway({
  cors: { origin: "*" },
  namespace: "/notificacoes",
})
export class NotificacaoGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  private readonly server!: Server;

  private readonly validRooms = new Set<string>(Object.values(ESTAGIO_WS_ROOMS));

  handleConnection(client: Socket) {
    console.log(`[WS] cliente conectado: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`[WS] cliente desconectado: ${client.id}`);
  }

  /**
   * Cliente solicita entrada em um room.
   * Payload: string com o roomId (ex: "estagio:status")
   */
  @SubscribeMessage(ESTAGIO_WS_JOIN_ROOM)
  handleJoinRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() roomId: string,
  ): { event: string; data: { room: string; joined: boolean } } {
    if (!this.validRooms.has(roomId)) {
      return { event: "error", data: { room: roomId, joined: false } };
    }

    void client.join(roomId);
    console.log(`[WS] ${client.id} entrou no room: ${roomId}`);

    return { event: "room_joined", data: { room: roomId, joined: true } };
  }

  /**
   * Cliente solicita saída de um room.
   */
  @SubscribeMessage(ESTAGIO_WS_LEAVE_ROOM)
  handleLeaveRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() roomId: string,
  ): { event: string; data: { room: string } } {
    void client.leave(roomId);
    console.log(`[WS] ${client.id} saiu do room: ${roomId}`);

    return { event: "room_left", data: { room: roomId } };
  }

  /**
   * Emite uma notificação para todos os clientes inscritos no room especificado.
   * Chamado internamente pelo NotificacaoPushService.
   */
  emitToRoom(room: EstagioWsRoom, payload: EstagioNotificacaoPayload): void {
    this.server.to(room).emit(ESTAGIO_WS_EVENT, payload);
  }

  /**
   * Emite uma notificação para um cliente específico (ex: importação).
   * Permite notificar apenas o usuário que disparou a ação.
   */
  emitToSocket(socketId: string, payload: EstagioNotificacaoPayload): void {
    this.server.to(socketId).emit(ESTAGIO_WS_EVENT, payload);
  }
}
