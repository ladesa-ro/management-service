import { BaseResourceForbiddenReadError, BaseResourceNotFoundError } from "@/shared-novo";

export enum EstadoApplicationErrorCode {
  EstadoNaoEncontrado = "ESTADO_NAO_ENCONTRADO",
  EstadoForbiddenRead = "ESTADO_FORBIDDEN_READ",
}

export class EstadoNaoEncontradoError extends BaseResourceNotFoundError {
  readonly code = EstadoApplicationErrorCode.EstadoNaoEncontrado;

  constructor(message = "Estado não encontrado.") {
    super(message);
  }
}

export class EstadoForbiddenReadError extends BaseResourceForbiddenReadError {
  readonly code = EstadoApplicationErrorCode.EstadoForbiddenRead;

  constructor(message = "Permissão negada para ler este estado.") {
    super();
  }
}
