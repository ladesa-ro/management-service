import { describe, expect, it } from "vitest";
import { createTestDatedFields, createTestId } from "@/test/helpers";
import { TurmaMatricula } from "./turma-matricula";

describe("TurmaMatricula (domain entity)", () => {
  const validCreateInput = () => ({
    turma: { id: createTestId() },
    perfil: { id: createTestId() },
  });

  const validLoadInput = () => ({
    id: createTestId(),
    turma: { id: createTestId() },
    perfil: { id: createTestId() },
    ...createTestDatedFields(),
  });

  describe("create", () => {
    it("should create a matricula with valid data", () => {
      const input = validCreateInput();
      const entity = TurmaMatricula.create(input);

      expect(entity.turma).toEqual(input.turma);
      expect(entity.perfil).toEqual(input.perfil);
      expect(entity.dateDeleted).toBeNull();
    });

    it("should generate a UUID id", () => {
      const entity = TurmaMatricula.create(validCreateInput());
      expect(entity.id).toBeDefined();
    });

    it("should reject creation without turma", () => {
      expect(() =>
        TurmaMatricula.create({ perfil: { id: createTestId() } } as any),
      ).toThrow();
    });

    it("should reject creation without perfil", () => {
      expect(() =>
        TurmaMatricula.create({ turma: { id: createTestId() } } as any),
      ).toThrow();
    });
  });

  describe("load", () => {
    it("should reconstruct from persisted data", () => {
      const input = validLoadInput();
      const entity = TurmaMatricula.load(input);

      expect(entity.id).toBe(input.id);
      expect(entity.turma).toEqual(input.turma);
      expect(entity.perfil).toEqual(input.perfil);
    });

    it("should reject invalid id", () => {
      expect(() => TurmaMatricula.load({ ...validLoadInput(), id: "bad" })).toThrow();
    });
  });

  describe("isActive", () => {
    it("should return true when not deleted", () => {
      const entity = TurmaMatricula.create(validCreateInput());
      expect(entity.isActive()).toBe(true);
    });

    it("should return false when dateDeleted is set", () => {
      const entity = TurmaMatricula.load({
        ...validLoadInput(),
        dateDeleted: "2025-01-01T00:00:00.000Z",
      });
      expect(entity.isActive()).toBe(false);
    });
  });
});
