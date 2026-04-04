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
import { OfertaFormacaoDeleteCommandHandlerImpl } from "./oferta-formacao-delete.command.handler";

function createMockRepository() {
  return {
    loadById: vi.fn().mockResolvedValue(null),
    save: vi.fn().mockResolvedValue(undefined),
    softDeleteById: vi.fn().mockResolvedValue(undefined),
    getFindOneQueryResult: vi.fn().mockResolvedValue(null),
    getFindAllQueryResult: vi.fn().mockResolvedValue({ meta: {}, data: [] }),
  };
}

function createTestAggregate() {
  return OfertaFormacao.load({
    id: createTestId(),
    nome: "Técnico",
    slug: "tecnico",
    duracaoPeriodoEmMeses: 6,
    modalidade: createTestRef(),
    campus: createTestRef(),
    niveisFormacoes: [createTestRef()],
    periodos: [{ numeroPeriodo: 1, etapas: [{ nome: "Bimestre", cor: "blue" }] }],
    imagemCapa: null,
    ...createTestDatedFields(),
  });
}

describe("OfertaFormacaoDeleteCommandHandler", () => {
  it("should delete existing entity via loadById + softDeleteById", async () => {
    const aggregate = createTestAggregate();
    const repository = createMockRepository();
    repository.loadById.mockResolvedValue(aggregate);
    const permissionChecker = createMockPermissionChecker();

    const handler = new OfertaFormacaoDeleteCommandHandlerImpl(
      repository as any,
      permissionChecker as any,
    );
    const accessContext = createTestAccessContext();

    const result = await handler.execute(accessContext, { id: aggregate.id } as any);

    expect(result).toBe(true);
    expect(repository.loadById).toHaveBeenCalledWith(accessContext, aggregate.id);
    expect(repository.softDeleteById).toHaveBeenCalledWith(aggregate.id);
    expect(permissionChecker.ensureCanDelete).toHaveBeenCalled();
  });

  it("should throw ResourceNotFoundError when entity does not exist", async () => {
    const repository = createMockRepository();
    repository.loadById.mockResolvedValue(null);
    const permissionChecker = createMockPermissionChecker();

    const handler = new OfertaFormacaoDeleteCommandHandlerImpl(
      repository as any,
      permissionChecker as any,
    );
    const id = createTestId();

    await expect(handler.execute(createTestAccessContext(), { id } as any)).rejects.toThrow(
      ResourceNotFoundError,
    );
    expect(repository.softDeleteById).not.toHaveBeenCalled();
  });

  it("should check permissions before loading entity", async () => {
    const aggregate = createTestAggregate();
    const repository = createMockRepository();
    repository.loadById.mockResolvedValue(aggregate);
    const permissionChecker = createMockPermissionChecker();

    const handler = new OfertaFormacaoDeleteCommandHandlerImpl(
      repository as any,
      permissionChecker as any,
    );

    await handler.execute(createTestAccessContext(), { id: aggregate.id } as any);

    expect(permissionChecker.ensureCanDelete).toHaveBeenCalled();
  });
});
