import { BadRequestException } from "@nestjs/common";
import { describe, expect, it, vi } from "vitest";
import { ForbiddenError, UnauthorizedError } from "@/application/errors";
import { createTestAccessContext, createTestId, createTestRequestActor } from "@/test/helpers";
import { EstagioSolicitarCommandHandlerImpl } from "./estagio-solicitar.command.handler";

function createValidSolicitarDto() {
  return {
    razaoSocial: "Tech Solutions LTDA",
    nomeFantasia: "Tech Solutions",
    cnpj: "12.345.678/0001-90",
    telefone: "69999999999",
    email: "contato@techsolutions.com",
    endereco: { id: createTestId() },
  };
}

function createMocks() {
  const estagioCreateHandler = {
    execute: vi.fn().mockResolvedValue({ id: createTestId(), status: "EM_FASE_INICIAL" }),
  };

  const estagiarioRepository = {
    findByUsuarioId: vi.fn(),
    findByPerfilId: vi.fn(),
    loadById: vi.fn(),
    save: vi.fn(),
    softDeleteById: vi.fn(),
    getFindOneQueryResult: vi.fn(),
    getFindAllQueryResult: vi.fn(),
  };

  const empresaRepository = {
    findByCnpj: vi.fn(),
    loadById: vi.fn(),
    save: vi.fn(),
    softDeleteById: vi.fn(),
    updateImagemField: vi.fn(),
    getFindOneQueryResult: vi.fn(),
    getFindAllQueryResult: vi.fn(),
  };

  const empresaCreateHandler = {
    execute: vi.fn().mockResolvedValue({ id: createTestId() }),
  };

  const perfilRepository = {
    findAllActiveByUsuarioId: vi.fn().mockResolvedValue([]),
    findByUsuarioAndCampus: vi.fn(),
    getFindOneQueryResult: vi.fn(),
    getFindAllQueryResult: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    softDeleteById: vi.fn(),
    deactivateByIds: vi.fn(),
    findVinculosByFiltros: vi.fn(),
  };

  return {
    estagioCreateHandler,
    estagiarioRepository,
    empresaRepository,
    empresaCreateHandler,
    perfilRepository,
  };
}

