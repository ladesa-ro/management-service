import { BadRequestException, NotFoundException } from "@nestjs/common";
import { describe, expect, it, vi } from "vitest";
import { ResourceNotFoundError } from "@/application/errors";
import { createMockCqrsRepository, createTestAccessContext, createTestId } from "@/test/helpers";
import { Relatorio } from "../../domain/relatorio";
import { RelatorioGetPdfQueryHandlerImpl } from "../queries/relatorio-get-pdf.query.handler";
import { RelatorioCreateCommandHandlerImpl } from "./relatorio-create.command.handler";
import { RelatorioDeleteCommandHandlerImpl } from "./relatorio-delete.command.handler";
import { RelatorioUpdateCommandHandlerImpl } from "./relatorio-update.command.handler";
import { RelatorioUploadPdfCommandHandlerImpl } from "./relatorio-upload-pdf.command.handler";

describe("Relatorio Command & Query Handlers", () => {
  describe("RelatorioUploadPdfCommandHandler", () => {
    it("should upload PDF and create a new relatorio for estagio", async () => {
      const repository = {
        ...createMockCqrsRepository(),
        findByEstagioId: vi.fn().mockResolvedValue(null),
      };
      const estagioRepository = {
        ...createMockCqrsRepository(),
        loadById: vi.fn().mockResolvedValue({ id: createTestId() }),
      };
      const arquivoId = createTestId();
      const arquivoCreateHandler = {
        execute: vi.fn().mockResolvedValue({ id: arquivoId }),
      };
      const savedResult = {
        id: createTestId(),
        estagio: { id: createTestId() },
        arquivo: { id: arquivoId, name: "relatorio.pdf", mimeType: "application/pdf" },
      };
      repository.getFindOneQueryResult.mockResolvedValue(savedResult);

      const handler = new RelatorioUploadPdfCommandHandlerImpl(
        repository as any,
        estagioRepository as any,
        arquivoCreateHandler as any,
      );

      const estagioId = createTestId();
      const file = {
        originalname: "relatorio.pdf",
        mimetype: "application/pdf",
        buffer: Buffer.from("pdf-content"),
      } as Express.Multer.File;

      const result = await handler.execute(createTestAccessContext(), {
        estagioId,
        file,
      });

      expect(arquivoCreateHandler.execute).toHaveBeenCalled();
      expect(repository.save).toHaveBeenCalled();
      expect(result).toEqual(savedResult);
    });

    it("should reject non-PDF file upload", async () => {
      const repository = createMockCqrsRepository();
      const estagioRepository = createMockCqrsRepository();
      const arquivoCreateHandler = { execute: vi.fn() };

      const handler = new RelatorioUploadPdfCommandHandlerImpl(
        repository as any,
        estagioRepository as any,
        arquivoCreateHandler as any,
      );

      const file = {
        originalname: "foto.png",
        mimetype: "image/png",
        buffer: Buffer.from("png-content"),
      } as Express.Multer.File;

      await expect(
        handler.execute(createTestAccessContext(), {
          estagioId: createTestId(),
          file,
        }),
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe("RelatorioGetPdfQueryHandler", () => {
    it("should return streamable file result when report has PDF", async () => {
      const arquivoId = createTestId();
      const estagioId = createTestId();
      const relatorio = Relatorio.create({
        estagio: { id: estagioId },
        arquivo: { id: arquivoId },
      });

      const repository = {
        ...createMockCqrsRepository(),
        findByEstagioId: vi.fn().mockResolvedValue(relatorio),
      };
      const mockStreamResult = {
        stream: {} as any,
        mimeType: "application/pdf",
        disposition: 'attachment; filename="relatorio.pdf"',
      };
      const arquivoGetStreamableFileHandler = {
        execute: vi.fn().mockResolvedValue(mockStreamResult),
      };

      const handler = new RelatorioGetPdfQueryHandlerImpl(
        repository as any,
        arquivoGetStreamableFileHandler as any,
      );

      const result = await handler.execute(createTestAccessContext(), estagioId);
      expect(result).toEqual(mockStreamResult);
      expect(arquivoGetStreamableFileHandler.execute).toHaveBeenCalledWith(expect.anything(), {
        id: arquivoId,
      });
    });

    it("should throw NotFoundException when report has no PDF", async () => {
      const estagioId = createTestId();
      const relatorio = Relatorio.create({
        estagio: { id: estagioId },
        arquivo: null,
      });

      const repository = {
        ...createMockCqrsRepository(),
        findByEstagioId: vi.fn().mockResolvedValue(relatorio),
      };
      const arquivoGetStreamableFileHandler = { execute: vi.fn() };

      const handler = new RelatorioGetPdfQueryHandlerImpl(
        repository as any,
        arquivoGetStreamableFileHandler as any,
      );

      await expect(handler.execute(createTestAccessContext(), estagioId)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe("RelatorioCreateCommandHandler", () => {
    it("should create a new relatorio when none exists for estagio", async () => {
      const repository = {
        ...createMockCqrsRepository(),
        findByEstagioId: vi.fn().mockResolvedValue(null),
      };
      const estagioRepository = {
        ...createMockCqrsRepository(),
        loadById: vi.fn().mockResolvedValue({ id: createTestId() }),
      };
      const savedResult = {
        id: createTestId(),
        estagio: { id: createTestId() },
        conteudoJson: { respostas: ["ok"] },
      };
      repository.getFindOneQueryResult.mockResolvedValue(savedResult);

      const handler = new RelatorioCreateCommandHandlerImpl(
        repository as any,
        estagioRepository as any,
      );

      const estagioId = createTestId();
      const result = await handler.execute(createTestAccessContext(), {
        estagio: { id: estagioId },
        conteudoJson: { respostas: ["ok"] },
      });

      expect(repository.save).toHaveBeenCalled();
      expect(result).toEqual(savedResult);
    });

    it("should update existing relatorio when one already exists for estagio (upsert)", async () => {
      const existingRelatorio = Relatorio.create({
        estagio: { id: createTestId() },
        conteudoJson: { versao: 1 },
      });

      const repository = {
        ...createMockCqrsRepository(),
        findByEstagioId: vi.fn().mockResolvedValue(existingRelatorio),
      };
      const estagioRepository = {
        ...createMockCqrsRepository(),
        loadById: vi.fn().mockResolvedValue({ id: createTestId() }),
      };
      const updatedResult = {
        id: existingRelatorio.id,
        estagio: { id: existingRelatorio.estagio.id },
        conteudoJson: { versao: 2 },
      };
      repository.getFindOneQueryResult.mockResolvedValue(updatedResult);

      const handler = new RelatorioCreateCommandHandlerImpl(
        repository as any,
        estagioRepository as any,
      );

      const result = await handler.execute(createTestAccessContext(), {
        estagio: { id: existingRelatorio.estagio.id },
        conteudoJson: { versao: 2 },
      });

      expect(repository.save).toHaveBeenCalledWith(existingRelatorio);
      expect(existingRelatorio.conteudoJson).toEqual({ versao: 2 });
      expect(result).toEqual(updatedResult);
    });

    it("should throw ResourceNotFoundError when estagio is not found", async () => {
      const repository = {
        ...createMockCqrsRepository(),
        findByEstagioId: vi.fn().mockResolvedValue(null),
      };
      const estagioRepository = {
        ...createMockCqrsRepository(),
        loadById: vi.fn().mockResolvedValue(null),
      };

      const handler = new RelatorioCreateCommandHandlerImpl(
        repository as any,
        estagioRepository as any,
      );

      await expect(
        handler.execute(createTestAccessContext(), {
          estagio: { id: createTestId() },
          conteudoJson: {},
        }),
      ).rejects.toThrow(ResourceNotFoundError);
    });
  });

  describe("RelatorioUpdateCommandHandler", () => {
    it("should update relatorio and return query result", async () => {
      const relatorio = Relatorio.create({
        estagio: { id: createTestId() },
        conteudoJson: { texto: "inicial" },
      });

      const repository = {
        ...createMockCqrsRepository(),
        loadById: vi.fn().mockResolvedValue(relatorio),
      };
      const updatedResult = {
        id: relatorio.id,
        estagio: { id: relatorio.estagio.id },
        conteudoJson: { texto: "atualizado" },
      };
      repository.getFindOneQueryResult.mockResolvedValue(updatedResult);

      const handler = new RelatorioUpdateCommandHandlerImpl(repository as any);

      const result = await handler.execute(createTestAccessContext(), {
        id: relatorio.id,
        conteudoJson: { texto: "atualizado" },
      });

      expect(repository.save).toHaveBeenCalledWith(relatorio);
      expect(relatorio.conteudoJson).toEqual({ texto: "atualizado" });
      expect(result).toEqual(updatedResult);
    });

    it("should throw ResourceNotFoundError when relatorio to update is not found", async () => {
      const repository = {
        ...createMockCqrsRepository(),
        loadById: vi.fn().mockResolvedValue(null),
      };

      const handler = new RelatorioUpdateCommandHandlerImpl(repository as any);

      await expect(
        handler.execute(createTestAccessContext(), {
          id: createTestId(),
          conteudoJson: {},
        }),
      ).rejects.toThrow(ResourceNotFoundError);
    });
  });

  describe("RelatorioDeleteCommandHandler", () => {
    it("should soft delete relatorio when it exists", async () => {
      const relatorio = Relatorio.create({
        estagio: { id: createTestId() },
        conteudoJson: {},
      });

      const repository = {
        ...createMockCqrsRepository(),
        loadById: vi.fn().mockResolvedValue(relatorio),
        softDeleteById: vi.fn().mockResolvedValue(undefined),
      };

      const handler = new RelatorioDeleteCommandHandlerImpl(repository as any);

      await handler.execute(createTestAccessContext(), { id: relatorio.id });

      expect(repository.softDeleteById).toHaveBeenCalledWith(relatorio.id);
    });

    it("should throw ResourceNotFoundError when relatorio to delete is not found", async () => {
      const repository = {
        ...createMockCqrsRepository(),
        loadById: vi.fn().mockResolvedValue(null),
      };

      const handler = new RelatorioDeleteCommandHandlerImpl(repository as any);

      await expect(
        handler.execute(createTestAccessContext(), { id: createTestId() }),
      ).rejects.toThrow(ResourceNotFoundError);
    });
  });
});
