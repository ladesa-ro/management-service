/**
 * Payload para o endpoint POST /api/sendText do WAHA.
 * @see https://waha.devlike.pro/docs/overview/sending-messages/
 */
export interface WahaSendTextPayload {
  /** Nome da sessão ativa no WAHA (ex: "default") */
  session: string;
  /** ID do destinatário no formato WhatsApp (ex: "5511999999999@c.us") */
  chatId: string;
  /** Texto da mensagem a ser enviada */
  text: string;
}
