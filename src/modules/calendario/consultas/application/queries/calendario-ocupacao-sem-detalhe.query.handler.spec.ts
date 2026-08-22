import { describe, expect, it, vi } from "vitest";
import type { CalendarioAgendamentoFindOneQueryResult } from "@/modules/calendario/agendamento/domain/queries/calendario-agendamento-find-one.query.result";
import { createTestId } from "@/test/helpers";
import type { CalendarioOcupacaoSemDetalheQuery } from "../../domain/queries/calendario-ocupacao-sem-detalhe.query";
import type { IConsultaOcorrenciasPorDataQueryHandler } from "../../domain/queries/consulta-ocorrencias-por-data.query.handler.interface";
import { CalendarioOcupacaoSemDetalheQueryHandlerImpl } from "./calendario-ocupacao-sem-detalhe.query.handler";

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

function createMockConsultaOcorrenciasHandler() {
  return {
    execute: vi.fn(),
  } as unknown as IConsultaOcorrenciasPorDataQueryHandler;
}

function createHandler(consultaOcorrenciasHandler: IConsultaOcorrenciasPorDataQueryHandler) {
  return new CalendarioOcupacaoSemDetalheQueryHandlerImpl(consultaOcorrenciasHandler);
}

function createQuery(
  overrides: Partial<CalendarioOcupacaoSemDetalheQuery> = {},
): CalendarioOcupacaoSemDetalheQuery {
  return {
    campus: createTestId(),
    dateStart: "2026-03-01",
    dateEnd: "2026-03-31",
    ...overrides,
  } as CalendarioOcupacaoSemDetalheQuery;
}

describe("CalendarioOcupacaoSemDetalheQueryHandlerImpl", () => {
  it("should map an occurrence down to the reduced shape, dropping sensitive fields", async () => {
    const consultaOcorrenciasHandler = createMockConsultaOcorrenciasHandler();
    const handler = createHandler(consultaOcorrenciasHandler);

    const ambienteId = createTestId();
    const perfilId = createTestId();

    const ocorrencia = createMockAgendamento({
      dataInicio: "2026-03-15",
      horarioInicio: "14:00:00",
      horarioFim: "15:00:00",
      nome: "Reunião Confidencial",
      motivo: "Motivo sensível",
      ambientes: [{ id: ambienteId } as never],
      perfis: [{ id: perfilId } as never],
    });

    (consultaOcorrenciasHandler.execute as ReturnType<typeof vi.fn>).mockResolvedValue([
      ocorrencia,
    ]);

    const result = await handler.execute(null, createQuery());

    expect(result).toHaveLength(1);
    expect(result[0]).toEqual({
      data: "2026-03-15",
      horarioInicio: "14:00:00",
      horarioFim: "15:00:00",
      ambienteIds: [ambienteId],
      professorIds: [perfilId],
    });

    expect(result[0]).not.toHaveProperty("nome");
    expect(result[0]).not.toHaveProperty("motivo");
    expect(result[0]).not.toHaveProperty("tipo");
    expect(result[0]).not.toHaveProperty("status");
    expect(result[0]).not.toHaveProperty("turmas");
  });

  it("should preserve multiple ambientes and professores as arrays", async () => {
    const consultaOcorrenciasHandler = createMockConsultaOcorrenciasHandler();
    const handler = createHandler(consultaOcorrenciasHandler);

    const ambienteId1 = createTestId();
    const ambienteId2 = createTestId();
    const perfilId1 = createTestId();
    const perfilId2 = createTestId();

    const ocorrencia = createMockAgendamento({
      ambientes: [{ id: ambienteId1 } as never, { id: ambienteId2 } as never],
      perfis: [{ id: perfilId1 } as never, { id: perfilId2 } as never],
    });

    (consultaOcorrenciasHandler.execute as ReturnType<typeof vi.fn>).mockResolvedValue([
      ocorrencia,
    ]);

    const result = await handler.execute(null, createQuery());

    expect(result[0].ambienteIds).toEqual([ambienteId1, ambienteId2]);
    expect(result[0].professorIds).toEqual([perfilId1, perfilId2]);
  });

  it("should map multiple occurrences, e.g. from an expanded recurring event", async () => {
    const consultaOcorrenciasHandler = createMockConsultaOcorrenciasHandler();
    const handler = createHandler(consultaOcorrenciasHandler);

    const ambienteId = createTestId();

    const occurrences = ["2026-03-02", "2026-03-03", "2026-03-04"].map((data) =>
      createMockAgendamento({
        dataInicio: `${data}T00:00:00.000Z`,
        repeticao: "FREQ=DAILY;COUNT=3",
        ambientes: [{ id: ambienteId } as never],
      }),
    );

    (consultaOcorrenciasHandler.execute as ReturnType<typeof vi.fn>).mockResolvedValue(occurrences);

    const result = await handler.execute(null, createQuery());

    expect(result).toHaveLength(3);
    expect(result.map((r) => r.data)).toEqual(["2026-03-02", "2026-03-03", "2026-03-04"]);
    for (const item of result) {
      expect(item.ambienteIds).toEqual([ambienteId]);
    }
  });

  it("should normalize dataInicio (which may carry a time component after RRULE expansion) to a plain date string", async () => {
    const consultaOcorrenciasHandler = createMockConsultaOcorrenciasHandler();
    const handler = createHandler(consultaOcorrenciasHandler);

    const ocorrencia = createMockAgendamento({ dataInicio: "2026-03-04T00:00:00.000Z" });

    (consultaOcorrenciasHandler.execute as ReturnType<typeof vi.fn>).mockResolvedValue([
      ocorrencia,
    ]);

    const result = await handler.execute(null, createQuery());

    expect(result[0].data).toBe("2026-03-04");
  });

  it("should return an empty array when there are no occurrences", async () => {
    const consultaOcorrenciasHandler = createMockConsultaOcorrenciasHandler();
    const handler = createHandler(consultaOcorrenciasHandler);

    (consultaOcorrenciasHandler.execute as ReturnType<typeof vi.fn>).mockResolvedValue([]);

    const result = await handler.execute(null, createQuery());

    expect(result).toEqual([]);
  });

  it("should call the occurrences handler with campus/dateStart/dateEnd, without turma/professor/tipo filters", async () => {
    const consultaOcorrenciasHandler = createMockConsultaOcorrenciasHandler();
    const handler = createHandler(consultaOcorrenciasHandler);

    (consultaOcorrenciasHandler.execute as ReturnType<typeof vi.fn>).mockResolvedValue([]);

    const campus = createTestId();
    const query = createQuery({ campus, dateStart: "2026-04-01", dateEnd: "2026-04-30" });

    await handler.execute(null, query);

    expect(consultaOcorrenciasHandler.execute).toHaveBeenCalledWith(null, {
      dateStart: "2026-04-01",
      dateEnd: "2026-04-30",
      campus,
    });
  });
});
