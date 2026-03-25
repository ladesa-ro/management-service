import { describe, expect, it } from "vitest";
import { GoneError } from "./application.error";
import { ensureActive } from "./ensure-active";

describe("ensureActive", () => {
  it("should not throw when active is true", () => {
    expect(() => ensureActive(true, "Perfil")).not.toThrow();
  });

  it("should throw GoneError when active is false", () => {
    expect(() => ensureActive(false, "Perfil")).toThrow(GoneError);
  });

  it("should include resource name in error message", () => {
    expect(() => ensureActive(false, "Perfil")).toThrow("Perfil não está mais ativo(a).");
  });

  it("should include identifier in error message when provided", () => {
    expect(() => ensureActive(false, "Perfil", "uuid-123")).toThrow(
      'Perfil com identificador "uuid-123" não está mais ativo(a).',
    );
  });
});
