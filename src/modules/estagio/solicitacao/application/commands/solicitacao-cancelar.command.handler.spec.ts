import { describe, expect, it, vi } from "vitest";
import { ConflictError, ForbiddenError, ResourceNotFoundError } from "@/application/errors";
import { createTestAccessContext, createTestId, createTestRequestActor } from "@/test/helpers";
import { EstagioSolicitacaoCancelarCommandHandlerImpl } from "./solicitacao-cancelar.command.handler";

describe("EstagioSolicitacaoCancelarCommandHandler", () => {
  function createMocks() {
    const solicitacaoRepository = {
      findById: vi.fn(),
      save: vi.fn().mockImplementation(async (s) => s),
    };

    const permissionChecker = {
      ensureCanCancelSolicitacao: vi.fn().mockResolvedValue(undefined),
    };

    return {
      solicitacaoRepository,
      permissionChecker,
    };
  }

  it("should cancel request when pending and authorized", async () => {
    const mocks = createMocks();
    const solicitacaoId = createTestId();

    const solicitacao = {
      id: solicitacaoId,
      situacao: "PENDENTE",
      cancelar: vi.fn(),
    };
    mocks.solicitacaoRepository.findById.mockResolvedValue(solicitacao);

    const handler = new EstagioSolicitacaoCancelarCommandHandlerImpl(
      mocks.solicitacaoRepository as any,
      mocks.permissionChecker as any,
    );

    const accessContext = createTestAccessContext(createTestRequestActor({ id: "student-1" }));
    const result = await handler.execute(accessContext, { id: solicitacaoId });

    expect(result).toBeDefined();
    expect(mocks.permissionChecker.ensureCanCancelSolicitacao).toHaveBeenCalledWith(
      accessContext,
      solicitacao,
    );
    expect(solicitacao.cancelar).toHaveBeenCalled();
    expect(mocks.solicitacaoRepository.save).toHaveBeenCalledWith(solicitacao);
  });

  it("should throw ConflictError if request is already DEFERIDA", async () => {
    const mocks = createMocks();
    const solicitacaoId = createTestId();

    const solicitacao = {
      id: solicitacaoId,
      situacao: "DEFERIDA",
    };
    mocks.solicitacaoRepository.findById.mockResolvedValue(solicitacao);

    const handler = new EstagioSolicitacaoCancelarCommandHandlerImpl(
      mocks.solicitacaoRepository as any,
      mocks.permissionChecker as any,
    );

    const accessContext = createTestAccessContext(createTestRequestActor({ id: "student-1" }));
    await expect(handler.execute(accessContext, { id: solicitacaoId })).rejects.toThrow(
      ConflictError,
    );
  });

  it("should throw ForbiddenError if permission checker rejects cancellation", async () => {
    const mocks = createMocks();
    const solicitacaoId = createTestId();

    const solicitacao = {
      id: solicitacaoId,
      situacao: "PENDENTE",
    };
    mocks.solicitacaoRepository.findById.mockResolvedValue(solicitacao);
    mocks.permissionChecker.ensureCanCancelSolicitacao.mockRejectedValue(
      new ForbiddenError("Você não tem permissão para cancelar."),
    );

    const handler = new EstagioSolicitacaoCancelarCommandHandlerImpl(
      mocks.solicitacaoRepository as any,
      mocks.permissionChecker as any,
    );

    const accessContext = createTestAccessContext(createTestRequestActor({ id: "student-2" }));
    await expect(handler.execute(accessContext, { id: solicitacaoId })).rejects.toThrow(
      ForbiddenError,
    );
  });

  it("should throw ResourceNotFoundError if request does not exist", async () => {
    const mocks = createMocks();
    mocks.solicitacaoRepository.findById.mockResolvedValue(null);

    const handler = new EstagioSolicitacaoCancelarCommandHandlerImpl(
      mocks.solicitacaoRepository as any,
      mocks.permissionChecker as any,
    );

    const accessContext = createTestAccessContext(createTestRequestActor({ id: "student-1" }));
    await expect(handler.execute(accessContext, { id: createTestId() })).rejects.toThrow(
      ResourceNotFoundError,
    );
  });
});
