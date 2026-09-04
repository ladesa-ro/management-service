import { BadRequestException } from "@nestjs/common";
import { describe, expect, it, vi } from "vitest";
import { createTestAccessContext, createTestId, createTestRequestActor } from "@/test/helpers";
import { EstagioSolicitacaoExternoCreateCommandHandlerImpl } from "./solicitacao-externo-create.command.handler";

describe("EstagioSolicitacaoExternoCreateCommandHandler", () => {
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

  it("should create external stage request without creating company or internship prematurely", async () => {
    const mocks = createMocks();
    const handler = new EstagioSolicitacaoExternoCreateCommandHandlerImpl(
      mocks.repository as any,
      mocks.permissionChecker as any,
    );

    const accessContext = createTestAccessContext(createTestRequestActor({ id: "student-1" }));
    const result = await handler.execute(accessContext, {
      empresa: {
        razaoSocial: "Parceira Digital LTDA",
        nomeFantasia: "Parceira Digital",
        cnpj: "11222333000144",
        email: "rh@parceira.com",
        telefone: "6932110000",
      },
      supervisor: {
        nome: "Maria Gestora",
        email: "maria@parceira.com",
        telefone: "69999990000",
      },
    });

    expect(result).toBeDefined();
    expect(result.tipo).toBe("EXTERNO");
    expect(result.situacao).toBe("PENDENTE");
    expect(result.empresaRazaoSocial).toBe("Parceira Digital LTDA");
    expect(result.empresaCnpj).toBe("11222333000144");
    expect(result.supervisorNome).toBe("Maria Gestora");
    // Verifica que NÃO vinculou empresa nem estágio ainda
    expect(result.empresa).toBeNull();
    expect(result.estagioGerado).toBeNull();
    expect(mocks.repository.save).toHaveBeenCalled();
  });

  it("should throw BadRequestException if student has reached max active requests", async () => {
    const mocks = createMocks();
    mocks.repository.countActiveByEstagiarioId.mockResolvedValue(3);

    const handler = new EstagioSolicitacaoExternoCreateCommandHandlerImpl(
      mocks.repository as any,
      mocks.permissionChecker as any,
    );

    const accessContext = createTestAccessContext(createTestRequestActor({ id: "student-1" }));
    await expect(
      handler.execute(accessContext, {
        empresa: {
          razaoSocial: "Parceira Digital LTDA",
          cnpj: "11222333000144",
        },
        supervisor: {
          nome: "Maria Gestora",
        },
      }),
    ).rejects.toThrow(BadRequestException);
  });
});
