import { describe, expect, it } from "vitest";
import { createTestDatedFields, createTestId } from "@/test/helpers";
import { CalendarioIndisponibilidadeAmbiente } from "./calendario-indisponibilidade-ambiente";
import { CalendarioIndisponibilidadeAmbienteTipo } from "./calendario-indisponibilidade-ambiente.types";

describe("CalendarioIndisponibilidadeAmbiente (domain entity)", () => {
  const validCreateInputRegra = () => ({
    ambiente: { id: createTestId() },
    tipo: CalendarioIndisponibilidadeAmbienteTipo.BLOQUEIO,
    diaSemana: 1,
    inicio: "08:00:00",
    fim: "12:00:00",
  });

  const validCreateInputExcecao = () => ({
    ambiente: { id: createTestId() },
    tipo: CalendarioIndisponibilidadeAmbienteTipo.PREFERENCIA,
    data: "2026-03-10",
    inicio: "08:00:00",
    fim: "12:00:00",
  });

  const validLoadInput = () => ({
    id: createTestId(),
    ambiente: { id: createTestId() },
    tipo: CalendarioIndisponibilidadeAmbienteTipo.BLOQUEIO,
    diaSemana: 1,
    data: null,
    inicio: "08:00:00",
    fim: "12:00:00",
    motivo: null,
    ...createTestDatedFields(),
  });

  describe("create", () => {
    it("should create a weekly rule (diaSemana set, data null)", () => {
      const entity = CalendarioIndisponibilidadeAmbiente.create(validCreateInputRegra());

      expect(entity.diaSemana).toBe(1);
      expect(entity.data).toBeNull();
      expect(entity.tipo).toBe(CalendarioIndisponibilidadeAmbienteTipo.BLOQUEIO);
      expect(entity.motivo).toBeNull();
      expect(entity.dateDeleted).toBeNull();
    });

    it("should create a one-off exception (data set, diaSemana null)", () => {
      const entity = CalendarioIndisponibilidadeAmbiente.create(validCreateInputExcecao());

      expect(entity.data).toBe("2026-03-10");
      expect(entity.diaSemana).toBeNull();
      expect(entity.tipo).toBe(CalendarioIndisponibilidadeAmbienteTipo.PREFERENCIA);
    });

    it("should generate a UUID id", () => {
      const entity = CalendarioIndisponibilidadeAmbiente.create(validCreateInputRegra());
      expect(entity.id).toBeDefined();
    });

    it("should keep ambiente from the create input as-is", () => {
      const input = validCreateInputRegra();
      const entity = CalendarioIndisponibilidadeAmbiente.create(input);
      expect(entity.ambiente).toEqual(input.ambiente);
    });

    it("should reject when both diaSemana and data are provided", () => {
      expect(() =>
        CalendarioIndisponibilidadeAmbiente.create({
          ...validCreateInputRegra(),
          data: "2026-03-10",
        }),
      ).toThrow();
    });

    it("should reject when neither diaSemana nor data are provided", () => {
      const { diaSemana: _diaSemana, ...rest } = validCreateInputRegra();
      expect(() => CalendarioIndisponibilidadeAmbiente.create(rest)).toThrow();
    });

    it("should accept when exactly diaSemana is provided", () => {
      const { data: _data, ...rest } = validCreateInputExcecao();
      expect(() =>
        CalendarioIndisponibilidadeAmbiente.create({ ...rest, diaSemana: 2 }),
      ).not.toThrow();
    });

    it("should accept when exactly data is provided", () => {
      expect(() =>
        CalendarioIndisponibilidadeAmbiente.create(validCreateInputExcecao()),
      ).not.toThrow();
    });

    it("should reject when fim is not greater than inicio", () => {
      expect(() =>
        CalendarioIndisponibilidadeAmbiente.create({
          ...validCreateInputRegra(),
          inicio: "12:00:00",
          fim: "08:00:00",
        }),
      ).toThrow();
    });
  });

  describe("load", () => {
    it("should reconstruct from persisted data", () => {
      const input = validLoadInput();
      const entity = CalendarioIndisponibilidadeAmbiente.load(input);

      expect(entity.id).toBe(input.id);
      expect(entity.diaSemana).toBe(input.diaSemana);
      expect(entity.tipo).toBe(CalendarioIndisponibilidadeAmbienteTipo.BLOQUEIO);
    });

    it("should reject invalid id", () => {
      expect(() =>
        CalendarioIndisponibilidadeAmbiente.load({ ...validLoadInput(), id: "bad" }),
      ).toThrow();
    });
  });

  describe("isActive", () => {
    it("should return true when not deleted", () => {
      const entity = CalendarioIndisponibilidadeAmbiente.create(validCreateInputRegra());
      expect(entity.isActive()).toBe(true);
    });

    it("should return false when dateDeleted is set", () => {
      const entity = CalendarioIndisponibilidadeAmbiente.load({
        ...validLoadInput(),
        dateDeleted: "2025-01-01T00:00:00.000Z",
      });
      expect(entity.isActive()).toBe(false);
    });
  });
});
