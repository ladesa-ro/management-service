import { describe, expect, it } from "vitest";
import { createTestDatedFields, createTestId, createTestRef } from "@/test/helpers";
import { Diario } from "./diario";

describe("Diario (domain entity)", () => {
  const validCreateInput = {
    ativo: true,
    calendarioLetivo: createTestRef(),
    turma: createTestRef(),
    disciplina: createTestRef(),
  };

  const validLoadInput = () => ({
    id: createTestId(),
    ativo: true,
    calendarioLetivo: createTestRef(),
    turma: createTestRef(),
    disciplina: createTestRef(),
    ambientePadrao: null,
    imagemCapa: null,
    ...createTestDatedFields(),
  });

  describe("create", () => {
    it("should create a valid Diario", () => {
      const entity = Diario.create(validCreateInput);

      expect(entity.id).toBeDefined();
      expect(entity.ativo).toBe(true);
      expect(entity.calendarioLetivo).toEqual(validCreateInput.calendarioLetivo);
      expect(entity.turma).toEqual(validCreateInput.turma);
      expect(entity.disciplina).toEqual(validCreateInput.disciplina);
      expect(entity.ambientePadrao).toBeNull();
      expect(entity.imagemCapa).toBeNull();
      expect(entity.dateCreated).toBeDefined();
      expect(entity.dateDeleted).toBeNull();
    });

    it("should default ativo to true", () => {
      const entity = Diario.create({
        ...validCreateInput,
        ativo: undefined,
      });

      expect(entity.ativo).toBe(true);
    });

    it("should create with ambientePadrao when provided", () => {
      const ref = createTestRef();
      const entity = Diario.create({
        ...validCreateInput,
        ambientePadrao: ref,
      });

      expect(entity.ambientePadrao).toEqual(ref);
    });
  });

  describe("load", () => {
    it("should load a Diario from stored data", () => {
      const input = validLoadInput();
      const entity = Diario.load(input);

      expect(entity.id).toBe(input.id);
      expect(entity.ativo).toBe(true);
      expect(entity.dateCreated).toBe(input.dateCreated);
    });

    it("should reject invalid id", () => {
      expect(() => Diario.load({ ...validLoadInput(), id: "not-uuid" })).toThrow();
    });
  });

  describe("update", () => {
    it("should update ativo", () => {
      const entity = Diario.load(validLoadInput());
      entity.update({ ativo: false });
      expect(entity.ativo).toBe(false);
    });
  });

  describe("isAtivo", () => {
    it("should return true when ativo and not deleted", () => {
      const entity = Diario.load(validLoadInput());
      expect(entity.isAtivo()).toBe(true);
    });

    it("should return false when not ativo", () => {
      const entity = Diario.load({ ...validLoadInput(), ativo: false });
      expect(entity.isAtivo()).toBe(false);
    });
  });
});
