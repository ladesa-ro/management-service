import { describe, expect, it } from "vitest";
import { NEEDS_AUTH_KEY } from "./auth-decorators";

describe("Auth Decorators", () => {
  describe("NEEDS_AUTH_KEY", () => {
    it("deve ter a chave de metadata definida", () => {
      expect(NEEDS_AUTH_KEY).toBeDefined();
      expect(NEEDS_AUTH_KEY).toBe("needs_auth");
    });
  });

  // Nota: Os decorators @NeedsAuth() e @Public() são difíceis de testar
  // isoladamente sem um contexto NestJS completo.
  // Eles são testados indiretamente nos testes E2E.
});
