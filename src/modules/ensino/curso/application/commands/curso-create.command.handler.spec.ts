import { describe, expect, it, vi } from "vitest";
import { ResourceNotFoundError } from "@/application/errors/application.error";
import {
  createMockCrudRepository,
  createMockPermissionChecker,
  createTestAccessContext,
  createTestId,
} from "@/test/helpers";
import { CursoCreateCommandHandlerImpl } from "./curso-create.command.handler";

function createMockFindOneHandler(result?: object) {
  return {
    execute: vi.fn().mockResolvedValue(result ?? { id: createTestId() }),
  };
}

describe("CursoCreateCommandHandler", () => {
  function createMockPeriodoDisciplinaRepository() {
    return {
      findByCursoId: vi.fn().mockResolvedValue([]),
      deleteByCursoId: vi.fn().mockResolvedValue(undefined),
      save: vi.fn().mockResolvedValue({}),
    };
  }

  function createHandler(
    overrides: {
      repository?: object;
      periodoDisciplinaRepository?: object;
      permissionChecker?: object;
      campusFindOneHandler?: object;
      ofertaFormacaoFindOneHandler?: object;
    } = {},
  ) {
    const repository = overrides.repository ?? createMockCrudRepository();
    const periodoDisciplinaRepository =
      overrides.periodoDisciplinaRepository ?? createMockPeriodoDisciplinaRepository();
    const permissionChecker = overrides.permissionChecker ?? createMockPermissionChecker();
    const campusFindOneHandler =
      overrides.campusFindOneHandler ?? createMockFindOneHandler({ id: campusId });
    const ofertaFormacaoFindOneHandler =
      overrides.ofertaFormacaoFindOneHandler ??
      createMockFindOneHandler({ id: ofertaFormacaoId, campus: { id: campusId } });

    const handler = new CursoCreateCommandHandlerImpl(
      repository as any,
      periodoDisciplinaRepository as any,
      permissionChecker as any,
      campusFindOneHandler as any,
      ofertaFormacaoFindOneHandler as any,
    );

    return {
      handler,
      repository,
      periodoDisciplinaRepository,
      permissionChecker,
      campusFindOneHandler,
      ofertaFormacaoFindOneHandler,
    };
  }

  const campusId = createTestId();
  const ofertaFormacaoId = createTestId();

  const dto = {
    nome: "Engenharia de Software",
    nomeAbreviado: "ESW",
    quantidadePeriodos: 3,
    campus: { id: campusId },
    ofertaFormacao: { id: ofertaFormacaoId },
  };

  it("should create curso and return result from repository", async () => {
    const id = createTestId();
    const expectedResult = { id, nome: "Engenharia de Software" };

    const repository = createMockCrudRepository();
    repository.create.mockResolvedValue({ id });
    repository.getFindOneQueryResult.mockResolvedValue(expectedResult);

    const { handler } = createHandler({ repository });
    const accessContext = createTestAccessContext();

    const result = await handler.execute(accessContext, dto);

    expect(result).toEqual(expectedResult);
    expect(repository.create).toHaveBeenCalledOnce();
    expect(repository.getFindOneQueryResult).toHaveBeenCalledWith(accessContext, { id });
  });

  it("should call permissionChecker.ensureCanCreate before creating", async () => {
    const repository = createMockCrudRepository();
    repository.create.mockResolvedValue({ id: createTestId() });
    repository.getFindOneQueryResult.mockResolvedValue({ id: createTestId() });

    const permissionChecker = createMockPermissionChecker();
    const { handler } = createHandler({ repository, permissionChecker });
    const accessContext = createTestAccessContext();

    await handler.execute(accessContext, dto);

    expect(permissionChecker.ensureCanCreate).toHaveBeenCalledWith(accessContext, { dto });
  });

  it("should throw when permission check fails", async () => {
    const permissionChecker = createMockPermissionChecker();
    permissionChecker.ensureCanCreate.mockRejectedValue(new Error("Forbidden"));

    const { handler } = createHandler({ permissionChecker });
    const accessContext = createTestAccessContext();

    await expect(handler.execute(accessContext, dto)).rejects.toThrow("Forbidden");
  });

  it("should throw ResourceNotFoundError when getFindOneQueryResult returns null after create", async () => {
    const repository = createMockCrudRepository();
    repository.create.mockResolvedValue({ id: createTestId() });
    repository.getFindOneQueryResult.mockResolvedValue(null);

    const { handler } = createHandler({ repository });
    const accessContext = createTestAccessContext();

    await expect(handler.execute(accessContext, dto)).rejects.toThrow(ResourceNotFoundError);
  });

  it("should save periodos when provided", async () => {
    const id = createTestId();
    const disciplinaId = createTestId();

    const repository = createMockCrudRepository();
    repository.create.mockResolvedValue({ id });
    repository.getFindOneQueryResult.mockResolvedValue({ id });

    const periodoDisciplinaRepository = createMockPeriodoDisciplinaRepository();

    const { handler } = createHandler({ repository, periodoDisciplinaRepository });
    const accessContext = createTestAccessContext();

    await handler.execute(accessContext, {
      ...dto,
      periodos: [
        {
          numeroPeriodo: 1,
          disciplinas: [{ disciplinaId, cargaHoraria: 60 }],
        },
      ],
    });

    expect(periodoDisciplinaRepository.save).toHaveBeenCalledOnce();
    expect(periodoDisciplinaRepository.save).toHaveBeenCalledWith(
      expect.objectContaining({
        curso: { id },
        numeroPeriodo: 1,
        disciplina: { id: disciplinaId },
        cargaHoraria: 60,
      }),
    );
  });

  it("should not save periodos when not provided", async () => {
    const id = createTestId();

    const repository = createMockCrudRepository();
    repository.create.mockResolvedValue({ id });
    repository.getFindOneQueryResult.mockResolvedValue({ id });

    const periodoDisciplinaRepository = createMockPeriodoDisciplinaRepository();

    const { handler } = createHandler({ repository, periodoDisciplinaRepository });
    const accessContext = createTestAccessContext();

    await handler.execute(accessContext, dto);

    expect(periodoDisciplinaRepository.save).not.toHaveBeenCalled();
  });
});
