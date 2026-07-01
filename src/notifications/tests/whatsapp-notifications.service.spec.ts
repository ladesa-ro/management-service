import { Test, TestingModule } from "@nestjs/testing";
import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  IWhatsAppProvider,
  IWhatsAppProviderToken,
} from "../interfaces/whatsapp-provider.interface";
import { WhatsappNotificationsService } from "../services/whatsapp-notifications.service";

describe("WhatsappNotificationsService", () => {
  let service: WhatsappNotificationsService;
  let openWAService: IWhatsAppProvider;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WhatsappNotificationsService,
        {
          provide: IWhatsAppProviderToken,
          useValue: {
            sendMessage: vi.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<WhatsappNotificationsService>(WhatsappNotificationsService);
    openWAService = module.get<IWhatsAppProvider>(IWhatsAppProviderToken);
  });

  it("should return success response when openwa succeeds", async () => {
    vi.spyOn(openWAService, "sendMessage").mockResolvedValue(true);

    const result = await service.sendNotification({ phone: "5511999999999", message: "test" });

    expect(result.success).toBe(true);
    expect(result.messageId).toBeDefined();
    expect(result.timestamp).toBeDefined();
  });

  it("should return failure response when openwa fails", async () => {
    vi.spyOn(openWAService, "sendMessage").mockRejectedValue(new Error("Network error"));

    const result = await service.sendNotification({ phone: "5511999999999", message: "test" });

    expect(result.success).toBe(false);
    expect(result.error).toBe("Failed to send message");
  });
});
