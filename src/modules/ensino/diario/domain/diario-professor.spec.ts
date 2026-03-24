import { describe, expect, it } from "vitest";
import { createTestDatedFields, createTestId, createTestRef } from "@/test/helpers";
import { DiarioProfessor } from "./diario-professor";

describe("DiarioProfessor (domain entity)", () => {
  const validCreateInput = {
    situacao: true,
    diario: createTestRef(),
    perfil: createTestRef(),
  };

  const validLoadInput = () => ({
    id: createTestId(),
    situacao: true,
    diario: createTestRef(),
    perfil: createTestRef(),
    ...createTestDatedFields(),
  });

  describe("create", () => {
    it("should create a valid DiarioProfessor", () => {
      const entity = DiarioProfessor.create(validCreateInput);

      expect(entity.id).toBeDefined();
      expect(entity.situacao).toBe(true);
      expect(entity.diario).toEqual(validCreateInput.diario);
      expect(entity.perfil).toEqual(validCreateInput.perfil);
      expect(entity.dateCreated).toBeDefined();
      expect(entity.dateDeleted).toBeNull();
    });
  });

  describe("load", () => {
    it("should load from stored data", () => {
      const input = validLoadInput();
      const entity = DiarioProfessor.load(input);

      expect(entity.id).toBe(input.id);
      expect(entity.situacao).toBe(true);
      expect(entity.diario).toEqual(input.diario);
      expect(entity.perfil).toEqual(input.perfil);
    });

    it("should reject invalid id", () => {
      expect(() => DiarioProfessor.load({ ...validLoadInput(), id: "bad" })).toThrow();
    });
  });

  describe("update", () => {
    it("should update situacao", () => {
      const entity = DiarioProfessor.load(validLoadInput());
      entity.update({ situacao: false });
      expect(entity.situacao).toBe(false);
    });
  });
});
