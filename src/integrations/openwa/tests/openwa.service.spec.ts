import { Test, TestingModule } from "@nestjs/testing";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { OpenWAClient } from "../client/openwa.client";
import { OpenWAService } from "../services/openwa.service";

describe("OpenWAService", () => {
  let service: OpenWAService;
  let client: OpenWAClient;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OpenWAService,
        {
          provide: OpenWAClient,
          useValue: {
            sendText: vi.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<OpenWAService>(OpenWAService);
    client = module.get<OpenWAClient>(OpenWAClient);
  });

  it("should send a message and append @c.us if missing", async () => {
    vi.spyOn(client, "sendText").mockResolvedValue(true);

    const result = await service.sendMessage("5511999999999", "hello");

    expect(result).toBe(true);
    expect(client.sendText).toHaveBeenCalledWith({
      args: { to: "5511999999999@c.us", text: "hello" },
    });
  });

  it("should not append @c.us if already present", async () => {
    vi.spyOn(client, "sendText").mockResolvedValue(true);

    await service.sendMessage("5511999999999@c.us", "hello");

    expect(client.sendText).toHaveBeenCalledWith({
      args: { to: "5511999999999@c.us", text: "hello" },
    });
  });
});
