import * as crypto from "node:crypto";

import {
  Body,
  Controller,
  Headers,
  HttpCode,
  HttpStatus,
  Inject,
  Logger,
  Post,
  ServiceUnavailableException,
  UnauthorizedException,
} from "@nestjs/common";
import { ApiHeader, ApiOperation, ApiTags } from "@nestjs/swagger";
import { IConfigService } from "@/infrastructure.config";
import { ConfigTokens } from "@/infrastructure.config/config-tokens";
import { WahaWebhookEventDto } from "@/integrations/waha/dto/waha-webhook-event.dto";
import { Public } from "@/server/nest/auth";
import { WhatsappNotificationsService } from "../services/whatsapp-notifications.service";

@ApiTags("WhatsApp Webhooks")
// Autenticação feita via HMAC-SHA512 no handler — não usa Bearer token.
@Public()
@Controller("webhooks")
export class WhatsappWebhooksController {
  private readonly logger = new Logger(WhatsappWebhooksController.name);

  constructor(
    private readonly whatsappNotificationsService: WhatsappNotificationsService,
    @Inject(IConfigService) private readonly appConfigService: IConfigService,
  ) {}

  @Post("whatsapp")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: "Recebe os eventos Webhook enviados pelo container do WAHA",
    description:
      "Autenticação via assinatura HMAC-SHA512. O WAHA calcula o hash do payload JSON " +
      "usando WAHA_WEBHOOK_HMAC_KEY e envia no header X-Webhook-Hmac. " +
      "O backend recalcula e compara com timing-safe para prevenir timing attacks.",
  })
  @ApiHeader({
    name: "X-Webhook-Hmac",
    description: "Assinatura HMAC-SHA512 do payload, calculada pelo WAHA com a chave compartilhada",
    required: true,
  })
  handleWebhook(
    @Body() payload: WahaWebhookEventDto,
    @Headers("x-webhook-hmac") receivedHmac?: string,
  ): { success: boolean } {
    const hmacKey = this.appConfigService.get<string>(ConfigTokens.WhatsAppOptions.WebhookHmacKey);

    // FAIL-CLOSED: se a chave HMAC não estiver configurada no servidor, o endpoint
    // não pode autenticar nenhum request. Rejeitar tudo para não operar sem segurança.
    if (!hmacKey) {
      this.logger.error(
        "WAHA_WEBHOOK_HMAC_KEY não está configurada. Webhook rejeitado por política fail-closed.",
      );
      throw new ServiceUnavailableException(
        "Endpoint de webhook indisponível: chave HMAC não configurada no servidor.",
      );
    }

    if (!receivedHmac) {
      this.logger.warn("Requisição ao webhook sem header X-Webhook-Hmac.");
      throw new UnauthorizedException("Assinatura HMAC ausente.");
    }

    // Valida a assinatura HMAC usando comparação timing-safe (timingSafeEqual)
    // para prevenir timing attacks que permitem deduzir a chave por diferença de tempo.
    const expectedHmac = crypto
      .createHmac("sha512", hmacKey)
      .update(JSON.stringify(payload))
      .digest("hex");

    const receivedBuf = Buffer.from(receivedHmac, "hex");
    const expectedBuf = Buffer.from(expectedHmac, "hex");

    const isValid =
      receivedBuf.length === expectedBuf.length && crypto.timingSafeEqual(receivedBuf, expectedBuf);

    if (!isValid) {
      this.logger.warn("Assinatura HMAC do webhook inválida — possível requisição forjada.");
      throw new UnauthorizedException("Assinatura HMAC inválida.");
    }

    this.whatsappNotificationsService.handleWebhook(payload);
    return { success: true };
  }
}
