import { Inject, Injectable, Logger } from "@nestjs/common";
import { v4 as uuidv4 } from "uuid";
import { OpenWaWebhookEventDto } from "@/integrations/openwa/dto/openwa-webhook-event.dto";
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
    } catch (error: any) {
      this.logger.error(
        `Erro ao enviar notificação para ${this.maskPhone(phone)}: ${error?.message || error}`,
      );

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

  handleWebhook(payload: OpenWaWebhookEventDto) {
    // O webhook pode ser mantido apenas para logs ou dispatche de eventos,
    // mas não deve ser a Single Source of Truth para o estado da conexão.
    this.logger.log(`Received WhatsApp webhook event: ${payload?.event}`);
  }

  async getQrCode(): Promise<string | null> {
    try {
      const status = await this.whatsappProvider.getSessionStatus();
      return status?.qrCode || null;
    } catch {
      return null;
    }
  }
}
