import { describe, expect, it, vi } from "vitest";
import { ResourceNotFoundError, ServiceUnavailableError } from "@/application/errors";
import {
  createMockCrudRepository,
  createMockPermissionChecker,
  createTestAccessContext,
  createTestId,
} from "@/test/helpers";
import { UsuarioUpdateCommandHandlerImpl } from "./usuario-update.command.handler";

function createMockIdpUserService() {
  return {
    provisionUser: vi.fn().mockResolvedValue(undefined),
    existsByMatricula: vi.fn().mockResolvedValue(true),
    syncUser: vi.fn().mockResolvedValue(undefined),
  };
}

function createMockDefinirPerfisAtivosHandler() {
  return {
    execute: vi.fn().mockResolvedValue({ meta: { itemCount: 0 }, data: [] }),
  };
}

function createMockUsuarioRepository() {
  const base = createMockCrudRepository();
  return {
    ...base,
    resolveMatricula: vi.fn().mockResolvedValue("20260001"),
  };
}

function createMockAvailabilityChecker() {
  return {
    ensureAvailable: vi.fn().mockResolvedValue(undefined),
  };
}

describe("UsuarioUpdateCommandHandler", () => {
  function createHandler(
    overrides: {
      repository?: object;
      idpUserService?: object;
      permissionChecker?: object;
      definirPerfisAtivosHandler?: object;
      availabilityChecker?: object;
    } = {},
  ) {
    const repository = overrides.repository ?? createMockUsuarioRepository();
    const idpUserService = overrides.idpUserService ?? createMockIdpUserService();
    const permissionChecker = overrides.permissionChecker ?? createMockPermissionChecker();
    const definirPerfisAtivosHandler =
      overrides.definirPerfisAtivosHandler ?? createMockDefinirPerfisAtivosHandler();
    const availabilityChecker = overrides.availabilityChecker ?? createMockAvailabilityChecker();

    const handler = new UsuarioUpdateCommandHandlerImpl(
      repository as any,
      idpUserService as any,
      permissionChecker as any,
      definirPerfisAtivosHandler as any,
      availabilityChecker as any,
    );

    return {
      handler,
      repository,
      permissionChecker,
      idpUserService,
      definirPerfisAtivosHandler,
      availabilityChecker,
    };
  }

  const usuarioId = createTestId();

  const currentUsuario = {
    id: usuarioId,
    nome: "João Silva",
    matricula: "20260001",
    email: "joao@example.com",
    isSuperUser: false,
    imagemCapa: null,
    imagemPerfil: null,
    dateCreated: "2026-01-01T00:00:00.000Z",
    dateUpdated: "2026-01-01T00:00:00.000Z",
    dateDeleted: null,
  };

  it("should update usuario and return result", async () => {
    const repository = createMockUsuarioRepository();
    repository.getFindOneQueryResult
      .mockResolvedValueOnce(currentUsuario)
      .mockResolvedValueOnce(currentUsuario);

    const { handler } = createHandler({ repository });
    const accessContext = createTestAccessContext();

    const result = await handler.execute(accessContext, {
      id: usuarioId,
      nome: "Novo Nome",
    });

    expect(result).toEqual(currentUsuario);
    expect(repository.update).toHaveBeenCalledOnce();
  });

  it("should throw ResourceNotFoundError when usuario does not exist", async () => {
    const repository = createMockUsuarioRepository();
    repository.getFindOneQueryResult.mockResolvedValue(null);

    const { handler } = createHandler({ repository });
    const accessContext = createTestAccessContext();

    await expect(handler.execute(accessContext, { id: usuarioId })).rejects.toThrow(
      ResourceNotFoundError,
    );
  });

  it("should throw ServiceUnavailableError when matricula not found in IDP", async () => {
    const repository = createMockUsuarioRepository();
    repository.getFindOneQueryResult.mockResolvedValue(currentUsuario);

    const idpUserService = createMockIdpUserService();
    idpUserService.existsByMatricula.mockResolvedValue(false);

    const { handler } = createHandler({ repository, idpUserService });
    const accessContext = createTestAccessContext();

    await expect(handler.execute(accessContext, { id: usuarioId })).rejects.toThrow(
      ServiceUnavailableError,
    );
  });

  describe("vinculos", () => {
    it("should not call definirPerfisAtivosHandler when vinculos is undefined", async () => {
      const repository = createMockUsuarioRepository();
      repository.getFindOneQueryResult
        .mockResolvedValueOnce(currentUsuario)
        .mockResolvedValueOnce(currentUsuario);

      const definirPerfisAtivosHandler = createMockDefinirPerfisAtivosHandler();
      const { handler } = createHandler({ repository, definirPerfisAtivosHandler });
      const accessContext = createTestAccessContext();

      await handler.execute(accessContext, { id: usuarioId, nome: "Novo" });

      expect(definirPerfisAtivosHandler.execute).not.toHaveBeenCalled();
    });

    it("should call definirPerfisAtivosHandler with flat vinculos (even empty)", async () => {
      const repository = createMockUsuarioRepository();
      repository.getFindOneQueryResult
        .mockResolvedValueOnce(currentUsuario)
        .mockResolvedValueOnce(currentUsuario);

      const definirPerfisAtivosHandler = createMockDefinirPerfisAtivosHandler();
      const { handler } = createHandler({ repository, definirPerfisAtivosHandler });
      const accessContext = createTestAccessContext();

      await handler.execute(accessContext, { id: usuarioId, vinculos: [] });

      expect(definirPerfisAtivosHandler.execute).toHaveBeenCalledOnce();
      expect(definirPerfisAtivosHandler.execute).toHaveBeenCalledWith(accessContext, {
        vinculos: [],
        usuario: { id: currentUsuario.id },
      });
    });

    it("should pass vinculos directly to definirPerfisAtivosHandler", async () => {
      const campusId = createTestId();

      const repository = createMockUsuarioRepository();
      repository.getFindOneQueryResult
        .mockResolvedValueOnce(currentUsuario)
        .mockResolvedValueOnce(currentUsuario);

      const definirPerfisAtivosHandler = createMockDefinirPerfisAtivosHandler();
      const { handler } = createHandler({ repository, definirPerfisAtivosHandler });
      const accessContext = createTestAccessContext();

      const vinculos = [
        { campus: { id: campusId }, cargo: "professor" },
        { campus: { id: campusId }, cargo: "coordenador" },
      ];

      await handler.execute(accessContext, { id: usuarioId, vinculos });

      expect(definirPerfisAtivosHandler.execute).toHaveBeenCalledOnce();
      expect(definirPerfisAtivosHandler.execute).toHaveBeenCalledWith(accessContext, {
        vinculos,
        usuario: { id: currentUsuario.id },
      });
    });
  });
});
