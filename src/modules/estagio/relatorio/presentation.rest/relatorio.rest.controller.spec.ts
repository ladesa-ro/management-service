import { Readable } from "node:stream";
import { describe, expect, it, vi } from "vitest";
import { createTestAccessContext, createTestId } from "@/test/helpers";
import { EstagioRelatorioRestController } from "./estagio-relatorio.rest.controller";
import { RelatorioRestController } from "./relatorio.rest.controller";

describe("Relatorio Controllers", () => {
  describe("RelatorioRestController", () => {
    it("should find all relatorios", async () => {
      const listHandler = {
        execute: vi.fn().mockResolvedValue({
          data: [],
          meta: { page: 1, limit: 20, total: 0 },
        }),
      };
      const findOneHandler = { execute: vi.fn() };
      const createHandler = { execute: vi.fn() };
      const updateHandler = { execute: vi.fn() };
      const deleteHandler = { execute: vi.fn() };

      const controller = new RelatorioRestController(
        listHandler as any,
        findOneHandler as any,
        createHandler as any,
        updateHandler as any,
        deleteHandler as any,
      );

      const result = await controller.findAll(createTestAccessContext(), {} as any);
      expect(listHandler.execute).toHaveBeenCalled();
      expect(result.data).toEqual([]);
    });

    it("should find one relatorio by id", async () => {
      const relatorioId = createTestId();
      const mockResult = {
        id: relatorioId,
        estagio: { id: createTestId() },
        arquivo: { id: createTestId(), name: "relatorio.pdf" },
        conteudoJson: { campo: "valor" },
        dateCreated: "2026-08-26T00:00:00.000Z",
        dateUpdated: "2026-08-26T00:00:00.000Z",
        dateDeleted: null,
      };

      const listHandler = { execute: vi.fn() };
      const findOneHandler = { execute: vi.fn().mockResolvedValue(mockResult) };
      const createHandler = { execute: vi.fn() };
      const updateHandler = { execute: vi.fn() };
      const deleteHandler = { execute: vi.fn() };

      const controller = new RelatorioRestController(
        listHandler as any,
        findOneHandler as any,
        createHandler as any,
        updateHandler as any,
        deleteHandler as any,
      );

      const result = await controller.findById(createTestAccessContext(), { id: relatorioId });
      expect(result.id).toBe(relatorioId);
      expect(result.arquivo?.id).toBe(mockResult.arquivo.id);
    });
  });

  describe("EstagioRelatorioRestController", () => {
    it("should find relatorio by estagio id", async () => {
      const estagioId = createTestId();
      const mockResult = {
        id: createTestId(),
        estagio: { id: estagioId },
        arquivo: { id: createTestId(), name: "relatorio.pdf" },
        conteudoJson: { feedback: "otimo" },
        dateCreated: "2026-08-26T00:00:00.000Z",
        dateUpdated: "2026-08-26T00:00:00.000Z",
        dateDeleted: null,
      };

      const findByEstagioHandler = { execute: vi.fn().mockResolvedValue(mockResult) };
      const uploadPdfHandler = { execute: vi.fn() };
      const getPdfHandler = { execute: vi.fn() };
      const deleteHandler = { execute: vi.fn() };

      const controller = new EstagioRelatorioRestController(
        findByEstagioHandler as any,
        uploadPdfHandler as any,
        getPdfHandler as any,
        deleteHandler as any,
      );

      const result = await controller.findByEstagio(createTestAccessContext(), { id: estagioId });
      expect(result.id).toBe(mockResult.id);
      expect(result.arquivo?.name).toBe("relatorio.pdf");
    });

    it("should upload PDF for estagio via upload endpoint", async () => {
      const estagioId = createTestId();
      const mockResult = {
        id: createTestId(),
        estagio: { id: estagioId },
        arquivo: { id: createTestId(), name: "relatorio.pdf" },
        conteudoJson: null,
        dateCreated: "2026-08-26T00:00:00.000Z",
        dateUpdated: "2026-08-26T00:00:00.000Z",
        dateDeleted: null,
      };

      const findByEstagioHandler = { execute: vi.fn() };
      const uploadPdfHandler = { execute: vi.fn().mockResolvedValue(mockResult) };
      const getPdfHandler = { execute: vi.fn() };
      const deleteHandler = { execute: vi.fn() };

      const controller = new EstagioRelatorioRestController(
        findByEstagioHandler as any,
        uploadPdfHandler as any,
        getPdfHandler as any,
        deleteHandler as any,
      );

      const file = {
        originalname: "relatorio.pdf",
        mimetype: "application/pdf",
        buffer: Buffer.from("pdf-data"),
      } as Express.Multer.File;

      const result = await controller.upload(createTestAccessContext(), { id: estagioId }, file);

      expect(uploadPdfHandler.execute).toHaveBeenCalledWith(expect.anything(), {
        estagioId,
        file,
      });
      expect(result.id).toBe(mockResult.id);
    });

    it("should return streamable file on getPdf", async () => {
      const estagioId = createTestId();
      const mockStreamResult = {
        stream: Readable.from(["pdf binary data"]),
        mimeType: "application/pdf",
        disposition: 'attachment; filename="relatorio.pdf"',
      };

      const findByEstagioHandler = { execute: vi.fn() };
      const uploadPdfHandler = { execute: vi.fn() };
      const getPdfHandler = { execute: vi.fn().mockResolvedValue(mockStreamResult) };
      const deleteHandler = { execute: vi.fn() };

      const controller = new EstagioRelatorioRestController(
        findByEstagioHandler as any,
        uploadPdfHandler as any,
        getPdfHandler as any,
        deleteHandler as any,
      );

      const streamable = await controller.getPdf(createTestAccessContext(), { id: estagioId });
      expect(streamable).toBeDefined();
      expect(getPdfHandler.execute).toHaveBeenCalledWith(expect.anything(), estagioId);
    });

    it("should delete relatorio for estagio", async () => {
      const estagioId = createTestId();
      const relatorioId = createTestId();
      const mockResult = {
        id: relatorioId,
        estagio: { id: estagioId },
        arquivo: null,
        conteudoJson: {},
        dateCreated: "2026-08-26T00:00:00.000Z",
        dateUpdated: "2026-08-26T00:00:00.000Z",
        dateDeleted: null,
      };

      const findByEstagioHandler = { execute: vi.fn().mockResolvedValue(mockResult) };
      const uploadPdfHandler = { execute: vi.fn() };
      const getPdfHandler = { execute: vi.fn() };
      const deleteHandler = { execute: vi.fn().mockResolvedValue(undefined) };

      const controller = new EstagioRelatorioRestController(
        findByEstagioHandler as any,
        uploadPdfHandler as any,
        getPdfHandler as any,
        deleteHandler as any,
      );

      const result = await controller.deleteByEstagio(createTestAccessContext(), { id: estagioId });
      expect(deleteHandler.execute).toHaveBeenCalledWith(expect.anything(), { id: relatorioId });
      expect(result.message).toContain("sucesso");
    });
  });
});
