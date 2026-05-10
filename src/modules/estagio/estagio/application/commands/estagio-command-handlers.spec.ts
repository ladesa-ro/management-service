import { describe, expect, it, vi } from "vitest";
import { ResourceNotFoundError } from "@/application/errors";
import {
  createMockCqrsRepository,
  createTestAccessContext,
  createTestDomainEntity,
  createTestId,
} from "@/test/helpers";
import { EstagioCreateCommandHandlerImpl } from "./estagio-create.command.handler";
import { EstagioDeleteCommandHandlerImpl } from "./estagio-delete.command.handler";
import { EstagioUpdateCommandHandlerImpl } from "./estagio-update.command.handler";

function createMockEstagioRepository() {
  return {
    ...createMockCqrsRepository(),
    replaceHorariosEstagio: vi.fn().mockResolvedValue(undefined),
    softDeleteHorariosEstagio: vi.fn().mockResolvedValue(undefined),
  };
}

function createValidCreateDto() {
  return {
    empresa: { id: createTestId() },
    cargaHoraria: 20,
    status: "EM_FASE_INICIAL",
    horariosEstagio: [{ diaSemana: 1, horaInicio: "08:00", horaFim: "12:00" }],
  };
}

describe("EstagioCreateCommandHandler", () => {
  it("should create estagio with horarios and return query result", async () => {
    const repository = createMockEstagioRepository();
    const savedResult = { id: createTestId(), status: "EM_FASE_INICIAL" };
    repository.getFindOneQueryResult.mockResolvedValue(savedResult);

    const handler = new EstagioCreateCommandHandlerImpl(repository as any);
    const result = await handler.execute(createTestAccessContext(), createValidCreateDto() as any);

    expect(result).toEqual(savedResult);
    expect(repository.save).toHaveBeenCalled();
  });

  it("should throw if created entity not found", async () => {
    const repository = createMockEstagioRepository();
    repository.getFindOneQueryResult.mockResolvedValue(null);

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
    const domain = createTestDomainEntity({ id, status: "ABERTA" });
    const updated = { id, status: "EM_ANDAMENTO" };
    repository.loadById.mockResolvedValue(domain);
    repository.getFindOneQueryResult.mockResolvedValue(updated);

    const handler = new EstagioUpdateCommandHandlerImpl(repository as any);
    const newHorarios = [{ diaSemana: 2, horaInicio: "14:00", horaFim: "18:00" }];
    const result = await handler.execute(createTestAccessContext(), {
      id,
      status: "EM_ANDAMENTO",
      horariosEstagio: newHorarios,
    } as any);

    expect(result).toEqual(updated);
    expect(repository.save).toHaveBeenCalled();
  });

  it("should throw if entity not found", async () => {
    const repository = createMockEstagioRepository();
    repository.loadById.mockResolvedValue(null);

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
    const domain = createTestDomainEntity({ id });
    repository.loadById.mockResolvedValue(domain);

    const handler = new EstagioDeleteCommandHandlerImpl(repository as any);
    await handler.execute(createTestAccessContext(), { id } as any);

    expect(repository.softDeleteHorariosEstagio).toHaveBeenCalledWith(id);
    expect(repository.softDeleteById).toHaveBeenCalledWith(id);
  });

  it("should throw if entity not found", async () => {
    const repository = createMockEstagioRepository();
    repository.loadById.mockResolvedValue(null);

    const handler = new EstagioDeleteCommandHandlerImpl(repository as any);

    await expect(
      handler.execute(createTestAccessContext(), { id: createTestId() } as any),
    ).rejects.toThrow(ResourceNotFoundError);
  });
});
