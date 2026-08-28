import { describe, expect, it, vi } from "vitest";
import { ResourceNotFoundError } from "@/application/errors";
import { createTestId } from "@/test/helpers";
import { PerfilUpdateCommandHandlerImpl } from "./perfil-update.command.handler";

function createPerfilQueryResult(overrides: Record<string, unknown> = {}) {
  return {
    id: createTestId(),
    ativo: true,
    cargo: { id: createTestId(), nome: "professor" },
    campus: { id: createTestId() },
    usuario: { id: createTestId() },
    cargaMaximaSemanal: null,
    dateCreated: "2026-01-01T00:00:00.000Z",
    dateUpdated: "2026-01-01T00:00:00.000Z",
    dateDeleted: null,
    ...overrides,
  };
}

describe("PerfilUpdateCommandHandlerImpl", () => {
  it("updates cargaMaximaSemanal and persists the full domain-mapped payload", async () => {
    const existente = createPerfilQueryResult();
    const atualizado = createPerfilQueryResult({ cargaMaximaSemanal: 20 });

    const repository = {
      getFindOneQueryResult: vi
        .fn()
        .mockResolvedValueOnce(existente)
        .mockResolvedValueOnce(atualizado),
      update: vi.fn().mockResolvedValue(undefined),
    };

    const handler = new PerfilUpdateCommandHandlerImpl(repository as never);

    const result = await handler.execute(null, { id: existente.id, cargaMaximaSemanal: 20 });

    expect(repository.update).toHaveBeenCalledWith(
      existente.id,
      expect.objectContaining({
        ativo: true,
        cargo: "professor",
        campus: { id: existente.campus.id },
        usuario: { id: existente.usuario.id },
        cargaMaximaSemanal: 20,
      }),
    );
    expect(result).toEqual(atualizado);
  });

  it("throws ResourceNotFoundError when the perfil does not exist", async () => {
    const repository = {
      getFindOneQueryResult: vi.fn().mockResolvedValue(null),
      update: vi.fn(),
    };

    const handler = new PerfilUpdateCommandHandlerImpl(repository as never);

    await expect(
      handler.execute(null, { id: createTestId(), cargaMaximaSemanal: 10 }),
    ).rejects.toThrow(ResourceNotFoundError);

    expect(repository.update).not.toHaveBeenCalled();
  });
});
