import { describe, expect, it } from "vitest";
import { GoneError } from "./application.error";
import { ensureActive, ensureActiveEntity } from "./ensure-active";

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

describe("ensureActiveEntity", () => {
  it("should not throw when entity.isActive() returns true", () => {
    expect(() => ensureActiveEntity({ isActive: () => true }, "Campus")).not.toThrow();
  });

  it("should throw GoneError when entity.isActive() returns false", () => {
    expect(() => ensureActiveEntity({ isActive: () => false }, "Campus")).toThrow(GoneError);
  });

  it("should include identifier in error message", () => {
    expect(() => ensureActiveEntity({ isActive: () => false }, "Campus", "uuid-456")).toThrow(
      'Campus com identificador "uuid-456" não está mais ativo(a).',
    );
  });
});
