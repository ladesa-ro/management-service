import { describe, expect, it, vi } from "vitest";
import { createTestId } from "@/test/helpers";
import { CalendarioIndisponibilidadeProfessorTipo } from "../../domain/calendario-indisponibilidade-professor.types";
import { CalendarioIndisponibilidadeProfessorPorPeriodoQueryHandlerImpl } from "./calendario-indisponibilidade-professor-por-periodo.query.handler";

function createMockRepository() {
  return {
    loadById: vi.fn(),
    save: vi.fn(),
    softDeleteById: vi.fn(),
    getFindOneQueryResult: vi.fn(),
    getFindAllQueryResult: vi.fn(),
    findAllAtivasByPerfilId: vi.fn(),
  };
}

function createResultItem(overrides: Record<string, unknown> = {}) {
  return {
    id: createTestId(),
    perfil: { id: createTestId() },
    tipo: CalendarioIndisponibilidadeProfessorTipo.BLOQUEIO,
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

describe("CalendarioIndisponibilidadeProfessorPorPeriodoQueryHandlerImpl", () => {
  it("should call repository.findAllAtivasByPerfilId with the perfilId", async () => {
    const repository = createMockRepository();
    repository.findAllAtivasByPerfilId.mockResolvedValue([]);

    const handler = new CalendarioIndisponibilidadeProfessorPorPeriodoQueryHandlerImpl(
      repository as any,
    );

    const perfilId = createTestId();

    await handler.execute(null, { perfilId, dateStart: "2026-03-01", dateEnd: "2026-03-31" });

    expect(repository.findAllAtivasByPerfilId).toHaveBeenCalledWith(null, perfilId);
  });

  it("should always include weekly rules, regardless of the requested date range", async () => {
    const regraSemanal = createResultItem({ diaSemana: 1, data: null });

    const repository = createMockRepository();
    repository.findAllAtivasByPerfilId.mockResolvedValue([regraSemanal]);

    const handler = new CalendarioIndisponibilidadeProfessorPorPeriodoQueryHandlerImpl(
      repository as any,
    );

    const result = await handler.execute(null, {
      perfilId: createTestId(),
      dateStart: "2026-05-01",
      dateEnd: "2026-05-31",
    });

    expect(result).toEqual([regraSemanal]);
  });

  it("should include a one-off exception whose data falls within the range", async () => {
    const excecaoDentro = createResultItem({ diaSemana: null, data: "2026-03-15" });

    const repository = createMockRepository();
    repository.findAllAtivasByPerfilId.mockResolvedValue([excecaoDentro]);

    const handler = new CalendarioIndisponibilidadeProfessorPorPeriodoQueryHandlerImpl(
      repository as any,
    );

    const result = await handler.execute(null, {
      perfilId: createTestId(),
      dateStart: "2026-03-01",
      dateEnd: "2026-03-31",
    });

    expect(result).toEqual([excecaoDentro]);
  });

  it("should exclude a one-off exception whose data falls outside the range", async () => {
    const excecaoFora = createResultItem({ diaSemana: null, data: "2026-04-15" });

    const repository = createMockRepository();
    repository.findAllAtivasByPerfilId.mockResolvedValue([excecaoFora]);

    const handler = new CalendarioIndisponibilidadeProfessorPorPeriodoQueryHandlerImpl(
      repository as any,
    );

    const result = await handler.execute(null, {
      perfilId: createTestId(),
      dateStart: "2026-03-01",
      dateEnd: "2026-03-31",
    });

    expect(result).toEqual([]);
  });

  it("should include exceptions at the exact boundaries of the range", async () => {
    const noInicio = createResultItem({ diaSemana: null, data: "2026-03-01" });
    const noFim = createResultItem({ diaSemana: null, data: "2026-03-31" });

    const repository = createMockRepository();
    repository.findAllAtivasByPerfilId.mockResolvedValue([noInicio, noFim]);

    const handler = new CalendarioIndisponibilidadeProfessorPorPeriodoQueryHandlerImpl(
      repository as any,
    );

    const result = await handler.execute(null, {
      perfilId: createTestId(),
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
    repository.findAllAtivasByPerfilId.mockResolvedValue([
      regraSemanal,
      excecaoDentro,
      excecaoFora,
    ]);

    const handler = new CalendarioIndisponibilidadeProfessorPorPeriodoQueryHandlerImpl(
      repository as any,
    );

    const result = await handler.execute(null, {
      perfilId: createTestId(),
      dateStart: "2026-03-01",
      dateEnd: "2026-03-31",
    });

    expect(result).toEqual([regraSemanal, excecaoDentro]);
  });

  it("should return an empty array when the repository finds nothing", async () => {
    const repository = createMockRepository();
    repository.findAllAtivasByPerfilId.mockResolvedValue([]);

    const handler = new CalendarioIndisponibilidadeProfessorPorPeriodoQueryHandlerImpl(
      repository as any,
    );

    const result = await handler.execute(null, {
      perfilId: createTestId(),
      dateStart: "2026-04-01",
      dateEnd: "2026-04-30",
    });

    expect(result).toEqual([]);
  });
});
