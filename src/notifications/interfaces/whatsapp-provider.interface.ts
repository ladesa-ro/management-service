export interface IWhatsappSessionStatus {
  [key: string]: any;
}

export const IWhatsAppProviderToken = Symbol("IWhatsAppProvider");

export interface IWhatsAppProvider {
  /**
   * Envia uma mensagem de texto para o número especificado.
   * @param to Número de destino (ex: 5511999999999)
   * @param text O conteúdo da mensagem
   * @returns true se a mensagem for processada com sucesso
   */
  sendMessage(to: string, text: string): Promise<boolean>;

  /**
   * Retorna o status atual da sessão do WhatsApp (Conectado, QRCode, etc).
   */
  getSessionStatus(): Promise<IWhatsappSessionStatus>;

  /**
   * Retorna o código de pareamento (Pairing Code) para autenticação por número de telefone.
   */
  getPairingCode?(phone: string): Promise<string>;

  /**
   * Retorna o QR Code da sessão atual em formato base64.
   * Disponível apenas quando o status da sessão é SCAN_QR_CODE.
   */
  getQrCode?(): Promise<string | null>;
}
