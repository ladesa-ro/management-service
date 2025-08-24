import { PrimitiveError } from "@/shared-novo/primitives/error";

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
