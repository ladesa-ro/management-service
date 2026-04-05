import { describe, expect, it } from "vitest";
import { ResourceNotFoundError } from "@/application/errors/application.error";
import {
  createMockAgendamentoRepository,
  createMockPermissionChecker,
  createTestAccessContext,
  createTestId,
} from "@/test/helpers";
import { CalendarioAgendamento } from "../../domain/calendario-agendamento";
import { CalendarioAgendamentoTipo } from "../../domain/calendario-agendamento.types";
import { CalendarioAgendamentoDesvincularTurmaCommandHandlerImpl } from "./calendario-agendamento-desvincular-turma.command.handler";

function createActiveDomain(): CalendarioAgendamento {
  return CalendarioAgendamento.create({
    tipo: CalendarioAgendamentoTipo.AULA,
    dataInicio: "2026-03-01",
    diaInteiro: false,
    horarioInicio: "08:00:00",
    horarioFim: "09:00:00",
  });
}

describe("CalendarioAgendamentoDesvincularTurmaCommandHandler", () => {
  function createHandler(overrides: { repository?: object; permissionChecker?: object } = {}) {
    const repository = overrides.repository ?? createMockAgendamentoRepository();
    const permissionChecker = overrides.permissionChecker ?? createMockPermissionChecker();

    const handler = new CalendarioAgendamentoDesvincularTurmaCommandHandlerImpl(
      repository as any,
      permissionChecker as any,
    );

    return { handler, repository, permissionChecker };
  }

  it("should call deleteTurmaJunction and return true", async () => {
    const domain = createActiveDomain();
    const turmaId = createTestId();

    const repository = createMockAgendamentoRepository();
    repository.loadById.mockResolvedValue(domain);

    const { handler } = createHandler({ repository });
    const accessContext = createTestAccessContext();

    const result = await handler.execute(accessContext, { id: domain.id, turmaId });

    expect(result).toBe(true);
    expect(repository.deleteTurmaJunction).toHaveBeenCalledWith(domain.id, turmaId);
  });

  it("should call permissionChecker.ensureCanUpdate", async () => {
    const domain = createActiveDomain();
    const turmaId = createTestId();

    const repository = createMockAgendamentoRepository();
    repository.loadById.mockResolvedValue(domain);

    const permissionChecker = createMockPermissionChecker();
    const { handler } = createHandler({ repository, permissionChecker });
    const accessContext = createTestAccessContext();
    const dto = { id: domain.id, turmaId };

    await handler.execute(accessContext, dto);

    expect(permissionChecker.ensureCanUpdate).toHaveBeenCalledWith(
      accessContext,
      { dto },
      domain.id,
    );
  });

  it("should throw when entity not found", async () => {
    const repository = createMockAgendamentoRepository();
    repository.loadById.mockResolvedValue(null);

    const { handler } = createHandler({ repository });
    const accessContext = createTestAccessContext();

    await expect(
      handler.execute(accessContext, { id: createTestId(), turmaId: createTestId() }),
    ).rejects.toThrow(ResourceNotFoundError);
  });
});
