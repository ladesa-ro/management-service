import { Body, Controller, Get, HttpCode, HttpStatus, Post, Redirect } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { SendWhatsappNotificationDto } from "../dto/send-whatsapp-notification.dto";
import { WhatsappNotificationResponse } from "../interfaces/whatsapp-notification-response.interface";
import { WhatsappNotificationsService } from "../services/whatsapp-notifications.service";

@ApiTags("WhatsApp Notifications")
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

  @Get("whatsapp/status")
  @ApiOperation({ summary: "Obtém o status da sessão do WhatsApp (OpenWA)" })
  async getStatus() {
    return this.whatsappNotificationsService.getStatus();
  }

  @Get("whatsapp/login")
  @ApiOperation({ summary: "Redireciona para a interface de login (QR Code) do OpenWA" })
  @Redirect()
  async login() {
    const openwaUrl = process.env.OPENWA_BASE_URL || "http://localhost:8000";
    // We return the URL so NestJS can issue a 302 Redirect to the frontend
    return { url: openwaUrl, statusCode: HttpStatus.FOUND };
  }
}
