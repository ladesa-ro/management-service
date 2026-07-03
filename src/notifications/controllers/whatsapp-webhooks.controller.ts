import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
  Query,
  UnauthorizedException,
} from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { IConfigService } from "@/infrastructure.config";
import { ConfigTokens } from "@/infrastructure.config/config-tokens";
import { OpenWaWebhookEventDto } from "@/integrations/openwa/dto/openwa-webhook-event.dto";
import { WhatsappNotificationsService } from "../services/whatsapp-notifications.service";

@ApiTags("WhatsApp Webhooks")
@Controller("webhooks")
export class WhatsappWebhooksController {
  constructor(
    private readonly whatsappNotificationsService: WhatsappNotificationsService,
    @Inject(IConfigService) private readonly appConfigService: IConfigService,
  ) {}

  @Post("whatsapp")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Recebe os eventos Webhook enviados pelo container do OpenWA" })
  async handleWebhook(@Body() payload: OpenWaWebhookEventDto, @Query("token") token?: string) {
    const expectedToken = this.appConfigService.get<string>(ConfigTokens.WhatsAppOptions.ApiKey);

    if (expectedToken && token !== expectedToken) {
      throw new UnauthorizedException("Chave do webhook inválida ou ausente.");
    }

    this.whatsappNotificationsService.handleWebhook(payload);
    return { success: true };
  }
}
