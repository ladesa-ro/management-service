import { describe, expect, it, vi } from "vitest";
import type { CalendarioAgendamentoVisibilidadeService } from "@/modules/calendario/agendamento/application/authorization/calendario-agendamento-visibilidade.service";
import type { CalendarioAgendamentoFindOneQueryResult } from "@/modules/calendario/agendamento/domain/queries/calendario-agendamento-find-one.query.result";
import type { IConsultaOcorrenciasPorDataQueryHandler } from "@/modules/calendario/consultas/domain/queries/consulta-ocorrencias-por-data.query.handler.interface";
import { CalendarioAgendamentoExportarIcsQueryHandlerImpl } from "@/modules/calendario/consultas/application/queries/calendario-agendamento-exportar-ics.query.handler";
import { createTestId } from "@/test/helpers";
import { parseIcs } from "./calendario-agendamento-importar-ics.util";

describe("parseIcs", () => {
  describe("unfold de linha dobrada em 75 octetos", () => {
    it("should join a folded SUMMARY line back into one logical line", () => {
      const conteudo = [
        "BEGIN:VCALENDAR",
        "BEGIN:VEVENT",
        "UID:evento-1@teste",
        "DTSTART:20260315T140000",
        "SUMMARY:Uma reuniao com um nome bem longo que precisa ser dobrado em",
        "  duas linhas fisicas no arquivo .ics",
        "END:VEVENT",
        "END:VCALENDAR",
      ].join("\r\n");

      const { eventos, rejeitados } = parseIcs(conteudo);

      expect(rejeitados).toHaveLength(0);
      expect(eventos).toHaveLength(1);
      expect(eventos[0]!.summary).toBe(
        "Uma reuniao com um nome bem longo que precisa ser dobrado em duas linhas fisicas no arquivo .ics",
      );
    });

    it("should unfold a line continued with a tab", () => {
      const conteudo = [
        "BEGIN:VCALENDAR",
        "BEGIN:VEVENT",
        "DTSTART:20260315T140000",
        "SUMMARY:Parte um",
        "\tParte dois",
        "END:VEVENT",
        "END:VCALENDAR",
      ].join("\r\n");

      const { eventos } = parseIcs(conteudo);

      expect(eventos[0]!.summary).toBe("Parte umParte dois");
    });
  });

  describe("unescape de texto (\\, \\; \\n)", () => {
    it("should unescape comma, semicolon, and newline", () => {
      const conteudo = [
        "BEGIN:VCALENDAR",
        "BEGIN:VEVENT",
        "DTSTART:20260315T140000",
        "SUMMARY:Aula: Calculo\\, Algebra\\; Revisao",
        "DESCRIPTION:Linha um\\nLinha dois",
        "END:VEVENT",
        "END:VCALENDAR",
      ].join("\r\n");

      const { eventos } = parseIcs(conteudo);

      expect(eventos[0]!.summary).toBe("Aula: Calculo, Algebra; Revisao");
      expect(eventos[0]!.description).toBe("Linha um\nLinha dois");
    });

    it("should unescape a literal backslash without over-consuming the next char", () => {
      const conteudo = [
        "BEGIN:VCALENDAR",
        "BEGIN:VEVENT",
        "DTSTART:20260315T140000",
        "SUMMARY:C:\\\\Users\\\\teste",
        "END:VEVENT",
        "END:VCALENDAR",
      ].join("\r\n");

      const { eventos } = parseIcs(conteudo);

      expect(eventos[0]!.summary).toBe("C:\\Users\\teste");
    });
  });

  describe("VEVENT simples", () => {
    it("should parse a simple timed VEVENT into an evento", () => {
      const conteudo = [
        "BEGIN:VCALENDAR",
        "VERSION:2.0",
        "BEGIN:VEVENT",
        "UID:abc-123@example.com",
        "DTSTART:20260315T140000",
        "DTEND:20260315T153000",
        "SUMMARY:Reuniao de Planejamento",
        "LOCATION:Sala 101",
        "DESCRIPTION:Alinhamento do semestre",
        "END:VEVENT",
        "END:VCALENDAR",
      ].join("\r\n");

      const { eventos, rejeitados } = parseIcs(conteudo);

      expect(rejeitados).toHaveLength(0);
      expect(eventos).toHaveLength(1);
      expect(eventos[0]).toMatchObject({
        uid: "abc-123@example.com",
        summary: "Reuniao de Planejamento",
        description: "Alinhamento do semestre",
        dataInicio: "2026-03-15",
        horarioInicio: "14:00:00",
        dataFim: "2026-03-15",
        horarioFim: "15:30:00",
        diaInteiro: false,
        rrule: null,
      });
    });

    it("should default dataFim/horarioFim to DTSTART when DTEND is missing", () => {
      const conteudo = [
        "BEGIN:VCALENDAR",
        "BEGIN:VEVENT",
        "DTSTART:20260315T140000",
        "SUMMARY:Sem DTEND",
        "END:VEVENT",
        "END:VCALENDAR",
      ].join("\r\n");

      const { eventos } = parseIcs(conteudo);

      expect(eventos[0]!.dataFim).toBe("2026-03-15");
      expect(eventos[0]!.horarioFim).toBe("14:00:00");
    });

    it("should parse an all-day VEVENT (DTSTART;VALUE=DATE)", () => {
      const conteudo = [
        "BEGIN:VCALENDAR",
        "BEGIN:VEVENT",
        "DTSTART;VALUE=DATE:20260315",
        "DTEND;VALUE=DATE:20260316",
        "SUMMARY:Feriado",
        "END:VEVENT",
        "END:VCALENDAR",
      ].join("\r\n");

      const { eventos } = parseIcs(conteudo);

      expect(eventos[0]).toMatchObject({
        diaInteiro: true,
        dataInicio: "2026-03-15",
        horarioInicio: "00:00:00",
        dataFim: "2026-03-16",
        horarioFim: "23:59:59",
      });
    });

    it("should parse a VEVENT with a valid RRULE", () => {
      const conteudo = [
        "BEGIN:VCALENDAR",
        "BEGIN:VEVENT",
        "DTSTART:20260303T080000",
        "DTEND:20260303T090000",
        "SUMMARY:Aula recorrente",
        "RRULE:FREQ=WEEKLY;BYDAY=TU;COUNT=10",
        "END:VEVENT",
        "END:VCALENDAR",
      ].join("\r\n");

      const { eventos, rejeitados } = parseIcs(conteudo);

      expect(rejeitados).toHaveLength(0);
      expect(eventos[0]!.rrule).toBe("FREQ=WEEKLY;BYDAY=TU;COUNT=10");
    });

    it("should strip a trailing Z (UTC) marker from DTSTART/DTEND", () => {
      const conteudo = [
        "BEGIN:VCALENDAR",
        "BEGIN:VEVENT",
        "DTSTART:20260315T140000Z",
        "DTEND:20260315T153000Z",
        "SUMMARY:Com Z",
        "END:VEVENT",
        "END:VCALENDAR",
      ].join("\r\n");

      const { eventos } = parseIcs(conteudo);

      expect(eventos[0]!.horarioInicio).toBe("14:00:00");
      expect(eventos[0]!.horarioFim).toBe("15:30:00");
    });

    it("should parse multiple VEVENTs in the same file", () => {
      const conteudo = [
        "BEGIN:VCALENDAR",
        "BEGIN:VEVENT",
        "UID:um@teste",
        "DTSTART:20260315T140000",
        "SUMMARY:Primeiro",
        "END:VEVENT",
        "BEGIN:VEVENT",
        "UID:dois@teste",
        "DTSTART:20260316T140000",
        "SUMMARY:Segundo",
        "END:VEVENT",
        "END:VCALENDAR",
      ].join("\r\n");

      const { eventos } = parseIcs(conteudo);

      expect(eventos).toHaveLength(2);
      expect(eventos[0]!.summary).toBe("Primeiro");
      expect(eventos[0]!.index).toBe(1);
      expect(eventos[1]!.summary).toBe("Segundo");
      expect(eventos[1]!.index).toBe(2);
    });
  });

  describe(".ics malformado", () => {
    it("should throw when BEGIN:VCALENDAR is missing", () => {
      const conteudo = "isso nao e um ics";

      expect(() => parseIcs(conteudo)).toThrow(/BEGIN:VCALENDAR/);
    });

    it("should return an empty result for a valid but eventless calendar", () => {
      const conteudo = ["BEGIN:VCALENDAR", "VERSION:2.0", "END:VCALENDAR"].join("\r\n");

      const { eventos, rejeitados } = parseIcs(conteudo);

      expect(eventos).toHaveLength(0);
      expect(rejeitados).toHaveLength(0);
    });

    it("should reject a VEVENT missing DTSTART, without aborting the rest of the file", () => {
      const conteudo = [
        "BEGIN:VCALENDAR",
        "BEGIN:VEVENT",
        "UID:sem-dtstart@teste",
        "SUMMARY:Sem data",
        "END:VEVENT",
        "BEGIN:VEVENT",
        "UID:com-dtstart@teste",
        "DTSTART:20260315T140000",
        "SUMMARY:Com data",
        "END:VEVENT",
        "END:VCALENDAR",
      ].join("\r\n");

      const { eventos, rejeitados } = parseIcs(conteudo);

      expect(eventos).toHaveLength(1);
      expect(eventos[0]!.summary).toBe("Com data");
      expect(eventos[0]!.index).toBe(2); // segundo VEVENT do arquivo, o primeiro foi rejeitado
      expect(rejeitados).toHaveLength(1);
      expect(rejeitados[0]!.index).toBe(1);
      expect(rejeitados[0]!.uid).toBe("sem-dtstart@teste");
      expect(rejeitados[0]!.motivo).toMatch(/DTSTART ausente/);
    });

    it("should reject a VEVENT with an invalid DTSTART format", () => {
      const conteudo = [
        "BEGIN:VCALENDAR",
        "BEGIN:VEVENT",
        "DTSTART:not-a-date",
        "SUMMARY:Data invalida",
        "END:VEVENT",
        "END:VCALENDAR",
      ].join("\r\n");

      const { eventos, rejeitados } = parseIcs(conteudo);

      expect(eventos).toHaveLength(0);
      expect(rejeitados).toHaveLength(1);
      expect(rejeitados[0]!.motivo).toMatch(/DTSTART/);
    });

    it("should reject a VEVENT with an invalid RRULE", () => {
      const conteudo = [
        "BEGIN:VCALENDAR",
        "BEGIN:VEVENT",
        "DTSTART:20260315T140000",
        "SUMMARY:RRULE invalida",
        "RRULE:ISSO_NAO_E_UMA_RRULE",
        "END:VEVENT",
        "END:VCALENDAR",
      ].join("\r\n");

      const { eventos, rejeitados } = parseIcs(conteudo);

      expect(eventos).toHaveLength(0);
      expect(rejeitados).toHaveLength(1);
      expect(rejeitados[0]!.motivo).toMatch(/RRULE/);
    });

    it("should reject an unclosed VEVENT", () => {
      const conteudo = [
        "BEGIN:VCALENDAR",
        "BEGIN:VEVENT",
        "DTSTART:20260315T140000",
        "SUMMARY:Nunca fecha",
        "END:VCALENDAR",
      ].join("\r\n");

      const { eventos, rejeitados } = parseIcs(conteudo);

      expect(eventos).toHaveLength(0);
      expect(rejeitados).toHaveLength(1);
      expect(rejeitados[0]!.motivo).toMatch(/END:VEVENT/);
    });
  });

  describe("round trip com a exportação", () => {
    function createMockAgendamento(
      overrides: Partial<CalendarioAgendamentoFindOneQueryResult> = {},
    ): CalendarioAgendamentoFindOneQueryResult {
      return {
        id: createTestId(),
        identificadorExterno: createTestId(),
        tipo: "EVENTO",
        nome: "Reuniao de Planejamento",
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

    it("should re-parse the .ics produced by the export handler back into equivalent eventos", async () => {
      const consultaOcorrenciasHandler = {
        execute: vi.fn(),
      } as unknown as IConsultaOcorrenciasPorDataQueryHandler;
      const visibilidadeService = {
        aplicarVisibilidadeMuitos: vi.fn((_ctx, resultados) => Promise.resolve(resultados)),
      } as unknown as CalendarioAgendamentoVisibilidadeService;

      const exportHandler = new CalendarioAgendamentoExportarIcsQueryHandlerImpl(
        consultaOcorrenciasHandler,
        visibilidadeService,
      );

      const ocorrencias = [
        createMockAgendamento({
          nome: "Aula de Calculo",
          motivo: "Revisao para a prova",
          dataInicio: "2026-03-15T00:00:00.000Z",
          dataFim: "2026-03-15T00:00:00.000Z",
          horarioInicio: "08:00:00",
          horarioFim: "09:00:00",
        }),
        createMockAgendamento({
          nome: "Reuniao Extra",
          motivo: null,
          dataInicio: "2026-03-20T00:00:00.000Z",
          dataFim: "2026-03-20T00:00:00.000Z",
          horarioInicio: "10:00:00",
          horarioFim: "11:00:00",
        }),
      ];

      (consultaOcorrenciasHandler.execute as ReturnType<typeof vi.fn>).mockResolvedValue(
        ocorrencias,
      );

      const ics = await exportHandler.execute(null, {
        dateStart: "2026-03-01",
        dateEnd: "2026-03-31",
      } as never);

      const { eventos, rejeitados } = parseIcs(ics);

      expect(rejeitados).toHaveLength(0);
      expect(eventos).toHaveLength(2);

      expect(eventos[0]).toMatchObject({
        summary: "Aula de Calculo",
        description: "Revisao para a prova",
        dataInicio: "2026-03-15",
        horarioInicio: "08:00:00",
        horarioFim: "09:00:00",
      });
      expect(eventos[1]).toMatchObject({
        summary: "Reuniao Extra",
        description: null,
        dataInicio: "2026-03-20",
        horarioInicio: "10:00:00",
        horarioFim: "11:00:00",
      });
    });
  });
});
