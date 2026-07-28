import { Inject, Injectable, Logger, ServiceUnavailableException } from "@nestjs/common";
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

  constructor(@Inject(IWhatsAppProviderToken) readonly _whatsappProvider: IWhatsAppProvider) {}

  async sendNotification(dto: SendWhatsappNotificationDto): Promise<WhatsappNotificationResponse> {
    throw new ServiceUnavailableException("Integração com WhatsApp temporariamente desabilitada.");
  }

  async getStatus(): Promise<{ apiStatus?: IWhatsappSessionStatus; webhookStatus: string }> {
    throw new ServiceUnavailableException("Integração com WhatsApp temporariamente desabilitada.");
  }

  handleWebhook(payload: WahaWebhookEventDto) {
    this.logger.warn("Webhook recebido, mas a integração com WhatsApp está desabilitada.");
  }

  async getQrCode(): Promise<string | null> {
    throw new ServiceUnavailableException("Integração com WhatsApp temporariamente desabilitada.");
  }

  async getPairingCode(phone: string): Promise<string | null> {
    throw new ServiceUnavailableException("Integração com WhatsApp temporariamente desabilitada.");
  }
}
