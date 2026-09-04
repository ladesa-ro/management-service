import { describe, expect, it, vi } from "vitest";
import { ForbiddenError } from "@/application/errors";
import { createTestAccessContext, createTestId, createTestRequestActor } from "@/test/helpers";
import { IEstagioPermissionChecker } from "../domain/authorization/estagio-permission-checker.interface";
import {
  IEstagioCreateCommandHandler,
  IEstagioDeleteCommandHandler,
  IEstagioUpdateCommandHandler,
} from "../domain/commands";
import { EstagioRestController } from "./estagio.rest.controller";

describe("EstagioRestController permissions hardening", () => {
  function createControllerWithPermission(isAuthorized: boolean) {
    const createHandler = { execute: vi.fn().mockResolvedValue({ id: createTestId() }) };
    const updateHandler = { execute: vi.fn().mockResolvedValue({ id: createTestId() }) };
    const deleteHandler = { execute: vi.fn().mockResolvedValue(undefined) };

    const permissionChecker = {
      ensureCanManageEstagio: vi.fn().mockImplementation(async () => {
        if (!isAuthorized) {
          throw new ForbiddenError("Apenas servidores do CIEC podem gerenciar estágios.");
        }
      }),
    };

    const providers = new Map<any, any>([
      [IEstagioCreateCommandHandler, createHandler],
      [IEstagioUpdateCommandHandler, updateHandler],
      [IEstagioDeleteCommandHandler, deleteHandler],
      [IEstagioPermissionChecker, permissionChecker],
    ]);

    const container = {
      get: vi.fn((token: any) => providers.get(token)),
    };

    const pushService = {
      notificarImportacaoIniciada: vi.fn(),
      notificarImportacaoConcluida: vi.fn(),
    };

    const controller = new EstagioRestController(container as any, pushService as any);

    return { controller, permissionChecker, createHandler, updateHandler, deleteHandler };
  }

  it("should throw ForbiddenError when student tries to create internship vacancy directly", async () => {
    const { controller } = createControllerWithPermission(false);
    const accessContext = createTestAccessContext(createTestRequestActor({ id: "student-1" }));

    await expect(
      controller.create(accessContext, {
        empresa: { id: createTestId() },
        cargaHoraria: 30,
      } as any),
    ).rejects.toThrow(ForbiddenError);
  });

  it("should throw ForbiddenError when student tries to update internship via PATCH", async () => {
    const { controller } = createControllerWithPermission(false);
    const accessContext = createTestAccessContext(createTestRequestActor({ id: "student-1" }));

    await expect(
      controller.update(accessContext, { id: createTestId() }, { cargaHoraria: 40 }),
    ).rejects.toThrow(ForbiddenError);
  });

  it("should throw ForbiddenError when student tries to replace internship via PUT", async () => {
    const { controller } = createControllerWithPermission(false);
    const accessContext = createTestAccessContext(createTestRequestActor({ id: "student-1" }));

    await expect(
      controller.replace(accessContext, { id: createTestId() }, { cargaHoraria: 40 }),
    ).rejects.toThrow(ForbiddenError);
  });

  it("should throw ForbiddenError when student tries to delete internship via DELETE", async () => {
    const { controller } = createControllerWithPermission(false);
    const accessContext = createTestAccessContext(createTestRequestActor({ id: "student-1" }));

    await expect(controller.delete(accessContext, { id: createTestId() })).rejects.toThrow(
      ForbiddenError,
    );
  });

  it("should succeed when authorized staff creates internship", async () => {
    const { controller, createHandler } = createControllerWithPermission(true);
    const accessContext = createTestAccessContext(
      createTestRequestActor({ id: "staff-1", isSuperUser: true }),
    );

    const result = await controller.create(accessContext, {
      empresa: { id: createTestId() },
      cargaHoraria: 30,
    } as any);

    expect(result).toBeDefined();
    expect(createHandler.execute).toHaveBeenCalled();
  });
});
