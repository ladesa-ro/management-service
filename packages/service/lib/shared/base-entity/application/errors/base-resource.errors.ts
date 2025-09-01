import { BaseNotFoundError } from "@/shared";

export class BaseResourceNotFoundError extends BaseNotFoundError {
  constructor(message: string = "Recurso não encontrado.") {
    super(message);
  }
}

export class BaseResourceForbiddenError extends BaseNotFoundError {
  constructor(message: string = "Acesso negado.") {
    super(message);
  }
}

export class BaseResourceForbiddenReadError extends BaseResourceForbiddenError {
  constructor(message: string = "Acesso negado para leitura.") {
    super(message);
  }
}
