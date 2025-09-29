import { BaseResourceForbiddenReadError, BaseResourceNotFoundError } from "@/shared";

export class CidadeNaoEncontradoError extends BaseResourceNotFoundError {
  readonly resource = "cidade";
}

export class CidadeForbiddenReadError extends BaseResourceForbiddenReadError {
  readonly resource = "cidade";
}
