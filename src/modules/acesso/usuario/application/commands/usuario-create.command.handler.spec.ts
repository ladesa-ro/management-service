import { describe, expect, it, vi } from "vitest";
import { ResourceNotFoundError } from "@/application/errors/application.error";
import {
  createMockCrudRepository,
  createMockPermissionChecker,
  createTestAccessContext,
  createTestId,
} from "@/test/helpers";
import { UsuarioCreateCommandHandlerImpl } from "./usuario-create.command.handler";

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
  return createMockCrudRepository();
}

function createMockAvailabilityChecker() {
  return {
    ensureAvailable: vi.fn().mockResolvedValue(undefined),
  };
}

describe("UsuarioCreateCommandHandler", () => {
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

    const handler = new UsuarioCreateCommandHandlerImpl(
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

  const dto = {
    nome: "João Silva",
    matricula: "20260001",
    email: "joao@example.com",
  };

  it("should create usuario and return result", async () => {
    const id = createTestId();
    const expectedResult = { id, nome: "João Silva" };

    const repository = createMockUsuarioRepository();
    repository.create.mockResolvedValue({ id });
    repository.findById.mockResolvedValue(expectedResult);

    const { handler } = createHandler({ repository });
    const accessContext = createTestAccessContext();

    const result = await handler.execute(accessContext, dto);

    expect(result).toEqual(expectedResult);
    expect(repository.create).toHaveBeenCalledOnce();
    expect(repository.findById).toHaveBeenCalledWith(accessContext, { id });
  });

  it("should call permissionChecker.ensureCanCreate before creating", async () => {
    const repository = createMockUsuarioRepository();
    repository.create.mockResolvedValue({ id: createTestId() });
    repository.findById.mockResolvedValue({ id: createTestId() });

    const permissionChecker = createMockPermissionChecker();
    const { handler } = createHandler({ repository, permissionChecker });
    const accessContext = createTestAccessContext();

    await handler.execute(accessContext, dto);

    expect(permissionChecker.ensureCanCreate).toHaveBeenCalledWith(accessContext, { dto });
  });

  it("should throw when permission check fails", async () => {
    const permissionChecker = createMockPermissionChecker();
    permissionChecker.ensureCanCreate.mockRejectedValue(new Error("Forbidden"));

    const { handler } = createHandler({ permissionChecker });
    const accessContext = createTestAccessContext();

    await expect(handler.execute(accessContext, dto)).rejects.toThrow("Forbidden");
  });

  it("should throw ResourceNotFoundError when findById returns null after create", async () => {
    const repository = createMockUsuarioRepository();
    repository.create.mockResolvedValue({ id: createTestId() });
    repository.findById.mockResolvedValue(null);

    const { handler } = createHandler({ repository });
    const accessContext = createTestAccessContext();

    await expect(handler.execute(accessContext, dto)).rejects.toThrow(ResourceNotFoundError);
  });

  it("should provision user in IDP after creating", async () => {
    const repository = createMockUsuarioRepository();
    repository.create.mockResolvedValue({ id: createTestId() });
    repository.findById.mockResolvedValue({ id: createTestId() });

    const idpUserService = createMockIdpUserService();
    const { handler } = createHandler({ repository, idpUserService });
    const accessContext = createTestAccessContext();

    await handler.execute(accessContext, dto);

    expect(idpUserService.provisionUser).toHaveBeenCalledWith({
      matricula: dto.matricula,
      email: dto.email,
    });
  });

  describe("vinculos", () => {
    it("should not call definirPerfisAtivosHandler when vinculos is undefined", async () => {
      const repository = createMockUsuarioRepository();
      repository.create.mockResolvedValue({ id: createTestId() });
      repository.findById.mockResolvedValue({ id: createTestId() });

      const definirPerfisAtivosHandler = createMockDefinirPerfisAtivosHandler();
      const { handler } = createHandler({ repository, definirPerfisAtivosHandler });
      const accessContext = createTestAccessContext();

      await handler.execute(accessContext, dto);

      expect(definirPerfisAtivosHandler.execute).not.toHaveBeenCalled();
    });

    it("should not call definirPerfisAtivosHandler when vinculos is empty", async () => {
      const repository = createMockUsuarioRepository();
      repository.create.mockResolvedValue({ id: createTestId() });
      repository.findById.mockResolvedValue({ id: createTestId() });

      const definirPerfisAtivosHandler = createMockDefinirPerfisAtivosHandler();
      const { handler } = createHandler({ repository, definirPerfisAtivosHandler });
      const accessContext = createTestAccessContext();

      await handler.execute(accessContext, { ...dto, vinculos: [] });

      expect(definirPerfisAtivosHandler.execute).not.toHaveBeenCalled();
    });

    it("should call definirPerfisAtivosHandler with flat vinculos", async () => {
      const usuarioId = createTestId();
      const campusId = createTestId();

      const repository = createMockUsuarioRepository();
      repository.create.mockResolvedValue({ id: usuarioId });
      repository.findById.mockResolvedValue({ id: usuarioId });

      const definirPerfisAtivosHandler = createMockDefinirPerfisAtivosHandler();
      const { handler } = createHandler({ repository, definirPerfisAtivosHandler });
      const accessContext = createTestAccessContext();

      const vinculos = [
        { campus: { id: campusId }, cargo: "professor" },
        { campus: { id: campusId }, cargo: "coordenador" },
      ];

      await handler.execute(accessContext, { ...dto, vinculos });

      expect(definirPerfisAtivosHandler.execute).toHaveBeenCalledOnce();
      expect(definirPerfisAtivosHandler.execute).toHaveBeenCalledWith(accessContext, {
        vinculos,
        usuario: { id: usuarioId },
      });
    });
  });
});
