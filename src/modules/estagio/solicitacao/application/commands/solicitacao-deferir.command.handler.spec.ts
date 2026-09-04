import { describe, expect, it, vi } from "vitest";
import { ConflictError, ForbiddenError, ResourceNotFoundError } from "@/application/errors";
import { createTestAccessContext, createTestId, createTestRequestActor } from "@/test/helpers";
import { EstagioSolicitacaoDeferirCommandHandlerImpl } from "./solicitacao-deferir.command.handler";

describe("EstagioSolicitacaoDeferirCommandHandler", () => {
  function createMocks() {
    const solicitacaoRepository = {
      findById: vi.fn(),
      save: vi.fn().mockImplementation(async (s) => s),
    };

    const permissionChecker = {
      ensureCanManageSolicitacoes: vi.fn().mockResolvedValue({ userId: "ciec-user-id" }),
    };

    const empresaRepository = {
      findByCnpj: vi.fn().mockResolvedValue(null),
    };

    const empresaCreateHandler = {
      execute: vi.fn().mockResolvedValue({ id: "nova-empresa-id" }),
    };

    const estagioCreateHandler = {
      execute: vi.fn().mockResolvedValue({ id: "estagio-gerado-id" }),
    };

    const campusRepo = {
      findOne: vi.fn().mockResolvedValue({
        id: createTestId(),
        razaoSocial: "IFRO Campus Porto Velho",
        nomeFantasia: "Porto Velho Calama",
        cnpj: "10817343000105",
        endereco: { id: "endereco-campus-id" },
      }),
    };

    const appTypeormConnection = {
      getRepository: vi.fn().mockReturnValue(campusRepo),
    };

    return {
      solicitacaoRepository,
      permissionChecker,
      empresaRepository,
      empresaCreateHandler,
      estagioCreateHandler,
      campusRepo,
      appTypeormConnection,
    };
  }

  it("should defer external request, creating company and internship atomically", async () => {
    const mocks = createMocks();
    const solicitacaoId = createTestId();
    const campusId = createTestId();
    const estagiarioId = createTestId();

    const solicitacao = {
      id: solicitacaoId,
      tipo: "EXTERNO",
      situacao: "PENDENTE",
      campus: { id: campusId },
      estagiario: { id: estagiarioId },
      empresaCnpj: "11222333000144",
      empresaRazaoSocial: "Empresa Parceira LTDA",
      empresaNomeFantasia: "Empresa Parceira",
      empresaEmail: "contato@empresa.com",
      empresaTelefone: "6999999999",
      supervisorNome: "Supervisor Fulano",
      supervisorEmail: "sup@empresa.com",
      supervisorTelefone: "6988888888",
      deferir: vi.fn(),
    };
    mocks.solicitacaoRepository.findById.mockResolvedValue(solicitacao);

    const handler = new EstagioSolicitacaoDeferirCommandHandlerImpl(
      mocks.solicitacaoRepository as any,
      mocks.permissionChecker as any,
      mocks.empresaRepository as any,
      mocks.empresaCreateHandler as any,
      mocks.estagioCreateHandler as any,
      mocks.appTypeormConnection as any,
    );

    const accessContext = createTestAccessContext(createTestRequestActor({ id: "ciec-user-id" }));
    const result = await handler.execute(accessContext, {
      id: solicitacaoId,
      parecer: "Documentação aprovada.",
      cargaHoraria: 30,
    });

    expect(result).toBeDefined();
    expect(mocks.empresaCreateHandler.execute).toHaveBeenCalled();
    expect(mocks.estagioCreateHandler.execute).toHaveBeenCalledWith(
      accessContext,
      expect.objectContaining({
        empresa: { id: "nova-empresa-id" },
        estagiario: { id: estagiarioId },
        cargaHoraria: 30,
      }),
    );
    expect(solicitacao.deferir).toHaveBeenCalledWith(
      "ciec-user-id",
      "estagio-gerado-id",
      "nova-empresa-id",
      "Documentação aprovada.",
    );
    expect(mocks.solicitacaoRepository.save).toHaveBeenCalled();
  });

  it("should throw ConflictError if request is already DEFERIDA", async () => {
    const mocks = createMocks();
    const solicitacao = {
      id: createTestId(),
      tipo: "EXTERNO",
      situacao: "DEFERIDA",
    };
    mocks.solicitacaoRepository.findById.mockResolvedValue(solicitacao);

    const handler = new EstagioSolicitacaoDeferirCommandHandlerImpl(
      mocks.solicitacaoRepository as any,
      mocks.permissionChecker as any,
      mocks.empresaRepository as any,
      mocks.empresaCreateHandler as any,
      mocks.estagioCreateHandler as any,
      mocks.appTypeormConnection as any,
    );

    const accessContext = createTestAccessContext(createTestRequestActor({ id: "ciec-user-id" }));
    await expect(handler.execute(accessContext, { id: solicitacao.id })).rejects.toThrow(
      ConflictError,
    );
  });

  it("should throw ResourceNotFoundError if request is not found", async () => {
    const mocks = createMocks();
    mocks.solicitacaoRepository.findById.mockResolvedValue(null);

    const handler = new EstagioSolicitacaoDeferirCommandHandlerImpl(
      mocks.solicitacaoRepository as any,
      mocks.permissionChecker as any,
      mocks.empresaRepository as any,
      mocks.empresaCreateHandler as any,
      mocks.estagioCreateHandler as any,
      mocks.appTypeormConnection as any,
    );

    const accessContext = createTestAccessContext(createTestRequestActor({ id: "ciec-user-id" }));
    await expect(handler.execute(accessContext, { id: createTestId() })).rejects.toThrow(
      ResourceNotFoundError,
    );
  });

  it("should throw ForbiddenError if actor is not authorized CIEC staff", async () => {
    const mocks = createMocks();
    mocks.permissionChecker.ensureCanManageSolicitacoes.mockRejectedValue(
      new ForbiddenError("Apenas servidores do CIEC podem deferir solicitações."),
    );

    const handler = new EstagioSolicitacaoDeferirCommandHandlerImpl(
      mocks.solicitacaoRepository as any,
      mocks.permissionChecker as any,
      mocks.empresaRepository as any,
      mocks.empresaCreateHandler as any,
      mocks.estagioCreateHandler as any,
      mocks.appTypeormConnection as any,
    );

    const accessContext = createTestAccessContext(createTestRequestActor({ id: "aluno-1" }));
    await expect(handler.execute(accessContext, { id: createTestId() })).rejects.toThrow(
      ForbiddenError,
    );
  });
});
