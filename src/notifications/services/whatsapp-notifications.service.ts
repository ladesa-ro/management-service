import { Inject, Injectable, Logger } from "@nestjs/common";
import { v4 as uuidv4 } from "uuid";
import { WahaWebhookEventDto } from "@/integrations/waha/dto/waha-webhook-event.dto";
import { SendWhatsappNotificationDto } from "../dto/send-whatsapp-notification.dto";
import { WhatsappNotificationResponse } from "../interfaces/whatsapp-notification-response.interface";
import {
  type IWhatsAppProvider,
  IWhatsAppProviderToken,
  type IWhatsappSessionStatus,
} from "../interfaces/whatsapp-provider.interface";

@Injectable()
export class WhatsappNotificationsService {
  private readonly logger = new Logger(WhatsappNotificationsService.name);

  constructor(
    @Inject(IWhatsAppProviderToken) private readonly whatsappProvider: IWhatsAppProvider,
  ) {}

  async sendNotification(dto: SendWhatsappNotificationDto): Promise<WhatsappNotificationResponse> {
    const { phone, message } = dto;
    this.logger.log(`Iniciando envio de notificação para: ${this.maskPhone(phone)}`);

    try {
      const success = await this.whatsappProvider.sendMessage(phone, message);

      if (success) {
        this.logger.log(`Notificação enviada com sucesso para: ${this.maskPhone(phone)}`);
        return {
          success: true,
          messageId: uuidv4(),
          timestamp: new Date().toISOString(),
        };
      }

      throw new Error("Falha ao processar o envio através do Provedor de WhatsApp.");
    } catch (error: unknown) {
      const message_ = error instanceof Error ? error.message : String(error);
      this.logger.error(`Erro ao enviar notificação para ${this.maskPhone(phone)}: ${message_}`);

      return {
        success: false,
        timestamp: new Date().toISOString(),
        error: "Failed to send message",
      };
    }
  }

  private maskPhone(phone: string): string {
    if (!phone || phone.length < 4) return "****";
    return `${phone.slice(0, 2)}****${phone.slice(-4)}`;
  }

  async getStatus(): Promise<{ apiStatus?: IWhatsappSessionStatus; webhookStatus: string }> {
    try {
      const apiStatus = await this.whatsappProvider.getSessionStatus();
      return { apiStatus, webhookStatus: "FETCHED_FROM_API" };
    } catch {
      return { webhookStatus: "DISCONNECTED" };
    }
  }

  handleWebhook(payload: WahaWebhookEventDto): void {
    // O webhook é utilizado para logging e despacho de eventos.
    // Não é a fonte de verdade sobre o estado da conexão — use getSessionStatus() para isso.
    this.logger.log(
      `Received WhatsApp webhook event: ${payload?.event} [session=${payload?.session}]`,
    );
  }

  async getQrCode(): Promise<string | null> {
    try {
      return (await this.whatsappProvider.getQrCode?.()) ?? null;
    } catch {
      return null;
    }
  }

  async getPairingCode(phone: string): Promise<string | null> {
    try {
      const cleanPhone = phone.replace(/\D/g, "");
      return (await this.whatsappProvider.getPairingCode?.(cleanPhone)) ?? null;
    } catch (error) {
      this.logger.error(`Erro ao obter pairing code para ${this.maskPhone(phone)}: ${error}`);
      return null;
    }
  }
}
