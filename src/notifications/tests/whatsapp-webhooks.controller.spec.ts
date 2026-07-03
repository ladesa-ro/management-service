import { UnauthorizedException } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { IConfigService } from "@/infrastructure.config";
import { OpenWaWebhookEventDto } from "@/integrations/openwa/dto/openwa-webhook-event.dto";
import { WhatsappWebhooksController } from "../controllers/whatsapp-webhooks.controller";
import { WhatsappNotificationsService } from "../services/whatsapp-notifications.service";

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

  const mockPayload: OpenWaWebhookEventDto = {
    event: "connection",
    data: "ready",
  };

  it("should process webhook when token is correct", async () => {
    vi.spyOn(configService, "get").mockReturnValue("correct-token");

    const result = await controller.handleWebhook(mockPayload, "correct-token");

    expect(result).toEqual({ success: true });
    expect(service.handleWebhook).toHaveBeenCalledWith(mockPayload);
  });

  it("should throw UnauthorizedException when token is incorrect", async () => {
    vi.spyOn(configService, "get").mockReturnValue("correct-token");

    await expect(controller.handleWebhook(mockPayload, "incorrect-token")).rejects.toThrow(
      UnauthorizedException,
    );

    expect(service.handleWebhook).not.toHaveBeenCalled();
  });

  it("should throw UnauthorizedException when token is missing and expectedToken is set", async () => {
    vi.spyOn(configService, "get").mockReturnValue("correct-token");

    await expect(controller.handleWebhook(mockPayload)).rejects.toThrow(UnauthorizedException);

    expect(service.handleWebhook).not.toHaveBeenCalled();
  });

  it("should process webhook when expectedToken is not configured", async () => {
    vi.spyOn(configService, "get").mockReturnValue(undefined);

    const result = await controller.handleWebhook(mockPayload, "any-token");

    expect(result).toEqual({ success: true });
    expect(service.handleWebhook).toHaveBeenCalledWith(mockPayload);
  });
});
