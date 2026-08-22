import { describe, expect, it } from "vitest";
import { createTestDatedFields, createTestId } from "@/test/helpers";
import { CalendarioColecao } from "./calendario-colecao";
import { CalendarioColecaoVisibilidade } from "./calendario-colecao.types";

describe("CalendarioColecao (domain entity)", () => {
  const validCreateInput = () => ({
    dono: { id: createTestId() },
    nome: "Agenda do departamento",
  });

  const validLoadInput = () => ({
    id: createTestId(),
    dono: { id: createTestId() },
    campus: null,
    nome: "Agenda do departamento",
    cor: null,
    visibilidade: CalendarioColecaoVisibilidade.PRIVADA,
    ...createTestDatedFields(),
  });

  describe("create", () => {
    it("should create with valid data, defaulting visibilidade to PRIVADA", () => {
      const entity = CalendarioColecao.create(validCreateInput());

      expect(entity.nome).toBe("Agenda do departamento");
      expect(entity.visibilidade).toBe(CalendarioColecaoVisibilidade.PRIVADA);
      expect(entity.campus).toBeNull();
      expect(entity.cor).toBeNull();
      expect(entity.dateDeleted).toBeNull();
    });

    it("should generate a UUID id", () => {
      const entity = CalendarioColecao.create(validCreateInput());
      expect(entity.id).toBeDefined();
    });

    it("should keep dono from the create input as-is", () => {
      const input = validCreateInput();
      const entity = CalendarioColecao.create(input);
      expect(entity.dono).toEqual(input.dono);
    });

    it("should accept visibilidade CAMPUS when campus is provided", () => {
      const entity = CalendarioColecao.create({
        ...validCreateInput(),
        campus: { id: createTestId() },
        visibilidade: CalendarioColecaoVisibilidade.CAMPUS,
      });

      expect(entity.visibilidade).toBe(CalendarioColecaoVisibilidade.CAMPUS);
      expect(entity.campus).not.toBeNull();
    });

    it("should reject visibilidade CAMPUS without campus", () => {
      expect(() =>
        CalendarioColecao.create({
          ...validCreateInput(),
          visibilidade: CalendarioColecaoVisibilidade.CAMPUS,
        }),
      ).toThrow();
    });
  });

  describe("load", () => {
    it("should reconstruct from persisted data", () => {
      const input = validLoadInput();
      const entity = CalendarioColecao.load(input);

      expect(entity.id).toBe(input.id);
      expect(entity.nome).toBe(input.nome);
      expect(entity.visibilidade).toBe(CalendarioColecaoVisibilidade.PRIVADA);
    });

    it("should reject invalid id", () => {
      expect(() => CalendarioColecao.load({ ...validLoadInput(), id: "bad" })).toThrow();
    });
  });

  describe("update", () => {
    it("should update nome and refresh dateUpdated", () => {
      const entity = CalendarioColecao.load({
        ...validLoadInput(),
        dateUpdated: "2025-01-01T00:00:00.000Z",
      });

      entity.update({ nome: "Novo nome" });

      expect(entity.nome).toBe("Novo nome");
      expect(entity.dateUpdated).not.toBe("2025-01-01T00:00:00.000Z");
    });

    it("should allow switching to visibilidade CAMPUS when campus is provided in the same call", () => {
      const entity = CalendarioColecao.load(validLoadInput());

      entity.update({
        visibilidade: CalendarioColecaoVisibilidade.CAMPUS,
        campus: { id: createTestId() },
      });

      expect(entity.visibilidade).toBe(CalendarioColecaoVisibilidade.CAMPUS);
    });

    it("should reject switching to visibilidade CAMPUS without a campus already set or provided", () => {
      const entity = CalendarioColecao.load(validLoadInput());

      expect(() => entity.update({ visibilidade: CalendarioColecaoVisibilidade.CAMPUS })).toThrow();
    });

    it("should allow visibilidade CAMPUS when campus was already set in a previous update", () => {
      const entity = CalendarioColecao.load(validLoadInput());

      entity.update({ campus: { id: createTestId() } });
      entity.update({ visibilidade: CalendarioColecaoVisibilidade.CAMPUS });

      expect(entity.visibilidade).toBe(CalendarioColecaoVisibilidade.CAMPUS);
    });
  });

  describe("isActive", () => {
    it("should return true when not deleted", () => {
      const entity = CalendarioColecao.create(validCreateInput());
      expect(entity.isActive()).toBe(true);
    });

    it("should return false when dateDeleted is set", () => {
      const entity = CalendarioColecao.load({
        ...validLoadInput(),
        dateDeleted: "2025-01-01T00:00:00.000Z",
      });
      expect(entity.isActive()).toBe(false);
    });
  });
});
