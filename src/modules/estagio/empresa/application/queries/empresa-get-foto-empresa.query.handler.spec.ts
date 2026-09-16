import { describe, expect, it, vi } from "vitest";
import { ResourceNotFoundError } from "@/application/errors";
import { createMockCqrsRepository, createTestAccessContext, createTestId } from "@/test/helpers";
import { EmpresaGetFotoEmpresaQueryHandlerImpl } from "./empresa-get-foto-empresa.query.handler";

describe("EmpresaGetFotoEmpresaQueryHandler", () => {
  it("should throw ResourceNotFoundError when company does not exist", async () => {
    const repository = createMockCqrsRepository();
    repository.getFindOneQueryResult.mockResolvedValue(null);

    const getLatestArquivoIdHandler = { execute: vi.fn() };
    const getStreamableFileHandler = { execute: vi.fn() };

    const handler = new EmpresaGetFotoEmpresaQueryHandlerImpl(
      repository as any,
      getLatestArquivoIdHandler as any,
      getStreamableFileHandler as any,
    );

    const id = createTestId();
    await expect(handler.execute(createTestAccessContext(), { id })).rejects.toThrow(
      ResourceNotFoundError,
    );
  });

  it("should throw ResourceNotFoundError when company exists but has no photo", async () => {
    const repository = createMockCqrsRepository();
    const id = createTestId();
    repository.getFindOneQueryResult.mockResolvedValue({
      id,
      razaoSocial: "Acme Corp",
      fotoEmpresa: null,
    });

    const getLatestArquivoIdHandler = { execute: vi.fn() };
    const getStreamableFileHandler = { execute: vi.fn() };

    const handler = new EmpresaGetFotoEmpresaQueryHandlerImpl(
      repository as any,
      getLatestArquivoIdHandler as any,
      getStreamableFileHandler as any,
    );

    await expect(handler.execute(createTestAccessContext(), { id })).rejects.toThrow(
      ResourceNotFoundError,
    );
  });

  it("should throw ResourceNotFoundError when photo has no latest arquivo", async () => {
    const repository = createMockCqrsRepository();
    const id = createTestId();
    const fotoId = createTestId();
    repository.getFindOneQueryResult.mockResolvedValue({
      id,
      razaoSocial: "Acme Corp",
      fotoEmpresa: { id: fotoId },
    });

    const getLatestArquivoIdHandler = { execute: vi.fn().mockResolvedValue(null) };
    const getStreamableFileHandler = { execute: vi.fn() };

    const handler = new EmpresaGetFotoEmpresaQueryHandlerImpl(
      repository as any,
      getLatestArquivoIdHandler as any,
      getStreamableFileHandler as any,
    );

    await expect(handler.execute(createTestAccessContext(), { id })).rejects.toThrow(
      ResourceNotFoundError,
    );
    expect(getLatestArquivoIdHandler.execute).toHaveBeenCalledWith(null, { imagemId: fotoId });
  });

  it("should return streamable file result with correct mimeType and stream when image exists", async () => {
    const repository = createMockCqrsRepository();
    const id = createTestId();
    const fotoId = createTestId();
    const arquivoId = createTestId();

    repository.getFindOneQueryResult.mockResolvedValue({
      id,
      razaoSocial: "Acme Corp",
      fotoEmpresa: { id: fotoId },
    });

    const mockStreamableResult = {
      stream: {} as any,
      mimeType: "image/png",
      disposition: "inline",
    };

    const getLatestArquivoIdHandler = { execute: vi.fn().mockResolvedValue(arquivoId) };
    const getStreamableFileHandler = { execute: vi.fn().mockResolvedValue(mockStreamableResult) };

    const handler = new EmpresaGetFotoEmpresaQueryHandlerImpl(
      repository as any,
      getLatestArquivoIdHandler as any,
      getStreamableFileHandler as any,
    );

    const result = await handler.execute(createTestAccessContext(), { id });

    expect(result).toEqual(mockStreamableResult);
    expect(result.mimeType).toBe("image/png");
    expect(getStreamableFileHandler.execute).toHaveBeenCalledWith(null, { id: arquivoId });
  });
});
