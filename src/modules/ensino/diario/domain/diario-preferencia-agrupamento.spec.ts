import { describe, expect, it } from "vitest";
import { createTestDatedFields, createTestId, createTestRef } from "@/test/helpers";
import { DiarioPreferenciaAgrupamento } from "./diario-preferencia-agrupamento";

describe("DiarioPreferenciaAgrupamento (domain entity)", () => {
  const validCreateInput = {
    modo: "POR_DIA_SEMANA" as const,
    ordem: 1,
    dataInicio: "2026-03-01",
    dataFim: "2026-06-30",
    diaSemanaIso: 1,
    aulasSeguidas: 2,
    diario: createTestRef(),
  };

  const validLoadInput = () => ({
    id: createTestId(),
    modo: "POR_DIA_SEMANA" as const,
    ordem: 1,
    dataInicio: "2026-03-01",
    dataFim: null,
    diaSemanaIso: 1,
    aulasSeguidas: 2,
    diario: createTestRef(),
    ...createTestDatedFields(),
  });

  describe("create", () => {
    it("should create a valid DiarioPreferenciaAgrupamento", () => {
      const entity = DiarioPreferenciaAgrupamento.create(validCreateInput);

      expect(entity.id).toBeDefined();
      expect(entity.modo).toBe("POR_DIA_SEMANA");
      expect(entity.ordem).toBe(1);
      expect(entity.dataInicio).toBe("2026-03-01");
      expect(entity.dataFim).toBe("2026-06-30");
      expect(entity.diaSemanaIso).toBe(1);
      expect(entity.aulasSeguidas).toBe(2);
      expect(entity.diario).toEqual(validCreateInput.diario);
      expect(entity.dateDeleted).toBeNull();
    });

    it("should set dataFim to null when not provided", () => {
      const { dataFim: _dataFim, ...input } = validCreateInput;
      const entity = DiarioPreferenciaAgrupamento.create(input);
      expect(entity.dataFim).toBeNull();
    });
  });

  describe("load", () => {
    it("should load from stored data", () => {
      const input = validLoadInput();
      const entity = DiarioPreferenciaAgrupamento.load(input);

      expect(entity.id).toBe(input.id);
      expect(entity.diaSemanaIso).toBe(1);
      expect(entity.diario).toEqual(input.diario);
    });

    it("should reject invalid id", () => {
      expect(() => DiarioPreferenciaAgrupamento.load({ ...validLoadInput(), id: "bad" })).toThrow();
    });
  });

  describe("update", () => {
    it("should update aulasSeguidas", () => {
      const entity = DiarioPreferenciaAgrupamento.load(validLoadInput());
      entity.update({ aulasSeguidas: 3 });
      expect(entity.aulasSeguidas).toBe(3);
    });

    it("should update dataFim to null", () => {
      const entity = DiarioPreferenciaAgrupamento.load({
        ...validLoadInput(),
        dataFim: "2026-06-30",
      });
      entity.update({ dataFim: null });
      expect(entity.dataFim).toBeNull();
    });
  });
});
