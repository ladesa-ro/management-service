import { describe, expect, it, vi } from "vitest";
import { ForbiddenError } from "@/application/errors";
import { createTestAccessContext, createTestId, createTestRequestActor } from "@/test/helpers";
import { MinhasCandidaturasListQueryHandlerImpl } from "./minhas-candidaturas-list.query.handler";

describe("MinhasCandidaturasListQueryHandler", () => {
  function createMocks() {
    const repository = {
      findMinhasCandidaturas: vi.fn().mockResolvedValue({
        items: [
          {
            id: createTestId(),
            situacao: "PENDING",
            posicaoFila: 2,
            dataInscricao: "2026-03-01T10:00:00.000Z",
            acaoDisponivel: false,
            estagio: { id: createTestId() },
          },
        ],
        total: 1,
      }),
    };

    const estagiarioRepository = {
      findByUsuarioId: vi.fn(),
      findByPerfilId: vi.fn(),
    };

    const perfilRepository = {
      findAllActiveByUsuarioId: vi.fn().mockResolvedValue([]),
    };

    return {
      repository,
      estagiarioRepository,
      perfilRepository,
    };
  }

  it("should return list of candidatures for student", async () => {
    const mocks = createMocks();
    const estagiarioId = createTestId();
    mocks.estagiarioRepository.findByUsuarioId.mockResolvedValue({ id: estagiarioId });

    const handler = new MinhasCandidaturasListQueryHandlerImpl(
      mocks.repository as any,
      mocks.estagiarioRepository as any,
      mocks.perfilRepository as any,
    );

    const accessContext = createTestAccessContext(createTestRequestActor({ id: "student-1" }));
    const result = await handler.execute(accessContext, { page: 1, limit: 10 });

    expect(result.data).toHaveLength(1);
    expect(result.data[0].posicaoFila).toBe(2);
    expect(mocks.repository.findMinhasCandidaturas).toHaveBeenCalledWith(
      accessContext,
      estagiarioId,
      expect.objectContaining({ page: 1, limit: 10 }),
    );
  });

  it("should throw ForbiddenError if user is not a student", async () => {
    const mocks = createMocks();
    mocks.estagiarioRepository.findByUsuarioId.mockResolvedValue(null);
    mocks.perfilRepository.findAllActiveByUsuarioId.mockResolvedValue([]);

    const handler = new MinhasCandidaturasListQueryHandlerImpl(
      mocks.repository as any,
      mocks.estagiarioRepository as any,
      mocks.perfilRepository as any,
    );

    const accessContext = createTestAccessContext(createTestRequestActor({ id: "non-student" }));
    await expect(handler.execute(accessContext, {})).rejects.toThrow(ForbiddenError);
  });
});
