import { describe, expect, it } from "vitest";
import { createTestDatedFields, createTestId, createTestRef } from "@/test/helpers";
import { CalendarioLetivo, CalendarioLetivoSituacao } from "./calendario-letivo";

describe("CalendarioLetivo (domain entity)", () => {
  const validCreateInput = {
    nome: "Calendário 2026",
    ano: 2026,
    campus: createTestRef(),
  };

  const validLoadInput = () => ({
    id: createTestId(),
    nome: "Calendário 2026",
    ano: 2026,
    campus: createTestRef(),
    ofertaFormacao: null,
    situacao: CalendarioLetivoSituacao.ATIVO,
    ...createTestDatedFields(),
  });

  describe("create", () => {
    it("should create a valid CalendarioLetivo", () => {
      const entity = CalendarioLetivo.create(validCreateInput);

      expect(entity.id).toBeDefined();
      expect(entity.nome).toBe("Calendário 2026");
      expect(entity.ano).toBe(2026);
      expect(entity.campus).toEqual(validCreateInput.campus);
      expect(entity.situacao).toBe(CalendarioLetivoSituacao.ATIVO);
      expect(entity.dateCreated).toBeDefined();
      expect(entity.dateDeleted).toBeNull();
    });

    it("should set ofertaFormacao to null when not provided", () => {
      const entity = CalendarioLetivo.create(validCreateInput);
      expect(entity.ofertaFormacao).toBeNull();
    });

    it("should create with ofertaFormacao when provided", () => {
      const ref = createTestRef();
      const entity = CalendarioLetivo.create({
        ...validCreateInput,
        ofertaFormacao: ref,
      });
      expect(entity.ofertaFormacao).toEqual(ref);
    });
  });

  describe("load", () => {
    it("should load from stored data", () => {
      const input = validLoadInput();
      const entity = CalendarioLetivo.load(input);

      expect(entity.id).toBe(input.id);
      expect(entity.nome).toBe("Calendário 2026");
      expect(entity.ano).toBe(2026);
      expect(entity.campus).toEqual(input.campus);
    });

    it("should reject invalid id", () => {
      expect(() => CalendarioLetivo.load({ ...validLoadInput(), id: "bad" })).toThrow();
    });
  });

  describe("update", () => {
    it("should update nome and refresh dateUpdated", () => {
      const entity = CalendarioLetivo.load({
        ...validLoadInput(),
        dateUpdated: "2025-01-01T00:00:00.000Z",
      });

      entity.update({ nome: "Calendário Atualizado" });

      expect(entity.nome).toBe("Calendário Atualizado");
      expect(entity.dateUpdated).not.toBe("2025-01-01T00:00:00.000Z");
    });

    it("should update ano", () => {
      const entity = CalendarioLetivo.load(validLoadInput());
      entity.update({ ano: 2027 });
      expect(entity.ano).toBe(2027);
    });

    it("should update situacao", () => {
      const entity = CalendarioLetivo.load(validLoadInput());
      entity.update({ situacao: CalendarioLetivoSituacao.INATIVO });
      expect(entity.situacao).toBe(CalendarioLetivoSituacao.INATIVO);
    });
  });
});
