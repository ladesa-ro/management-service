import { describe, expect, it, vi } from "vitest";
import { createTestAccessContext, createTestId } from "@/test/helpers";
import { CalendarioSolicitacaoMudancaTipoOperacao } from "../../domain/calendario-solicitacao-mudanca.types";
import { CalendarioSolicitacaoMudancaCreateCommandHandlerImpl } from "./calendario-solicitacao-mudanca-create.command.handler";

function createHandler() {
  const repository = {
    loadById: vi.fn(),
    save: vi.fn().mockResolvedValue(undefined),
    getFindOneQueryResult: vi.fn(),
    getFindAllQueryResult: vi.fn(),
  };
  const permissionChecker = {
    ensureCanCreate: vi.fn().mockResolvedValue(undefined),
    ensureCanUpdate: vi.fn().mockResolvedValue(undefined),
    ensureCanDelete: vi.fn().mockResolvedValue(undefined),
  };
  const calendarioAgendamentoRepository = {
    getFindOneQueryResult: vi.fn(),
  };

  const handler = new CalendarioSolicitacaoMudancaCreateCommandHandlerImpl(
    repository as any,
    permissionChecker as any,
    calendarioAgendamentoRepository as any,
  );

  return { handler, repository, permissionChecker, calendarioAgendamentoRepository };
}

function validCommand(overrides: Partial<Record<string, unknown>> = {}) {
  return {
    calendarioAgendamentoId: createTestId(),
    tipoOperacao: CalendarioSolicitacaoMudancaTipoOperacao.MOVER,
    dadosPropostos: { nome: "Novo nome" },
    justificativa: "Conflito de agenda",
    ...overrides,
  };
}

describe("CalendarioSolicitacaoMudancaCreateCommandHandlerImpl", () => {
  it("should create the request when the target agendamento exists and the actor is authenticated", async () => {
    const { handler, repository, calendarioAgendamentoRepository } = createHandler();
    const command = validCommand();

    calendarioAgendamentoRepository.getFindOneQueryResult.mockResolvedValue({
      id: command.calendarioAgendamentoId,
    });
    repository.getFindOneQueryResult.mockImplementation(async (_ctx, dto) => ({
      id: dto.id,
      status: "ABERTA",
    }));

    const accessContext = createTestAccessContext();
    const result = await handler.execute(accessContext, command);

    expect(repository.save).toHaveBeenCalledOnce();
    const savedDomain = repository.save.mock.calls[0][0];
    expect(savedDomain.autor.id).toBe(accessContext.requestActor?.id);
    expect(savedDomain.status).toBe("ABERTA");
    expect(savedDomain.calendarioAgendamentoId).toBe(command.calendarioAgendamentoId);
    expect(result).toMatchObject({ status: "ABERTA" });
  });

  it("should throw when the target agendamento does not exist", async () => {
    const { handler, calendarioAgendamentoRepository } = createHandler();
    calendarioAgendamentoRepository.getFindOneQueryResult.mockResolvedValue(null);

    await expect(handler.execute(createTestAccessContext(), validCommand())).rejects.toThrow();
  });

  it("should throw when the actor is not authenticated", async () => {
    const { handler, calendarioAgendamentoRepository } = createHandler();
    calendarioAgendamentoRepository.getFindOneQueryResult.mockResolvedValue({ id: createTestId() });

    await expect(handler.execute(null, validCommand())).rejects.toThrow();
  });
});
