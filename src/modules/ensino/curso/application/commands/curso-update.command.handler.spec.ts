import { describe, expect, it, vi } from "vitest";
import { ResourceNotFoundError } from "@/application/errors/application.error";
import { BusinessRuleViolationError } from "@/domain/errors";
import {
  createMockCrudRepository,
  createMockPermissionChecker,
  createTestAccessContext,
  createTestDate,
  createTestId,
} from "@/test/helpers";
import { CursoUpdateCommandHandlerImpl } from "./curso-update.command.handler";

describe("CursoUpdateCommandHandler", () => {
  function createMockPeriodoDisciplinaRepository() {
    return {
      deleteByCursoId: vi.fn().mockResolvedValue(undefined),
      save: vi.fn().mockResolvedValue({}),
    };
  }

  function createCurso(overrides: Record<string, unknown> = {}) {
    return {
      id: createTestId(),
      nome: "Engenharia de Software",
      nomeAbreviado: "ESW",
      quantidadePeriodos: 8,
      campus: { id: campusId },
      ofertaFormacao: { id: ofertaFormacaoId },
      imagemCapa: null,
      dateCreated: createTestDate(),
      dateUpdated: createTestDate(1),
      dateDeleted: null,
      ...overrides,
    };
  }

  function createHandler(
    overrides: {
      repository?: object;
      periodoDisciplinaRepository?: object;
      permissionChecker?: object;
    } = {},
  ) {
    const repository = overrides.repository ?? {
      ...createMockCrudRepository(),
      loadById: vi.fn().mockResolvedValue(createCurso()),
    };
    const periodoDisciplinaRepository =
      overrides.periodoDisciplinaRepository ?? createMockPeriodoDisciplinaRepository();
    const permissionChecker = overrides.permissionChecker ?? createMockPermissionChecker();

    const handler = new CursoUpdateCommandHandlerImpl(
      repository as any,
      periodoDisciplinaRepository as any,
      permissionChecker as any,
    );

    return {
      handler,
      repository,
      periodoDisciplinaRepository,
      permissionChecker,
    };
  }

  const campusId = createTestId();
  const ofertaFormacaoId = createTestId();

  it("should update curso and return result from repository", async () => {
    const id = createTestId();
    const currentDomain = createCurso({ id });
    const expectedResult = { id, nome: "ADS" };

    const repository = {
      ...createMockCrudRepository(),
      loadById: vi.fn().mockResolvedValue(currentDomain),
      getFindOneQueryResult: vi.fn().mockResolvedValue(expectedResult),
    };

    const { handler } = createHandler({ repository });
    const accessContext = createTestAccessContext();

    const result = await handler.execute(accessContext, {
      id,
      nome: "ADS",
      nomeAbreviado: "ADS",
      quantidadePeriodos: 6,
    });

    expect(result).toEqual(expectedResult);
    expect(repository.update).toHaveBeenCalledOnce();
    expect(repository.getFindOneQueryResult).toHaveBeenCalledWith(accessContext, { id });
  });

  it("should allow campus and ofertaFormacao in payload when ids are unchanged", async () => {
    const id = createTestId();
    const currentDomain = createCurso({ id });

    const repository = {
      ...createMockCrudRepository(),
      loadById: vi.fn().mockResolvedValue(currentDomain),
      getFindOneQueryResult: vi.fn().mockResolvedValue(currentDomain),
    };

    const { handler } = createHandler({ repository });
    const accessContext = createTestAccessContext();

    await expect(
      handler.execute(accessContext, {
        id,
        campus: { id: campusId },
        ofertaFormacao: { id: ofertaFormacaoId },
      }),
    ).resolves.toEqual(currentDomain);

    expect(repository.update).toHaveBeenCalledOnce();
  });

  it("should throw when trying to change campus", async () => {
    const id = createTestId();
    const repository = {
      ...createMockCrudRepository(),
      loadById: vi.fn().mockResolvedValue(createCurso({ id })),
    };

    const { handler } = createHandler({ repository });
    const accessContext = createTestAccessContext();

    await expect(
      handler.execute(accessContext, {
        id,
        campus: { id: createTestId() },
      }),
    ).rejects.toThrowError(
      new BusinessRuleViolationError(
        "CURSO_CAMPUS_IMMUTABLE",
        "O campus do curso não pode ser alterado após a criação.",
      ),
    );

    expect(repository.update).not.toHaveBeenCalled();
  });

  it("should throw when trying to change ofertaFormacao", async () => {
    const id = createTestId();
    const repository = {
      ...createMockCrudRepository(),
      loadById: vi.fn().mockResolvedValue(createCurso({ id })),
    };

    const { handler } = createHandler({ repository });
    const accessContext = createTestAccessContext();

    await expect(
      handler.execute(accessContext, {
        id,
        ofertaFormacao: { id: createTestId() },
      }),
    ).rejects.toThrowError(
      new BusinessRuleViolationError(
        "CURSO_OFERTA_FORMACAO_IMMUTABLE",
        "A formação do curso não pode ser alterada após a criação.",
      ),
    );

    expect(repository.update).not.toHaveBeenCalled();
  });

  it("should call permissionChecker.ensureCanUpdate before updating", async () => {
    const id = createTestId();
    const repository = {
      ...createMockCrudRepository(),
      loadById: vi.fn().mockResolvedValue(createCurso({ id })),
      getFindOneQueryResult: vi.fn().mockResolvedValue({ id }),
    };
    const permissionChecker = createMockPermissionChecker();

    const { handler } = createHandler({ repository, permissionChecker });
    const accessContext = createTestAccessContext();

    await handler.execute(accessContext, { id, nome: "Novo nome" });

    expect(permissionChecker.ensureCanUpdate).toHaveBeenCalledWith(
      accessContext,
      { dto: { id, nome: "Novo nome" } },
      id,
    );
  });

  it("should throw ResourceNotFoundError when current entity does not exist", async () => {
    const repository = {
      ...createMockCrudRepository(),
      loadById: vi.fn().mockResolvedValue(null),
    };

    const { handler } = createHandler({ repository });
    const accessContext = createTestAccessContext();

    await expect(handler.execute(accessContext, { id: createTestId() })).rejects.toThrow(
      ResourceNotFoundError,
    );
  });
});
