import { Injectable, Logger } from "@nestjs/common";
import type {
  IWhatsAppProvider,
  IWhatsappSessionStatus,
} from "@/notifications/interfaces/whatsapp-provider.interface";
import { WahaClient } from "../client/waha.client";

@Injectable()
export class WahaService implements IWhatsAppProvider {
  private readonly logger = new Logger(WahaService.name);

  constructor(private readonly wahaClient: WahaClient) {}

  async sendMessage(to: string, text: string): Promise<boolean> {
    this.logger.log(`Attempting to send message to ${to}`);

    // O WAHA usa o sufixo @c.us para números pessoais, igual ao OpenWA.
    // Mantemos a formatação para garantir compatibilidade.
    const chatId = to.includes("@c.us") ? to : `${to}@c.us`;

    try {
      const result = await this.wahaClient.sendText(chatId, text);

      if (result) {
        this.logger.log(`Message successfully sent to ${to}`);
        return true;
      }
      return false;
    } catch (error) {
      this.logger.error(`Failed to send message to ${to}: ${error}`);
      throw error;
    }
  }

  async getSessionStatus(): Promise<IWhatsappSessionStatus> {
    return this.wahaClient.getSessionStatus();
  }

  async getQrCode(): Promise<string | null> {
    return this.wahaClient.getQrCode();
  }

  async getPairingCode(phone: string): Promise<string> {
    const cleanPhone = phone.replace(/\D/g, "");
    return this.wahaClient.getPairingCode(cleanPhone);
  }
}
