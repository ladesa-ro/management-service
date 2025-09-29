import { PrimitiveError } from "@/shared/primitives/error";

export enum ApplicationErrorCode {
  NOT_FOUND = "NOT_FOUND",
  FORBIDDEN = "FORBIDDEN",
  VALIDATION_FAILED = "VALIDATION_FAILED",
}

export class BaseApplicationError extends PrimitiveError {
  readonly inApplication = true;

  constructor(message: string) {
    super(message);
  }
}

export class BaseNotFoundError extends BaseApplicationError {
  readonly applicationCode = ApplicationErrorCode.NOT_FOUND;

  constructor(message: string = "Not found.") {
    super(message);
  }
}

export class BaseForbiddenError extends BaseApplicationError {
  readonly applicationCode = ApplicationErrorCode.FORBIDDEN;

  constructor(message: string = "Forbidden.") {
    super(message);
  }
}

export class BaseValidationFailedError extends BaseApplicationError {
  readonly applicationCode = ApplicationErrorCode.VALIDATION_FAILED;

  public errors: any[];

  constructor(errors: any[] = [], message: string = "Validation failed.") {
    super(message);
    this.errors = errors;
  }
}
