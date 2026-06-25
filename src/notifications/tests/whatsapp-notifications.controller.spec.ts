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
          },
        },
      ],
    }).compile();

    controller = module.get<WhatsappNotificationsController>(WhatsappNotificationsController);
    service = module.get<WhatsappNotificationsService>(WhatsappNotificationsService);
  });

  it("should call service and return response", async () => {
    const mockResponse = { success: true, messageId: "123", timestamp: "now" };
    vi.spyOn(service, "sendNotification").mockResolvedValue(mockResponse);

    const payload = { phone: "5511999999999", message: "hello" };
    const result = await controller.sendWhatsAppMessage(payload);

    expect(result).toEqual(mockResponse);
    expect(service.sendNotification).toHaveBeenCalledWith(payload);
  });
});
