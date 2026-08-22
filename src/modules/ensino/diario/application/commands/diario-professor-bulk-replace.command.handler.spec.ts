import { BadRequestException } from "@nestjs/common";
import { describe, expect, it, vi } from "vitest";
import { createTestAccessContext, createTestId } from "@/test/helpers";
import type { DiarioProfessorBulkReplaceCommand } from "../../domain/commands/diario-professor-bulk-replace.command";
import { DiarioProfessorBulkReplaceCommandHandlerImpl } from "./diario-professor-bulk-replace.command.handler";

function createMockDiarioProfessorRepository() {
  return {
    create: vi.fn().mockResolvedValue({ id: createTestId() }),
    update: vi.fn().mockResolvedValue(undefined),
    softDeleteById: vi.fn().mockResolvedValue(undefined),
    softDeleteByDiarioId: vi.fn().mockResolvedValue(undefined),
    bulkCreate: vi.fn().mockResolvedValue(undefined),
    getFindOneQueryResult: vi.fn().mockResolvedValue(null),
    getFindAllQueryResult: vi.fn().mockResolvedValue({ meta: { itemCount: 0 }, data: [] }),
    findAllActiveByPerfilId: vi.fn().mockResolvedValue([]),
  };
}

function createMockPerfilFindOneHandler() {
  return { execute: vi.fn().mockResolvedValue(null) };
}

function createMockDiarioFindOneHandler() {
  return { execute: vi.fn().mockResolvedValue(null) };
}

