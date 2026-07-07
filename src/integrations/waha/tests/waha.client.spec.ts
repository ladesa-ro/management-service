import { HttpService } from "@nestjs/axios";
import { Test, TestingModule } from "@nestjs/testing";
import { of, throwError } from "rxjs";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { IConfigService } from "@/infrastructure.config";
import { ConfigTokens } from "@/infrastructure.config/config-tokens";
import { WahaClient } from "../client/waha.client";
import { WahaConnectionException, WahaTimeoutException } from "../exceptions/waha.exceptions";

describe("WahaClient", () => {
  let client: WahaClient;
  let httpService: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WahaClient,
        {
          provide: HttpService,
          useValue: {
            post: vi.fn(),
            get: vi.fn(),
          },
        },
        {
          provide: IConfigService,
          useValue: {
            get: vi.fn((token) => {
              if (token === ConfigTokens.WhatsAppOptions.BaseUrl) return "http://localhost:3000";
              if (token === ConfigTokens.WhatsAppOptions.ApiKey) return "test-key";
              if (token === ConfigTokens.WhatsAppOptions.Timeout) return 5000;
              if (token === ConfigTokens.WhatsAppOptions.Session) return "default";
              return null;
            }),
          },
        },
      ],
    }).compile();

    client = module.get<WahaClient>(WahaClient);
    httpService = module.get<HttpService>(HttpService);
  });

  it("should be defined", () => {
    expect(client).toBeDefined();
  });

  describe("sendText", () => {
    it("should send text message successfully", async () => {
      vi.spyOn(httpService, "post").mockReturnValue(of({ status: 200, data: {} }) as any);

      const result = await client.sendText("5511999999999@c.us", "hello");

      expect(result).toBe(true);
      expect(httpService.post).toHaveBeenCalledWith(
        "http://localhost:3000/api/sendText",
        { session: "default", chatId: "5511999999999@c.us", text: "hello" },
        expect.objectContaining({
          headers: expect.objectContaining({ "X-Api-Key": "test-key" }),
        }),
      );
    });

    it("should throw WahaTimeoutException on ECONNABORTED", async () => {
      vi.spyOn(httpService, "post").mockReturnValue(
        throwError(() => ({ code: "ECONNABORTED" })) as any,
      );

      await expect(client.sendText("5511999999999@c.us", "hi")).rejects.toThrow(
        WahaTimeoutException,
      );
    });

    it("should throw WahaTimeoutException when message includes timeout", async () => {
      vi.spyOn(httpService, "post").mockReturnValue(
        throwError(() => ({ message: "timeout of 5000ms exceeded" })) as any,
      );

      await expect(client.sendText("5511999999999@c.us", "hi")).rejects.toThrow(
        WahaTimeoutException,
      );
    });

    it("should throw WahaConnectionException on network error", async () => {
      vi.spyOn(httpService, "post").mockReturnValue(
        throwError(() => ({ message: "Network error" })) as any,
      );

      await expect(client.sendText("5511999999999@c.us", "hi")).rejects.toThrow(
        WahaConnectionException,
      );
    });
  });

  describe("getSessionStatus", () => {
    it("should return session status", async () => {
      const mockStatus = { name: "default", status: "WORKING" };
      vi.spyOn(httpService, "get").mockReturnValue(of({ status: 200, data: mockStatus }) as any);

      const result = await client.getSessionStatus();

      expect(result).toEqual(mockStatus);
      expect(httpService.get).toHaveBeenCalledWith(
        "http://localhost:3000/api/sessions/default",
        expect.any(Object),
      );
    });

    it("should throw WahaConnectionException on failure", async () => {
      vi.spyOn(httpService, "get").mockReturnValue(
        throwError(() => new Error("Connection refused")) as any,
      );

      await expect(client.getSessionStatus()).rejects.toThrow(WahaConnectionException);
    });
  });

  describe("getQrCode", () => {
    it("should return QR code value when available", async () => {
      vi.spyOn(httpService, "get").mockReturnValue(
        of({ status: 200, data: { value: "base64-qr-string" } }) as any,
      );

      const result = await client.getQrCode();

      expect(result).toBe("base64-qr-string");
    });

    it("should return null when QR code is not available", async () => {
      vi.spyOn(httpService, "get").mockReturnValue(
        throwError(() => new Error("Session already authenticated")) as any,
      );

      const result = await client.getQrCode();

      expect(result).toBeNull();
    });
  });
});
