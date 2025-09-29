import { BaseForbiddenError, BaseNotFoundError } from "@/shared";

export class BaseResourceNotFoundError extends BaseNotFoundError {
  readonly inResource = true;

  constructor(message: string = "Resource not found.") {
    super(message);
  }
}

export class BaseResourceForbiddenError extends BaseForbiddenError {
  constructor(message: string = "Forbidden.") {
    super(message);
  }
}

export class BaseResourceForbiddenReadError extends BaseResourceForbiddenError {
  readonly action = "read";
}

export class BaseResourceForbiddenCreateError extends BaseResourceForbiddenError {
  readonly action = "create";
}

export class BaseResourceForbiddenUpdateError extends BaseResourceForbiddenError {
  readonly action = "update";
}

export class BaseResourceForbiddenDeleteError extends BaseResourceForbiddenError {
  readonly action = "delete";
}
