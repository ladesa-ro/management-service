import { describe, expect, it } from "vitest";
import type { IAccessContext } from "@/domain/abstractions";

describe("IAccessContext", () => {
  const createMockAccessContext = (
    requestActor: IAccessContext["requestActor"],
  ): IAccessContext => ({
    requestActor,
  });

  it("deve aceitar objeto com requestActor", () => {
    const context = createMockAccessContext({
      id: "123",
      nome: "Test User",
      email: "test@example.com",
      matricula: "12345",
      isSuperUser: false,
    });

    expect(context.requestActor).toBeDefined();
    expect(context.requestActor?.id).toBe("123");
  });

  it("deve aceitar requestActor como null", () => {
    const context = createMockAccessContext(null);

    expect(context.requestActor).toBeNull();
  });
});
