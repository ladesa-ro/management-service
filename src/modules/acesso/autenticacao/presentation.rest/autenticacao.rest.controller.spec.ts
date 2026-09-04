import { Reflector } from "@nestjs/core";
import { describe, expect, it, vi } from "vitest";
import { NEEDS_AUTH_KEY } from "@/server/nest/auth/auth-decorators";
import { AutenticacaoRestController } from "./autenticacao.rest.controller";

describe("AutenticacaoRestController", () => {
  const usuarioEnsinoHandler = { execute: vi.fn() };
  const whoAmIHandler = { execute: vi.fn() };
  const loginHandler = { execute: vi.fn() };
  const refreshHandler = { execute: vi.fn() };
  const definirSenhaHandler = { execute: vi.fn() };
  const recoverPasswordHandler = { execute: vi.fn() };

  const controller = new AutenticacaoRestController(
    usuarioEnsinoHandler as any,
    whoAmIHandler as any,
    loginHandler as any,
    refreshHandler as any,
    definirSenhaHandler as any,
    recoverPasswordHandler as any,
  );

  const reflector = new Reflector();

  it("should mark public endpoints with NEEDS_AUTH_KEY = false", () => {
    const loginNeedsAuth = reflector.get(NEEDS_AUTH_KEY, controller.login);
    const refreshNeedsAuth = reflector.get(NEEDS_AUTH_KEY, controller.refresh);
    const definirSenhaNeedsAuth = reflector.get(NEEDS_AUTH_KEY, controller.definirSenha);
    const redefinirSenhaNeedsAuth = reflector.get(NEEDS_AUTH_KEY, controller.redefinirSenha);

    expect(loginNeedsAuth).toBe(false);
    expect(refreshNeedsAuth).toBe(false);
    expect(definirSenhaNeedsAuth).toBe(false);
    expect(redefinirSenhaNeedsAuth).toBe(false);
  });

  it("should NOT mark private endpoints as public", () => {
    const whoAmINeedsAuth = reflector.get(NEEDS_AUTH_KEY, controller.whoAmI);
    const whoAmIEnsinoNeedsAuth = reflector.get(NEEDS_AUTH_KEY, controller.whoAmIEnsino);

    expect(whoAmINeedsAuth).toBeUndefined();
    expect(whoAmIEnsinoNeedsAuth).toBeUndefined();
  });

  it("should execute loginHandler on login", async () => {
    const mockResult = { token: "abc", refreshToken: "def", expiresAt: "2026-01-01" };
    loginHandler.execute.mockResolvedValue(mockResult);

    const result = await controller.login({} as any, { matricula: "123", senha: "pwd" } as any);
    expect(result).toBe(mockResult);
    expect(loginHandler.execute).toHaveBeenCalled();
  });

  it("should execute definirSenhaHandler on definir-senha", async () => {
    definirSenhaHandler.execute.mockResolvedValue(true);

    const result = await controller.definirSenha(
      {} as any,
      {
        matricula: "123",
        senha: "nova-senha",
      } as any,
    );
    expect(result).toBe(true);
    expect(definirSenhaHandler.execute).toHaveBeenCalled();
  });

  it("should execute recoverPasswordHandler on redefinir-senha", async () => {
    recoverPasswordHandler.execute.mockResolvedValue(true);

    const result = await controller.redefinirSenha(
      {} as any,
      {
        email: "user@example.com",
      } as any,
    );
    expect(result).toBe(true);
    expect(recoverPasswordHandler.execute).toHaveBeenCalled();
  });
});
