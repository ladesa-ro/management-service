import { BadRequestException } from "@nestjs/common";
import { describe, expect, it, vi } from "vitest";
import { ResourceNotFoundError, UnauthorizedError } from "@/application/errors";
import { createTestAccessContext, createTestId, createTestRequestActor } from "@/test/helpers";
import { CandidaturaCancelarCommandHandlerImpl } from "./candidatura-cancelar.command.handler";

describe("CandidaturaCancelarCommandHandler", () => {
  function createMocks() {
    const repository = {
      loadById: vi.fn(),
      save: vi.fn(),
    };

    const estagiarioRepository = {
      findByUsuarioId: vi.fn(),
      findByPerfilId: vi.fn(),
    };

    const perfilRepository = {
      findAllActiveByUsuarioId: vi.fn().mockResolvedValue([]),
    };

    return {
      repository,
      estagiarioRepository,
      perfilRepository,
    };
  }

  it("should cancel candidature successfully when pending and owned by student", async () => {
    const mocks = createMocks();
    const estagiarioId = createTestId();
    const candidaturaId = createTestId();

    mocks.estagiarioRepository.findByUsuarioId.mockResolvedValue({ id: estagiarioId });

    const candidatura = {
      id: candidaturaId,
      estagiario: { id: estagiarioId },
      situacao: "PENDING",
      cancelar: vi.fn(),
    };
    mocks.repository.loadById.mockResolvedValue(candidatura);

    const handler = new CandidaturaCancelarCommandHandlerImpl(
      mocks.repository as any,
      mocks.estagiarioRepository as any,
      mocks.perfilRepository as any,
    );

    const accessContext = createTestAccessContext(createTestRequestActor({ id: "user-1" }));
    const result = await handler.execute(accessContext, {
      candidaturaId,
      motivo: "Desisti da vaga",
    });

    expect(result).toBe(true);
    expect(candidatura.cancelar).toHaveBeenCalledWith("Desisti da vaga");
    expect(mocks.repository.save).toHaveBeenCalledWith(candidatura);
  });

  it("should throw ResourceNotFoundError if candidature belongs to another student (anti-IDOR)", async () => {
    const mocks = createMocks();
    const myEstagiarioId = createTestId();
    const otherEstagiarioId = createTestId();
    const candidaturaId = createTestId();

    mocks.estagiarioRepository.findByUsuarioId.mockResolvedValue({ id: myEstagiarioId });

    const candidatura = {
      id: candidaturaId,
      estagiario: { id: otherEstagiarioId },
      situacao: "PENDING",
    };
    mocks.repository.loadById.mockResolvedValue(candidatura);

    const handler = new CandidaturaCancelarCommandHandlerImpl(
      mocks.repository as any,
      mocks.estagiarioRepository as any,
      mocks.perfilRepository as any,
    );

    const accessContext = createTestAccessContext(createTestRequestActor({ id: "user-1" }));
    await expect(handler.execute(accessContext, { candidaturaId })).rejects.toThrow(
      ResourceNotFoundError,
    );
  });

  it("should throw BadRequestException if candidature is already finalized (ACCEPTED)", async () => {
    const mocks = createMocks();
    const estagiarioId = createTestId();
    const candidaturaId = createTestId();

    mocks.estagiarioRepository.findByUsuarioId.mockResolvedValue({ id: estagiarioId });

    const candidatura = {
      id: candidaturaId,
      estagiario: { id: estagiarioId },
      situacao: "ACCEPTED",
    };
    mocks.repository.loadById.mockResolvedValue(candidatura);

    const handler = new CandidaturaCancelarCommandHandlerImpl(
      mocks.repository as any,
      mocks.estagiarioRepository as any,
      mocks.perfilRepository as any,
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
      mocks.estagiarioRepository as any,
      mocks.perfilRepository as any,
    );

    const accessContext = { requestActor: null } as any;
    await expect(handler.execute(accessContext, { candidaturaId: createTestId() })).rejects.toThrow(
      UnauthorizedError,
    );
  });
});
