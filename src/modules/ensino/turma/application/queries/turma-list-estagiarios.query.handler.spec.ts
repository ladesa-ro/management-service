import { describe, expect, it, vi } from "vitest";
import type { EstagiarioFindOneQueryResult } from "@/modules/estagio/estagiario/domain/queries/estagiario-find-one.query.result";
import type { EstagioFindOneQueryResult } from "@/modules/estagio/estagio/domain/queries/estagio-find-one.query.result";
import { createTestAccessContext, createTestId } from "@/test/helpers";
import type { TurmaFindOneQueryResult } from "../../domain/queries/turma-find-one.query.result";
import { TurmaListEstagiariosQueryHandlerImpl } from "./turma-list-estagiarios.query.handler";

// ============================================================================
// Factories de dados de teste
// ============================================================================

function makeTurmaResult(overrides?: Partial<TurmaFindOneQueryResult>): TurmaFindOneQueryResult {
  return {
    id: createTestId(),
    periodo: "3",
    nome: null,
    curso: { id: createTestId(), nome: "Técnico em Informática", nomeAbreviado: "TI" } as any,
    ambientePadraoAula: null,
    imagemCapa: null,
    dateCreated: new Date().toISOString(),
    dateUpdated: new Date().toISOString(),
    dateDeleted: null,
    ...overrides,
  } as unknown as TurmaFindOneQueryResult;
}

function makeEstagiarioResult(
  overrides?: Partial<EstagiarioFindOneQueryResult>,
): EstagiarioFindOneQueryResult {
  return {
    id: createTestId(),
    perfil: null,
    curso: null,
    periodo: "3",
    telefone: "69999999999",
    emailInstitucional: null,
    dataNascimento: "2000-01-01",
    ativo: true,
    dateCreated: new Date().toISOString(),
    dateUpdated: new Date().toISOString(),
    dateDeleted: null,
    ...overrides,
  } as unknown as EstagiarioFindOneQueryResult;
}

function makeEstagioResult(
  overrides?: Partial<EstagioFindOneQueryResult>,
): EstagioFindOneQueryResult {
  return {
    id: createTestId(),
    campus: null,
    empresa: { id: createTestId() },
    estagiario: null,
    CursoReferencia: null,
    usuarioOrientador: null,
    cargaHoraria: 40,
    dataInicio: null,
    dataFim: null,
    status: "EM_ANDAMENTO" as any,
    nomeSupervisor: null,
    emailSupervisor: null,
    telefoneSupervisor: null,
    aditivo: false,
    tipoAditivo: null,
    horariosEstagio: [],
    ativo: true,
    dateCreated: new Date().toISOString(),
    dateUpdated: new Date().toISOString(),
    ...overrides,
  } as unknown as EstagioFindOneQueryResult;
}

// ============================================================================
// Factory do handler com dependências mockadas
// ============================================================================

interface CreateHandlerOptions {
  turmaResult?: TurmaFindOneQueryResult | null;
  estagiarios?: EstagiarioFindOneQueryResult[];
  estagiosPorEstagiario?: Record<string, EstagioFindOneQueryResult[]>;
}

function createHandler(options: CreateHandlerOptions = {}) {
  const { turmaResult = makeTurmaResult(), estagiarios = [], estagiosPorEstagiario = {} } = options;

  const turmaRepository = {
    getFindOneQueryResult: vi.fn().mockResolvedValue(turmaResult),
  };

  const estagiarioRepository = {
    getFindAllQueryResult: vi.fn().mockResolvedValue({
      data: estagiarios,
      meta: { totalItems: estagiarios.length, currentPage: 1, itemsPerPage: 200 },
    }),
  };

  const estagioRepository = {
    getFindAllQueryResult: vi.fn().mockImplementation(async (_ctx: any, query: any) => {
      // Retorna estágios filtrados pelo estagiário ID
      const estagiarioId = query.filterEstagiarioId?.[0] ?? "";
      return {
        data: estagiosPorEstagiario[estagiarioId] ?? [],
        total: (estagiosPorEstagiario[estagiarioId] ?? []).length,
        page: 1,
        limit: 50,
      };
    }),
  };

  const handler = new TurmaListEstagiariosQueryHandlerImpl(
    turmaRepository as any,
    estagiarioRepository as any,
    estagioRepository as any,
  );

  return {
    handler,
    turmaRepository,
    estagiarioRepository,
    estagioRepository,
  };
}

// ============================================================================
// Testes
// ============================================================================

