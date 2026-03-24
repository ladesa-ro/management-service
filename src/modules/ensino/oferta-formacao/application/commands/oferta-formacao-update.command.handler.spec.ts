import { describe, expect, it, vi } from "vitest";
import { ResourceNotFoundError } from "@/application/errors";
import {
  createMockPermissionChecker,
  createTestAccessContext,
  createTestDatedFields,
  createTestId,
  createTestRef,
} from "@/test/helpers";
import { OfertaFormacao } from "../../domain/oferta-formacao";
import { OfertaFormacaoUpdateCommandHandlerImpl } from "./oferta-formacao-update.command.handler";

function createMockRepository() {
  return {
    loadById: vi.fn().mockResolvedValue(null),
    save: vi.fn().mockResolvedValue(undefined),
    softDeleteById: vi.fn().mockResolvedValue(undefined),
    getFindOneQueryResult: vi.fn().mockResolvedValue(null),
    getFindAllQueryResult: vi.fn().mockResolvedValue({ meta: {}, data: [] }),
  };
}

function createMockQueryHandler(defaultResult: unknown = { id: createTestId() }) {
  return { execute: vi.fn().mockResolvedValue(defaultResult) };
}

function createTestAggregate(overrides: Record<string, unknown> = {}) {
  return OfertaFormacao.load({
    id: createTestId(),
    nome: "Técnico",
    slug: "tecnico",
    duracaoPeriodoEmMeses: 6,
    modalidade: createTestRef(),
    campus: createTestRef(),
    niveisFormacoes: [createTestRef()],
    periodos: [{ numeroPeriodo: 1, etapas: [{ nome: "Bimestre", cor: "blue" }] }],
    ...createTestDatedFields(),
    ...overrides,
  });
}

describe("OfertaFormacaoUpdateCommandHandler", () => {
  it("should load aggregate via loadById, update, save, and return query result", async () => {
    const aggregate = createTestAggregate();
    const updatedResult = { id: aggregate.id, nome: "Atualizado" };

    const repository = createMockRepository();
    repository.loadById.mockResolvedValue(aggregate);
    repository.getFindOneQueryResult.mockResolvedValue(updatedResult);

    const permissionChecker = createMockPermissionChecker();
    const modalidadeHandler = createMockQueryHandler();
    const campusHandler = createMockQueryHandler();
    const nivelFormacaoHandler = createMockQueryHandler();

    const handler = new OfertaFormacaoUpdateCommandHandlerImpl(
      repository as any,
      permissionChecker as any,
      modalidadeHandler as any,
      campusHandler as any,
      nivelFormacaoHandler as any,
    );
    const accessContext = createTestAccessContext();

    const result = await handler.execute(accessContext, {
      id: aggregate.id,
      nome: "Atualizado",
    } as any);

    expect(result).toEqual(updatedResult);
    expect(repository.loadById).toHaveBeenCalledWith(accessContext, aggregate.id);
    expect(repository.save).toHaveBeenCalled();
    expect(repository.getFindOneQueryResult).toHaveBeenCalledWith(accessContext, {
      id: aggregate.id,
    });
  });

  it("should throw ResourceNotFoundError when entity does not exist", async () => {
    const repository = createMockRepository();
    repository.loadById.mockResolvedValue(null);

    const handler = new OfertaFormacaoUpdateCommandHandlerImpl(
      repository as any,
      createMockPermissionChecker() as any,
      createMockQueryHandler() as any,
      createMockQueryHandler() as any,
      createMockQueryHandler() as any,
    );

    await expect(
      handler.execute(createTestAccessContext(), { id: createTestId(), nome: "X" } as any),
    ).rejects.toThrow(ResourceNotFoundError);

    expect(repository.save).not.toHaveBeenCalled();
  });

  it("should validate modalidade existence when provided", async () => {
    const aggregate = createTestAggregate();
    const modalidadeId = createTestId();

    const repository = createMockRepository();
    repository.loadById.mockResolvedValue(aggregate);
    repository.getFindOneQueryResult.mockResolvedValue({ id: aggregate.id });

    const modalidadeHandler = createMockQueryHandler({ id: modalidadeId });

    const handler = new OfertaFormacaoUpdateCommandHandlerImpl(
      repository as any,
      createMockPermissionChecker() as any,
      modalidadeHandler as any,
      createMockQueryHandler() as any,
      createMockQueryHandler() as any,
    );

    await handler.execute(createTestAccessContext(), {
      id: aggregate.id,
      modalidade: { id: modalidadeId },
    } as any);

    expect(modalidadeHandler.execute).toHaveBeenCalledWith(expect.anything(), {
      id: modalidadeId,
    });
  });

  it("should throw when modalidade does not exist", async () => {
    const aggregate = createTestAggregate();

    const repository = createMockRepository();
    repository.loadById.mockResolvedValue(aggregate);

    const modalidadeHandler = createMockQueryHandler(null);

    const handler = new OfertaFormacaoUpdateCommandHandlerImpl(
      repository as any,
      createMockPermissionChecker() as any,
      modalidadeHandler as any,
      createMockQueryHandler() as any,
      createMockQueryHandler() as any,
    );

    await expect(
      handler.execute(createTestAccessContext(), {
        id: aggregate.id,
        modalidade: { id: createTestId() },
      } as any),
    ).rejects.toThrow(ResourceNotFoundError);
  });

  it("should not call domain.update when loadById returns null", async () => {
    const repository = createMockRepository();
    repository.loadById.mockResolvedValue(null);

    const handler = new OfertaFormacaoUpdateCommandHandlerImpl(
      repository as any,
      createMockPermissionChecker() as any,
      createMockQueryHandler() as any,
      createMockQueryHandler() as any,
      createMockQueryHandler() as any,
    );

    await expect(
      handler.execute(createTestAccessContext(), { id: createTestId() } as any),
    ).rejects.toThrow();

    expect(repository.save).not.toHaveBeenCalled();
  });
});