describe("DiarioProfessorBulkReplaceCommandHandler", () => {
  function createHandler(
    overrides: {
      repository?: ReturnType<typeof createMockDiarioProfessorRepository>;
      perfilFindOneHandler?: ReturnType<typeof createMockPerfilFindOneHandler>;
      diarioFindOneHandler?: ReturnType<typeof createMockDiarioFindOneHandler>;
    } = {},
  ) {
    const repository = overrides.repository ?? createMockDiarioProfessorRepository();
    const perfilFindOneHandler = overrides.perfilFindOneHandler ?? createMockPerfilFindOneHandler();
    const diarioFindOneHandler = overrides.diarioFindOneHandler ?? createMockDiarioFindOneHandler();

    const handler = new DiarioProfessorBulkReplaceCommandHandlerImpl(
      repository as any,
      perfilFindOneHandler as any,
      diarioFindOneHandler as any,
    );

    return { handler, repository, perfilFindOneHandler, diarioFindOneHandler };
  }

  function createDiario(cargaHoraria: number) {
    return { id: createTestId(), disciplina: { cargaHoraria } };
  }

  function createPerfil(cargaMaximaSemanal: number | null) {
    return { id: createTestId(), cargaMaximaSemanal };
  }

  it("passes through unchanged when no perfil has a cap set", async () => {
    const diarioId = createTestId();
    const perfilId = createTestId();

    const repository = createMockDiarioProfessorRepository();
    const perfilFindOneHandler = createMockPerfilFindOneHandler();
    perfilFindOneHandler.execute.mockResolvedValue(createPerfil(null));
    const diarioFindOneHandler = createMockDiarioFindOneHandler();
    diarioFindOneHandler.execute.mockResolvedValue(createDiario(10));

    const { handler } = createHandler({ repository, perfilFindOneHandler, diarioFindOneHandler });
    const accessContext = createTestAccessContext();
    const dto: DiarioProfessorBulkReplaceCommand = {
      diarioId,
      professores: [{ perfilId, situacao: true }],
    };

    await handler.execute(accessContext, dto);

    expect(repository.softDeleteByDiarioId).toHaveBeenCalledWith(diarioId);
    expect(repository.bulkCreate).toHaveBeenCalledWith([{ situacao: true, diarioId, perfilId }]);
  });

  it("throws when adding this diario would push a capped perfil over their limit", async () => {
    const diarioId = createTestId();
    const perfilId = createTestId();
    const outroDiarioId = createTestId();

    const repository = createMockDiarioProfessorRepository();
    repository.findAllActiveByPerfilId.mockResolvedValue([
      { diarioId: outroDiarioId, cargaHoraria: 30 },
    ]);

    const perfilFindOneHandler = createMockPerfilFindOneHandler();
    perfilFindOneHandler.execute.mockResolvedValue(createPerfil(35));

    const diarioFindOneHandler = createMockDiarioFindOneHandler();
    diarioFindOneHandler.execute.mockResolvedValue(createDiario(10));

    const { handler } = createHandler({ repository, perfilFindOneHandler, diarioFindOneHandler });
    const accessContext = createTestAccessContext();
    const dto: DiarioProfessorBulkReplaceCommand = {
      diarioId,
      professores: [{ perfilId, situacao: true }],
    };

    await expect(handler.execute(accessContext, dto)).rejects.toThrow(BadRequestException);
    expect(repository.softDeleteByDiarioId).not.toHaveBeenCalled();
    expect(repository.bulkCreate).not.toHaveBeenCalled();
  });

  it("passes when a capped perfil's total is exactly at their limit", async () => {
    const diarioId = createTestId();
    const perfilId = createTestId();
    const outroDiarioId = createTestId();

    const repository = createMockDiarioProfessorRepository();
    repository.findAllActiveByPerfilId.mockResolvedValue([
      { diarioId: outroDiarioId, cargaHoraria: 30 },
    ]);

    const perfilFindOneHandler = createMockPerfilFindOneHandler();
    perfilFindOneHandler.execute.mockResolvedValue(createPerfil(40));

    const diarioFindOneHandler = createMockDiarioFindOneHandler();
    diarioFindOneHandler.execute.mockResolvedValue(createDiario(10));

    const { handler } = createHandler({ repository, perfilFindOneHandler, diarioFindOneHandler });
    const accessContext = createTestAccessContext();
    const dto: DiarioProfessorBulkReplaceCommand = {
      diarioId,
      professores: [{ perfilId, situacao: true }],
    };

    await handler.execute(accessContext, dto);

    expect(repository.softDeleteByDiarioId).toHaveBeenCalledWith(diarioId);
    expect(repository.bulkCreate).toHaveBeenCalled();
  });

  it("excludes this diario's prior link when summing existing load elsewhere", async () => {
    const diarioId = createTestId();
    const perfilId = createTestId();

    const repository = createMockDiarioProfessorRepository();
    // O unico vinculo ativo existente do perfil eh no MESMO diario sendo substituido.
    repository.findAllActiveByPerfilId.mockResolvedValue([{ diarioId, cargaHoraria: 10 }]);

    const perfilFindOneHandler = createMockPerfilFindOneHandler();
    perfilFindOneHandler.execute.mockResolvedValue(createPerfil(10));

    const diarioFindOneHandler = createMockDiarioFindOneHandler();
    diarioFindOneHandler.execute.mockResolvedValue(createDiario(10));

    const { handler } = createHandler({ repository, perfilFindOneHandler, diarioFindOneHandler });
    const accessContext = createTestAccessContext();
    const dto: DiarioProfessorBulkReplaceCommand = {
      diarioId,
      professores: [{ perfilId, situacao: true }],
    };

    // Se o vinculo existente no MESMO diario fosse contado junto com o novo,
    // o total seria 20h e excederia o limite de 10h. Nao deve lancar.
    await expect(handler.execute(accessContext, dto)).resolves.toBeDefined();
    expect(repository.softDeleteByDiarioId).toHaveBeenCalledWith(diarioId);
    expect(repository.bulkCreate).toHaveBeenCalled();
  });

  it("does not count a situacao: false entry toward load", async () => {
    const diarioId = createTestId();
    const perfilId = createTestId();
    const outroDiarioId = createTestId();

    const repository = createMockDiarioProfessorRepository();
    repository.findAllActiveByPerfilId.mockResolvedValue([
      { diarioId: outroDiarioId, cargaHoraria: 35 },
    ]);

    const perfilFindOneHandler = createMockPerfilFindOneHandler();
    perfilFindOneHandler.execute.mockResolvedValue(createPerfil(10));

    const diarioFindOneHandler = createMockDiarioFindOneHandler();
    diarioFindOneHandler.execute.mockResolvedValue(createDiario(20));

    const { handler } = createHandler({ repository, perfilFindOneHandler, diarioFindOneHandler });
    const accessContext = createTestAccessContext();
    const dto: DiarioProfessorBulkReplaceCommand = {
      diarioId,
      professores: [{ perfilId, situacao: false }],
    };

    await handler.execute(accessContext, dto);

    expect(perfilFindOneHandler.execute).not.toHaveBeenCalled();
    expect(repository.softDeleteByDiarioId).toHaveBeenCalledWith(diarioId);
    expect(repository.bulkCreate).toHaveBeenCalledWith([{ situacao: false, diarioId, perfilId }]);
  });
});
