import { describe, expect, it, vi } from "vitest";
import type { CalendarioAgendamentoVisibilidadeService } from "@/modules/calendario/agendamento/application/authorization/calendario-agendamento-visibilidade.service";
import type { CalendarioAgendamentoFindOneQueryResult } from "@/modules/calendario/agendamento/domain/queries/calendario-agendamento-find-one.query.result";
import { createTestId } from "@/test/helpers";
import type { CalendarioAgendamentoExportarIcsQuery } from "../../domain/queries/calendario-agendamento-exportar-ics.query";
import type { IConsultaOcorrenciasPorDataQueryHandler } from "../../domain/queries/consulta-ocorrencias-por-data.query.handler.interface";
import { CalendarioAgendamentoExportarIcsQueryHandlerImpl } from "./calendario-agendamento-exportar-ics.query.handler";

function createMockAgendamento(
  overrides: Partial<CalendarioAgendamentoFindOneQueryResult> = {},
): CalendarioAgendamentoFindOneQueryResult {
  return {
    id: createTestId(),
    identificadorExterno: createTestId(),
    tipo: "EVENTO",
    nome: "Reunião de Planejamento",
    dataInicio: "2026-03-15T00:00:00.000Z",
    dataFim: "2026-03-15T00:00:00.000Z",
    diaInteiro: false,
    horarioInicio: "14:00:00",
    horarioFim: "15:30:00",
    cor: "#2f9e41",
    repeticao: null,
    status: "ATIVO",
    version: 1,
    campus: null,
    colecao: null,
    autorId: null,
    motivo: "Alinhamento do semestre",
    identificadorExternoSerieOrigem: null,
    dataOcorrenciaReferenciada: null,
    detalhesOcultos: false,
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

function createMockVisibilidadeService(passthrough = true) {
  return {
    aplicarVisibilidadeMuitos: passthrough
      ? vi.fn((_accessContext, resultados) => Promise.resolve(resultados))
      : vi.fn(),
  } as unknown as CalendarioAgendamentoVisibilidadeService;
}

function createHandler(
  consultaOcorrenciasHandler: IConsultaOcorrenciasPorDataQueryHandler,
  visibilidadeService: CalendarioAgendamentoVisibilidadeService,
) {
  return new CalendarioAgendamentoExportarIcsQueryHandlerImpl(
    consultaOcorrenciasHandler,
    visibilidadeService,
  );
}

function createQuery(
  overrides: Partial<CalendarioAgendamentoExportarIcsQuery> = {},
): CalendarioAgendamentoExportarIcsQuery {
  return {
    dateStart: "2026-03-01",
    dateEnd: "2026-03-31",
    ...overrides,
  } as CalendarioAgendamentoExportarIcsQuery;
}

describe("CalendarioAgendamentoExportarIcsQueryHandlerImpl", () => {
  it("should generate a valid VCALENDAR wrapper with one VEVENT per occurrence", async () => {
    const consultaOcorrenciasHandler = createMockConsultaOcorrenciasHandler();
    const visibilidadeService = createMockVisibilidadeService();
    const handler = createHandler(consultaOcorrenciasHandler, visibilidadeService);

    const ambienteId = createTestId();
    const ocorrencia = createMockAgendamento({
      ambientes: [{ id: ambienteId, nome: "Sala 101" } as never],
    });

    (consultaOcorrenciasHandler.execute as ReturnType<typeof vi.fn>).mockResolvedValue([
      ocorrencia,
    ]);

    const ics = await handler.execute(null, createQuery());

    expect(ics.startsWith("BEGIN:VCALENDAR\r\n")).toBe(true);
    expect(ics).toContain("VERSION:2.0\r\n");
    expect(ics).toContain("PRODID:");
    expect(ics).toContain("BEGIN:VEVENT\r\n");
    expect(ics).toMatch(/DTSTAMP:\d{8}T\d{6}Z\r\n/);
    expect(ics).toContain(`UID:${ocorrencia.id}-20260315T140000@ladesa\r\n`);
    expect(ics).toContain("DTSTART:20260315T140000\r\n");
    expect(ics).toContain("DTEND:20260315T153000\r\n");
    expect(ics).toContain("SUMMARY:Reunião de Planejamento\r\n");
    expect(ics).toContain("LOCATION:Sala 101\r\n");
    expect(ics).toContain("DESCRIPTION:Alinhamento do semestre\r\n");
    expect(ics).toContain("END:VEVENT\r\n");
    expect(ics.trimEnd().endsWith("END:VCALENDAR")).toBe(true);

    expect(consultaOcorrenciasHandler.execute).toHaveBeenCalledWith(null, {
      dateStart: "2026-03-01",
      dateEnd: "2026-03-31",
      campus: undefined,
      turma: undefined,
      professor: undefined,
      tipo: undefined,
    });
    expect(visibilidadeService.aplicarVisibilidadeMuitos).toHaveBeenCalledWith(null, [ocorrencia]);
  });

  it("should assign a distinct UID per expanded occurrence sharing the same agendamento id", async () => {
    const consultaOcorrenciasHandler = createMockConsultaOcorrenciasHandler();
    const visibilidadeService = createMockVisibilidadeService();
    const handler = createHandler(consultaOcorrenciasHandler, visibilidadeService);

    const sharedId = createTestId();
    const ocorrencias = ["2026-03-02", "2026-03-03"].map((data) =>
      createMockAgendamento({ id: sharedId, dataInicio: `${data}T00:00:00.000Z` }),
    );

    (consultaOcorrenciasHandler.execute as ReturnType<typeof vi.fn>).mockResolvedValue(
      ocorrencias,
    );

    const ics = await handler.execute(null, createQuery());

    expect(ics).toContain(`UID:${sharedId}-20260302T140000@ladesa\r\n`);
    expect(ics).toContain(`UID:${sharedId}-20260303T140000@ladesa\r\n`);
  });

  it("should export a standalone RDATE occurrence (avulsa) as its own VEVENT", async () => {
    // A consulta de ocorrências já resolve datas avulsas (RDATE) como agendamentos
    // isolados (repeticao null, identificadorExternoSerieOrigem apontando pra série,
    // dataOcorrenciaReferenciada nula) — para o export, uma avulsa é indistinguível
    // de um agendamento pontual comum: cada ocorrência já vira um VEVENT próprio.
    const consultaOcorrenciasHandler = createMockConsultaOcorrenciasHandler();
    const visibilidadeService = createMockVisibilidadeService();
    const handler = createHandler(consultaOcorrenciasHandler, visibilidadeService);

    const serieIdentificadorExterno = createTestId();
    const avulsa = createMockAgendamento({
      nome: "Aula extra de sábado",
      dataInicio: "2026-03-14T00:00:00.000Z",
      dataFim: "2026-03-14T00:00:00.000Z",
      horarioInicio: "09:00:00",
      horarioFim: "10:00:00",
      repeticao: null,
      identificadorExternoSerieOrigem: serieIdentificadorExterno,
      dataOcorrenciaReferenciada: null,
    });

    (consultaOcorrenciasHandler.execute as ReturnType<typeof vi.fn>).mockResolvedValue([avulsa]);

    const ics = await handler.execute(null, createQuery());

    expect(ics).toContain("BEGIN:VEVENT\r\n");
    expect(ics).toContain("DTSTART:20260314T090000\r\n");
    expect(ics).toContain("DTEND:20260314T100000\r\n");
    expect(ics).toContain("SUMMARY:Aula extra de sábado\r\n");
  });

  it("should return a valid empty calendar when there are no occurrences", async () => {
    const consultaOcorrenciasHandler = createMockConsultaOcorrenciasHandler();
    const visibilidadeService = createMockVisibilidadeService();
    const handler = createHandler(consultaOcorrenciasHandler, visibilidadeService);

    (consultaOcorrenciasHandler.execute as ReturnType<typeof vi.fn>).mockResolvedValue([]);

    const ics = await handler.execute(null, createQuery());

    expect(ics).toBe("BEGIN:VCALENDAR\r\nVERSION:2.0\r\nPRODID:-//Ladesa RO//Management Service//PT\r\nCALSCALE:GREGORIAN\r\nEND:VCALENDAR\r\n");
    expect(ics).not.toContain("VEVENT");
  });

  it("should not leak nome/motivo when the occurrence comes with detalhesOcultos", async () => {
    const consultaOcorrenciasHandler = createMockConsultaOcorrenciasHandler();
    const visibilidadeService = createMockVisibilidadeService();
    const handler = createHandler(consultaOcorrenciasHandler, visibilidadeService);

    const ambienteId = createTestId();
    const ocorrenciaOculta = createMockAgendamento({
      nome: "Reunião Confidencial",
      motivo: "Motivo sensível",
      detalhesOcultos: true,
      ambientes: [{ id: ambienteId, nome: "Sala 101" } as never],
    });

    (consultaOcorrenciasHandler.execute as ReturnType<typeof vi.fn>).mockResolvedValue([
      ocorrenciaOculta,
    ]);

    const ics = await handler.execute(null, createQuery());

    expect(ics).not.toContain("Reunião Confidencial");
    expect(ics).not.toContain("Motivo sensível");
    expect(ics).not.toContain("DESCRIPTION:");
    expect(ics).toContain("SUMMARY:Ocupado\r\n");
    expect(ics).toContain("LOCATION:Sala 101\r\n");
  });

  it("should escape reserved characters in text fields", async () => {
    const consultaOcorrenciasHandler = createMockConsultaOcorrenciasHandler();
    const visibilidadeService = createMockVisibilidadeService();
    const handler = createHandler(consultaOcorrenciasHandler, visibilidadeService);

    const ocorrencia = createMockAgendamento({
      nome: "Aula: Cálculo, Álgebra; Revisão",
    });

    (consultaOcorrenciasHandler.execute as ReturnType<typeof vi.fn>).mockResolvedValue([
      ocorrencia,
    ]);

    const ics = await handler.execute(null, createQuery());

    expect(ics).toContain("SUMMARY:Aula: Cálculo\\, Álgebra\\; Revisão\r\n");
  });
});
