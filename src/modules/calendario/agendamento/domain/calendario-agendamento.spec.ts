import { describe, expect, it } from "vitest";
import { createTestDate, createTestDatedFields, createTestId } from "@/test/helpers";
import { CalendarioAgendamento } from "./calendario-agendamento";
import {
  CalendarioAgendamentoStatus,
  CalendarioAgendamentoTipo,
} from "./calendario-agendamento.types";
import { CalendarioAgendamentoMetadata } from "./calendario-agendamento-metadata";

describe("CalendarioAgendamento (domain entity)", () => {
  const validCreateInput = {
    tipo: CalendarioAgendamentoTipo.EVENTO,
    dataInicio: "2026-03-15",
    diaInteiro: true,
  };

  const validLoadInput = () => ({
    id: createTestId(),
    identificadorExterno: createTestId(),
    tipo: CalendarioAgendamentoTipo.EVENTO,
    dataInicio: "2026-03-15",
    dataFim: null,
    diaInteiro: true,
    horarioInicio: "00:00:00",
    horarioFim: "23:59:59",
    repeticao: null,
    status: CalendarioAgendamentoStatus.ATIVO,

    turmas: [],
    perfis: [],
    calendariosLetivos: [],
    ofertasFormacao: [],
    modalidades: [],
    ambientes: [],
    diarios: [],

    version: 1,
    previousVersionId: null,
    validFrom: createTestDate(),
    validTo: null,

    ...createTestDatedFields(),
  });

  describe("create", () => {
    it("should create with valid data", () => {
      const entity = CalendarioAgendamento.create(validCreateInput);

      expect(entity.tipo).toBe(CalendarioAgendamentoTipo.EVENTO);
      expect(entity.dataInicio).toBe("2026-03-15");
      expect(entity.diaInteiro).toBe(true);
      expect(entity.status).toBe(CalendarioAgendamentoStatus.ATIVO);
      expect(entity.dataFim).toBeNull();
      expect(entity.repeticao).toBeNull();
      expect(entity.horarioInicio).toBe("00:00:00");
      expect(entity.horarioFim).toBe("23:59:59");
      expect(entity.dateCreated).toBeDefined();
      expect(entity.dateDeleted).toBeNull();
    });

    it("should generate UUID id and identificadorExterno", () => {
      const entity = CalendarioAgendamento.create(validCreateInput);

      expect(entity.id).toBeDefined();
      expect(entity.identificadorExterno).toBeDefined();
      expect(entity.id).not.toBe(entity.identificadorExterno);
      expect(entity.id).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-7[0-9a-f]{3}-[0-9a-f]{4}-[0-9a-f]{12}$/);
      expect(entity.identificadorExterno).toMatch(
        /^[0-9a-f]{8}-[0-9a-f]{4}-7[0-9a-f]{3}-[0-9a-f]{4}-[0-9a-f]{12}$/,
      );
    });
  });

  describe("load", () => {
    it("should reconstruct from persisted data", () => {
      const input = validLoadInput();
      const entity = CalendarioAgendamento.load(input);

      expect(entity.id).toBe(input.id);
      expect(entity.identificadorExterno).toBe(input.identificadorExterno);
      expect(entity.tipo).toBe(CalendarioAgendamentoTipo.EVENTO);
      expect(entity.dataInicio).toBe("2026-03-15");
      expect(entity.version).toBe(1);
      expect(entity.previousVersionId).toBeNull();
    });

    it("should reject invalid id", () => {
      expect(() => CalendarioAgendamento.load({ ...validLoadInput(), id: "bad" })).toThrow();
    });
  });

  describe("createNewVersion", () => {
    it("should preserve identificadorExterno and tipo from previous version", () => {
      const previous = CalendarioAgendamento.create(validCreateInput);
      previous.close();

      const newVersion = CalendarioAgendamento.createNewVersion(previous, {
        dataInicio: "2026-04-01",
      });

      expect(newVersion.identificadorExterno).toBe(previous.identificadorExterno);
      expect(newVersion.tipo).toBe(previous.tipo);
    });

    it("should increment version number", () => {
      const previous = CalendarioAgendamento.create(validCreateInput);
      previous.close();

      const newVersion = CalendarioAgendamento.createNewVersion(previous, {});

      expect(newVersion.version).toBe(previous.version + 1);
    });

    it("should set previousVersionId to previous version's id", () => {
      const previous = CalendarioAgendamento.create(validCreateInput);
      previous.close();

      const newVersion = CalendarioAgendamento.createNewVersion(previous, {});

      expect(newVersion.previousVersionId).toBe(previous.id);
    });
  });

  describe("close", () => {
    it("should set validTo and update dateUpdated", () => {
      const entity = CalendarioAgendamento.load({
        ...validLoadInput(),
        dateUpdated: "2025-01-01T00:00:00.000Z",
      });

      entity.close();

      expect(entity.validTo).toBeDefined();
      expect(entity.validTo).not.toBeNull();
      expect(entity.dateUpdated).not.toBe("2025-01-01T00:00:00.000Z");
    });
  });

  describe("isActive", () => {
    it("should return true when not deleted and validTo is null", () => {
      const entity = CalendarioAgendamento.create(validCreateInput);

      expect(entity.isActive()).toBe(true);
    });

    it("should return false when validTo is set", () => {
      const entity = CalendarioAgendamento.create(validCreateInput);
      entity.close();

      expect(entity.isActive()).toBe(false);
    });
  });
});

describe("CalendarioAgendamentoMetadata (domain entity)", () => {
  const validCreateInput = {
    identificadorExternoCalendarioAgendamento: createTestId(),
    nome: "Semana de Provas",
    cor: "#2f9e41",
  };

  const validLoadInput = () => ({
    id: createTestId(),
    identificadorExternoCalendarioAgendamento: createTestId(),
    nome: "Semana de Provas",
    cor: "#2f9e41",
    dateUpdated: createTestDate(),
  });

  describe("create", () => {
    it("should create with identificadorExterno reference", () => {
      const entity = CalendarioAgendamentoMetadata.create(validCreateInput);

      expect(entity.id).toBeDefined();
      expect(entity.identificadorExternoCalendarioAgendamento).toBe(
        validCreateInput.identificadorExternoCalendarioAgendamento,
      );
      expect(entity.nome).toBe("Semana de Provas");
      expect(entity.cor).toBe("#2f9e41");
      expect(entity.dateUpdated).toBeDefined();
    });
  });

  describe("load", () => {
    it("should reconstruct from persisted data", () => {
      const input = validLoadInput();
      const entity = CalendarioAgendamentoMetadata.load(input);

      expect(entity.id).toBe(input.id);
      expect(entity.identificadorExternoCalendarioAgendamento).toBe(
        input.identificadorExternoCalendarioAgendamento,
      );
      expect(entity.nome).toBe("Semana de Provas");
      expect(entity.cor).toBe("#2f9e41");
    });
  });

  describe("update", () => {
    it("should update nome and cor", () => {
      const entity = CalendarioAgendamentoMetadata.load({
        ...validLoadInput(),
        dateUpdated: "2025-01-01T00:00:00.000Z",
      });

      entity.update({ nome: "Feira de Ciencias", cor: "#1e5dcc" });

      expect(entity.nome).toBe("Feira de Ciencias");
      expect(entity.cor).toBe("#1e5dcc");
      expect(entity.dateUpdated).not.toBe("2025-01-01T00:00:00.000Z");
    });
  });
});
