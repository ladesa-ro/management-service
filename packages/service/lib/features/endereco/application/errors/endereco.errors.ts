import {
  BaseResourceForbiddenCreateError,
  BaseResourceForbiddenReadError,
  BaseResourceForbiddenUpdateError,
  BaseResourceNotFoundError
} from "@/shared";

export class EnderecoNotFoundError extends BaseResourceNotFoundError {
  readonly resource = "endereco";
}

export class EnderecoForbiddenReadError extends BaseResourceForbiddenReadError {
  readonly resource = "endereco";
}

export class EnderecoForbiddenCreateError extends BaseResourceForbiddenCreateError {
  readonly resource = "endereco";
}

export class EnderecoForbiddenUpdateError extends BaseResourceForbiddenUpdateError {
  readonly resource = "endereco";
}
