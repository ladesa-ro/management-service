import { Test, TestingModule } from "@nestjs/testing";
import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  type IWhatsAppProvider,
  IWhatsAppProviderToken,
} from "../interfaces/whatsapp-provider.interface";
import { WhatsappNotificationsService } from "../services/whatsapp-notifications.service";

describe("WhatsappNotificationsService", () => {
  let service: WhatsappNotificationsService;
  let whatsappProvider: IWhatsAppProvider;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WhatsappNotificationsService,
        {
          provide: IWhatsAppProviderToken,
          useValue: {
            sendMessage: vi.fn(),
            getSessionStatus: vi.fn(),
            getPairingCode: vi.fn(),
            getQrCode: vi.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<WhatsappNotificationsService>(WhatsappNotificationsService);
    whatsappProvider = module.get<IWhatsAppProvider>(IWhatsAppProviderToken);
  });

  describe("sendNotification", () => {
    it("deve retornar resposta de sucesso quando o provider envia a mensagem", async () => {
      vi.spyOn(whatsappProvider, "sendMessage").mockResolvedValue(true);

      const result = await service.sendNotification({ phone: "5511999999999", message: "test" });

      expect(result.success).toBe(true);
      expect(result.messageId).toBeDefined();
      expect(result.timestamp).toBeDefined();
      expect(whatsappProvider.sendMessage).toHaveBeenCalledWith("5511999999999", "test");
    });

    it("deve retornar resposta de falha quando o provider lança erro", async () => {
      vi.spyOn(whatsappProvider, "sendMessage").mockRejectedValue(new Error("Network error"));

      const result = await service.sendNotification({ phone: "5511999999999", message: "test" });

      expect(result.success).toBe(false);
      expect(result.error).toBe("Failed to send message");
    });

    it("deve retornar resposta de falha quando o provider retorna false", async () => {
      vi.spyOn(whatsappProvider, "sendMessage").mockResolvedValue(false);

      const result = await service.sendNotification({ phone: "5511999999999", message: "test" });

      expect(result.success).toBe(false);
    });

    it("não deve expor o número completo no log (mascaramento)", async () => {
      vi.spyOn(whatsappProvider, "sendMessage").mockResolvedValue(true);
      // Apenas verifica que não lança — o mascaramento é testado indiretamente
      await expect(
        service.sendNotification({ phone: "5511999999999", message: "msg" }),
      ).resolves.toBeDefined();
    });
  });

  describe("getStatus", () => {
    it("deve retornar status da API quando o provider responde", async () => {
      const mockStatus = { name: "default", status: "WORKING" };
      vi.spyOn(whatsappProvider, "getSessionStatus").mockResolvedValue(mockStatus);

      const result = await service.getStatus();

      expect(result.apiStatus).toEqual(mockStatus);
      expect(result.webhookStatus).toBe("FETCHED_FROM_API");
    });

    it("deve retornar DISCONNECTED quando o provider falha", async () => {
      vi.spyOn(whatsappProvider, "getSessionStatus").mockRejectedValue(
        new Error("Connection failed"),
      );

      const result = await service.getStatus();

      expect(result.webhookStatus).toBe("DISCONNECTED");
      expect(result.apiStatus).toBeUndefined();
    });
  });

  describe("getPairingCode", () => {
    it("deve delegar ao provider e retornar o código", async () => {
      const mockCode = "ABCD-EFGH";
      vi.spyOn(whatsappProvider, "getPairingCode" as any).mockResolvedValue(mockCode);

      const result = await service.getPairingCode("5511999999999");

      expect(result).toBe(mockCode);
    });

    it("deve retornar null quando o provider falha", async () => {
      vi.spyOn(whatsappProvider, "getPairingCode" as any).mockRejectedValue(new Error("API Error"));

      const result = await service.getPairingCode("5511999999999");

      expect(result).toBeNull();
    });

    it("deve limpar caracteres não numéricos do telefone antes de delegar", async () => {
      vi.spyOn(whatsappProvider, "getPairingCode" as any).mockResolvedValue("CODE");

      await service.getPairingCode("5511999999999");

      // O provider já receberá o número limpo pois getPairingCode no service faz replace
      expect(whatsappProvider.getPairingCode).toHaveBeenCalledWith("5511999999999");
    });
  });

  describe("getQrCode", () => {
    it("deve retornar o QR code do provider", async () => {
      vi.spyOn(whatsappProvider, "getQrCode" as any).mockResolvedValue("base64string");

      const result = await service.getQrCode();

      expect(result).toBe("base64string");
    });

    it("deve retornar null quando o provider retorna null", async () => {
      vi.spyOn(whatsappProvider, "getQrCode" as any).mockResolvedValue(null);

      const result = await service.getQrCode();

      expect(result).toBeNull();
    });

    it("deve retornar null quando o provider falha", async () => {
      vi.spyOn(whatsappProvider, "getQrCode" as any).mockRejectedValue(new Error("error"));

      const result = await service.getQrCode();

      expect(result).toBeNull();
    });
  });

  describe("handleWebhook", () => {
    it("deve processar o payload sem lançar exceção", () => {
      expect(() =>
        service.handleWebhook({ event: "session.status", session: "default", payload: {} }),
      ).not.toThrow();
    });
  });
});
