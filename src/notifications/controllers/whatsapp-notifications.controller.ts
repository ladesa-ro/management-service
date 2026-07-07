import { Body, Controller, Get, HttpCode, HttpException, HttpStatus, Post } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { NeedsAuth } from "@/server/nest/auth";
import { SendWhatsappNotificationDto } from "../dto/send-whatsapp-notification.dto";
import { WhatsappPairingCodeDto } from "../dto/whatsapp-pairing-code.dto";
import { WhatsappNotificationResponse } from "../interfaces/whatsapp-notification-response.interface";
import { WhatsappNotificationsService } from "../services/whatsapp-notifications.service";

@ApiTags("WhatsApp Notifications")
@Controller("notifications")
@NeedsAuth()
export class WhatsappNotificationsController {
  constructor(private readonly whatsappNotificationsService: WhatsappNotificationsService) {}

  @Post("whatsapp/send")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Envia uma mensagem WhatsApp via WAHA" })
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
  @ApiOperation({ summary: "Obtém o status da sessão do WhatsApp (WAHA)" })
  async getStatus() {
    return this.whatsappNotificationsService.getStatus();
  }

  @Post("whatsapp/pairing-code")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Obtém o código de pareamento para login" })
  @ApiBody({ type: WhatsappPairingCodeDto })
  async getPairingCode(@Body() payload: WhatsappPairingCodeDto) {
    const code = await this.whatsappNotificationsService.getPairingCode(payload.phone);
    if (!code) {
      throw new HttpException(
        "Não foi possível gerar o código de pareamento. A sessão pode já estar conectada ou inicializando.",
        HttpStatus.BAD_REQUEST,
      );
    }
    return { code };
  }
}
