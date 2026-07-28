import { ServiceUnavailableException } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  IWhatsAppProvider,
  IWhatsAppProviderToken,
} from "../interfaces/whatsapp-provider.interface";
import { WhatsappNotificationsService } from "../services/whatsapp-notifications.service";

describe("WhatsappNotificationsService", () => {
  let service: WhatsappNotificationsService;
  let _whatsappProvider: IWhatsAppProvider;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WhatsappNotificationsService,
        {
          provide: IWhatsAppProviderToken,
          useValue: {
            sendMessage: vi.fn(),
            getPairingCode: vi.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<WhatsappNotificationsService>(WhatsappNotificationsService);
    _whatsappProvider = module.get<IWhatsAppProvider>(IWhatsAppProviderToken);
  });

  it("should throw ServiceUnavailableException when calling sendNotification", async () => {
    await expect(
      service.sendNotification({ phone: "5511999999999", message: "test" }),
    ).rejects.toThrow(ServiceUnavailableException);
  });

  describe("getPairingCode", () => {
    it("should throw ServiceUnavailableException", async () => {
      await expect(service.getPairingCode("5511999999999")).rejects.toThrow(
        ServiceUnavailableException,
      );
    });
  });
});
