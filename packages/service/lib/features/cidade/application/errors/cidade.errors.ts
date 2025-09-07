import { BaseResourceForbiddenReadError, BaseResourceNotFoundError } from "@/shared";

export enum CidadeApplicationErrorCode {
  CidadeNaoEncontrado = "CIDADE_NAO_ENCONTRADO",
  CidadeForbiddenRead = "CIDADE_FORBIDDEN_READ",
}

export class CidadeNaoEncontradoError extends BaseResourceNotFoundError {
  readonly code = CidadeApplicationErrorCode.CidadeNaoEncontrado;

  constructor(message = "Cidade não encontrada.") {
    super(message);
  }
}

export class CidadeForbiddenReadError extends BaseResourceForbiddenReadError {
  readonly code = CidadeApplicationErrorCode.CidadeForbiddenRead;

  constructor(message = "Permissão negada para ler esta cidade.") {
    super();
  }
}
