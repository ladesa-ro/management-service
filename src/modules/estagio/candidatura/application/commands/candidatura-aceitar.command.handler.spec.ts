import { BadRequestException, HttpException, HttpStatus } from "@nestjs/common";
import { describe, expect, it, vi } from "vitest";
import { ConflictError, ResourceNotFoundError } from "@/application/errors";
import { createTestAccessContext, createTestId, createTestRequestActor } from "@/test/helpers";
import { CandidaturaAceitarCommandHandlerImpl } from "./candidatura-aceitar.command.handler";

describe("CandidaturaAceitarCommandHandler", () => {
  function createMocks() {
    const repository = {
      loadById: vi.fn(),
      save: vi.fn(),
      getFindOneQueryResult: vi.fn().mockResolvedValue({
        id: createTestId(),
        situacao: "ACCEPTED",
      }),
    };

    const estagiarioRepository = {
      findByUsuarioId: vi.fn(),
      findByPerfilId: vi.fn(),
    };

    const perfilRepository = {
      findAllActiveByUsuarioId: vi.fn().mockResolvedValue([]),
    };

    const estagioEntity = {
      id: createTestId(),
      status: "DISPONIVEL",
      estagiario: null,
      dateUpdated: null,
    };

    const queryBuilder = {
      setLock: vi.fn().mockReturnThis(),
      where: vi.fn().mockReturnThis(),
      andWhere: vi.fn().mockReturnThis(),
      getOne: vi.fn().mockResolvedValue(estagioEntity),
    };

    const estagioRepo = {
      createQueryBuilder: vi.fn().mockReturnValue(queryBuilder),
      save: vi.fn().mockResolvedValue(estagioEntity),
    };

    const appTypeormConnection = {
      getRepository: vi.fn().mockReturnValue(estagioRepo),
    };

    const pushService = {
      notificarEstagioFaseInicial: vi.fn(),
    };

    return {
      repository,
      estagiarioRepository,
      perfilRepository,
      appTypeormConnection,
      pushService,
      estagioEntity,
      estagioRepo,
      queryBuilder,
    };
  }

  it("should accept offer atomically with pessimistic lock and transition stage status", async () => {
    const mocks = createMocks();
    const estagiarioId = createTestId();
    const candidaturaId = createTestId();
    const estagioId = mocks.estagioEntity.id;

    mocks.estagiarioRepository.findByUsuarioId.mockResolvedValue({ id: estagiarioId });

    const candidatura = {
      id: candidaturaId,
      estagio: { id: estagioId },
      estagiario: { id: estagiarioId },
      situacao: "OFFERED",
      isOfertaValida: vi.fn().mockReturnValue(true),
      aceitar: vi.fn(),
      expirar: vi.fn(),
    };
    mocks.repository.loadById.mockResolvedValue(candidatura);

    const handler = new CandidaturaAceitarCommandHandlerImpl(
      mocks.repository as any,
      mocks.estagiarioRepository as any,
      mocks.perfilRepository as any,
      mocks.appTypeormConnection as any,
      mocks.pushService as any,
    );

    const accessContext = createTestAccessContext(createTestRequestActor({ id: "student-1" }));
    const result = await handler.execute(accessContext, { candidaturaId });

    expect(result).toBeDefined();
    expect(mocks.queryBuilder.setLock).toHaveBeenCalledWith("pessimistic_write");
    expect(candidatura.aceitar).toHaveBeenCalled();
    expect(mocks.estagioEntity.status).toBe("EM_FASE_INICIAL");
    expect(mocks.estagioEntity.estagiario).toEqual({ id: estagiarioId });
    expect(mocks.repository.save).toHaveBeenCalledWith(candidatura);
  });

  it("should throw GONE (410) if offer has expired", async () => {
    const mocks = createMocks();
    const estagiarioId = createTestId();
    const candidaturaId = createTestId();

    mocks.estagiarioRepository.findByUsuarioId.mockResolvedValue({ id: estagiarioId });

    const candidatura = {
      id: candidaturaId,
      estagio: { id: createTestId() },
      estagiario: { id: estagiarioId },
      situacao: "OFFERED",
      isOfertaValida: vi.fn().mockReturnValue(false),
      expirar: vi.fn(),
    };
    mocks.repository.loadById.mockResolvedValue(candidatura);

    const handler = new CandidaturaAceitarCommandHandlerImpl(
      mocks.repository as any,
      mocks.estagiarioRepository as any,
      mocks.perfilRepository as any,
      mocks.appTypeormConnection as any,
      mocks.pushService as any,
    );

    const accessContext = createTestAccessContext(createTestRequestActor({ id: "student-1" }));
    try {
      await handler.execute(accessContext, { candidaturaId });
      expect.unreachable("should have thrown");
    } catch (err: any) {
      expect(err).toBeInstanceOf(HttpException);
      expect(err.getStatus()).toBe(HttpStatus.GONE);
      expect(candidatura.expirar).toHaveBeenCalled();
      expect(mocks.repository.save).toHaveBeenCalledWith(candidatura);
    }
  });

  it("should throw ConflictError (409) if vacancy was already filled concurrently", async () => {
    const mocks = createMocks();
    const estagiarioId = createTestId();
    const candidaturaId = createTestId();

    mocks.estagiarioRepository.findByUsuarioId.mockResolvedValue({ id: estagiarioId });

    const candidatura = {
      id: candidaturaId,
      estagio: { id: createTestId() },
      estagiario: { id: estagiarioId },
      situacao: "OFFERED",
      isOfertaValida: vi.fn().mockReturnValue(true),
      aceitar: vi.fn(),
    };
    mocks.repository.loadById.mockResolvedValue(candidatura);

    // Vaga já ocupada
    mocks.queryBuilder.getOne.mockResolvedValue({
      id: createTestId(),
      status: "EM_FASE_INICIAL",
      estagiario: { id: "another-student" },
    });

    const handler = new CandidaturaAceitarCommandHandlerImpl(
      mocks.repository as any,
      mocks.estagiarioRepository as any,
      mocks.perfilRepository as any,
      mocks.appTypeormConnection as any,
      mocks.pushService as any,
    );

    const accessContext = createTestAccessContext(createTestRequestActor({ id: "student-1" }));
    await expect(handler.execute(accessContext, { candidaturaId })).rejects.toThrow(ConflictError);
  });

  it("should throw BadRequestException if candidatura is not in OFFERED state", async () => {
    const mocks = createMocks();
    const estagiarioId = createTestId();
    const candidaturaId = createTestId();

    mocks.estagiarioRepository.findByUsuarioId.mockResolvedValue({ id: estagiarioId });

    const candidatura = {
      id: candidaturaId,
      estagio: { id: createTestId() },
      estagiario: { id: estagiarioId },
      situacao: "PENDING",
    };
    mocks.repository.loadById.mockResolvedValue(candidatura);

    const handler = new CandidaturaAceitarCommandHandlerImpl(
      mocks.repository as any,
      mocks.estagiarioRepository as any,
      mocks.perfilRepository as any,
      mocks.appTypeormConnection as any,
      mocks.pushService as any,
    );

    const accessContext = createTestAccessContext(createTestRequestActor({ id: "student-1" }));
    await expect(handler.execute(accessContext, { candidaturaId })).rejects.toThrow(
      BadRequestException,
    );
  });

  it("should throw ResourceNotFoundError if candidature belongs to another student (anti-IDOR)", async () => {
    const mocks = createMocks();
    const myEstagiarioId = createTestId();
    const otherEstagiarioId = createTestId();
    const candidaturaId = createTestId();

    mocks.estagiarioRepository.findByUsuarioId.mockResolvedValue({ id: myEstagiarioId });

    const candidatura = {
      id: candidaturaId,
      estagio: { id: createTestId() },
      estagiario: { id: otherEstagiarioId },
      situacao: "OFFERED",
    };
    mocks.repository.loadById.mockResolvedValue(candidatura);

    const handler = new CandidaturaAceitarCommandHandlerImpl(
      mocks.repository as any,
      mocks.estagiarioRepository as any,
      mocks.perfilRepository as any,
      mocks.appTypeormConnection as any,
      mocks.pushService as any,
    );

    const accessContext = createTestAccessContext(createTestRequestActor({ id: "student-1" }));
    await expect(handler.execute(accessContext, { candidaturaId })).rejects.toThrow(
      ResourceNotFoundError,
    );
  });
});
