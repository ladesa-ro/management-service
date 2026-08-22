import { describe, expect, it, vi } from "vitest";
import { createTestAccessContext, createTestId } from "@/test/helpers";
import type { CalendarioAgendamentoFindOneQueryResult } from "../../domain/queries/calendario-agendamento-find-one.query.result";
import { CalendarioAgendamentoVisibilidadeService } from "./calendario-agendamento-visibilidade.service";

function createMockResolver(papel: "EDITOR" | "LEITOR" | "OCUPACAO" | null) {
  return {
    resolverPapelEfetivoParaColecao: vi.fn().mockResolvedValue(papel),
  };
}

function createResultado(
  overrides: Partial<CalendarioAgendamentoFindOneQueryResult> = {},
): CalendarioAgendamentoFindOneQueryResult {
  return {
    id: createTestId(),
    identificadorExterno: createTestId(),
    tipo: "EVENTO",
    nome: "Reunião de departamento",
    dataInicio: "2026-03-15",
    dataFim: null,
    diaInteiro: false,
    horarioInicio: "10:00:00",
    horarioFim: "11:00:00",
    cor: "#2f9e41",
    repeticao: null,
    status: "ATIVO",
    version: 1,
    campus: null,
    colecao: null,
    autorId: createTestId(),
    motivo: "Alinhamento mensal",
    identificadorExternoSerieOrigem: null,
    dataOcorrenciaReferenciada: null,
    detalhesOcultos: false,
    turmas: [{ id: createTestId() } as never],
    perfis: [{ id: createTestId() } as never],
    calendariosLetivos: [],
    ofertasFormacao: [],
    modalidades: [],
    ambientes: [{ id: createTestId() } as never],
    diarios: [],
    ...overrides,
  } as CalendarioAgendamentoFindOneQueryResult;
}

