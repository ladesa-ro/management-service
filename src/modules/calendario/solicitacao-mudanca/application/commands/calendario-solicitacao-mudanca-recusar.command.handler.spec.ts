import { describe, expect, it, vi } from "vitest";
import { createTestAccessContext, createTestId } from "@/test/helpers";
import { CalendarioSolicitacaoMudancaTipoOperacao } from "../../domain/calendario-solicitacao-mudanca.types";
import { CalendarioSolicitacaoMudancaRecusarCommandHandlerImpl } from "./calendario-solicitacao-mudanca-recusar.command.handler";

function createSolicitacaoAberta(overrides: Partial<Record<string, unknown>> = {}) {
  return {
    id: createTestId(),
    autor: { id: createTestId() },
    calendarioAgendamentoId: createTestId(),
    tipoOperacao: CalendarioSolicitacaoMudancaTipoOperacao.REMOVER,
    dadosPropostos: {},
    justificativa: "Agendamento duplicado",
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

  const handler = new CalendarioSolicitacaoMudancaRecusarCommandHandlerImpl(
    repository as any,
    permissionChecker as any,
  );

  return { handler, repository, permissionChecker };
}

describe("CalendarioSolicitacaoMudancaRecusarCommandHandlerImpl", () => {
  it("should refuse an open request, recording the motivo", async () => {
    const { handler, repository } = createHandler();
    const solicitacao = createSolicitacaoAberta();
    repository.loadById.mockResolvedValue(solicitacao);
    repository.getFindOneQueryResult.mockImplementation(async (_ctx, dto) => ({
      id: dto.id,
      status: solicitacao.status,
      motivoRecusa: solicitacao.motivoRecusa,
    }));

    const resultado = await handler.execute(createTestAccessContext(), {
      id: solicitacao.id,
      motivoRecusa: "Fora do prazo permitido",
    });

    expect(repository.save).toHaveBeenCalledOnce();
    const solicitacaoSalva = repository.save.mock.calls[0][0];
    expect(solicitacaoSalva.status).toBe("RECUSADA");
    expect(solicitacaoSalva.motivoRecusa).toBe("Fora do prazo permitido");
    expect(resultado).toBeDefined();
  });

  it("should default motivoRecusa to null when not provided", async () => {
    const { handler, repository } = createHandler();
    const solicitacao = createSolicitacaoAberta();
    repository.loadById.mockResolvedValue(solicitacao);
    repository.getFindOneQueryResult.mockResolvedValue({ id: solicitacao.id, status: "RECUSADA" });

    await handler.execute(createTestAccessContext(), { id: solicitacao.id });

    const solicitacaoSalva = repository.save.mock.calls[0][0];
    expect(solicitacaoSalva.motivoRecusa).toBeNull();
  });

  it("should throw when the request is not ABERTA", async () => {
    const { handler, repository } = createHandler();
    const solicitacao = createSolicitacaoAberta({ status: "RECUSADA" });
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
