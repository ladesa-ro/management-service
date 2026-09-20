import { describe, expect, it, vi } from "vitest";
import { UnauthorizedError } from "@/application/errors";
import { AutenticacaoRefreshCommandHandlerImpl } from "./autenticacao-refresh.command.handler";

describe("AutenticacaoRefreshCommandHandlerImpl", () => {
  const idpTokenService = {
    refreshGrant: vi.fn(),
  };

  const runtimeOptions = {
    enableMockAccessToken: false,
  };

  const handler = new AutenticacaoRefreshCommandHandlerImpl(
    idpTokenService as any,
    runtimeOptions as any,
  );

  it("should throw UnauthorizedError when refreshToken is empty or not provided", async () => {
    await expect(handler.execute(null, { refreshToken: "" })).rejects.toThrow(UnauthorizedError);
  });

  it("should refresh token successfully via IDP service", async () => {
    const mockTokenSet = {
      access_token: "new-access-token",
      token_type: "Bearer",
      refresh_token: "new-refresh-token",
      expires_in: 300,
      expires_at: Date.now() + 300000,
      id_token: null,
      session_state: null,
      scope: "openid",
    };

    idpTokenService.refreshGrant.mockResolvedValueOnce(mockTokenSet);

    const result = await handler.execute(null, { refreshToken: "valid-refresh-token" });

    expect(idpTokenService.refreshGrant).toHaveBeenCalledWith("valid-refresh-token");
    expect(result).toEqual(mockTokenSet);
  });

  it("should throw UnauthorizedError when IDP service fails or rejects", async () => {
    idpTokenService.refreshGrant.mockRejectedValueOnce(new Error("Invalid token"));

    await expect(handler.execute(null, { refreshToken: "expired-token" })).rejects.toThrow(
      UnauthorizedError,
    );
  });

  it("should support mock refresh token when enableMockAccessToken is true", async () => {
    const mockHandler = new AutenticacaoRefreshCommandHandlerImpl(
      idpTokenService as any,
      { enableMockAccessToken: true } as any,
    );

    const result = await mockHandler.execute(null, { refreshToken: "mock.refresh.2024101001" });

    expect(result.access_token).toBe("mock.matricula.2024101001");
    expect(result.refresh_token).toBe("mock.refresh.2024101001");
    expect(result.expires_in).toBe(3600);
    expect(result.expires_at).toBeGreaterThan(Date.now());
  });
});
