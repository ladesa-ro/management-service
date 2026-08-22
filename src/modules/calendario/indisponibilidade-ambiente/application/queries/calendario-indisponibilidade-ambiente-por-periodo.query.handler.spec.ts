import { describe, expect, it, vi } from "vitest";
import { createTestId } from "@/test/helpers";
import { CalendarioIndisponibilidadeAmbienteTipo } from "../../domain/calendario-indisponibilidade-ambiente.types";
import { CalendarioIndisponibilidadeAmbientePorPeriodoQueryHandlerImpl } from "./calendario-indisponibilidade-ambiente-por-periodo.query.handler";

function createMockRepository() {
  return {
    loadById: vi.fn(),
    save: vi.fn(),
    softDeleteById: vi.fn(),
    getFindOneQueryResult: vi.fn(),
    getFindAllQueryResult: vi.fn(),
    findAllAtivasByAmbienteId: vi.fn(),
  };
}

function createResultItem(overrides: Record<string, unknown> = {}) {
  return {
    id: createTestId(),
    ambiente: { id: createTestId() },
    tipo: CalendarioIndisponibilidadeAmbienteTipo.BLOQUEIO,
    diaSemana: null,
    data: null,
    inicio: "08:00:00",
    fim: "12:00:00",
    motivo: null,
    dateCreated: "2026-01-01T00:00:00.000Z",
    dateUpdated: "2026-01-01T00:00:00.000Z",
    dateDeleted: null,
    ...overrides,
  };
}

describe("CalendarioIndisponibilidadeAmbientePorPeriodoQueryHandlerImpl", () => {
  it("should call repository.findAllAtivasByAmbienteId with the ambienteId", async () => {
    const repository = createMockRepository();
    repository.findAllAtivasByAmbienteId.mockResolvedValue([]);

    const handler = new CalendarioIndisponibilidadeAmbientePorPeriodoQueryHandlerImpl(
      repository as any,
    );

    const ambienteId = createTestId();

    await handler.execute(null, { ambienteId, dateStart: "2026-03-01", dateEnd: "2026-03-31" });

    expect(repository.findAllAtivasByAmbienteId).toHaveBeenCalledWith(null, ambienteId);
  });

  it("should always include weekly rules, regardless of the requested date range", async () => {
    const regraSemanal = createResultItem({ diaSemana: 1, data: null });

    const repository = createMockRepository();
    repository.findAllAtivasByAmbienteId.mockResolvedValue([regraSemanal]);

    const handler = new CalendarioIndisponibilidadeAmbientePorPeriodoQueryHandlerImpl(
      repository as any,
    );

    const result = await handler.execute(null, {
      ambienteId: createTestId(),
      dateStart: "2026-05-01",
      dateEnd: "2026-05-31",
    });

    expect(result).toEqual([regraSemanal]);
  });

  it("should include a one-off exception whose data falls within the range", async () => {
    const excecaoDentro = createResultItem({ diaSemana: null, data: "2026-03-15" });

    const repository = createMockRepository();
    repository.findAllAtivasByAmbienteId.mockResolvedValue([excecaoDentro]);

    const handler = new CalendarioIndisponibilidadeAmbientePorPeriodoQueryHandlerImpl(
      repository as any,
    );

    const result = await handler.execute(null, {
      ambienteId: createTestId(),
      dateStart: "2026-03-01",
      dateEnd: "2026-03-31",
    });

    expect(result).toEqual([excecaoDentro]);
  });

  it("should exclude a one-off exception whose data falls outside the range", async () => {
    const excecaoFora = createResultItem({ diaSemana: null, data: "2026-04-15" });

    const repository = createMockRepository();
    repository.findAllAtivasByAmbienteId.mockResolvedValue([excecaoFora]);

    const handler = new CalendarioIndisponibilidadeAmbientePorPeriodoQueryHandlerImpl(
      repository as any,
    );

    const result = await handler.execute(null, {
      ambienteId: createTestId(),
      dateStart: "2026-03-01",
      dateEnd: "2026-03-31",
    });

    expect(result).toEqual([]);
  });

  it("should include exceptions at the exact boundaries of the range", async () => {
    const noInicio = createResultItem({ diaSemana: null, data: "2026-03-01" });
    const noFim = createResultItem({ diaSemana: null, data: "2026-03-31" });

    const repository = createMockRepository();
    repository.findAllAtivasByAmbienteId.mockResolvedValue([noInicio, noFim]);

    const handler = new CalendarioIndisponibilidadeAmbientePorPeriodoQueryHandlerImpl(
      repository as any,
    );

    const result = await handler.execute(null, {
      ambienteId: createTestId(),
      dateStart: "2026-03-01",
      dateEnd: "2026-03-31",
    });

    expect(result).toEqual([noInicio, noFim]);
  });

  it("should return a mix of always-on weekly rules and in-range exceptions, excluding out-of-range ones", async () => {
    const regraSemanal = createResultItem({ diaSemana: 3, data: null });
    const excecaoDentro = createResultItem({ diaSemana: null, data: "2026-03-20" });
    const excecaoFora = createResultItem({ diaSemana: null, data: "2026-06-01" });

    const repository = createMockRepository();
    repository.findAllAtivasByAmbienteId.mockResolvedValue([
      regraSemanal,
      excecaoDentro,
      excecaoFora,
    ]);

    const handler = new CalendarioIndisponibilidadeAmbientePorPeriodoQueryHandlerImpl(
      repository as any,
    );

    const result = await handler.execute(null, {
      ambienteId: createTestId(),
      dateStart: "2026-03-01",
      dateEnd: "2026-03-31",
    });

    expect(result).toEqual([regraSemanal, excecaoDentro]);
  });

  it("should return an empty array when the repository finds nothing", async () => {
    const repository = createMockRepository();
    repository.findAllAtivasByAmbienteId.mockResolvedValue([]);

    const handler = new CalendarioIndisponibilidadeAmbientePorPeriodoQueryHandlerImpl(
      repository as any,
    );

    const result = await handler.execute(null, {
      ambienteId: createTestId(),
      dateStart: "2026-04-01",
      dateEnd: "2026-04-30",
    });

    expect(result).toEqual([]);
  });
});
