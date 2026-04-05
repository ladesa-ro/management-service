import { describe, expect, it, vi } from "vitest";
import type { CalendarioAgendamentoFindOneQueryResult } from "@/modules/calendario/agendamento/domain/queries/calendario-agendamento-find-one.query.result";
import type { ICalendarioAgendamentoRepository } from "@/modules/calendario/agendamento/domain/repositories";
import { createTestId } from "@/test/helpers";
import type { ConsultaOcorrenciasPorDataQuery } from "../../domain/queries/consulta-ocorrencias-por-data.query";
import { ConsultaOcorrenciasPorDataQueryHandlerImpl } from "./consulta-ocorrencias-por-data.query.handler";

function createMockAgendamento(
  overrides: Partial<CalendarioAgendamentoFindOneQueryResult> = {},
): CalendarioAgendamentoFindOneQueryResult {
  return {
    id: createTestId(),
    identificadorExterno: createTestId(),
    tipo: "EVENTO",
    nome: "Evento Teste",
    dataInicio: "2026-03-15",
    dataFim: "2026-03-15",
    diaInteiro: false,
    horarioInicio: "14:00:00",
    horarioFim: "15:00:00",
    cor: "#2f9e41",
    repeticao: null,
    status: "ATIVO",
    version: 1,
    turmas: [],
    perfis: [],
    calendariosLetivos: [],
    ofertasFormacao: [],
    modalidades: [],
    ambientes: [],
    diarios: [],
    ...overrides,
  } as CalendarioAgendamentoFindOneQueryResult;
}

function createMockRepository() {
  return {
    findByDateRange: vi.fn(),
  } as unknown as ICalendarioAgendamentoRepository;
}

function createHandler(repository: ICalendarioAgendamentoRepository) {
  return new ConsultaOcorrenciasPorDataQueryHandlerImpl(repository);
}

function createQuery(
  overrides: Partial<ConsultaOcorrenciasPorDataQuery> = {},
): ConsultaOcorrenciasPorDataQuery {
  return {
    dateStart: "2026-03-01",
    dateEnd: "2026-03-31",
    ...overrides,
  } as ConsultaOcorrenciasPorDataQuery;
}

