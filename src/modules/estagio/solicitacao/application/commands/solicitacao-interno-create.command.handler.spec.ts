import { BadRequestException } from "@nestjs/common";
import { describe, expect, it, vi } from "vitest";
import { ForbiddenError } from "@/application/errors";
import { createTestAccessContext, createTestId, createTestRequestActor } from "@/test/helpers";
import { EstagioSolicitacaoInternoCreateCommandHandlerImpl } from "./solicitacao-interno-create.command.handler";

describe("EstagioSolicitacaoInternoCreateCommandHandler", () => {
  function createMocks() {
    const repository = {
      save: vi.fn().mockImplementation(async (s) => s),
      countActiveByEstagiarioId: vi.fn().mockResolvedValue(0),
    };

    const permissionChecker = {
      ensureCanCreateSolicitacao: vi.fn().mockResolvedValue({
        estagiarioId: createTestId(),
        campusId: createTestId(),
      }),
    };

    return {
      repository,
      permissionChecker,
    };
  }

  it("should create internal stage request when valid", async () => {
    const mocks = createMocks();
    const handler = new EstagioSolicitacaoInternoCreateCommandHandlerImpl(
      mocks.repository as any,
      mocks.permissionChecker as any,
    );

    const accessContext = createTestAccessContext(createTestRequestActor({ id: "student-1" }));
    const result = await handler.execute(accessContext, {
      professorConselheiro: { id: createTestId() },
      local: "Laboratório de Hardware",
      descricao: "Atividades de manutenção preventiva de computadores.",
    });

    expect(result).toBeDefined();
    expect(result.tipo).toBe("INTERNO");
    expect(result.situacao).toBe("PENDENTE");
    expect(result.localInterno).toBe("Laboratório de Hardware");
    expect(mocks.repository.save).toHaveBeenCalled();
  });

  it("should throw BadRequestException if student has reached max active requests", async () => {
    const mocks = createMocks();
    mocks.repository.countActiveByEstagiarioId.mockResolvedValue(3);

    const handler = new EstagioSolicitacaoInternoCreateCommandHandlerImpl(
      mocks.repository as any,
      mocks.permissionChecker as any,
    );

    const accessContext = createTestAccessContext(createTestRequestActor({ id: "student-1" }));
    await expect(
      handler.execute(accessContext, {
        professorConselheiro: { id: createTestId() },
        local: "Laboratório",
        descricao: "Descrição válida de atividades.",
      }),
    ).rejects.toThrow(BadRequestException);
  });

  it("should throw ForbiddenError if actor is not allowed to create request", async () => {
    const mocks = createMocks();
    mocks.permissionChecker.ensureCanCreateSolicitacao.mockRejectedValue(
      new ForbiddenError("Apenas alunos podem solicitar estágio."),
    );

    const handler = new EstagioSolicitacaoInternoCreateCommandHandlerImpl(
      mocks.repository as any,
      mocks.permissionChecker as any,
    );

    const accessContext = createTestAccessContext(createTestRequestActor({ id: "guest" }));
    await expect(
      handler.execute(accessContext, {
        professorConselheiro: { id: createTestId() },
        local: "Laboratório",
        descricao: "Descrição válida de atividades.",
      }),
    ).rejects.toThrow(ForbiddenError);
  });
});
