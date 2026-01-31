import { ValidationResult } from "./validation-result";

/**
 * Regras de validação reutilizáveis para domínio.
 * Todas as regras retornam o valor validado/transformado ou adicionam erro ao result.
 */
export class ValidationRules {
  constructor(
    private readonly result: ValidationResult,
    readonly _entityName: string,
  ) {}

  /**
   * Valida que um campo string é obrigatório e não vazio
   */
  required(value: string | null | undefined, field: string, message?: string): string {
    if (value === null || value === undefined || value.trim().length === 0) {
      this.result.addError(field, message ?? `${field} é obrigatório`, "required", value);
      return "";
    }
    return value.trim();
  }

  /**
   * Valida um campo opcional, retorna null se vazio
   */
  optional(value: string | null | undefined): string | null {
    if (value === null || value === undefined || value.trim().length === 0) {
      return null;
    }
    return value.trim();
  }

  /**
   * Valida tamanho mínimo de string
   */
  minLength(value: string, field: string, min: number, message?: string): string {
    if (value.length < min) {
      this.result.addError(
        field,
        message ?? `${field} deve ter no mínimo ${min} caractere(s)`,
        "minLength",
        value,
      );
    }
    return value;
  }

  /**
   * Valida tamanho máximo de string
   */
  maxLength(value: string, field: string, max: number, message?: string): string {
    if (value.length > max) {
      this.result.addError(
        field,
        message ?? `${field} deve ter no máximo ${max} caractere(s)`,
        "maxLength",
        value,
      );
    }
    return value;
  }

  /**
   * Valida que um número é obrigatório
   */
  requiredNumber(value: number | null | undefined, field: string, message?: string): number {
    if (value === null || value === undefined || Number.isNaN(value)) {
      this.result.addError(field, message ?? `${field} é obrigatório`, "required", value);
      return 0;
    }
    return value;
  }

  /**
   * Valida valor mínimo de número
   */
  min(value: number, field: string, min: number, message?: string): number {
    if (value < min) {
      this.result.addError(field, message ?? `${field} deve ser no mínimo ${min}`, "min", value);
    }
    return value;
  }

  /**
   * Valida valor máximo de número
   */
  max(value: number, field: string, max: number, message?: string): number {
    if (value > max) {
      this.result.addError(field, message ?? `${field} deve ser no máximo ${max}`, "max", value);
    }
    return value;
  }

  /**
   * Valida que um número está em um range
   */
  range(value: number, field: string, min: number, max: number, message?: string): number {
    if (value < min || value > max) {
      this.result.addError(
        field,
        message ?? `${field} deve estar entre ${min} e ${max}`,
        "range",
        value,
      );
    }
    return value;
  }

  /**
   * Valida que um objeto/referência é obrigatório
   */
  requiredRef<T>(value: T | null | undefined, field: string, message?: string): T | null {
    if (value === null || value === undefined) {
      this.result.addError(field, message ?? `${field} é obrigatório`, "required", value);
      return null;
    }
    return value;
  }

  /**
   * Valida formato de email
   */
  email(value: string, field: string, message?: string): string {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      this.result.addError(field, message ?? `${field} deve ser um email válido`, "email", value);
    }
    return value;
  }

  /**
   * Valida formato de slug (apenas letras minúsculas, números e hífens)
   */
  slug(value: string, field: string, message?: string): string {
    const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
    if (!slugRegex.test(value)) {
      this.result.addError(
        field,
        message ?? `${field} deve conter apenas letras minúsculas, números e hífens`,
        "slug",
        value,
      );
    }
    return value;
  }

  /**
   * Valida formato de data ISO (YYYY-MM-DD)
   */
  dateFormat(value: string, field: string, message?: string): string {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(value)) {
      this.result.addError(
        field,
        message ?? `${field} deve estar no formato YYYY-MM-DD`,
        "dateFormat",
        value,
      );
    }
    return value;
  }

  /**
   * Valida formato de hora (HH:MM ou HH:MM:SS)
   */
  timeFormat(value: string, field: string, message?: string): string {
    const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)(:([0-5]\d))?$/;
    if (!timeRegex.test(value)) {
      this.result.addError(
        field,
        message ?? `${field} deve estar no formato HH:MM ou HH:MM:SS`,
        "timeFormat",
        value,
      );
    }
    return value;
  }

  /**
   * Valida que um valor está em uma lista de valores permitidos
   */
  oneOf<T>(value: T, field: string, allowed: readonly T[], message?: string): T {
    if (!allowed.includes(value)) {
      this.result.addError(
        field,
        message ?? `${field} deve ser um dos valores: ${allowed.join(", ")}`,
        "oneOf",
        value,
      );
    }
    return value;
  }

  /**
   * Valida com uma função customizada
   */
  custom<T>(
    value: T,
    field: string,
    validator: (v: T) => boolean,
    message: string,
    rule = "custom",
  ): T {
    if (!validator(value)) {
      this.result.addError(field, message, rule, value);
    }
    return value;
  }
}

/**
 * Cria um contexto de validação para uma entidade
 */
export function createValidator(entityName: string): {
  result: ValidationResult;
  rules: ValidationRules;
} {
  const result = new ValidationResult();
  const rules = new ValidationRules(result, entityName);
  return { result, rules };
}
