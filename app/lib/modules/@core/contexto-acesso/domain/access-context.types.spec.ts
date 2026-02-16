import { describe, expect, it, vi } from "vitest";
import type { IAccessContext } from "./access-context.types";

describe("IAccessContext", () => {
  const createMockAccessContext = (
    requestActor: IAccessContext["requestActor"],
  ): IAccessContext => ({
    requestActor,
    applyFilter: vi.fn(),
    verifyPermission: vi.fn().mockResolvedValue(true),
    ensurePermission: vi.fn().mockResolvedValue(undefined),
  });

  it("deve aceitar objeto com requestActor", () => {
    const context = createMockAccessContext({
      id: "123",
      nome: "Test User",
      email: "test@example.com",
      matriculaSiape: "12345",
      isSuperUser: false,
    });

    expect(context.requestActor).toBeDefined();
    expect(context.requestActor?.id).toBe("123");
  });

  it("deve aceitar requestActor como null", () => {
    const context = createMockAccessContext(null);

    expect(context.requestActor).toBeNull();
  });

  it("deve ter método applyFilter", () => {
    const context = createMockAccessContext(null);

    expect(context.applyFilter).toBeDefined();
    expect(typeof context.applyFilter).toBe("function");
  });

  it("deve ter método verifyPermission", async () => {
    const context = createMockAccessContext({
      id: "123",
      nome: "Test",
      email: "test@test.com",
      matriculaSiape: "12345",
      isSuperUser: true,
    });

    const result = await context.verifyPermission("campus:find", {});
    expect(result).toBe(true);
  });

  it("deve ter método ensurePermission", async () => {
    const context = createMockAccessContext({
      id: "123",
      nome: "Test",
      email: "test@test.com",
      matriculaSiape: "12345",
      isSuperUser: true,
    });

    await expect(context.ensurePermission("campus:find", {})).resolves.toBeUndefined();
  });
});
