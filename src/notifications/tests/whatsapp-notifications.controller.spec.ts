import { Test, TestingModule } from "@nestjs/testing";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { WhatsappNotificationsController } from "../controllers/whatsapp-notifications.controller";
import { WhatsappNotificationsService } from "../services/whatsapp-notifications.service";

describe("WhatsappNotificationsController", () => {
  let controller: WhatsappNotificationsController;
  let service: WhatsappNotificationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WhatsappNotificationsController],
      providers: [
        {
          provide: WhatsappNotificationsService,
          useValue: {
            sendNotification: vi.fn(),
            getPairingCode: vi.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<WhatsappNotificationsController>(WhatsappNotificationsController);
    service = module.get<WhatsappNotificationsService>(WhatsappNotificationsService);
  });

  it("should throw HttpException because route is temporarily disabled", async () => {
    const payload = { phone: "5511999999999", message: "hello" };
    await expect(controller.sendWhatsAppMessage(payload)).rejects.toThrow(
      "Rota temporariamente desabilitada",
    );
  });

  describe("getPairingCode", () => {
    it("should call service and return pairing code", async () => {
      vi.spyOn(service, "getPairingCode").mockResolvedValue("ABCD-EFGH");

      const payload = { phone: "5511999999999" };
      const result = await controller.getPairingCode(payload);

      expect(result).toEqual({ code: "ABCD-EFGH" });
      expect(service.getPairingCode).toHaveBeenCalledWith("5511999999999");
    });

    it("should throw HttpException when service returns null", async () => {
      vi.spyOn(service, "getPairingCode").mockResolvedValue(null);

      const payload = { phone: "5511999999999" };
      await expect(controller.getPairingCode(payload)).rejects.toThrow();
    });
  });
});
