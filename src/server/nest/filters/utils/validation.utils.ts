import type { ValidationErrorDetail } from "@/application/errors";

interface ZodErrorItem {
  field: string;
  message: string;
  rule?: string;
}

function isZodErrorArray(value: unknown): value is ZodErrorItem[] {
  return (
    Array.isArray(value) &&
    value.length > 0 &&
    typeof value[0] === "object" &&
    value[0] !== null &&
    "field" in value[0] &&
    "message" in value[0]
  );
}

export function extractZodErrors(response: unknown): ValidationErrorDetail[] {
  if (isZodErrorArray(response)) {
    return response.map((e) => ({ field: e.field, message: e.message, rule: e.rule }));
  }

  if (typeof response === "object" && response !== null && "message" in response) {
    const message = (response as Record<string, unknown>).message;
    if (isZodErrorArray(message)) {
      return message.map((e) => ({ field: e.field, message: e.message, rule: e.rule }));
    }
  }

  return [];
}

export function buildValidationMessage(details: ValidationErrorDetail[]): string {
  if (details.length === 0) {
    return "Erro de validação nos dados de entrada.";
  }

  if (details.length === 1) {
    return `Erro de validação: ${details[0].message}`;
  }

  return `Erro de validação em ${details.length} campo(s).`;
}
