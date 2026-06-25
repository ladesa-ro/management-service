import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { SendWhatsappNotificationDto } from "../dto/send-whatsapp-notification.dto";
import { WhatsappNotificationResponse } from "../interfaces/whatsapp-notification-response.interface";
import { WhatsappNotificationsService } from "../services/whatsapp-notifications.service";

@ApiTags("Notifications")
@Controller("notifications")
export class WhatsappNotificationsController {
  constructor(private readonly whatsappNotificationsService: WhatsappNotificationsService) {}

  @Post("whatsapp/send")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Envia uma mensagem WhatsApp via OpenWA" })
  @ApiBody({ type: SendWhatsappNotificationDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Operação concluída",
    schema: {
      example: {
        success: true,
        messageId: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
        timestamp: "2026-01-01T12:00:00Z",
      },
    },
  })
  async sendWhatsAppMessage(
    @Body() payload: SendWhatsappNotificationDto,
  ): Promise<WhatsappNotificationResponse> {
    return this.whatsappNotificationsService.sendNotification(payload);
  }
}
