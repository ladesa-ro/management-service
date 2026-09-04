import { describe, expect, it, vi } from "vitest";
import { ConflictError, ForbiddenError, ResourceNotFoundError } from "@/application/errors";
import { createTestAccessContext, createTestId, createTestRequestActor } from "@/test/helpers";
import { EstagioSolicitacaoIndeferirCommandHandlerImpl } from "./solicitacao-indeferir.command.handler";

describe("EstagioSolicitacaoIndeferirCommandHandler", () => {
  function createMocks() {
    const solicitacaoRepository = {
      findById: vi.fn(),
      save: vi.fn().mockImplementation(async (s) => s),
    };

    const permissionChecker = {
      ensureCanManageSolicitacoes: vi.fn().mockResolvedValue({ userId: "ciec-user-id" }),
    };

    return {
      solicitacaoRepository,
      permissionChecker,
    };
  }

  it("should indefer request when valid and provide justification", async () => {
    const mocks = createMocks();
    const solicitacaoId = createTestId();

    const solicitacao = {
      id: solicitacaoId,
      situacao: "PENDENTE",
      indeferir: vi.fn(),
    };
    mocks.solicitacaoRepository.findById.mockResolvedValue(solicitacao);

    const handler = new EstagioSolicitacaoIndeferirCommandHandlerImpl(
      mocks.solicitacaoRepository as any,
      mocks.permissionChecker as any,
    );

    const accessContext = createTestAccessContext(createTestRequestActor({ id: "ciec-user-id" }));
    const result = await handler.execute(accessContext, {
      id: solicitacaoId,
      parecer: "Plano de atividades incompatível com o PPC do curso.",
    });

    expect(result).toBeDefined();
    expect(solicitacao.indeferir).toHaveBeenCalledWith(
      "ciec-user-id",
      "Plano de atividades incompatível com o PPC do curso.",
    );
    expect(mocks.solicitacaoRepository.save).toHaveBeenCalled();
  });

  it("should throw ConflictError if request is already INDEFERIDA", async () => {
    const mocks = createMocks();
    const solicitacao = {
      id: createTestId(),
      situacao: "INDEFERIDA",
    };
    mocks.solicitacaoRepository.findById.mockResolvedValue(solicitacao);

    const handler = new EstagioSolicitacaoIndeferirCommandHandlerImpl(
      mocks.solicitacaoRepository as any,
      mocks.permissionChecker as any,
    );

    const accessContext = createTestAccessContext(createTestRequestActor({ id: "ciec-user-id" }));
    await expect(
      handler.execute(accessContext, {
        id: solicitacao.id,
        parecer: "Justificativa.",
      }),
    ).rejects.toThrow(ConflictError);
  });

  it("should throw ResourceNotFoundError if request does not exist", async () => {
    const mocks = createMocks();
    mocks.solicitacaoRepository.findById.mockResolvedValue(null);

    const handler = new EstagioSolicitacaoIndeferirCommandHandlerImpl(
      mocks.solicitacaoRepository as any,
      mocks.permissionChecker as any,
    );

    const accessContext = createTestAccessContext(createTestRequestActor({ id: "ciec-user-id" }));
    await expect(
      handler.execute(accessContext, {
        id: createTestId(),
        parecer: "Justificativa.",
      }),
    ).rejects.toThrow(ResourceNotFoundError);
  });

  it("should throw ForbiddenError if actor is not CIEC staff", async () => {
    const mocks = createMocks();
    mocks.permissionChecker.ensureCanManageSolicitacoes.mockRejectedValue(
      new ForbiddenError("Apenas servidores do CIEC podem indeferir."),
    );

    const handler = new EstagioSolicitacaoIndeferirCommandHandlerImpl(
      mocks.solicitacaoRepository as any,
      mocks.permissionChecker as any,
    );

    const accessContext = createTestAccessContext(createTestRequestActor({ id: "aluno-1" }));
    await expect(
      handler.execute(accessContext, {
        id: createTestId(),
        parecer: "Justificativa.",
      }),
    ).rejects.toThrow(ForbiddenError);
  });
});
