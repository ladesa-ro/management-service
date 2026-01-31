/**
 * Detalhe de um erro de validação
 */
export interface IValidationErrorDetail {
  /** Campo que falhou na validação */
  field: string;
  /** Mensagem de erro */
  message: string;
  /** Regra de validação violada */
  rule?: string;
  /** Valor que causou o erro */
  value?: unknown;
}

/**
 * Resultado de validação de domínio.
 * Acumula erros de validação e permite verificar se a entidade é válida.
 */
export class ValidationResult {
  private readonly _errors: IValidationErrorDetail[] = [];

  /**
   * Adiciona um erro de validação
   */
  addError(field: string, message: string, rule?: string, value?: unknown): this {
    this._errors.push({ field, message, rule, value });
    return this;
  }

  /**
   * Adiciona um erro se a condição for verdadeira
   */
  addErrorIf(
    condition: boolean,
    field: string,
    message: string,
    rule?: string,
    value?: unknown,
  ): this {
    if (condition) {
      this.addError(field, message, rule, value);
    }
    return this;
  }

  /**
   * Mescla erros de outro ValidationResult
   */
  merge(other: ValidationResult): this {
    this._errors.push(...other.errors);
    return this;
  }

  /**
   * Retorna true se não houver erros
   */
  get isValid(): boolean {
    return this._errors.length === 0;
  }

  /**
   * Retorna true se houver erros
   */
  get hasErrors(): boolean {
    return this._errors.length > 0;
  }

  /**
   * Retorna os erros de validação
   */
  get errors(): readonly IValidationErrorDetail[] {
    return this._errors;
  }

  /**
   * Retorna o primeiro erro ou undefined
   */
  get firstError(): IValidationErrorDetail | undefined {
    return this._errors[0];
  }

  /**
   * Cria um ValidationResult válido (sem erros)
   */
  static valid(): ValidationResult {
    return new ValidationResult();
  }

  /**
   * Cria um ValidationResult com um erro
   */
  static invalid(field: string, message: string, rule?: string, value?: unknown): ValidationResult {
    return new ValidationResult().addError(field, message, rule, value);
  }
}
