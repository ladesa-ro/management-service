import { describe, expect, it, vi } from "vitest";
import { ConflictError, ForbiddenError } from "@/application/errors";
import { createTestAccessContext, createTestId, createTestRequestActor } from "@/test/helpers";
import { CandidaturaCreateCommandHandlerImpl } from "./candidatura-create.command.handler";

describe("CandidaturaCreateCommandHandler", () => {
  function createMocks() {
    const repository = {
      save: vi.fn(),
      loadById: vi.fn(),
      findActiveByEstagioAndEstagiario: vi.fn().mockResolvedValue(null),
      findActiveOfferByEstagio: vi.fn(),
      calcularPosicaoFila: vi.fn().mockResolvedValue(1),
      findMinhasCandidaturas: vi.fn(),
      getFindOneQueryResult: vi.fn().mockResolvedValue({
        id: createTestId(),
        situacao: "PENDING",
        posicaoFila: 1,
      }),
    };

    const estagioRepository = {
      loadById: vi.fn().mockResolvedValue({
        id: createTestId(),
        status: "DISPONIVEL",
        estagiario: null,
      }),
      findActiveInternshipByEstagiarioId: vi.fn().mockResolvedValue(null),
    };

    const estagiarioRepository = {
      findByUsuarioId: vi.fn().mockResolvedValue({ id: createTestId() }),
      findByPerfilId: vi.fn(),
    };

    const perfilRepository = {
      findAllActiveByUsuarioId: vi.fn().mockResolvedValue([]),
    };

    const permissionChecker = {
      ensureCanCandidatar: vi.fn().mockResolvedValue(undefined),
    };

    return {
      repository,
      estagioRepository,
      estagiarioRepository,
      perfilRepository,
      permissionChecker,
    };
  }

  it("should create candidature and return queue position when valid", async () => {
    const mocks = createMocks();
    const handler = new CandidaturaCreateCommandHandlerImpl(
      mocks.repository as any,
      mocks.estagioRepository as any,
      mocks.estagiarioRepository as any,
      mocks.perfilRepository as any,
      mocks.permissionChecker as any,
    );

    const accessContext = createTestAccessContext(createTestRequestActor({ id: "user-1" }));
    const result = await handler.execute(accessContext, { estagioId: createTestId() });

    expect(result).toBeDefined();
    expect(mocks.permissionChecker.ensureCanCandidatar).toHaveBeenCalledWith(accessContext);
    expect(mocks.repository.save).toHaveBeenCalled();
  });

  it("should throw ConflictError if candidate already has active candidature for this vacancy", async () => {
    const mocks = createMocks();
    mocks.repository.findActiveByEstagioAndEstagiario.mockResolvedValue({ id: "cand-1" });

    const handler = new CandidaturaCreateCommandHandlerImpl(
      mocks.repository as any,
      mocks.estagioRepository as any,
      mocks.estagiarioRepository as any,
      mocks.perfilRepository as any,
      mocks.permissionChecker as any,
    );

    const accessContext = createTestAccessContext(createTestRequestActor({ id: "user-1" }));
    await expect(handler.execute(accessContext, { estagioId: createTestId() })).rejects.toThrow(
      ConflictError,
    );
  });

  it("should throw BadRequestException if internship is not available", async () => {
    const mocks = createMocks();
    mocks.estagioRepository.loadById.mockResolvedValue({
      id: createTestId(),
      status: "EM_ANDAMENTO",
      estagiario: { id: "outro-estagiario" },
    });

    const handler = new CandidaturaCreateCommandHandlerImpl(
      mocks.repository as any,
      mocks.estagioRepository as any,
      mocks.estagiarioRepository as any,
      mocks.perfilRepository as any,
      mocks.permissionChecker as any,
    );

    const accessContext = createTestAccessContext(createTestRequestActor({ id: "user-1" }));
    await expect(handler.execute(accessContext, { estagioId: createTestId() })).rejects.toThrow();
  });

  it("should throw ForbiddenError if user does not have permission", async () => {
    const mocks = createMocks();
    mocks.permissionChecker.ensureCanCandidatar.mockRejectedValue(
      new ForbiddenError("Apenas alunos podem se candidatar."),
    );

    const handler = new CandidaturaCreateCommandHandlerImpl(
      mocks.repository as any,
      mocks.estagioRepository as any,
      mocks.estagiarioRepository as any,
      mocks.perfilRepository as any,
      mocks.permissionChecker as any,
    );

    const accessContext = createTestAccessContext(createTestRequestActor({ id: "staff-1" }));
    await expect(handler.execute(accessContext, { estagioId: createTestId() })).rejects.toThrow(
      ForbiddenError,
    );
  });
});
