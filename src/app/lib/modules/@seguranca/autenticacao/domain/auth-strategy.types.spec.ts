import { describe, expect, it } from "vitest";
import { AuthStrategy } from "./auth-strategy.types";

describe("AuthStrategy", () => {
  it("deve ter estratégia ACCESS_TOKEN definida", () => {
    expect(AuthStrategy.ACCESS_TOKEN).toBeDefined();
    expect(AuthStrategy.ACCESS_TOKEN).toBe("access_token");
  });

  it("deve ser um enum válido", () => {
    expect(typeof AuthStrategy).toBe("object");
    expect(Object.keys(AuthStrategy)).toContain("ACCESS_TOKEN");
  });
});
