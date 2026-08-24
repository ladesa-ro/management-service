import { describe, expect, it } from "vitest";
import { createTestDatedFields, createTestId } from "@/test/helpers";
import { CalendarioIndisponibilidadeProfessor } from "./calendario-indisponibilidade-professor";
import { CalendarioIndisponibilidadeProfessorTipo } from "./calendario-indisponibilidade-professor.types";

describe("CalendarioIndisponibilidadeProfessor (domain entity)", () => {
  const validCreateInputRegra = () => ({
    perfil: { id: createTestId() },
    tipo: CalendarioIndisponibilidadeProfessorTipo.BLOQUEIO,
    diaSemana: 1,
    inicio: "08:00:00",
    fim: "12:00:00",
  });

  const validCreateInputExcecao = () => ({
    perfil: { id: createTestId() },
    tipo: CalendarioIndisponibilidadeProfessorTipo.PREFERENCIA,
    data: "2026-03-10",
    inicio: "08:00:00",
    fim: "12:00:00",
  });

  const validLoadInput = () => ({
    id: createTestId(),
    perfil: { id: createTestId() },
    tipo: CalendarioIndisponibilidadeProfessorTipo.BLOQUEIO,
    diaSemana: 1,
    data: null,
    inicio: "08:00:00",
    fim: "12:00:00",
    motivo: null,
    ...createTestDatedFields(),
  });

  describe("create", () => {
    it("should create a weekly rule (diaSemana set, data null)", () => {
      const entity = CalendarioIndisponibilidadeProfessor.create(validCreateInputRegra());

      expect(entity.diaSemana).toBe(1);
      expect(entity.data).toBeNull();
      expect(entity.tipo).toBe(CalendarioIndisponibilidadeProfessorTipo.BLOQUEIO);
      expect(entity.motivo).toBeNull();
      expect(entity.dateDeleted).toBeNull();
    });

    it("should create a one-off exception (data set, diaSemana null)", () => {
      const entity = CalendarioIndisponibilidadeProfessor.create(validCreateInputExcecao());

      expect(entity.data).toBe("2026-03-10");
      expect(entity.diaSemana).toBeNull();
      expect(entity.tipo).toBe(CalendarioIndisponibilidadeProfessorTipo.PREFERENCIA);
    });

    it("should generate a UUID id", () => {
      const entity = CalendarioIndisponibilidadeProfessor.create(validCreateInputRegra());
      expect(entity.id).toBeDefined();
    });

    it("should keep perfil from the create input as-is", () => {
      const input = validCreateInputRegra();
      const entity = CalendarioIndisponibilidadeProfessor.create(input);
      expect(entity.perfil).toEqual(input.perfil);
    });

    it("should reject when both diaSemana and data are provided", () => {
      expect(() =>
        CalendarioIndisponibilidadeProfessor.create({
          ...validCreateInputRegra(),
          data: "2026-03-10",
        }),
      ).toThrow();
    });

    it("should reject when neither diaSemana nor data are provided", () => {
      const { diaSemana: _diaSemana, ...rest } = validCreateInputRegra();
      expect(() => CalendarioIndisponibilidadeProfessor.create(rest)).toThrow();
    });

    it("should accept when exactly diaSemana is provided", () => {
      const { data: _data, ...rest } = validCreateInputExcecao();
      expect(() =>
        CalendarioIndisponibilidadeProfessor.create({ ...rest, diaSemana: 2 }),
      ).not.toThrow();
    });

    it("should accept when exactly data is provided", () => {
      expect(() =>
        CalendarioIndisponibilidadeProfessor.create(validCreateInputExcecao()),
      ).not.toThrow();
    });

    it("should reject when fim is not greater than inicio", () => {
      expect(() =>
        CalendarioIndisponibilidadeProfessor.create({
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
      const entity = CalendarioIndisponibilidadeProfessor.load(input);

      expect(entity.id).toBe(input.id);
      expect(entity.diaSemana).toBe(input.diaSemana);
      expect(entity.tipo).toBe(CalendarioIndisponibilidadeProfessorTipo.BLOQUEIO);
    });

    it("should reject invalid id", () => {
      expect(() =>
        CalendarioIndisponibilidadeProfessor.load({ ...validLoadInput(), id: "bad" }),
      ).toThrow();
    });
  });

  describe("isActive", () => {
    it("should return true when not deleted", () => {
      const entity = CalendarioIndisponibilidadeProfessor.create(validCreateInputRegra());
      expect(entity.isActive()).toBe(true);
    });

    it("should return false when dateDeleted is set", () => {
      const entity = CalendarioIndisponibilidadeProfessor.load({
        ...validLoadInput(),
        dateDeleted: "2025-01-01T00:00:00.000Z",
      });
      expect(entity.isActive()).toBe(false);
    });
  });
});