describe("EstagioSolicitarCommandHandler", () => {
  it("should throw UnauthorizedError if user is not authenticated", async () => {
    const mocks = createMocks();
    const handler = new EstagioSolicitarCommandHandlerImpl(
      mocks.estagioCreateHandler as any,
      mocks.estagiarioRepository as any,
      mocks.empresaRepository as any,
      mocks.empresaCreateHandler as any,
      mocks.perfilRepository as any,
    );

    const accessContext = { requestActor: null } as any;

    await expect(handler.execute(accessContext, createValidSolicitarDto())).rejects.toThrow(
      UnauthorizedError,
    );
  });

  it("should throw ForbiddenError if user has no estagiario profile", async () => {
    const mocks = createMocks();
    mocks.estagiarioRepository.findByUsuarioId.mockResolvedValue(null);
    mocks.perfilRepository.findAllActiveByUsuarioId.mockResolvedValue([]);

    const handler = new EstagioSolicitarCommandHandlerImpl(
      mocks.estagioCreateHandler as any,
      mocks.estagiarioRepository as any,
      mocks.empresaRepository as any,
      mocks.empresaCreateHandler as any,
      mocks.perfilRepository as any,
    );

    const accessContext = createTestAccessContext(createTestRequestActor({ id: "user-1" }));

    await expect(handler.execute(accessContext, createValidSolicitarDto())).rejects.toThrow(
      ForbiddenError,
    );
  });

  it("should request internship reusing existing company when found by CNPJ", async () => {
    const mocks = createMocks();
    const estagiarioId = createTestId();
    const cursoId = createTestId();
    const empresaId = createTestId();
    const campusId = createTestId();

    mocks.estagiarioRepository.findByUsuarioId.mockResolvedValue({
      id: estagiarioId,
      curso: { id: cursoId },
      perfil: { id: "perfil-1" },
    });

    mocks.perfilRepository.findAllActiveByUsuarioId.mockResolvedValue([
      { id: "perfil-1", campus: { id: campusId } },
    ]);

    mocks.empresaRepository.findByCnpj.mockResolvedValue({ id: empresaId });

    const expectedResult = { id: createTestId(), status: "EM_FASE_INICIAL" };
    mocks.estagioCreateHandler.execute.mockResolvedValue(expectedResult);

    const handler = new EstagioSolicitarCommandHandlerImpl(
      mocks.estagioCreateHandler as any,
      mocks.estagiarioRepository as any,
      mocks.empresaRepository as any,
      mocks.empresaCreateHandler as any,
      mocks.perfilRepository as any,
    );

    const accessContext = createTestAccessContext(createTestRequestActor({ id: "user-1" }));
    const dto = createValidSolicitarDto();
    const result = await handler.execute(accessContext, dto);

    expect(result).toEqual(expectedResult);
    expect(mocks.empresaRepository.findByCnpj).toHaveBeenCalledWith(dto.cnpj);
    expect(mocks.empresaCreateHandler.execute).not.toHaveBeenCalled();
    expect(mocks.estagioCreateHandler.execute).toHaveBeenCalledWith(
      accessContext,
      expect.objectContaining({
        campus: { id: campusId },
        empresa: { id: empresaId },
        estagiario: { id: estagiarioId },
        CursoReferencia: { id: cursoId },
        status: "EM_FASE_INICIAL",
      }),
    );
  });

  it("should create new company and request internship when company not found by CNPJ", async () => {
    const mocks = createMocks();
    const estagiarioId = createTestId();
    const newEmpresaId = createTestId();
    const campusId = createTestId();

    mocks.estagiarioRepository.findByUsuarioId.mockResolvedValue({
      id: estagiarioId,
      curso: null,
      perfil: { id: "perfil-1" },
    });

    mocks.perfilRepository.findAllActiveByUsuarioId.mockResolvedValue([
      { id: "perfil-1", campus: { id: campusId } },
    ]);

    mocks.empresaRepository.findByCnpj.mockResolvedValue(null);
    mocks.empresaCreateHandler.execute.mockResolvedValue({ id: newEmpresaId });

    const expectedResult = { id: createTestId(), status: "EM_FASE_INICIAL" };
    mocks.estagioCreateHandler.execute.mockResolvedValue(expectedResult);

    const handler = new EstagioSolicitarCommandHandlerImpl(
      mocks.estagioCreateHandler as any,
      mocks.estagiarioRepository as any,
      mocks.empresaRepository as any,
      mocks.empresaCreateHandler as any,
      mocks.perfilRepository as any,
    );

    const accessContext = createTestAccessContext(createTestRequestActor({ id: "user-1" }));
    const dto = createValidSolicitarDto();
    const result = await handler.execute(accessContext, dto);

    expect(result).toEqual(expectedResult);
    expect(mocks.empresaRepository.findByCnpj).toHaveBeenCalledWith(dto.cnpj);
    expect(mocks.empresaCreateHandler.execute).toHaveBeenCalledWith(accessContext, dto);
    expect(mocks.estagioCreateHandler.execute).toHaveBeenCalledWith(
      accessContext,
      expect.objectContaining({
        campus: { id: campusId },
        empresa: { id: newEmpresaId },
        estagiario: { id: estagiarioId },
        status: "EM_FASE_INICIAL",
      }),
    );
  });

  it("should throw BadRequestException if campus cannot be determined", async () => {
    const mocks = createMocks();
    const estagiarioId = createTestId();

    mocks.estagiarioRepository.findByUsuarioId.mockResolvedValue({
      id: estagiarioId,
      curso: null,
      perfil: null,
    });
    mocks.perfilRepository.findAllActiveByUsuarioId.mockResolvedValue([]);

    const handler = new EstagioSolicitarCommandHandlerImpl(
      mocks.estagioCreateHandler as any,
      mocks.estagiarioRepository as any,
      mocks.empresaRepository as any,
      mocks.empresaCreateHandler as any,
      mocks.perfilRepository as any,
    );

    const accessContext = createTestAccessContext(createTestRequestActor({ id: "user-1" }));
    (accessContext as any).currentCampusId = undefined;

    await expect(handler.execute(accessContext, createValidSolicitarDto())).rejects.toThrow(
      BadRequestException,
    );
  });
});