describe("ConsultaOcorrenciasPorDataQueryHandlerImpl", () => {
  // ==========================================
  // Non-recurring events
  // ==========================================

  describe("non-recurring events", () => {
    it("should return non-recurring events as-is when repeticao is null", async () => {
      const repository = createMockRepository();
      const handler = createHandler(repository);

      const agendamento = createMockAgendamento({ repeticao: null });

      vi.mocked(repository.findByDateRange).mockResolvedValue([agendamento]);

      const result = await handler.execute(null, createQuery());

      expect(result).toHaveLength(1);
      expect(result[0]).toBe(agendamento);
    });

    it("should pass through multiple non-recurring events", async () => {
      const repository = createMockRepository();
      const handler = createHandler(repository);

      const agendamento1 = createMockAgendamento({
        nome: "Evento A",
        repeticao: null,
      });
      const agendamento2 = createMockAgendamento({
        nome: "Evento B",
        repeticao: null,
      });

      vi.mocked(repository.findByDateRange).mockResolvedValue([agendamento1, agendamento2]);

      const result = await handler.execute(null, createQuery());

      expect(result).toHaveLength(2);
      expect(result[0]).toBe(agendamento1);
      expect(result[1]).toBe(agendamento2);
    });
  });

  // ==========================================
  // Recurring events (RRULE expansion)
  // ==========================================

  describe("recurring events (RRULE expansion)", () => {
    it("should expand daily recurring event (FREQ=DAILY) into individual occurrences within range", async () => {
      const repository = createMockRepository();
      const handler = createHandler(repository);

      const agendamento = createMockAgendamento({
        dataInicio: "2026-03-02",
        dataFim: "2026-03-02",
        repeticao: "FREQ=DAILY;COUNT=5",
      });

      vi.mocked(repository.findByDateRange).mockResolvedValue([agendamento]);

      const result = await handler.execute(null, createQuery());

      expect(result).toHaveLength(5);

      const dates = result.map((r) => new Date(r.dataInicio).toISOString().slice(0, 10));

      expect(dates).toContain("2026-03-02");
      expect(dates).toContain("2026-03-03");
      expect(dates).toContain("2026-03-04");
      expect(dates).toContain("2026-03-05");
      expect(dates).toContain("2026-03-06");
    });

    it("should expand weekly recurring event (FREQ=WEEKLY;BYDAY=MO,WE,FR) correctly", async () => {
      const repository = createMockRepository();
      const handler = createHandler(repository);

      // 2026-03-02 is a Monday
      const agendamento = createMockAgendamento({
        dataInicio: "2026-03-02",
        dataFim: "2026-03-02",
        repeticao: "FREQ=WEEKLY;BYDAY=MO,WE,FR;COUNT=6",
      });

      vi.mocked(repository.findByDateRange).mockResolvedValue([agendamento]);

      const result = await handler.execute(null, createQuery());

      expect(result).toHaveLength(6);

      const dates = result.map((r) => new Date(r.dataInicio).toISOString().slice(0, 10));

      // Week 1: Mon 03-02, Wed 03-04, Fri 03-06
      expect(dates).toContain("2026-03-02");
      expect(dates).toContain("2026-03-04");
      expect(dates).toContain("2026-03-06");

      // Week 2: Mon 03-09, Wed 03-11, Fri 03-13
      expect(dates).toContain("2026-03-09");
      expect(dates).toContain("2026-03-11");
      expect(dates).toContain("2026-03-13");
    });

    it("should preserve duration (dataFim - dataInicio) for each expanded occurrence", async () => {
      const repository = createMockRepository();
      const handler = createHandler(repository);

      // Event spans 2 days
      const agendamento = createMockAgendamento({
        dataInicio: "2026-03-02",
        dataFim: "2026-03-04",
        repeticao: "FREQ=WEEKLY;COUNT=3",
      });

      vi.mocked(repository.findByDateRange).mockResolvedValue([agendamento]);

      const result = await handler.execute(null, createQuery());

      expect(result).toHaveLength(3);

      for (const occurrence of result) {
        const start = new Date(occurrence.dataInicio).getTime();
        const end = new Date(occurrence.dataFim!).getTime();
        const durationMs = end - start;

        // Original duration: 2026-03-04 - 2026-03-02 = 2 days = 172800000ms
        const twoDaysMs = 2 * 24 * 60 * 60 * 1000;

        expect(durationMs).toBe(twoDaysMs);
      }
    });

    it("should preserve all other fields (id, nome, cor, turmas, etc.) for each occurrence", async () => {
      const repository = createMockRepository();
      const handler = createHandler(repository);

      const originalId = createTestId();
      const originalIdentificadorExterno = createTestId();

      const agendamento = createMockAgendamento({
        id: originalId,
        identificadorExterno: originalIdentificadorExterno,
        nome: "Reuniao Semanal",
        cor: "#ff0000",
        horarioInicio: "10:00:00",
        horarioFim: "11:30:00",
        dataInicio: "2026-03-02",
        dataFim: "2026-03-02",
        repeticao: "FREQ=DAILY;COUNT=3",
      });

      vi.mocked(repository.findByDateRange).mockResolvedValue([agendamento]);

      const result = await handler.execute(null, createQuery());

      expect(result).toHaveLength(3);

      for (const occurrence of result) {
        expect(occurrence.id).toBe(originalId);
        expect(occurrence.identificadorExterno).toBe(originalIdentificadorExterno);
        expect(occurrence.nome).toBe("Reuniao Semanal");
        expect(occurrence.cor).toBe("#ff0000");
        expect(occurrence.horarioInicio).toBe("10:00:00");
        expect(occurrence.horarioFim).toBe("11:30:00");
        expect(occurrence.turmas).toEqual([]);
        expect(occurrence.perfis).toEqual([]);
      }
    });

    it("should NOT expand occurrences outside the requested date range", async () => {
      const repository = createMockRepository();
      const handler = createHandler(repository);

      // Event starts on March 25 with daily recurrence for 10 days
      // Range ends on March 31, so only 7 occurrences should be within range
      const agendamento = createMockAgendamento({
        dataInicio: "2026-03-25",
        dataFim: "2026-03-25",
        repeticao: "FREQ=DAILY;COUNT=10",
      });

      vi.mocked(repository.findByDateRange).mockResolvedValue([agendamento]);

      const query = createQuery({
        dateStart: "2026-03-01",
        dateEnd: "2026-03-31",
      });

      const result = await handler.execute(null, query);

      for (const occurrence of result) {
        const occurrenceDate = new Date(occurrence.dataInicio);

        expect(occurrenceDate.getTime()).toBeGreaterThanOrEqual(new Date("2026-03-01").getTime());
        expect(occurrenceDate.getTime()).toBeLessThanOrEqual(new Date("2026-03-31").getTime());
      }

      // Should have 7 occurrences (March 25-31), not 10
      expect(result).toHaveLength(7);
    });
  });

  // ==========================================
  // Edge cases
  // ==========================================

  describe("edge cases", () => {
    it("should handle invalid RRULE gracefully (return original agendamento)", async () => {
      const repository = createMockRepository();
      const handler = createHandler(repository);

      const agendamento = createMockAgendamento({
        dataInicio: "2026-03-15",
        dataFim: "2026-03-15",
        repeticao: "INVALID_RRULE_STRING",
      });

      vi.mocked(repository.findByDateRange).mockResolvedValue([agendamento]);

      const result = await handler.execute(null, createQuery());

      expect(result).toHaveLength(1);
      expect(result[0]).toBe(agendamento);
    });

    it("should handle event with no dataFim (duration = 0)", async () => {
      const repository = createMockRepository();
      const handler = createHandler(repository);

      const agendamento = createMockAgendamento({
        dataInicio: "2026-03-02",
        dataFim: null,
        repeticao: "FREQ=DAILY;COUNT=3",
      });

      vi.mocked(repository.findByDateRange).mockResolvedValue([agendamento]);

      const result = await handler.execute(null, createQuery());

      expect(result).toHaveLength(3);

      for (const occurrence of result) {
        expect(occurrence.dataFim).toBeNull();
      }
    });

    it("should handle empty results from repository", async () => {
      const repository = createMockRepository();
      const handler = createHandler(repository);

      vi.mocked(repository.findByDateRange).mockResolvedValue([]);

      const result = await handler.execute(null, createQuery());

      expect(result).toHaveLength(0);
      expect(result).toEqual([]);
    });
  });

  // ==========================================
  // Repository interaction
  // ==========================================

  describe("repository interaction", () => {
    it("should call repository.findByDateRange with the query", async () => {
      const repository = createMockRepository();
      const handler = createHandler(repository);

      vi.mocked(repository.findByDateRange).mockResolvedValue([]);

      const query = createQuery({
        dateStart: "2026-04-01",
        dateEnd: "2026-04-30",
        turma: "turma-id",
      });

      await handler.execute(null, query);

      expect(repository.findByDateRange).toHaveBeenCalledOnce();
      expect(repository.findByDateRange).toHaveBeenCalledWith(query);
    });
  });
});
