import { BadRequestException } from "@nestjs/common";
import { describe, expect, it, vi } from "vitest";
import { ForbiddenError, ResourceNotFoundError, UnauthorizedError } from "@/application/errors";
import { createTestAccessContext, createTestId, createTestRequestActor } from "@/test/helpers";
import { CandidaturaCancelarCommandHandlerImpl } from "./candidatura-cancelar.command.handler";

describe("CandidaturaCancelarCommandHandler", () => {
  function createMocks() {
    const repository = {
      loadById: vi.fn(),
      save: vi.fn(),
    };

    const permissionChecker = {
      ensureCanCancelar: vi.fn().mockResolvedValue(undefined),
    };

    return {
      repository,
      permissionChecker,
    };
  }

  it("should cancel candidature successfully when pending and authorized", async () => {
    const mocks = createMocks();
    const estagiarioId = createTestId();
    const candidaturaId = createTestId();

    const candidatura = {
      id: candidaturaId,
      estagiario: { id: estagiarioId },
      situacao: "PENDING",
      cancelar: vi.fn(),
    };
    mocks.repository.loadById.mockResolvedValue(candidatura);

    const handler = new CandidaturaCancelarCommandHandlerImpl(
      mocks.repository as any,
      mocks.permissionChecker as any,
    );

    const accessContext = createTestAccessContext(createTestRequestActor({ id: "user-1" }));
    const result = await handler.execute(accessContext, {
      candidaturaId,
      motivo: "Desisti da vaga",
    });

    expect(result).toBe(true);
    expect(mocks.permissionChecker.ensureCanCancelar).toHaveBeenCalledWith(
      accessContext,
      estagiarioId,
    );
    expect(candidatura.cancelar).toHaveBeenCalledWith("Desisti da vaga");
    expect(mocks.repository.save).toHaveBeenCalledWith(candidatura);
  });

  it("should allow CIEC staff to cancel a student's candidature from waitlist", async () => {
    const mocks = createMocks();
    const estagiarioId = createTestId();
    const candidaturaId = createTestId();

    const candidatura = {
      id: candidaturaId,
      estagiario: { id: estagiarioId },
      situacao: "PENDING",
      cancelar: vi.fn(),
    };
    mocks.repository.loadById.mockResolvedValue(candidatura);

    const handler = new CandidaturaCancelarCommandHandlerImpl(
      mocks.repository as any,
      mocks.permissionChecker as any,
    );

    const accessContext = createTestAccessContext(createTestRequestActor({ id: "ciec-analyst" }));
    const result = await handler.execute(accessContext, {
      candidaturaId,
      motivo: "Cancelamento administrativo pelo CIEC",
    });

    expect(result).toBe(true);
    expect(mocks.permissionChecker.ensureCanCancelar).toHaveBeenCalledWith(
      accessContext,
      estagiarioId,
    );
    expect(candidatura.cancelar).toHaveBeenCalledWith("Cancelamento administrativo pelo CIEC");
  });

  it("should throw ForbiddenError if permission checker denies cancellation", async () => {
    const mocks = createMocks();
    const otherEstagiarioId = createTestId();
    const candidaturaId = createTestId();

    const candidatura = {
      id: candidaturaId,
      estagiario: { id: otherEstagiarioId },
      situacao: "PENDING",
    };
    mocks.repository.loadById.mockResolvedValue(candidatura);
    mocks.permissionChecker.ensureCanCancelar.mockRejectedValue(
      new ForbiddenError("Você não tem permissão para cancelar uma candidatura de outro aluno."),
    );

    const handler = new CandidaturaCancelarCommandHandlerImpl(
      mocks.repository as any,
      mocks.permissionChecker as any,
    );

    const accessContext = createTestAccessContext(createTestRequestActor({ id: "user-1" }));
    await expect(handler.execute(accessContext, { candidaturaId })).rejects.toThrow(ForbiddenError);
  });

  it("should throw ResourceNotFoundError if candidature does not exist", async () => {
    const mocks = createMocks();
    mocks.repository.loadById.mockResolvedValue(null);

    const handler = new CandidaturaCancelarCommandHandlerImpl(
      mocks.repository as any,
      mocks.permissionChecker as any,
    );

    const accessContext = createTestAccessContext(createTestRequestActor({ id: "user-1" }));
    await expect(handler.execute(accessContext, { candidaturaId: createTestId() })).rejects.toThrow(
      ResourceNotFoundError,
    );
  });

  it("should throw BadRequestException if candidature is already finalized (ACCEPTED)", async () => {
    const mocks = createMocks();
    const estagiarioId = createTestId();
    const candidaturaId = createTestId();

    const candidatura = {
      id: candidaturaId,
      estagiario: { id: estagiarioId },
      situacao: "ACCEPTED",
    };
    mocks.repository.loadById.mockResolvedValue(candidatura);

    const handler = new CandidaturaCancelarCommandHandlerImpl(
      mocks.repository as any,
      mocks.permissionChecker as any,
    );

    const accessContext = createTestAccessContext(createTestRequestActor({ id: "user-1" }));
    await expect(handler.execute(accessContext, { candidaturaId })).rejects.toThrow(
      BadRequestException,
    );
  });

  it("should throw UnauthorizedError if user is not authenticated", async () => {
    const mocks = createMocks();
    const handler = new CandidaturaCancelarCommandHandlerImpl(
      mocks.repository as any,
      mocks.permissionChecker as any,
    );

    const accessContext = { requestActor: null } as any;
    await expect(handler.execute(accessContext, { candidaturaId: createTestId() })).rejects.toThrow(
      UnauthorizedError,
    );
  });
});
