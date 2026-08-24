import { describe, expect, it, vi } from "vitest";
import {
  createMockCqrsRepository,
  createMockPermissionChecker,
  createTestAccessContext,
  createTestId,
} from "@/test/helpers";
import { CalendarioIndisponibilidadeAmbienteTipo } from "../../domain/calendario-indisponibilidade-ambiente.types";
import { CalendarioIndisponibilidadeAmbienteCreateCommandHandlerImpl } from "./calendario-indisponibilidade-ambiente-create.command.handler";

function createValidDto() {
  return {
    ambiente: { id: createTestId() },
    tipo: CalendarioIndisponibilidadeAmbienteTipo.BLOQUEIO,
    diaSemana: 1,
    data: undefined,
    inicio: "08:00:00",
    fim: "12:00:00",
    motivo: null,
  };
}

function createRepository() {
  return {
    ...createMockCqrsRepository(),
    findAllAtivasByAmbienteId: vi.fn().mockResolvedValue([]),
  };
}

describe("CalendarioIndisponibilidadeAmbienteCreateCommandHandlerImpl", () => {
  function createHandler(overrides: { repository?: object; permissionChecker?: object } = {}) {
    const repository = overrides.repository ?? createRepository();
    const permissionChecker = overrides.permissionChecker ?? createMockPermissionChecker();

    const handler = new CalendarioIndisponibilidadeAmbienteCreateCommandHandlerImpl(
      repository as any,
      permissionChecker as any,
    );

    return { handler, repository, permissionChecker };
  }

  it("should create and return the result from repository.getFindOneQueryResult", async () => {
    const id = createTestId();
    const expectedResult = { id, tipo: CalendarioIndisponibilidadeAmbienteTipo.BLOQUEIO };

    const repository = createRepository();
    repository.getFindOneQueryResult.mockResolvedValue(expectedResult);

    const { handler } = createHandler({ repository });
    const accessContext = createTestAccessContext();
    const dto = createValidDto();

    const result = await handler.execute(accessContext, dto as any);

    expect(result).toEqual(expectedResult);
    expect(repository.save).toHaveBeenCalledOnce();
    expect(repository.getFindOneQueryResult).toHaveBeenCalledWith(
      accessContext,
      expect.objectContaining({ id: expect.any(String) }),
    );
  });

  it("should call permissionChecker.ensureCanCreate before creating", async () => {
    const repository = createRepository();
    repository.getFindOneQueryResult.mockResolvedValue({ id: createTestId() });

    const permissionChecker = createMockPermissionChecker();
    const { handler } = createHandler({ repository, permissionChecker });
    const accessContext = createTestAccessContext();
    const dto = createValidDto();

    await handler.execute(accessContext, dto as any);

    expect(permissionChecker.ensureCanCreate).toHaveBeenCalledWith(accessContext, { dto });
  });

  it("should throw when permission check fails", async () => {
    const permissionChecker = createMockPermissionChecker();
    permissionChecker.ensureCanCreate.mockRejectedValue(new Error("Forbidden"));

    const { handler } = createHandler({ permissionChecker });
    const accessContext = createTestAccessContext();

    await expect(handler.execute(accessContext, createValidDto() as any)).rejects.toThrow(
      "Forbidden",
    );
  });

  it("should throw when both diaSemana and data are provided", async () => {
    const { handler } = createHandler();
    const accessContext = createTestAccessContext();

    await expect(
      handler.execute(accessContext, { ...createValidDto(), data: "2026-03-10" } as any),
    ).rejects.toThrow();
  });

  it("should throw ResourceNotFoundError-like error when the repository cannot find the saved entity", async () => {
    const repository = createRepository();
    repository.getFindOneQueryResult.mockResolvedValue(null);

    const { handler } = createHandler({ repository });
    const accessContext = createTestAccessContext();

    await expect(handler.execute(accessContext, createValidDto() as any)).rejects.toThrow();
  });
});