describe("CalendarioAgendamentoVisibilidadeService", () => {
  it("should return SEM_RESTRICAO without consulting the resolver when colecaoId is null", async () => {
    const resolver = createMockResolver(null);
    const service = new CalendarioAgendamentoVisibilidadeService(resolver as any);

    const result = await service.resolver(createTestAccessContext(), null);

    expect(result).toBe("SEM_RESTRICAO");
    expect(resolver.resolverPapelEfetivoParaColecao).not.toHaveBeenCalled();
  });

  it("should delegate to the resolver and pass through EDITOR", async () => {
    const resolver = createMockResolver("EDITOR");
    const service = new CalendarioAgendamentoVisibilidadeService(resolver as any);

    const colecaoId = createTestId();
    const result = await service.resolver(createTestAccessContext(), colecaoId);

    expect(result).toBe("EDITOR");
    expect(resolver.resolverPapelEfetivoParaColecao).toHaveBeenCalledWith(
      expect.anything(),
      colecaoId,
    );
  });

  it("should pass through LEITOR and OCUPACAO", async () => {
    const accessContext = createTestAccessContext();
    const colecaoId = createTestId();

    const leitorService = new CalendarioAgendamentoVisibilidadeService(
      createMockResolver("LEITOR") as any,
    );
    expect(await leitorService.resolver(accessContext, colecaoId)).toBe("LEITOR");

    const ocupacaoService = new CalendarioAgendamentoVisibilidadeService(
      createMockResolver("OCUPACAO") as any,
    );
    expect(await ocupacaoService.resolver(accessContext, colecaoId)).toBe("OCUPACAO");
  });

  it("should map a null resolution to SEM_ACESSO", async () => {
    const resolver = createMockResolver(null);
    const service = new CalendarioAgendamentoVisibilidadeService(resolver as any);

    const result = await service.resolver(createTestAccessContext(), createTestId());

    expect(result).toBe("SEM_ACESSO");
  });

  describe("podeEditar", () => {
    it("should allow SEM_RESTRICAO and EDITOR only", () => {
      const service = new CalendarioAgendamentoVisibilidadeService({} as any);

      expect(service.podeEditar("SEM_RESTRICAO")).toBe(true);
      expect(service.podeEditar("EDITOR")).toBe(true);
      expect(service.podeEditar("LEITOR")).toBe(false);
      expect(service.podeEditar("OCUPACAO")).toBe(false);
      expect(service.podeEditar("SEM_ACESSO")).toBe(false);
    });
  });

  describe("podeVerDetalhes", () => {
    it("should allow SEM_RESTRICAO, EDITOR and LEITOR only", () => {
      const service = new CalendarioAgendamentoVisibilidadeService({} as any);

      expect(service.podeVerDetalhes("SEM_RESTRICAO")).toBe(true);
      expect(service.podeVerDetalhes("EDITOR")).toBe(true);
      expect(service.podeVerDetalhes("LEITOR")).toBe(true);
      expect(service.podeVerDetalhes("OCUPACAO")).toBe(false);
      expect(service.podeVerDetalhes("SEM_ACESSO")).toBe(false);
    });
  });

  describe("temAlgumAcesso", () => {
    it("should be false only for SEM_ACESSO", () => {
      const service = new CalendarioAgendamentoVisibilidadeService({} as any);

      expect(service.temAlgumAcesso("SEM_RESTRICAO")).toBe(true);
      expect(service.temAlgumAcesso("EDITOR")).toBe(true);
      expect(service.temAlgumAcesso("LEITOR")).toBe(true);
      expect(service.temAlgumAcesso("OCUPACAO")).toBe(true);
      expect(service.temAlgumAcesso("SEM_ACESSO")).toBe(false);
    });
  });

  describe("aplicarVisibilidadeUm", () => {
    it("should pass through unchanged when there is no colecao", async () => {
      const service = new CalendarioAgendamentoVisibilidadeService(createMockResolver(null) as any);
      const resultado = createResultado({ colecao: null });

      const aplicado = await service.aplicarVisibilidadeUm(createTestAccessContext(), resultado);

      expect(aplicado).toBe(resultado);
      expect(aplicado?.detalhesOcultos).toBe(false);
    });

    it("should pass through unchanged for LEITOR/EDITOR", async () => {
      const service = new CalendarioAgendamentoVisibilidadeService(
        createMockResolver("LEITOR") as any,
      );
      const resultado = createResultado({ colecao: { id: createTestId() } });

      const aplicado = await service.aplicarVisibilidadeUm(createTestAccessContext(), resultado);

      expect(aplicado?.nome).toBe(resultado.nome);
      expect(aplicado?.detalhesOcultos).toBe(false);
    });

    it("should redact sensitive fields for OCUPACAO while keeping schedule fields", async () => {
      const service = new CalendarioAgendamentoVisibilidadeService(
        createMockResolver("OCUPACAO") as any,
      );
      const resultado = createResultado({ colecao: { id: createTestId() } });

      const aplicado = await service.aplicarVisibilidadeUm(createTestAccessContext(), resultado);

      expect(aplicado).not.toBeNull();
      expect(aplicado?.nome).toBeNull();
      expect(aplicado?.motivo).toBeNull();
      expect(aplicado?.autorId).toBeNull();
      expect(aplicado?.turmas).toEqual([]);
      expect(aplicado?.perfis).toEqual([]);
      expect(aplicado?.calendariosLetivos).toEqual([]);
      expect(aplicado?.ofertasFormacao).toEqual([]);
      expect(aplicado?.modalidades).toEqual([]);
      expect(aplicado?.diarios).toEqual([]);
      expect(aplicado?.detalhesOcultos).toBe(true);
      // horário e ambiente sobrevivem — é o que sustenta "sei que está ocupado"
      expect(aplicado?.dataInicio).toBe(resultado.dataInicio);
      expect(aplicado?.horarioInicio).toBe(resultado.horarioInicio);
      expect(aplicado?.horarioFim).toBe(resultado.horarioFim);
      expect(aplicado?.status).toBe(resultado.status);
      expect(aplicado?.ambientes).toEqual(resultado.ambientes);
    });

    it("should return null for SEM_ACESSO", async () => {
      const service = new CalendarioAgendamentoVisibilidadeService(createMockResolver(null) as any);
      const resultado = createResultado({ colecao: { id: createTestId() } });

      const aplicado = await service.aplicarVisibilidadeUm(createTestAccessContext(), resultado);

      expect(aplicado).toBeNull();
    });
  });

  describe("aplicarVisibilidadeMuitos", () => {
    it("should resolve the resolver once per distinct colecao, not once per item", async () => {
      const resolver = createMockResolver("LEITOR");
      const service = new CalendarioAgendamentoVisibilidadeService(resolver as any);
      const colecaoId = createTestId();

      const resultados = [
        createResultado({ colecao: { id: colecaoId } }),
        createResultado({ colecao: { id: colecaoId } }),
        createResultado({ colecao: { id: colecaoId } }),
      ];

      await service.aplicarVisibilidadeMuitos(createTestAccessContext(), resultados);

      expect(resolver.resolverPapelEfetivoParaColecao).toHaveBeenCalledTimes(1);
    });

    it("should filter out items without access and keep/redact the rest", async () => {
      const colecaoComAcesso = createTestId();
      const colecaoSemAcesso = createTestId();

      const resolver = {
        resolverPapelEfetivoParaColecao: vi.fn(async (_ctx, colecaoId: string) => {
          if (colecaoId === colecaoComAcesso) return "OCUPACAO";
          return null;
        }),
      };
      const service = new CalendarioAgendamentoVisibilidadeService(resolver as any);

      const semColecao = createResultado({ colecao: null, nome: "Aberto pra todo mundo" });
      const comAcesso = createResultado({
        colecao: { id: colecaoComAcesso },
        nome: "Ocupação visível",
      });
      const semAcesso = createResultado({
        colecao: { id: colecaoSemAcesso },
        nome: "Não deveria aparecer",
      });

      const aplicados = await service.aplicarVisibilidadeMuitos(createTestAccessContext(), [
        semColecao,
        comAcesso,
        semAcesso,
      ]);

      expect(aplicados).toHaveLength(2);
      expect(aplicados.find((r) => r.nome === "Não deveria aparecer")).toBeUndefined();
      expect(aplicados.find((r) => r.nome === "Aberto pra todo mundo")).toBeDefined();
      expect(aplicados.find((r) => r.detalhesOcultos === true)).toBeDefined();
    });
  });
});
