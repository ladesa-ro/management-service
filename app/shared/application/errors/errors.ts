import { PrimitiveError } from "../../primitives";

export class BaseApplicationError extends PrimitiveError {
  readonly application = true;
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
