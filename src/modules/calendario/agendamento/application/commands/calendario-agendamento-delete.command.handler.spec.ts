import { describe, expect, it } from "vitest";
import { GoneError, ResourceNotFoundError } from "@/application/errors/application.error";
import {
  createMockAgendamentoRepository,
  createMockPermissionChecker,
  createTestAccessContext,
  createTestId,
} from "@/test/helpers";
import { CalendarioAgendamento } from "../../domain/calendario-agendamento";
import { CalendarioAgendamentoTipo } from "../../domain/calendario-agendamento.types";
import { CalendarioAgendamentoDeleteCommandHandlerImpl } from "./calendario-agendamento-delete.command.handler";

function createActiveDomain(): CalendarioAgendamento {
  return CalendarioAgendamento.create({
    tipo: CalendarioAgendamentoTipo.AULA,
    dataInicio: "2026-03-01",
    diaInteiro: false,
    horarioInicio: "08:00:00",
    horarioFim: "09:00:00",
  });
}

describe("CalendarioAgendamentoDeleteCommandHandler", () => {
  function createHandler(overrides: { repository?: object; permissionChecker?: object } = {}) {
    const repository = overrides.repository ?? createMockAgendamentoRepository();
    const permissionChecker = overrides.permissionChecker ?? createMockPermissionChecker();

    const handler = new CalendarioAgendamentoDeleteCommandHandlerImpl(
      repository as any,
      permissionChecker as any,
    );

    return { handler, repository, permissionChecker };
  }

  it("should close version and return true", async () => {
    const domain = createActiveDomain();
    const repository = createMockAgendamentoRepository();
    repository.loadById.mockResolvedValue(domain);

    const { handler } = createHandler({ repository });
    const accessContext = createTestAccessContext();

    const result = await handler.execute(accessContext, { id: domain.id });

    expect(result).toBe(true);
    expect(repository.closeVersion).toHaveBeenCalledOnce();
  });

  it("should call permissionChecker.ensureCanDelete", async () => {
    const domain = createActiveDomain();
    const repository = createMockAgendamentoRepository();
    repository.loadById.mockResolvedValue(domain);

    const permissionChecker = createMockPermissionChecker();
    const { handler } = createHandler({ repository, permissionChecker });
    const accessContext = createTestAccessContext();

    await handler.execute(accessContext, { id: domain.id });

    expect(permissionChecker.ensureCanDelete).toHaveBeenCalledWith(
      accessContext,
      { dto: { id: domain.id } },
      domain.id,
    );
  });

  it("should throw when entity not found", async () => {
    const repository = createMockAgendamentoRepository();
    repository.loadById.mockResolvedValue(null);

    const { handler } = createHandler({ repository });
    const accessContext = createTestAccessContext();

    await expect(handler.execute(accessContext, { id: createTestId() })).rejects.toThrow(
      ResourceNotFoundError,
    );
  });

  it("should throw when entity is not active (already closed)", async () => {
    const domain = createActiveDomain();
    domain.close();

    const repository = createMockAgendamentoRepository();
    repository.loadById.mockResolvedValue(domain);

    const { handler } = createHandler({ repository });
    const accessContext = createTestAccessContext();

    await expect(handler.execute(accessContext, { id: domain.id })).rejects.toThrow(GoneError);
  });
});
