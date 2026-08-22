import { describe, expect, it } from "vitest";
import { createTestDatedFields, createTestId } from "@/test/helpers";
import { CalendarioSolicitacaoMudanca } from "./calendario-solicitacao-mudanca";
import {
  CalendarioSolicitacaoMudancaStatus,
  CalendarioSolicitacaoMudancaTipoOperacao,
} from "./calendario-solicitacao-mudanca.types";

describe("CalendarioSolicitacaoMudanca (domain entity)", () => {
  const validCreateInput = () => ({
    autor: { id: createTestId() },
    calendarioAgendamentoId: createTestId(),
    tipoOperacao: CalendarioSolicitacaoMudancaTipoOperacao.MOVER,
    dadosPropostos: { nome: "Reunião remarcada" },
    justificativa: "Conflito de horário com outra atividade",
  });

  const validLoadInput = () => ({
    id: createTestId(),
    autor: { id: createTestId() },
    calendarioAgendamentoId: createTestId(),
    tipoOperacao: CalendarioSolicitacaoMudancaTipoOperacao.REMOVER,
    dadosPropostos: {},
    justificativa: "Agendamento duplicado",
    status: CalendarioSolicitacaoMudancaStatus.ABERTA,
    motivoRecusa: null,
    sessaoEdicaoId: null,
    ...createTestDatedFields(),
  });

  describe("create", () => {
    it("should create with valid data, defaulting status to ABERTA", () => {
      const entity = CalendarioSolicitacaoMudanca.create(validCreateInput());

      expect(entity.status).toBe(CalendarioSolicitacaoMudancaStatus.ABERTA);
      expect(entity.motivoRecusa).toBeNull();
      expect(entity.sessaoEdicaoId).toBeNull();
      expect(entity.dateDeleted).toBeNull();
    });

    it("should generate a UUID id", () => {
      const entity = CalendarioSolicitacaoMudanca.create(validCreateInput());
      expect(entity.id).toBeDefined();
    });

    it("should keep autor from the create input as-is", () => {
      const input = validCreateInput();
      const entity = CalendarioSolicitacaoMudanca.create(input);
      expect(entity.autor).toEqual(input.autor);
    });

    it("should keep tipoOperacao, dadosPropostos and justificativa from the create input", () => {
      const input = validCreateInput();
      const entity = CalendarioSolicitacaoMudanca.create(input);

      expect(entity.tipoOperacao).toBe(input.tipoOperacao);
      expect(entity.dadosPropostos).toEqual(input.dadosPropostos);
      expect(entity.justificativa).toBe(input.justificativa);
      expect(entity.calendarioAgendamentoId).toBe(input.calendarioAgendamentoId);
    });

    it("should reject an empty justificativa", () => {
      expect(() =>
        CalendarioSolicitacaoMudanca.create({ ...validCreateInput(), justificativa: "" }),
      ).toThrow();
    });

    it("should reject a non-uuid calendarioAgendamentoId", () => {
      expect(() =>
        CalendarioSolicitacaoMudanca.create({
          ...validCreateInput(),
          calendarioAgendamentoId: "not-a-uuid",
        }),
      ).toThrow();
    });
  });

  describe("load", () => {
    it("should reconstruct from persisted data", () => {
      const input = validLoadInput();
      const entity = CalendarioSolicitacaoMudanca.load(input);

      expect(entity.id).toBe(input.id);
      expect(entity.status).toBe(CalendarioSolicitacaoMudancaStatus.ABERTA);
      expect(entity.tipoOperacao).toBe(CalendarioSolicitacaoMudancaTipoOperacao.REMOVER);
    });

    it("should reconstruct an approved request carrying its sessaoEdicaoId", () => {
      const input = {
        ...validLoadInput(),
        status: CalendarioSolicitacaoMudancaStatus.APROVADA,
        sessaoEdicaoId: createTestId(),
      };
      const entity = CalendarioSolicitacaoMudanca.load(input);

      expect(entity.status).toBe(CalendarioSolicitacaoMudancaStatus.APROVADA);
      expect(entity.sessaoEdicaoId).toBe(input.sessaoEdicaoId);
    });

    it("should reconstruct a refused request carrying its motivoRecusa", () => {
      const input = {
        ...validLoadInput(),
        status: CalendarioSolicitacaoMudancaStatus.RECUSADA,
        motivoRecusa: "Fora do prazo",
      };
      const entity = CalendarioSolicitacaoMudanca.load(input);

      expect(entity.status).toBe(CalendarioSolicitacaoMudancaStatus.RECUSADA);
      expect(entity.motivoRecusa).toBe("Fora do prazo");
    });

    it("should reject invalid id", () => {
      expect(() => CalendarioSolicitacaoMudanca.load({ ...validLoadInput(), id: "bad" })).toThrow();
    });
  });

  describe("isActive", () => {
    it("should return true when not deleted", () => {
      const entity = CalendarioSolicitacaoMudanca.create(validCreateInput());
      expect(entity.isActive()).toBe(true);
    });

    it("should return false when dateDeleted is set", () => {
      const entity = CalendarioSolicitacaoMudanca.load({
        ...validLoadInput(),
        dateDeleted: "2025-01-01T00:00:00.000Z",
      });
      expect(entity.isActive()).toBe(false);
    });
  });
});
