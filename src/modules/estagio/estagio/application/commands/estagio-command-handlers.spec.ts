import { describe, expect, it, vi } from "vitest";
import { ResourceNotFoundError } from "@/application/errors";
import { createMockCrudRepository, createTestAccessContext, createTestId } from "@/test/helpers";
import { EstagioCreateCommandHandlerImpl } from "./estagio-create.command.handler";
import { EstagioDeleteCommandHandlerImpl } from "./estagio-delete.command.handler";
import { EstagioUpdateCommandHandlerImpl } from "./estagio-update.command.handler";

function createMockEstagioRepository() {
  return {
    ...createMockCrudRepository(),
    replaceHorariosEstagio: vi.fn().mockResolvedValue(undefined),
    softDeleteHorariosEstagio: vi.fn().mockResolvedValue(undefined),
  };
}

function createValidCreateDto() {
  return {
    empresa: { id: createTestId() },
    cargaHoraria: 20,
    status: "ABERTA",
    horariosEstagio: [{ diaSemana: 1, horaInicio: "08:00", horaFim: "12:00" }],
  };
}

describe("EstagioCreateCommandHandler", () => {
  it("should create estagio with horarios and return query result", async () => {
    const repository = createMockEstagioRepository();
    const savedResult = { id: createTestId(), status: "ABERTA" };
    repository.findById.mockResolvedValue(savedResult);

    const handler = new EstagioCreateCommandHandlerImpl(repository as any);
    const result = await handler.execute(createTestAccessContext(), createValidCreateDto() as any);

    expect(result).toEqual(savedResult);
    expect(repository.create).toHaveBeenCalled();
    expect(repository.replaceHorariosEstagio).toHaveBeenCalled();
    expect(repository.findById).toHaveBeenCalled();
  });

  it("should skip replaceHorariosEstagio when horarios is empty", async () => {
    const repository = createMockEstagioRepository();
    const savedResult = { id: createTestId(), status: "ABERTA" };
    repository.findById.mockResolvedValue(savedResult);

    const dto = { ...createValidCreateDto(), horariosEstagio: [] };
    const handler = new EstagioCreateCommandHandlerImpl(repository as any);
    await handler.execute(createTestAccessContext(), dto as any);

    expect(repository.replaceHorariosEstagio).not.toHaveBeenCalled();
  });

  it("should throw if created entity not found", async () => {
    const repository = createMockEstagioRepository();
    repository.findById.mockResolvedValue(null);

    const handler = new EstagioCreateCommandHandlerImpl(repository as any);

    await expect(
      handler.execute(createTestAccessContext(), createValidCreateDto() as any),
    ).rejects.toThrow(ResourceNotFoundError);
  });
});

describe("EstagioUpdateCommandHandler", () => {
  it("should verify existence, update, replace horarios, and return result", async () => {
    const id = createTestId();
    const repository = createMockEstagioRepository();
    const existing = { id, status: "ABERTA" };
    const updated = { id, status: "EM_ANDAMENTO" };
    repository.findById.mockResolvedValueOnce(existing).mockResolvedValueOnce(updated);

    const handler = new EstagioUpdateCommandHandlerImpl(repository as any);
    const newHorarios = [{ diaSemana: 2, horaInicio: "14:00", horaFim: "18:00" }];
    const result = await handler.execute(createTestAccessContext(), {
      id,
      status: "EM_ANDAMENTO",
      horariosEstagio: newHorarios,
    } as any);

    expect(result).toEqual(updated);
    expect(repository.update).toHaveBeenCalledWith(id, {
      status: "EM_ANDAMENTO",
      horariosEstagio: newHorarios,
    });
    expect(repository.replaceHorariosEstagio).toHaveBeenCalledWith(id, newHorarios);
  });

  it("should skip replaceHorariosEstagio when horariosEstagio not in dto", async () => {
    const id = createTestId();
    const repository = createMockEstagioRepository();
    repository.findById.mockResolvedValue({ id, status: "ABERTA" });

    const handler = new EstagioUpdateCommandHandlerImpl(repository as any);
    await handler.execute(createTestAccessContext(), { id, status: "EM_ANDAMENTO" } as any);

    expect(repository.replaceHorariosEstagio).not.toHaveBeenCalled();
  });

  it("should throw if entity not found", async () => {
    const repository = createMockEstagioRepository();
    repository.findById.mockResolvedValue(null);

    const handler = new EstagioUpdateCommandHandlerImpl(repository as any);

    await expect(
      handler.execute(createTestAccessContext(), { id: createTestId() } as any),
    ).rejects.toThrow(ResourceNotFoundError);
  });
});

describe("EstagioDeleteCommandHandler", () => {
  it("should verify existence, soft delete horarios, then soft delete estagio", async () => {
    const id = createTestId();
    const repository = createMockEstagioRepository();
    repository.findById.mockResolvedValue({ id });

    const handler = new EstagioDeleteCommandHandlerImpl(repository as any);
    await handler.execute(createTestAccessContext(), { id } as any);

    expect(repository.softDeleteHorariosEstagio).toHaveBeenCalledWith(id);
    expect(repository.softDeleteById).toHaveBeenCalledWith(id);
  });

  it("should throw if entity not found", async () => {
    const repository = createMockEstagioRepository();
    repository.findById.mockResolvedValue(null);

    const handler = new EstagioDeleteCommandHandlerImpl(repository as any);

    await expect(
      handler.execute(createTestAccessContext(), { id: createTestId() } as any),
    ).rejects.toThrow(ResourceNotFoundError);
  });
});
