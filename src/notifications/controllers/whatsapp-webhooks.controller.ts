import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { WhatsappNotificationsService } from "../services/whatsapp-notifications.service";

@ApiTags("WhatsApp Webhooks")
@Controller("webhooks")
export class WhatsappWebhooksController {
  constructor(private readonly whatsappNotificationsService: WhatsappNotificationsService) {}

  @Post("whatsapp")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Recebe os eventos Webhook enviados pelo container do OpenWA" })
  async handleWebhook(@Body() payload: any) {
    this.whatsappNotificationsService.handleWebhook(payload);
    return { success: true };
  }
}
