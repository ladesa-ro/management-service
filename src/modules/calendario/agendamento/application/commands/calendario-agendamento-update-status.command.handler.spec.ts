import { describe, expect, it } from "vitest";
import { ResourceNotFoundError } from "@/application/errors/application.error";
import {
  createMockAgendamentoRepository,
  createMockPermissionChecker,
  createTestAccessContext,
  createTestId,
} from "@/test/helpers";
import { CalendarioAgendamento } from "../../domain/calendario-agendamento";
import {
  CalendarioAgendamentoStatus,
  CalendarioAgendamentoTipo,
} from "../../domain/calendario-agendamento.types";
import { CalendarioAgendamentoUpdateStatusCommandHandlerImpl } from "./calendario-agendamento-update-status.command.handler";

function createActiveDomain(): CalendarioAgendamento {
  return CalendarioAgendamento.create({
    tipo: CalendarioAgendamentoTipo.AULA,
    dataInicio: "2026-03-01",
    diaInteiro: false,
    horarioInicio: "08:00:00",
    horarioFim: "09:00:00",
  });
}

describe("CalendarioAgendamentoUpdateStatusCommandHandler", () => {
  function createHandler(overrides: { repository?: object; permissionChecker?: object } = {}) {
    const repository = overrides.repository ?? createMockAgendamentoRepository();
    const permissionChecker = overrides.permissionChecker ?? createMockPermissionChecker();

    const handler = new CalendarioAgendamentoUpdateStatusCommandHandlerImpl(
      repository as any,
      permissionChecker as any,
    );

    return { handler, repository, permissionChecker };
  }

  it("should update status and return result", async () => {
    const domain = createActiveDomain();
    const expectedResult = { id: domain.id, status: CalendarioAgendamentoStatus.INATIVO };

    const repository = createMockAgendamentoRepository();
    repository.loadById.mockResolvedValue(domain);
    repository.getFindOneQueryResult.mockResolvedValue(expectedResult);

    const { handler } = createHandler({ repository });
    const accessContext = createTestAccessContext();
    const dto = { id: domain.id, status: CalendarioAgendamentoStatus.INATIVO };

    const result = await handler.execute(accessContext, dto);

    expect(result).toEqual(expectedResult);
    expect(repository.updateStatus).toHaveBeenCalledWith(
      domain.id,
      CalendarioAgendamentoStatus.INATIVO,
    );
  });

  it("should call permissionChecker.ensureCanUpdate", async () => {
    const domain = createActiveDomain();
    const repository = createMockAgendamentoRepository();
    repository.loadById.mockResolvedValue(domain);
    repository.getFindOneQueryResult.mockResolvedValue({ id: domain.id });

    const permissionChecker = createMockPermissionChecker();
    const { handler } = createHandler({ repository, permissionChecker });
    const accessContext = createTestAccessContext();
    const dto = { id: domain.id, status: CalendarioAgendamentoStatus.ATIVO };

    await handler.execute(accessContext, dto);

    expect(permissionChecker.ensureCanUpdate).toHaveBeenCalledWith(
      accessContext,
      { dto },
      domain.id,
    );
  });

  it("should throw when entity not found via loadById", async () => {
    const repository = createMockAgendamentoRepository();
    repository.loadById.mockResolvedValue(null);

    const { handler } = createHandler({ repository });
    const accessContext = createTestAccessContext();
    const id = createTestId();

    await expect(
      handler.execute(accessContext, { id, status: CalendarioAgendamentoStatus.ATIVO }),
    ).rejects.toThrow(ResourceNotFoundError);
  });

  it("should throw ResourceNotFoundError when getFindOneQueryResult returns null after update", async () => {
    const domain = createActiveDomain();
    const repository = createMockAgendamentoRepository();
    repository.loadById.mockResolvedValue(domain);
    repository.getFindOneQueryResult.mockResolvedValue(null);

    const { handler } = createHandler({ repository });
    const accessContext = createTestAccessContext();

    await expect(
      handler.execute(accessContext, {
        id: domain.id,
        status: CalendarioAgendamentoStatus.INATIVO,
      }),
    ).rejects.toThrow(ResourceNotFoundError);
  });
});
