import { describe, expect, it, vi } from "vitest";
import { ForbiddenError, ResourceNotFoundError } from "@/application/errors";
import { createTestAccessContext, createTestId, createTestRequestActor } from "@/test/helpers";
import { FilaEsperaListQueryHandlerImpl } from "./fila-espera-list.query.handler";

describe("FilaEsperaListQueryHandler", () => {
  function createMocks() {
    const repository = {
      findFilaByEstagio: vi.fn().mockResolvedValue({
        items: [
          {
            id: createTestId(),
            situacao: "PENDING",
            posicaoFila: 1,
            dataInscricao: "2026-03-01T10:00:00.000Z",
            dataOferta: null,
            expiraEm: null,
            dataResposta: null,
            motivoCancelamento: null,
            estagiario: {
              id: createTestId(),
              periodo: "3º ano",
              telefone: "69999999999",
              emailInstitucional: "aluno@estudante.ifro.edu.br",
              aluno: {
                id: createTestId(),
                nome: "João da Silva",
                matricula: "2023101001",
                email: "joao@email.com",
              },
              curso: {
                id: createTestId(),
                nome: "Técnico em Informática",
              },
            },
          },
        ],
        total: 1,
      }),
    };

    const estagioRepository = {
      loadById: vi.fn().mockResolvedValue({ id: createTestId() }),
    };

    const permissionChecker = {
      ensureCanListFila: vi.fn().mockResolvedValue(undefined),
    };

    return {
      repository,
      estagioRepository,
      permissionChecker,
    };
  }

  it("should return waitlist queue items for authorized CIEC staff", async () => {
    const mocks = createMocks();
    const estagioId = createTestId();

    const handler = new FilaEsperaListQueryHandlerImpl(
      mocks.repository as any,
      mocks.estagioRepository as any,
      mocks.permissionChecker as any,
    );

    const accessContext = createTestAccessContext(createTestRequestActor({ id: "ciec-1" }));
    const result = await handler.execute(accessContext, { estagioId, page: 1, limit: 20 });

    expect(result.data).toHaveLength(1);
    expect(result.data[0].posicaoFila).toBe(1);
    expect(result.data[0].estagiario.aluno?.nome).toBe("João da Silva");
    expect(result.meta.totalItems).toBe(1);
    expect(mocks.permissionChecker.ensureCanListFila).toHaveBeenCalledWith(accessContext);
    expect(mocks.repository.findFilaByEstagio).toHaveBeenCalledWith(
      accessContext,
      estagioId,
      expect.objectContaining({ page: 1, limit: 20 }),
    );
  });

  it("should throw ForbiddenError if user is not authorized CIEC staff", async () => {
    const mocks = createMocks();
    mocks.permissionChecker.ensureCanListFila.mockRejectedValue(
      new ForbiddenError(
        "Apenas servidores da CIEC ou coordenadores autorizados podem visualizar a fila de espera.",
      ),
    );

    const handler = new FilaEsperaListQueryHandlerImpl(
      mocks.repository as any,
      mocks.estagioRepository as any,
      mocks.permissionChecker as any,
    );

    const accessContext = createTestAccessContext(createTestRequestActor({ id: "aluno-1" }));
    await expect(handler.execute(accessContext, { estagioId: createTestId() })).rejects.toThrow(
      ForbiddenError,
    );
  });

  it("should throw ResourceNotFoundError if estagio is not found", async () => {
    const mocks = createMocks();
    mocks.estagioRepository.loadById.mockResolvedValue(null);

    const handler = new FilaEsperaListQueryHandlerImpl(
      mocks.repository as any,
      mocks.estagioRepository as any,
      mocks.permissionChecker as any,
    );

    const accessContext = createTestAccessContext(createTestRequestActor({ id: "ciec-1" }));
    await expect(handler.execute(accessContext, { estagioId: createTestId() })).rejects.toThrow(
      ResourceNotFoundError,
    );
  });
});
