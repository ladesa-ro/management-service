import { describe, expect, it } from "vitest";
import { createTestId, createTestRef } from "@/test/helpers";
import { HorarioAulaConfiguracao } from "./horario-aula-configuracao";

describe("HorarioAulaConfiguracao (domain entity)", () => {
  const validCreateInput = {
    dataInicio: "2026-03-01",
    ativo: true,
    campus: createTestRef(),
    horarios: [
      { inicio: "07:00:00", fim: "07:50:00" },
      { inicio: "07:50:00", fim: "08:40:00" },
    ],
  };

  const validLoadInput = () => ({
    id: createTestId(),
    dataInicio: "2026-03-01",
    dataFim: null,
    ativo: true,
    campus: createTestRef(),
    horarios: [
      { inicio: "07:00:00", fim: "07:50:00" },
      { inicio: "07:50:00", fim: "08:40:00" },
    ],
  });

  describe("create", () => {
    it("should create a valid entity with horarios", () => {
      const entity = HorarioAulaConfiguracao.create(validCreateInput);

      expect(entity.id).toBeDefined();
      expect(entity.dataInicio).toBe("2026-03-01");
      expect(entity.dataFim).toBeNull();
      expect(entity.ativo).toBe(true);
      expect(entity.campus).toEqual(validCreateInput.campus);
      expect(entity.horarios).toHaveLength(2);
    });

    it("should create with empty horarios by default", () => {
      const entity = HorarioAulaConfiguracao.create({
        dataInicio: "2026-03-01",
        ativo: true,
        campus: createTestRef(),
      });

      expect(entity.horarios).toEqual([]);
    });

    it("should reject when inicio >= fim in a horario", () => {
      expect(() =>
        HorarioAulaConfiguracao.create({
          ...validCreateInput,
          horarios: [{ inicio: "08:00:00", fim: "07:00:00" }],
        }),
      ).toThrow();
    });

    it("should reject when inicio == fim", () => {
      expect(() =>
        HorarioAulaConfiguracao.create({
          ...validCreateInput,
          horarios: [{ inicio: "08:00:00", fim: "08:00:00" }],
        }),
      ).toThrow();
    });

    it("should reject overlapping horarios", () => {
      expect(() =>
        HorarioAulaConfiguracao.create({
          ...validCreateInput,
          horarios: [
            { inicio: "07:00:00", fim: "08:00:00" },
            { inicio: "07:30:00", fim: "08:30:00" },
          ],
        }),
      ).toThrow();
    });

    it("should accept adjacent horarios (fim == next inicio)", () => {
      const entity = HorarioAulaConfiguracao.create({
        ...validCreateInput,
        horarios: [
          { inicio: "07:00:00", fim: "07:50:00" },
          { inicio: "07:50:00", fim: "08:40:00" },
        ],
      });

      expect(entity.horarios).toHaveLength(2);
    });
  });

  describe("load", () => {
    it("should load from stored data", () => {
      const input = validLoadInput();
      const entity = HorarioAulaConfiguracao.load(input);

      expect(entity.id).toBe(input.id);
      expect(entity.dataInicio).toBe("2026-03-01");
      expect(entity.ativo).toBe(true);
      expect(entity.horarios).toHaveLength(2);
    });

    it("should reject invalid id", () => {
      expect(() => HorarioAulaConfiguracao.load({ ...validLoadInput(), id: "bad" })).toThrow();
    });
  });

  describe("replaceHorarios", () => {
    it("should replace horarios with valid data", () => {
      const entity = HorarioAulaConfiguracao.load(validLoadInput());
      const newHorarios = [
        { inicio: "13:00:00", fim: "13:50:00" },
        { inicio: "13:50:00", fim: "14:40:00" },
        { inicio: "14:40:00", fim: "15:30:00" },
      ];

      entity.replaceHorarios(newHorarios);

      expect(entity.horarios).toHaveLength(3);
      expect(entity.horarios[0].inicio).toBe("13:00:00");
    });

    it("should accept empty array", () => {
      const entity = HorarioAulaConfiguracao.load(validLoadInput());
      entity.replaceHorarios([]);
      expect(entity.horarios).toEqual([]);
    });

    it("should reject when inicio >= fim", () => {
      const entity = HorarioAulaConfiguracao.load(validLoadInput());

      expect(() => entity.replaceHorarios([{ inicio: "10:00:00", fim: "09:00:00" }])).toThrow();
    });

    it("should reject overlapping horarios", () => {
      const entity = HorarioAulaConfiguracao.load(validLoadInput());

      expect(() =>
        entity.replaceHorarios([
          { inicio: "07:00:00", fim: "08:00:00" },
          { inicio: "07:30:00", fim: "08:30:00" },
        ]),
      ).toThrow();
    });

    it("should reject horarios where fim of one exceeds inicio of next", () => {
      const entity = HorarioAulaConfiguracao.load(validLoadInput());

      expect(() =>
        entity.replaceHorarios([
          { inicio: "07:00:00", fim: "08:01:00" },
          { inicio: "08:00:00", fim: "09:00:00" },
        ]),
      ).toThrow();
    });

    it("should accept non-sequential order (validates after sorting)", () => {
      const entity = HorarioAulaConfiguracao.load(validLoadInput());

      entity.replaceHorarios([
        { inicio: "09:00:00", fim: "09:50:00" },
        { inicio: "07:00:00", fim: "07:50:00" },
        { inicio: "08:00:00", fim: "08:50:00" },
      ]);

      expect(entity.horarios).toHaveLength(3);
    });
  });
});
