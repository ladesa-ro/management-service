import { PrimitiveError } from "@/shared/primitives/error";

export class BaseApplicationError extends PrimitiveError {
  readonly application = true;

  constructor(message: string) {
    super(message);
  }
}

export class BaseNotFoundError extends BaseApplicationError {
  constructor(message: string = "Não encontrado.") {
    super(message);
  }
}

export class BaseForbiddenError extends BaseApplicationError {
  constructor(message: string = "Acesso negado.") {
    super(message);
  }
}

export class BaseValidationFailedError extends BaseApplicationError {
  public errors: any[];

  constructor(errors: any[] = [], message: string = "Erro de validação") {
    super(message);
    this.errors = errors;
  }
}
