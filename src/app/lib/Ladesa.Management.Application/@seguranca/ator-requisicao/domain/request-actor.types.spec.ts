import { describe, expect, it } from "vitest";
import type { IRequestActor } from "./request-actor.types";

describe("IRequestActor", () => {
  it("deve aceitar null como valor válido", () => {
    const actor: IRequestActor = null;
    expect(actor).toBeNull();
  });

  it("deve aceitar objeto com campos obrigatórios", () => {
    const actor: IRequestActor = {
      id: "123",
      nome: "Test User",
      email: "test@example.com",
      matriculaSiape: "12345",
      isSuperUser: false,
    };

    expect(actor).toBeDefined();
    expect(actor?.id).toBe("123");
    expect(actor?.nome).toBe("Test User");
    expect(actor?.email).toBe("test@example.com");
    expect(actor?.matriculaSiape).toBe("12345");
    expect(actor?.isSuperUser).toBe(false);
  });

  it("deve aceitar superuser como true", () => {
    const actor: IRequestActor = {
      id: "admin",
      nome: "Admin User",
      email: "admin@example.com",
      matriculaSiape: "00001",
      isSuperUser: true,
    };

    expect(actor?.isSuperUser).toBe(true);
  });
});
