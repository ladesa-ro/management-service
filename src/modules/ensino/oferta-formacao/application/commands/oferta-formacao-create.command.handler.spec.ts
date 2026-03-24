import { describe, expect, it, vi } from "vitest";
import { ResourceNotFoundError } from "@/application/errors";
import {
  createMockPermissionChecker,
  createTestAccessContext,
  createTestId,
  createTestRef,
} from "@/test/helpers";
import { OfertaFormacaoCreateCommandHandlerImpl } from "./oferta-formacao-create.command.handler";

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

function createValidDto() {
  return {
    nome: "Técnico em Informática",
    slug: "tecnico-informatica",
    duracaoPeriodoEmMeses: 6,
    modalidade: createTestRef(),
    campus: createTestRef(),
    niveisFormacoes: [createTestRef()],
    periodos: [{ numeroPeriodo: 1, etapas: [{ nome: "Bimestre", cor: "blue" }] }],
  };
}

describe("OfertaFormacaoCreateCommandHandler", () => {
  it("should create, save, and return query result", async () => {
    const dto = createValidDto();
    const savedResult = { id: createTestId(), nome: dto.nome };

    const repository = createMockRepository();
    repository.getFindOneQueryResult.mockResolvedValue(savedResult);

    const handler = new OfertaFormacaoCreateCommandHandlerImpl(
      repository as any,
      createMockPermissionChecker() as any,
      createMockQueryHandler() as any,
      createMockQueryHandler() as any,
      createMockQueryHandler() as any,
    );
    const accessContext = createTestAccessContext();

    const result = await handler.execute(accessContext, dto as any);

    expect(result).toEqual(savedResult);
    expect(repository.save).toHaveBeenCalled();
    expect(repository.getFindOneQueryResult).toHaveBeenCalled();
  });

  it("should check permissions before creating", async () => {
    const dto = createValidDto();
    const repository = createMockRepository();
    repository.getFindOneQueryResult.mockResolvedValue({ id: createTestId() });
    const permissionChecker = createMockPermissionChecker();

    const handler = new OfertaFormacaoCreateCommandHandlerImpl(
      repository as any,
      permissionChecker as any,
      createMockQueryHandler() as any,
      createMockQueryHandler() as any,
      createMockQueryHandler() as any,
    );

    await handler.execute(createTestAccessContext(), dto as any);

    expect(permissionChecker.ensureCanCreate).toHaveBeenCalled();
  });

  it("should validate campus existence", async () => {
    const dto = createValidDto();
    const campusHandler = createMockQueryHandler(null);

    const handler = new OfertaFormacaoCreateCommandHandlerImpl(
      createMockRepository() as any,
      createMockPermissionChecker() as any,
      createMockQueryHandler() as any,
      campusHandler as any,
      createMockQueryHandler() as any,
    );

    await expect(handler.execute(createTestAccessContext(), dto as any)).rejects.toThrow(
      ResourceNotFoundError,
    );
  });

  it("should validate modalidade existence when provided", async () => {
    const dto = createValidDto();
    const modalidadeHandler = createMockQueryHandler(null);

    const handler = new OfertaFormacaoCreateCommandHandlerImpl(
      createMockRepository() as any,
      createMockPermissionChecker() as any,
      modalidadeHandler as any,
      createMockQueryHandler() as any,
      createMockQueryHandler() as any,
    );

    await expect(handler.execute(createTestAccessContext(), dto as any)).rejects.toThrow(
      ResourceNotFoundError,
    );
  });

  it("should validate each nivelFormacao existence", async () => {
    const ref1 = createTestRef();
    const ref2 = createTestRef();
    const dto = createValidDto();
    dto.niveisFormacoes = [ref1, ref2];

    const nivelFormacaoHandler = createMockQueryHandler();
    nivelFormacaoHandler.execute.mockResolvedValueOnce({ id: ref1.id }).mockResolvedValueOnce(null);

    const handler = new OfertaFormacaoCreateCommandHandlerImpl(
      createMockRepository() as any,
      createMockPermissionChecker() as any,
      createMockQueryHandler() as any,
      createMockQueryHandler() as any,
      nivelFormacaoHandler as any,
    );

    await expect(handler.execute(createTestAccessContext(), dto as any)).rejects.toThrow(
      ResourceNotFoundError,
    );
  });

  it("should throw when getFindOneQueryResult returns null after save", async () => {
    const dto = createValidDto();
    const repository = createMockRepository();
    repository.getFindOneQueryResult.mockResolvedValue(null);

    const handler = new OfertaFormacaoCreateCommandHandlerImpl(
      repository as any,
      createMockPermissionChecker() as any,
      createMockQueryHandler() as any,
      createMockQueryHandler() as any,
      createMockQueryHandler() as any,
    );

    await expect(handler.execute(createTestAccessContext(), dto as any)).rejects.toThrow(
      ResourceNotFoundError,
    );
  });
});
