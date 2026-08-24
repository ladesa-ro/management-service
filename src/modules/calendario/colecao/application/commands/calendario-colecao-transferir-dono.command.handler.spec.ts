import { describe, expect, it, vi } from "vitest";
import { ForbiddenError, ResourceNotFoundError } from "@/application/errors/application.error";
import {
  createMockCqrsRepository,
  createTestAccessContext,
  createTestId,
  createTestRequestActor,
} from "@/test/helpers";
import { CalendarioColecao } from "../../domain/calendario-colecao";
import { CalendarioColecaoTransferirDonoCommandHandlerImpl } from "./calendario-colecao-transferir-dono.command.handler";

function createActiveDomain(overrides: Record<string, unknown> = {}) {
  return CalendarioColecao.create({
    dono: { id: createTestId() },
    nome: "Agenda do departamento",
    ...overrides,
  });
}

function createMockUsuarioFindByIdSimpleHandler() {
  return { execute: vi.fn() };
}

describe("CalendarioColecaoTransferirDonoCommandHandlerImpl", () => {
  function createHandler(
    overrides: {
      repository?: object;
      usuarioFindByIdSimpleHandler?: object;
    } = {},
  ) {
    const repository = overrides.repository ?? createMockCqrsRepository();
    const usuarioFindByIdSimpleHandler =
      overrides.usuarioFindByIdSimpleHandler ?? createMockUsuarioFindByIdSimpleHandler();

    const handler = new CalendarioColecaoTransferirDonoCommandHandlerImpl(
      repository as any,
      usuarioFindByIdSimpleHandler as any,
    );

    return { handler, repository, usuarioFindByIdSimpleHandler };
  }

  it("should transfer dono when caller is the current owner and novoDonoId exists", async () => {
    const donoAtualId = createTestId();
    const novoDonoId = createTestId();
    const domain = createActiveDomain({ dono: { id: donoAtualId } });

    const repository = createMockCqrsRepository();
    repository.loadById.mockResolvedValue(domain);
    repository.getFindOneQueryResult.mockResolvedValue({ id: domain.id, dono: { id: novoDonoId } });

    const usuarioFindByIdSimpleHandler = createMockUsuarioFindByIdSimpleHandler();
    usuarioFindByIdSimpleHandler.execute.mockResolvedValue({ id: novoDonoId });

    const { handler } = createHandler({ repository, usuarioFindByIdSimpleHandler });
    const accessContext = createTestAccessContext(createTestRequestActor({ id: donoAtualId }));

    const result = await handler.execute(accessContext, { id: domain.id, novoDonoId });

    expect(domain.dono).toEqual({ id: novoDonoId });
    expect(repository.save).toHaveBeenCalledWith(domain);
    expect(result).toEqual({ id: domain.id, dono: { id: novoDonoId } });
  });

  it("should reject when caller is not the current owner", async () => {
    const donoAtualId = createTestId();
    const outroUsuarioId = createTestId();
    const novoDonoId = createTestId();
    const domain = createActiveDomain({ dono: { id: donoAtualId } });

    const repository = createMockCqrsRepository();
    repository.loadById.mockResolvedValue(domain);

    const { handler } = createHandler({ repository });
    const accessContext = createTestAccessContext(createTestRequestActor({ id: outroUsuarioId }));

    await expect(
      handler.execute(accessContext, { id: domain.id, novoDonoId }),
    ).rejects.toThrow(ForbiddenError);
    expect(repository.save).not.toHaveBeenCalled();
  });

  it("should reject when novoDonoId does not correspond to an existing usuario", async () => {
    const donoAtualId = createTestId();
    const novoDonoId = createTestId();
    const domain = createActiveDomain({ dono: { id: donoAtualId } });

    const repository = createMockCqrsRepository();
    repository.loadById.mockResolvedValue(domain);

    const usuarioFindByIdSimpleHandler = createMockUsuarioFindByIdSimpleHandler();
    usuarioFindByIdSimpleHandler.execute.mockResolvedValue(null);

    const { handler } = createHandler({ repository, usuarioFindByIdSimpleHandler });
    const accessContext = createTestAccessContext(createTestRequestActor({ id: donoAtualId }));

    await expect(
      handler.execute(accessContext, { id: domain.id, novoDonoId }),
    ).rejects.toThrow(ResourceNotFoundError);
    expect(repository.save).not.toHaveBeenCalled();
  });

  it("should throw ResourceNotFoundError when colecao does not exist", async () => {
    const repository = createMockCqrsRepository();
    repository.loadById.mockResolvedValue(null);

    const { handler } = createHandler({ repository });
    const accessContext = createTestAccessContext();

    await expect(
      handler.execute(accessContext, { id: createTestId(), novoDonoId: createTestId() }),
    ).rejects.toThrow(ResourceNotFoundError);
  });
});
