import { describe, expect, it, vi } from "vitest";
import { ValidationError } from "@/application/errors";
import { createMockCrudRepository } from "@/test/helpers";
import { UsuarioAvailabilityCheckerImpl } from "./usuario-availability-checker";

function createMockUsuarioRepository() {
  const base = createMockCrudRepository();
  return {
    ...base,
    isEmailAvailable: vi.fn().mockResolvedValue(true),
    isMatriculaAvailable: vi.fn().mockResolvedValue(true),
  };
}

describe("UsuarioAvailabilityChecker", () => {
  function createChecker(repository = createMockUsuarioRepository()) {
    return { checker: new UsuarioAvailabilityCheckerImpl(repository as any), repository };
  }

  it("should not throw when email and matricula are available", async () => {
    const { checker } = createChecker();

    await expect(
      checker.ensureAvailable({ email: "test@example.com", matricula: "20260001" }),
    ).resolves.toBeUndefined();
  });

  it("should not check when email and matricula are null", async () => {
    const repository = createMockUsuarioRepository();
    const { checker } = createChecker(repository);

    await checker.ensureAvailable({ email: null, matricula: null });

    expect(repository.isEmailAvailable).not.toHaveBeenCalled();
    expect(repository.isMatriculaAvailable).not.toHaveBeenCalled();
  });

  it("should throw ValidationError when email is not available", async () => {
    const repository = createMockUsuarioRepository();
    repository.isEmailAvailable.mockResolvedValue(false);

    const { checker } = createChecker(repository);

    await expect(
      checker.ensureAvailable({ email: "taken@example.com", matricula: "20260001" }),
    ).rejects.toThrow(ValidationError);
  });

  it("should throw ValidationError when matricula is not available", async () => {
    const repository = createMockUsuarioRepository();
    repository.isMatriculaAvailable.mockResolvedValue(false);

    const { checker } = createChecker(repository);

    await expect(
      checker.ensureAvailable({ email: "test@example.com", matricula: "taken" }),
    ).rejects.toThrow(ValidationError);
  });

  it("should throw ValidationError with both fields when both are unavailable", async () => {
    const repository = createMockUsuarioRepository();
    repository.isEmailAvailable.mockResolvedValue(false);
    repository.isMatriculaAvailable.mockResolvedValue(false);

    const { checker } = createChecker(repository);

    try {
      await checker.ensureAvailable({ email: "taken@example.com", matricula: "taken" });
      expect.unreachable("should have thrown");
    } catch (err) {
      expect(err).toBeInstanceOf(ValidationError);
      const validationError = err as ValidationError;
      expect(validationError.details).toHaveLength(2);
      expect(validationError.details[0].field).toBe("email");
      expect(validationError.details[1].field).toBe("matricula");
    }
  });

  it("should pass excludeUsuarioId to repository methods", async () => {
    const repository = createMockUsuarioRepository();
    const { checker } = createChecker(repository);
    const excludeId = "some-uuid";

    await checker.ensureAvailable({ email: "test@example.com", matricula: "20260001" }, excludeId);

    expect(repository.isEmailAvailable).toHaveBeenCalledWith("test@example.com", excludeId);
    expect(repository.isMatriculaAvailable).toHaveBeenCalledWith("20260001", excludeId);
  });
});
