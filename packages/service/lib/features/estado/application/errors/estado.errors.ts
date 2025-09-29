import { BaseResourceForbiddenReadError, BaseResourceNotFoundError } from "@/shared";

export class EstadoNotFoundError extends BaseResourceNotFoundError {
  readonly resource = "estado";
}

export class EstadoForbiddenReadError extends BaseResourceForbiddenReadError {
  readonly resource = "estado";
}
