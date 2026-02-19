import type { ValidationError as ClassValidatorError } from "class-validator";
import type { ValidationErrorDetail } from "@/modules/@shared";

/**
 * Verifica se é um array de erros do class-validator.
 */
export function isClassValidatorErrorArray(value: unknown): value is ClassValidatorError[] {
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
export function extractClassValidatorErrors(response: unknown): ClassValidatorError[] | null {
  if (isClassValidatorErrorArray(response)) {
    return response;
  }

  if (typeof response === "object" && response !== null && "message" in response) {
    const message = (response as Record<string, unknown>).message;
    if (isClassValidatorErrorArray(message)) {
      return message;
    }
  }

  return null;
}

/**
 * Extrai mensagens string da resposta do ValidationPipe.
 */
export function extractStringMessages(response: unknown): string[] | null {
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
 * Converte erros do class-validator para o formato padronizado.
 */
export function parseClassValidatorErrors(
  errors: ClassValidatorError[],
  parentField = "",
): ValidationErrorDetail[] {
  const details: ValidationErrorDetail[] = [];

  for (const error of errors) {
    const field = parentField ? `${parentField}.${error.property}` : error.property;

    if (error.constraints) {
      for (const [rule, message] of Object.entries(error.constraints)) {
        details.push({ field, message, rule, value: error.value });
      }
    }

    if (error.children && error.children.length > 0) {
      details.push(...parseClassValidatorErrors(error.children, field));
    }
  }

  return details;
}

/**
 * Extrai o nome do campo de uma mensagem de erro.
 */
export function extractFieldFromMessage(msg: string): string {
  const propertyMatch = msg.match(/property\s+(\w+)\s/);
  const fieldMatch = msg.match(/^(\w+)\s/);
  return propertyMatch?.[1] ?? fieldMatch?.[1] ?? "unknown";
}

/**
 * Constrói mensagem de erro de validação.
 */
export function buildValidationMessage(details: ValidationErrorDetail[]): string {
  if (details.length === 0) {
    return "Erro de validação nos dados de entrada.";
  }

  if (details.length === 1) {
    return `Erro de validação: ${details[0].message}`;
  }

  return `Erro de validação em ${details.length} campo(s).`;
}
