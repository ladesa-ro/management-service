import { describe, expect, it, vi } from "vitest";
import { createTestAccessContext, createTestId } from "@/test/helpers";
import { PerfilDefinirPerfisAtivosCommandHandlerImpl } from "./perfil-definir-perfis-ativos.command.handler";

describe("PerfilDefinirPerfisAtivosCommandHandler", () => {
  it("should persist cargo as string when creating a vinculo", async () => {
    const perfilRepository = {
      findByUsuarioAndCampus: vi.fn().mockResolvedValue([]),
      create: vi.fn().mockResolvedValue(undefined),
      update: vi.fn().mockResolvedValue(undefined),
      deactivateByIds: vi.fn().mockResolvedValue(undefined),
    };

    const campusFindOneHandler = {
      execute: vi.fn().mockResolvedValue({ id: "campus-id" }),
    };

    const perfilListHandler = {
      execute: vi.fn().mockResolvedValue([]),
    };

    const usuarioFindByIdSimpleHandler = {
      execute: vi.fn().mockResolvedValue({ id: "usuario-id" }),
    };

    const cargoQueryBuilder = {
      select: vi.fn().mockReturnThis(),
      where: vi.fn().mockReturnThis(),
      getRawOne: vi.fn().mockResolvedValue({ id: "cargo-id", nome: "aluno" }),
      insert: vi.fn().mockReturnThis(),
      into: vi.fn().mockReturnThis(),
      values: vi.fn().mockReturnThis(),
      execute: vi.fn().mockResolvedValue(undefined),
    };

    const appTypeormConnection = {
      getRepository: vi.fn().mockReturnValue({
        createQueryBuilder: vi.fn().mockReturnValue(cargoQueryBuilder),
      }),
    };

    const handler = new PerfilDefinirPerfisAtivosCommandHandlerImpl(
      appTypeormConnection as never,
      perfilRepository as never,
      campusFindOneHandler as never,
      perfilListHandler as never,
      usuarioFindByIdSimpleHandler as never,
    );

    const accessContext = createTestAccessContext();

    await handler.execute(accessContext, {
      usuario: { id: createTestId() },
      vinculos: [{ campus: { id: "campus-id" }, cargo: "aluno" }],
    });

    expect(perfilRepository.create).toHaveBeenCalledWith(
      expect.objectContaining({
        cargo: "aluno",
        campus: { id: "campus-id" },
        usuario: { id: expect.any(String) },
      }),
    );
  });
});
