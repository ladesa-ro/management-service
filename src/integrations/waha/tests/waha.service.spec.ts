import { Test, TestingModule } from "@nestjs/testing";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { WahaClient } from "../client/waha.client";
import { WahaService } from "../services/waha.service";

describe("WahaService", () => {
  let service: WahaService;
  let client: WahaClient;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WahaService,
        {
          provide: WahaClient,
          useValue: {
            sendText: vi.fn(),
            getSessionStatus: vi.fn(),
            getQrCode: vi.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<WahaService>(WahaService);
    client = module.get<WahaClient>(WahaClient);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("sendMessage", () => {
    it("should append @c.us suffix to bare phone number", async () => {
      vi.spyOn(client, "sendText").mockResolvedValue(true);

      const result = await service.sendMessage("5511999999999", "hello");

      expect(result).toBe(true);
      expect(client.sendText).toHaveBeenCalledWith("5511999999999@c.us", "hello");
    });

    it("should not append @c.us when already present", async () => {
      vi.spyOn(client, "sendText").mockResolvedValue(true);

      await service.sendMessage("5511999999999@c.us", "hello");

      expect(client.sendText).toHaveBeenCalledWith("5511999999999@c.us", "hello");
    });

    it("should re-throw errors from WahaClient", async () => {
      const error = new Error("WAHA connection failed");
      vi.spyOn(client, "sendText").mockRejectedValue(error);

      await expect(service.sendMessage("5511999999999", "hello")).rejects.toThrow(
        "WAHA connection failed",
      );
    });
  });

  describe("getSessionStatus", () => {
    it("should delegate to WahaClient", async () => {
      const mockStatus = { name: "default", status: "WORKING" as const };
      vi.spyOn(client, "getSessionStatus").mockResolvedValue(mockStatus);

      const result = await service.getSessionStatus();

      expect(result).toEqual(mockStatus);
      expect(client.getSessionStatus).toHaveBeenCalledOnce();
    });
  });

  describe("getQrCode", () => {
    it("should return QR code from client", async () => {
      vi.spyOn(client, "getQrCode").mockResolvedValue("base64string");

      const result = await service.getQrCode();

      expect(result).toBe("base64string");
    });

    it("should return null when no QR code is available", async () => {
      vi.spyOn(client, "getQrCode").mockResolvedValue(null);

      const result = await service.getQrCode();

      expect(result).toBeNull();
    });
  });
});
