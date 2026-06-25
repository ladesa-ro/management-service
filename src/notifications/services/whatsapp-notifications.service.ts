import { Injectable, Logger } from "@nestjs/common";
import { v4 as uuidv4 } from "uuid";
import { OpenWAService } from "@/integrations/openwa/services/openwa.service";
import { SendWhatsappNotificationDto } from "../dto/send-whatsapp-notification.dto";
import { WhatsappNotificationResponse } from "../interfaces/whatsapp-notification-response.interface";

@Injectable()
export class WhatsappNotificationsService {
  private readonly logger = new Logger(WhatsappNotificationsService.name);

  constructor(private readonly openWAService: OpenWAService) {}

  async sendNotification(dto: SendWhatsappNotificationDto): Promise<WhatsappNotificationResponse> {
    const { phone, message } = dto;
    this.logger.log(`Iniciando envio de notificação para: ${this.maskPhone(phone)}`);

    try {
      const success = await this.openWAService.sendMessage(phone, message);

      if (success) {
        this.logger.log(`Notificação enviada com sucesso para: ${this.maskPhone(phone)}`);
        return {
          success: true,
          messageId: uuidv4(),
          timestamp: new Date().toISOString(),
        };
      }

      throw new Error("Falha ao processar o envio através do OpenWA.");
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

  async getStatus(): Promise<any> {
    return this.openWAService.getSessionStatus();
  }
}
