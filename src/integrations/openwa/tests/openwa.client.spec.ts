import { HttpService } from "@nestjs/axios";
import { Test, TestingModule } from "@nestjs/testing";
import { of, throwError } from "rxjs";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { IConfigService } from "@/infrastructure.config";
import { ConfigTokens } from "@/infrastructure.config/config-tokens";
import { OpenWAClient } from "../client/openwa.client";
import { OpenWATimeoutException } from "../exceptions/openwa.exceptions";

describe("OpenWAClient", () => {
  let client: OpenWAClient;
  let httpService: HttpService;
  let _configService: IConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OpenWAClient,
        {
          provide: HttpService,
          useValue: {
            post: vi.fn(),
          },
        },
        {
          provide: IConfigService,
          useValue: {
            get: vi.fn((token) => {
              if (token === ConfigTokens.WhatsAppOptions.BaseUrl) return "http://localhost:8000";
              if (token === ConfigTokens.WhatsAppOptions.ApiKey) return "test-key";
              if (token === ConfigTokens.WhatsAppOptions.Timeout) return 5000;
              return null;
            }),
          },
        },
      ],
    }).compile();

    client = module.get<OpenWAClient>(OpenWAClient);
    httpService = module.get<HttpService>(HttpService);
    _configService = module.get<IConfigService>(IConfigService);
  });

  it("should be defined", () => {
    expect(client).toBeDefined();
  });

  it("should send text successfully", async () => {
    vi.spyOn(httpService, "post").mockReturnValue(of({ status: 200, data: {} }) as any);

    const result = await client.sendText({ args: { to: "5511999999999@c.us", text: "hello" } });
    expect(result).toBe(true);
    expect(httpService.post).toHaveBeenCalledWith(
      "http://localhost:8000/api/sendText",
      { args: { to: "5511999999999@c.us", text: "hello" } },
      expect.any(Object),
    );
  });

  it("should throw OpenWATimeoutException on timeout", async () => {
    vi.spyOn(httpService, "post").mockReturnValue(
      throwError(() => ({ code: "ECONNABORTED" })) as any,
    );

    await expect(client.sendText({ args: { to: "123", text: "hi" } })).rejects.toThrow(
      OpenWATimeoutException,
    );
  });
});