describe("TurmaListEstagiariosQueryHandlerImpl", () => {
  const accessContext = createTestAccessContext();

  // --------------------------------------------------------------------------
  // Cenário 1: Turma com estagiários que compartilham curso e período
  // --------------------------------------------------------------------------
  describe("Cenário 1: turma encontrada com estagiários", () => {
    it("deve retornar items com estagiários quando existem alunos no mesmo curso e período", async () => {
      const estagiario1 = makeEstagiarioResult();
      const estagiario2 = makeEstagiarioResult();

      const { handler } = createHandler({
        estagiarios: [estagiario1, estagiario2],
      });

      const result = await handler.execute(accessContext, { id: createTestId() });

      expect(result.items).toHaveLength(2);
      expect(result.items[0].estagiario.id).toBe(estagiario1.id);
      expect(result.items[1].estagiario.id).toBe(estagiario2.id);
    });

    it("deve passar os filtros corretos de curso.id e periodo para o repositório de estagiários", async () => {
      const cursoId = createTestId();
      const turma = makeTurmaResult({ curso: { id: cursoId } as any, periodo: "4" });

      const { handler, estagiarioRepository } = createHandler({ turmaResult: turma });

      await handler.execute(accessContext, { id: turma.id });

      expect(estagiarioRepository.getFindAllQueryResult).toHaveBeenCalledWith(
        accessContext,
        expect.objectContaining({
          "filter.curso.id": `$eq:${cursoId}`,
          "filter.periodo": "$eq:4",
        }),
      );
    });
  });

  // --------------------------------------------------------------------------
  // Cenário 2: Estagiário com estágio associado
  // --------------------------------------------------------------------------
  describe("Cenário 2: estagiário possui estágio", () => {
    it("deve retornar o array de estágios populado para o estagiário que possui estágio", async () => {
      const estagiario = makeEstagiarioResult();
      const estagio = makeEstagioResult({ estagiario: { id: estagiario.id } });

      const { handler } = createHandler({
        estagiarios: [estagiario],
        estagiosPorEstagiario: { [estagiario.id]: [estagio] },
      });

      const result = await handler.execute(accessContext, { id: createTestId() });

      expect(result.items).toHaveLength(1);
      expect(result.items[0].estagios).toHaveLength(1);
      expect(result.items[0].estagios[0].id).toBe(estagio.id);
    });

    it("deve retornar múltiplos estágios (histórico) quando o estagiário possui mais de um", async () => {
      const estagiario = makeEstagiarioResult();
      const estagioEncerrado = makeEstagioResult({ status: "ENCERRADO" as any });
      const estagioAtivo = makeEstagioResult({ status: "EM_ANDAMENTO" as any });

      const { handler } = createHandler({
        estagiarios: [estagiario],
        estagiosPorEstagiario: { [estagiario.id]: [estagioEncerrado, estagioAtivo] },
      });

      const result = await handler.execute(accessContext, { id: createTestId() });

      expect(result.items[0].estagios).toHaveLength(2);
    });
  });

  // --------------------------------------------------------------------------
  // Cenário 3: Estagiário sem estágio
  // --------------------------------------------------------------------------
  describe("Cenário 3: estagiário sem estágio", () => {
    it("deve retornar estagios como array vazio quando o estagiário não possui estágio", async () => {
      const estagiario = makeEstagiarioResult();

      const { handler } = createHandler({
        estagiarios: [estagiario],
        estagiosPorEstagiario: {}, // nenhum estágio para este estagiário
      });

      const result = await handler.execute(accessContext, { id: createTestId() });

      expect(result.items).toHaveLength(1);
      expect(result.items[0].estagios).toHaveLength(0);
      expect(result.items[0].estagiario.id).toBe(estagiario.id);
    });
  });

  // --------------------------------------------------------------------------
  // Cenário 4: Turma inexistente
  // --------------------------------------------------------------------------
  describe("Cenário 4: turma inexistente", () => {
    it("deve lançar erro quando a turma não for encontrada", async () => {
      const { handler } = createHandler({ turmaResult: null });

      await expect(handler.execute(accessContext, { id: createTestId() })).rejects.toThrow();
    });
  });

  // --------------------------------------------------------------------------
  // Cenário 5: Turma sem nenhum estagiário
  // --------------------------------------------------------------------------
  describe("Cenário 5: turma sem estagiários", () => {
    it("deve retornar items vazio quando nenhum estagiário compartilha o mesmo curso e período", async () => {
      const { handler } = createHandler({ estagiarios: [] });

      const result = await handler.execute(accessContext, { id: createTestId() });

      expect(result.items).toHaveLength(0);
    });
  });

  // --------------------------------------------------------------------------
  // Cenário 6: Paralelismo — garante Promise.all para múltiplos estagiários
  // --------------------------------------------------------------------------
  describe("Cenário 6: paralelismo das queries de estágios", () => {
    it("deve realizar a busca de estágios para cada estagiário da lista", async () => {
      const estagiarios = [makeEstagiarioResult(), makeEstagiarioResult(), makeEstagiarioResult()];

      const { handler, estagioRepository } = createHandler({ estagiarios });

      await handler.execute(accessContext, { id: createTestId() });

      // Deve ter chamado getFindAllQueryResult uma vez por estagiário
      expect(estagioRepository.getFindAllQueryResult).toHaveBeenCalledTimes(estagiarios.length);
    });
  });
});
