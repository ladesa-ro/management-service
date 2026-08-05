import * as crypto from "node:crypto";

import { ServiceUnavailableException, UnauthorizedException } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { IConfigService } from "@/infrastructure.config";
import { ConfigTokens } from "@/infrastructure.config/config-tokens";
import { WahaWebhookEventDto } from "@/integrations/waha/dto/waha-webhook-event.dto";
import { WhatsappWebhooksController } from "../controllers/whatsapp-webhooks.controller";
import { WhatsappNotificationsService } from "../services/whatsapp-notifications.service";

const HMAC_SECRET = "test-hmac-secret-32-chars-minimum!!";

const mockPayload: WahaWebhookEventDto = {
  event: "session.status",
  session: "default",
  payload: { status: "WORKING" },
};

function signPayload(payload: WahaWebhookEventDto, key: string): string {
  return crypto.createHmac("sha512", key).update(JSON.stringify(payload)).digest("hex");
}

describe("WhatsappWebhooksController", () => {
  let controller: WhatsappWebhooksController;
  let service: WhatsappNotificationsService;
  let configService: IConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WhatsappWebhooksController],
      providers: [
        {
          provide: WhatsappNotificationsService,
          useValue: {
            handleWebhook: vi.fn(),
          },
        },
        {
          provide: IConfigService,
          useValue: {
            get: vi.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<WhatsappWebhooksController>(WhatsappWebhooksController);
    service = module.get<WhatsappNotificationsService>(WhatsappNotificationsService);
    configService = module.get<IConfigService>(IConfigService);
  });

  describe("quando WAHA_WEBHOOK_HMAC_KEY está configurada (comportamento normal)", () => {
    beforeEach(() => {
      vi.spyOn(configService, "get").mockImplementation((token) => {
        if (token === ConfigTokens.WhatsAppOptions.WebhookHmacKey) return HMAC_SECRET;
        return undefined;
      });
    });

    it("deve processar o webhook quando a assinatura HMAC é válida", () => {
      const validHmac = signPayload(mockPayload, HMAC_SECRET);

      const result = controller.handleWebhook(mockPayload, validHmac);

      expect(result).toEqual({ success: true });
      expect(service.handleWebhook).toHaveBeenCalledWith(mockPayload);
    });

    it("deve lançar UnauthorizedException quando a assinatura HMAC é inválida", () => {
      const wrongHmac = signPayload(mockPayload, "wrong-secret");

      expect(() => controller.handleWebhook(mockPayload, wrongHmac)).toThrow(UnauthorizedException);
      expect(service.handleWebhook).not.toHaveBeenCalled();
    });

    it("deve lançar UnauthorizedException quando o header X-Webhook-Hmac está ausente", () => {
      expect(() => controller.handleWebhook(mockPayload, undefined)).toThrow(UnauthorizedException);
      expect(service.handleWebhook).not.toHaveBeenCalled();
    });

    it("deve lançar UnauthorizedException quando o header está vazio", () => {
      expect(() => controller.handleWebhook(mockPayload, "")).toThrow(UnauthorizedException);
      expect(service.handleWebhook).not.toHaveBeenCalled();
    });

    it("deve lançar UnauthorizedException quando o payload foi adulterado após assinatura", () => {
      const originalPayload: WahaWebhookEventDto = {
        event: "session.status",
        session: "default",
        payload: { status: "WORKING" },
      };
      const validHmac = signPayload(originalPayload, HMAC_SECRET);

      // Payload adulterado — HMAC original não bate mais
      const tamperedPayload: WahaWebhookEventDto = {
        ...originalPayload,
        payload: { status: "FAILED" },
      };

      expect(() => controller.handleWebhook(tamperedPayload, validHmac)).toThrow(
        UnauthorizedException,
      );
      expect(service.handleWebhook).not.toHaveBeenCalled();
    });
  });

  describe("FAIL-CLOSED — quando WAHA_WEBHOOK_HMAC_KEY NÃO está configurada no servidor", () => {
    beforeEach(() => {
      vi.spyOn(configService, "get").mockReturnValue(undefined);
    });

    it("deve lançar ServiceUnavailableException mesmo com HMAC válido — servidor mal configurado", () => {
      // Sem chave configurada no servidor, não é possível validar nenhuma assinatura.
      // O endpoint deve fechar em vez de aceitar chamadas não autenticáveis.
      const anyHmac = signPayload(mockPayload, "qualquer-coisa");

      expect(() => controller.handleWebhook(mockPayload, anyHmac)).toThrow(
        ServiceUnavailableException,
      );
      expect(service.handleWebhook).not.toHaveBeenCalled();
    });

    it("deve lançar ServiceUnavailableException quando o header está ausente e chave não configurada", () => {
      expect(() => controller.handleWebhook(mockPayload, undefined)).toThrow(
        ServiceUnavailableException,
      );
      expect(service.handleWebhook).not.toHaveBeenCalled();
    });
  });
});
