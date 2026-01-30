import {
  type ArgumentsHost,
  BadRequestException,
  Catch,
  type ExceptionFilter,
} from "@nestjs/common";
import type { ValidationError as ClassValidatorError } from "class-validator";
import type { Request, Response } from "express";
import type { ValidationErrorDetail } from "@/core/@shared";
import type { HttpErrorResponse } from "./error-http.mapper";

/**
 * Converte erros do class-validator para o formato padronizado.
 */
function parseClassValidatorErrors(
  errors: ClassValidatorError[],
  parentField = "",
): ValidationErrorDetail[] {
  const details: ValidationErrorDetail[] = [];

  for (const error of errors) {
    const field = parentField ? `${parentField}.${error.property}` : error.property;

    if (error.constraints) {
      for (const [rule, message] of Object.entries(error.constraints)) {
        details.push({
          field,
          message,
          rule,
          value: error.value,
        });
      }
    }

    if (error.children && error.children.length > 0) {
      details.push(...parseClassValidatorErrors(error.children, field));
    }
  }

  return details;
}

/**
 * Verifica se é um array de erros do class-validator.
 */
function isClassValidatorErrorArray(value: unknown): value is ClassValidatorError[] {
  return (
    Array.isArray(value) &&
    value.length > 0 &&
    typeof value[0] === "object" &&
    value[0] !== null &&
    "property" in value[0]
  );
}

/**
 * Extrai os erros do class-validator da resposta do BadRequestException.
 * O NestJS encapsula a resposta em { message: ..., error: ..., statusCode: ... }
 */
function extractClassValidatorErrors(response: unknown): ClassValidatorError[] | null {
  // Caso 1: array direto
  if (isClassValidatorErrorArray(response)) {
    return response;
  }

  // Caso 2: encapsulado em { message: [...] }
  if (typeof response === "object" && response !== null && "message" in response) {
    const message = (response as Record<string, unknown>).message;
    if (isClassValidatorErrorArray(message)) {
      return message;
    }
  }

  return null;
}

/**
 * Verifica se a resposta é o formato padrão do ValidationPipe com mensagens string.
 */
function extractStringMessages(response: unknown): string[] | null {
  if (typeof response === "object" && response !== null && "message" in response) {
    const message = (response as Record<string, unknown>).message;

    if (typeof message === "string") {
      return [message];
    }

    if (Array.isArray(message) && message.length > 0 && typeof message[0] === "string") {
      return message as string[];
    }
  }

  return null;
}

/**
 * Constrói mensagem de erro de validação.
 */
function buildValidationMessage(details: ValidationErrorDetail[]): string {
  if (details.length === 0) {
    return "Erro de validação nos dados de entrada.";
  }

  if (details.length === 1) {
    return `Erro de validação: ${details[0].message}`;
  }

  return `Erro de validação em ${details.length} campo(s).`;
}

/**
 * Filtro que captura BadRequestException do ValidationPipe
 * e traduz para o formato padronizado com status 422.
 */
@Catch(BadRequestException)
export class ValidationExceptionFilter implements ExceptionFilter {
  catch(exception: BadRequestException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const exceptionResponse = exception.getResponse();
    let details: ValidationErrorDetail[] = [];

    // Tenta extrair erros do class-validator
    const classValidatorErrors = extractClassValidatorErrors(exceptionResponse);
    if (classValidatorErrors) {
      details = parseClassValidatorErrors(classValidatorErrors);
    } else {
      // Tenta extrair mensagens string do ValidationPipe
      const stringMessages = extractStringMessages(exceptionResponse);
      if (stringMessages) {
        details = stringMessages.map((msg) => {
          // Tenta extrair o campo da mensagem (ex: "property asdfasdf should not exist")
          const propertyMatch = msg.match(/property\s+(\w+)\s/);
          const fieldMatch = msg.match(/^(\w+)\s/);
          return {
            field: propertyMatch?.[1] ?? fieldMatch?.[1] ?? "unknown",
            message: msg,
          };
        });
      }
    }

    // Se não for erro de validação, retorna como BadRequest padrão
    if (details.length === 0) {
      const errorResponse: HttpErrorResponse = {
        statusCode: 400,
        code: "HTTP.BAD_REQUEST",
        message: exception.message,
        timestamp: new Date().toISOString(),
        path: request.url,
      };
      return response.status(400).json(errorResponse);
    }

    const errorResponse: HttpErrorResponse = {
      statusCode: 422,
      code: "APP.VALIDATION",
      message: buildValidationMessage(details),
      timestamp: new Date().toISOString(),
      path: request.url,
      details,
    };

    response.status(422).json(errorResponse);
  }
}
