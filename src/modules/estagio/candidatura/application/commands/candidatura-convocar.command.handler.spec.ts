import { describe, expect, it, vi } from "vitest";
import { ConflictError, ForbiddenError } from "@/application/errors";
import { createTestAccessContext, createTestId, createTestRequestActor } from "@/test/helpers";
import { CandidaturaConvocarCommandHandlerImpl } from "./candidatura-convocar.command.handler";

describe("CandidaturaConvocarCommandHandler", () => {
  function createMocks() {
    const repository = {
      loadById: vi.fn(),
      save: vi.fn(),
      findActiveOfferByEstagio: vi.fn().mockResolvedValue(null),
      getFindOneQueryResult: vi.fn().mockResolvedValue({
        id: createTestId(),
        situacao: "OFFERED",
      }),
    };

    const permissionChecker = {
      ensureCanConvocar: vi.fn().mockResolvedValue(undefined),
    };

    const pushService = {
      notificarCandidaturaConvocada: vi.fn(),
    };

    const estagioRepository = {
      loadById: vi
        .fn()
        .mockResolvedValue({ id: createTestId(), status: "DISPONIVEL", estagiario: null }),
    };

    return {
      repository,
      estagioRepository,
      permissionChecker,
      pushService,
    };
  }

  it("should convoke candidate successfully when authorized and no active offer exists", async () => {
    const mocks = createMocks();
    const candidaturaId = createTestId();
    const estagioId = createTestId();

    const candidatura = {
      id: candidaturaId,
      estagio: { id: estagioId },
      situacao: "PENDING",
      convocar: vi.fn(),
    };
    mocks.repository.loadById.mockResolvedValue(candidatura);

    const handler = new CandidaturaConvocarCommandHandlerImpl(
      mocks.repository as any,
      mocks.estagioRepository as any,
      mocks.permissionChecker as any,
    );

    const accessContext = createTestAccessContext(createTestRequestActor({ id: "ciec-1" }));
    const result = await handler.execute(accessContext, {
      candidaturaId,
      diasValidade: 7,
    });

    expect(result).toBeDefined();
    expect(mocks.permissionChecker.ensureCanConvocar).toHaveBeenCalledWith(accessContext);
    expect(candidatura.convocar).toHaveBeenCalled();
    expect(mocks.repository.save).toHaveBeenCalledWith(candidatura);
  });

  it("should throw ConflictError if there is already an active offer for the vacancy", async () => {
    const mocks = createMocks();
    const candidaturaId = createTestId();
    const estagioId = createTestId();

    const candidatura = {
      id: candidaturaId,
      estagio: { id: estagioId },
      situacao: "PENDING",
    };
    mocks.repository.loadById.mockResolvedValue(candidatura);
    mocks.repository.findActiveOfferByEstagio.mockResolvedValue({ id: "other-offer" });

    const handler = new CandidaturaConvocarCommandHandlerImpl(
      mocks.repository as any,
      mocks.estagioRepository as any,
      mocks.permissionChecker as any,
    );

    const accessContext = createTestAccessContext(createTestRequestActor({ id: "ciec-1" }));
    await expect(handler.execute(accessContext, { candidaturaId })).rejects.toThrow(ConflictError);
  });

  it("should throw ForbiddenError if caller is not authorized CIEC staff", async () => {
    const mocks = createMocks();
    mocks.permissionChecker.ensureCanConvocar.mockRejectedValue(
      new ForbiddenError("Apenas servidores do CIEC podem convocar."),
    );

    const handler = new CandidaturaConvocarCommandHandlerImpl(
      mocks.repository as any,
      mocks.estagioRepository as any,
      mocks.permissionChecker as any,
    );

    const accessContext = createTestAccessContext(createTestRequestActor({ id: "aluno-1" }));
    await expect(handler.execute(accessContext, { candidaturaId: createTestId() })).rejects.toThrow(
      ForbiddenError,
    );
  });
});
