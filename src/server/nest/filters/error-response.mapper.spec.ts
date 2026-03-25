import { BadRequestException, HttpException, NotFoundException } from "@nestjs/common";
import { describe, expect, it } from "vitest";
import {
  ForbiddenError,
  GoneError,
  ResourceNotFoundError,
  ValidationError,
} from "@/application/errors";
import { EntityValidationError } from "@/domain/errors";
import { buildStandardizedErrorResponse } from "./error-response.mapper";

describe("buildStandardizedErrorResponse", () => {
  describe("with ResourceNotFoundError", () => {
    it("returns status 404", () => {
      const error = new ResourceNotFoundError("Campus");
      const response = buildStandardizedErrorResponse(error);
      expect(response.statusCode).toBe(404);
    });

    it("returns code APP.RESOURCE_NOT_FOUND", () => {
      const error = new ResourceNotFoundError("Campus");
      const response = buildStandardizedErrorResponse(error);
      expect(response.code).toBe("APP.RESOURCE_NOT_FOUND");
    });

    it("includes the error message", () => {
      const error = new ResourceNotFoundError("Campus", "uuid-123");
      const response = buildStandardizedErrorResponse(error);
      expect(response.message).toBe('Campus com identificador "uuid-123" não encontrado(a).');
    });

    it("does not include details", () => {
      const error = new ResourceNotFoundError("Campus");
      const response = buildStandardizedErrorResponse(error);
      expect(response.details).toBeUndefined();
    });
  });

  describe("with GoneError", () => {
    it("returns status 410", () => {
      const error = new GoneError("Perfil");
      const response = buildStandardizedErrorResponse(error);
      expect(response.statusCode).toBe(410);
    });

    it("returns code APP.GONE", () => {
      const error = new GoneError("Perfil");
      const response = buildStandardizedErrorResponse(error);
      expect(response.code).toBe("APP.GONE");
    });

    it("includes the error message with identifier", () => {
      const error = new GoneError("Perfil", "uuid-123");
      const response = buildStandardizedErrorResponse(error);
      expect(response.message).toBe('Perfil com identificador "uuid-123" não está mais ativo(a).');
    });
  });

  describe("with ForbiddenError", () => {
    it("returns status 403", () => {
      const error = new ForbiddenError();
      const response = buildStandardizedErrorResponse(error);
      expect(response.statusCode).toBe(403);
    });

    it("returns code APP.FORBIDDEN", () => {
      const error = new ForbiddenError();
      const response = buildStandardizedErrorResponse(error);
      expect(response.code).toBe("APP.FORBIDDEN");
    });

    it("includes the error message", () => {
      const error = new ForbiddenError("Sem permissão.");
      const response = buildStandardizedErrorResponse(error);
      expect(response.message).toBe("Sem permissão.");
    });
  });

  describe("with ValidationError", () => {
    it("returns status 422", () => {
      const error = new ValidationError([{ field: "cnpj", message: "inválido" }]);
      const response = buildStandardizedErrorResponse(error);
      expect(response.statusCode).toBe(422);
    });

    it("returns code APP.VALIDATION", () => {
      const error = new ValidationError([{ field: "cnpj", message: "inválido" }]);
      const response = buildStandardizedErrorResponse(error);
      expect(response.code).toBe("APP.VALIDATION");
    });

    it("includes validation details", () => {
      const details = [
        { field: "cnpj", message: "formato inválido", rule: "cnpjFormat" },
        { field: "nomeFantasia", message: "obrigatório" },
      ];
      const error = new ValidationError(details);
      const response = buildStandardizedErrorResponse(error);
      expect(response.details).toEqual(details);
    });
  });

  describe("with EntityValidationError", () => {
    it("returns status 422", () => {
      const error = new EntityValidationError("Campus", { field: "cnpj", message: "inválido" });
      const response = buildStandardizedErrorResponse(error);
      expect(response.statusCode).toBe(422);
    });

    it("returns code DOMAIN.ENTITY_VALIDATION", () => {
      const error = new EntityValidationError("Campus", { field: "cnpj", message: "inválido" });
      const response = buildStandardizedErrorResponse(error);
      expect(response.code).toBe("DOMAIN.ENTITY_VALIDATION");
    });

    it("maps domain details to response details", () => {
      const error = new EntityValidationError("Campus", {
        field: "cnpj",
        message: "formato inválido",
        rule: "cnpjFormat",
        value: "12345",
      });
      const response = buildStandardizedErrorResponse(error);
      expect(response.details).toEqual([
        { field: "cnpj", message: "formato inválido", rule: "cnpjFormat", value: "12345" },
      ]);
    });

    it("maps multiple domain details", () => {
      const details = [
        { field: "nomeFantasia", message: "obrigatório" },
        { field: "cnpj", message: "inválido" },
      ];
      const error = new EntityValidationError("Campus", details);
      const response = buildStandardizedErrorResponse(error);
      expect(response.details).toHaveLength(2);
    });
  });

  describe("with BadRequestException carrying Zod-like errors", () => {
    it("returns status 422 when Zod errors are present in the response body", () => {
      const zodErrors = [{ field: "nome", message: "campo obrigatório", rule: "min" }];
      const exception = new BadRequestException(zodErrors);
      const response = buildStandardizedErrorResponse(exception);
      expect(response.statusCode).toBe(422);
    });

    it("returns code APP.VALIDATION when Zod errors are present", () => {
      const zodErrors = [{ field: "nome", message: "campo obrigatório" }];
      const exception = new BadRequestException(zodErrors);
      const response = buildStandardizedErrorResponse(exception);
      expect(response.code).toBe("APP.VALIDATION");
    });

    it("includes mapped details from Zod errors", () => {
      const zodErrors = [{ field: "cnpj", message: "inválido", rule: "cnpjFormat" }];
      const exception = new BadRequestException(zodErrors);
      const response = buildStandardizedErrorResponse(exception);
      expect(response.details).toEqual([
        { field: "cnpj", message: "inválido", rule: "cnpjFormat" },
      ]);
    });

    it("returns 422 when Zod errors are nested under message key", () => {
      const zodErrors = [{ field: "nome", message: "obrigatório" }];
      const exception = new BadRequestException({ message: zodErrors, statusCode: 400 });
      const response = buildStandardizedErrorResponse(exception);
      expect(response.statusCode).toBe(422);
    });
  });

  describe("with BadRequestException without Zod errors", () => {
    it("returns status 400", () => {
      const exception = new BadRequestException("Dados malformados.");
      const response = buildStandardizedErrorResponse(exception);
      expect(response.statusCode).toBe(400);
    });

    it("returns code HTTP.BAD_REQUEST", () => {
      const exception = new BadRequestException("Dados malformados.");
      const response = buildStandardizedErrorResponse(exception);
      expect(response.code).toBe("HTTP.BAD_REQUEST");
    });

    it("uses exception message", () => {
      const exception = new BadRequestException("Dados malformados.");
      const response = buildStandardizedErrorResponse(exception);
      expect(response.message).toBe("Dados malformados.");
    });

    it("does not include details", () => {
      const exception = new BadRequestException("Dados malformados.");
      const response = buildStandardizedErrorResponse(exception);
      expect(response.details).toBeUndefined();
    });
  });

  describe("with generic HttpException", () => {
    it("uses the status from the exception", () => {
      const exception = new NotFoundException("Recurso não encontrado.");
      const response = buildStandardizedErrorResponse(exception);
      expect(response.statusCode).toBe(404);
    });

    it("builds code from the HTTP status name", () => {
      const exception = new NotFoundException("Recurso não encontrado.");
      const response = buildStandardizedErrorResponse(exception);
      expect(response.code).toBe("HTTP.NOT_FOUND");
    });

    it("includes the exception message", () => {
      const exception = new HttpException("Erro customizado.", 418);
      const response = buildStandardizedErrorResponse(exception);
      expect(response.message).toBe("Erro customizado.");
    });

    it("uses string response body directly as message when it is a string", () => {
      const exception = new HttpException("Mensagem direta.", 503);
      const response = buildStandardizedErrorResponse(exception);
      expect(response.message).toBe("Mensagem direta.");
    });

    it("falls back to exception.message when response body is not a string", () => {
      const exception = new HttpException({ error: "detail" }, 422);
      const response = buildStandardizedErrorResponse(exception);
      expect(response.message).toBe(exception.message);
    });
  });

  describe("with an unknown plain Error", () => {
    it("returns status 500", () => {
      const error = new Error("erro inesperado");
      const response = buildStandardizedErrorResponse(error);
      expect(response.statusCode).toBe(500);
    });

    it("returns code HTTP.INTERNAL_SERVER_ERROR", () => {
      const error = new Error("erro inesperado");
      const response = buildStandardizedErrorResponse(error);
      expect(response.code).toBe("HTTP.INTERNAL_SERVER_ERROR");
    });

    it("returns a generic message, not the original error message", () => {
      const error = new Error("detalhes internos não devem vazar");
      const response = buildStandardizedErrorResponse(error);
      expect(response.message).toBe("Ocorreu um erro interno. Tente novamente mais tarde.");
    });

    it("handles a non-Error unknown value", () => {
      const response = buildStandardizedErrorResponse("string inesperada");
      expect(response.statusCode).toBe(500);
      expect(response.code).toBe("HTTP.INTERNAL_SERVER_ERROR");
    });
  });

  describe("path parameter", () => {
    it("includes path in the response when provided", () => {
      const error = new ResourceNotFoundError("Campus");
      const response = buildStandardizedErrorResponse(error, "/ambientes/campus/999");
      expect(response.path).toBe("/ambientes/campus/999");
    });

    it("path is undefined when not provided", () => {
      const error = new ResourceNotFoundError("Campus");
      const response = buildStandardizedErrorResponse(error);
      expect(response.path).toBeUndefined();
    });

    it("includes path for unknown errors", () => {
      const response = buildStandardizedErrorResponse(new Error("fail"), "/api/v1/test");
      expect(response.path).toBe("/api/v1/test");
    });
  });

  describe("timestamp", () => {
    it("timestamp is a string", () => {
      const response = buildStandardizedErrorResponse(new Error("fail"));
      expect(typeof response.timestamp).toBe("string");
    });

    it("timestamp is a non-empty string", () => {
      const response = buildStandardizedErrorResponse(new Error("fail"));
      expect(response.timestamp.length).toBeGreaterThan(0);
    });

    it("timestamp is present on application error responses", () => {
      const error = new ForbiddenError();
      const response = buildStandardizedErrorResponse(error);
      expect(response.timestamp).toBeDefined();
      expect(typeof response.timestamp).toBe("string");
    });
  });
});
