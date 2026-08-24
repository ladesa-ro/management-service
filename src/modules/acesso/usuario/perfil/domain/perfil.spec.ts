import { describe, expect, it } from "vitest";
import { createTestDatedFields, createTestId, createTestRef } from "@/test/helpers";
import { Perfil } from "./perfil";

describe("Perfil (domain entity)", () => {
  const validCreateInput = () => ({
    cargo: "Professor",
    campus: createTestRef(),
    usuario: createTestRef(),
  });

  const validLoadInput = () => ({
    id: createTestId(),
    ativo: true,
    cargo: "Professor",
    campus: createTestRef(),
    usuario: createTestRef(),
    cargaMaximaSemanal: null,
    ...createTestDatedFields(),
  });

  describe("create", () => {
    it("should create a valid Perfil with cargaMaximaSemanal set", () => {
      const entity = Perfil.create({ ...validCreateInput(), cargaMaximaSemanal: 40 });

      expect(entity.id).toBeDefined();
      expect(entity.cargo).toBe("Professor");
      expect(entity.ativo).toBe(true);
      expect(entity.cargaMaximaSemanal).toBe(40);
    });

    it("should create a valid Perfil with cargaMaximaSemanal null when omitted", () => {
      const entity = Perfil.create(validCreateInput());

      expect(entity.cargaMaximaSemanal).toBeNull();
    });

    it("should create a valid Perfil with cargaMaximaSemanal explicitly null", () => {
      const entity = Perfil.create({ ...validCreateInput(), cargaMaximaSemanal: null });

      expect(entity.cargaMaximaSemanal).toBeNull();
    });
  });

  describe("load", () => {
    it("should load from stored data with cargaMaximaSemanal set", () => {
      const input = { ...validLoadInput(), cargaMaximaSemanal: 20 };
      const entity = Perfil.load(input);

      expect(entity.id).toBe(input.id);
      expect(entity.cargaMaximaSemanal).toBe(20);
    });

    it("should load from stored data with cargaMaximaSemanal null", () => {
      const input = validLoadInput();
      const entity = Perfil.load(input);

      expect(entity.cargaMaximaSemanal).toBeNull();
    });

  });

  describe("update", () => {
    it("should update cargaMaximaSemanal", () => {
      const entity = Perfil.load(validLoadInput());
      entity.update({ cargaMaximaSemanal: 30 });
      expect(entity.cargaMaximaSemanal).toBe(30);
    });

    it("should clear cargaMaximaSemanal back to null", () => {
      const entity = Perfil.load({ ...validLoadInput(), cargaMaximaSemanal: 30 });
      entity.update({ cargaMaximaSemanal: null });
      expect(entity.cargaMaximaSemanal).toBeNull();
    });

    it("should leave cargaMaximaSemanal untouched when not provided", () => {
      const entity = Perfil.load({ ...validLoadInput(), cargaMaximaSemanal: 30 });
      entity.update({ ativo: false });
      expect(entity.cargaMaximaSemanal).toBe(30);
    });
  });
});
