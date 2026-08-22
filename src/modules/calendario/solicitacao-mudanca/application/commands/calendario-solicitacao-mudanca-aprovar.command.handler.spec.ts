import { describe, expect, it, vi } from "vitest";
import { createTestAccessContext, createTestId } from "@/test/helpers";
import { CalendarioSolicitacaoMudancaTipoOperacao } from "../../domain/calendario-solicitacao-mudanca.types";
import { CalendarioSolicitacaoMudancaAprovarCommandHandlerImpl } from "./calendario-solicitacao-mudanca-aprovar.command.handler";

function createSolicitacaoAberta(overrides: Partial<Record<string, unknown>> = {}) {
  return {
    id: createTestId(),
    autor: { id: createTestId() },
    calendarioAgendamentoId: createTestId(),
    tipoOperacao: CalendarioSolicitacaoMudancaTipoOperacao.MOVER,
    dadosPropostos: { horarioInicio: "10:00:00" },
    justificativa: "Conflito de agenda",
    status: "ABERTA",
    motivoRecusa: null,
    sessaoEdicaoId: null,
    dateCreated: "2026-01-01T00:00:00.000Z",
    dateUpdated: "2026-01-01T00:00:00.000Z",
    dateDeleted: null,
    ...overrides,
  };
}

function createHandler() {
  const repository = {
    loadById: vi.fn(),
    save: vi.fn().mockResolvedValue(undefined),
    getFindOneQueryResult: vi.fn(),
    getFindAllQueryResult: vi.fn(),
  };
  const permissionChecker = {
    ensureCanCreate: vi.fn().mockResolvedValue(undefined),
    ensureCanUpdate: vi.fn().mockResolvedValue(undefined),
    ensureCanDelete: vi.fn().mockResolvedValue(undefined),
  };
  const sessaoRepository = {
    findById: vi.fn(),
    save: vi.fn(async (entity: unknown) => entity),
  };
  const mudancaRepository = {
    save: vi.fn(async (entity: unknown) => entity),
    findById: vi.fn(),
    findBySessaoId: vi.fn(),
    deleteById: vi.fn(),
  };
  const calendarioAgendamentoRepository = {
    getFindOneQueryResult: vi.fn(),
  };

  const handler = new CalendarioSolicitacaoMudancaAprovarCommandHandlerImpl(
    repository as any,
    permissionChecker as any,
    sessaoRepository as any,
    mudancaRepository as any,
    calendarioAgendamentoRepository as any,
  );

  return {
    handler,
    repository,
    sessaoRepository,
    mudancaRepository,
    calendarioAgendamentoRepository,
  };
}

describe("CalendarioSolicitacaoMudancaAprovarCommandHandlerImpl", () => {
  it("should open an edit session and create one mudanca describing the approved proposal", async () => {
    const {
      handler,
      repository,
      sessaoRepository,
      mudancaRepository,
      calendarioAgendamentoRepository,
    } = createHandler();

    const solicitacao = createSolicitacaoAberta();
    repository.loadById.mockResolvedValue(solicitacao);
    repository.getFindOneQueryResult.mockImplementation(async (_ctx, dto) => ({
      id: dto.id,
      status: solicitacao.status,
      sessaoEdicaoId: solicitacao.sessaoEdicaoId,
    }));
    calendarioAgendamentoRepository.getFindOneQueryResult.mockResolvedValue({
      nome: "Reunião",
      cor: "#000000",
      dataInicio: "2026-03-01",
      dataFim: "2026-03-01",
      horarioInicio: "09:00:00",
      horarioFim: "10:00:00",
      diaInteiro: false,
    });

    const accessContext = createTestAccessContext();
    const resultado = await handler.execute(accessContext, { id: solicitacao.id });

    expect(sessaoRepository.save).toHaveBeenCalledOnce();
    const sessaoSalva = sessaoRepository.save.mock.calls[0][0] as any;
    expect(sessaoSalva.status).toBe("ABERTA");
    expect(sessaoSalva.usuario.id).toBe(accessContext.requestActor?.id);

    expect(mudancaRepository.save).toHaveBeenCalledOnce();
    const mudancaSalva = mudancaRepository.save.mock.calls[0][0] as any;
    expect(mudancaSalva.tipoOperacao).toBe(CalendarioSolicitacaoMudancaTipoOperacao.MOVER);
    expect(mudancaSalva.calendarioAgendamento).toEqual({ id: solicitacao.calendarioAgendamentoId });
    expect(mudancaSalva.dados).toEqual(solicitacao.dadosPropostos);
    expect(mudancaSalva.dadosAnteriores).toMatchObject({
      nome: "Reunião",
      horarioInicio: "09:00:00",
    });
    expect(mudancaSalva.sessao.id).toBe(resultado.sessaoEdicaoId);

    expect(repository.save).toHaveBeenCalledOnce();
    const solicitacaoSalva = repository.save.mock.calls[0][0];
    expect(solicitacaoSalva.status).toBe("APROVADA");
    expect(solicitacaoSalva.sessaoEdicaoId).toBe(resultado.sessaoEdicaoId);

    expect(resultado.sessaoEdicaoId).toBeDefined();
  });

  it("should throw when the request is not ABERTA", async () => {
    const { handler, repository } = createHandler();
    const solicitacao = createSolicitacaoAberta({ status: "APROVADA" });
    repository.loadById.mockResolvedValue(solicitacao);

    await expect(
      handler.execute(createTestAccessContext(), { id: solicitacao.id }),
    ).rejects.toThrow();
  });

  it("should throw when the request does not exist", async () => {
    const { handler, repository } = createHandler();
    repository.loadById.mockResolvedValue(null);

    await expect(
      handler.execute(createTestAccessContext(), { id: createTestId() }),
    ).rejects.toThrow();
  });
});
