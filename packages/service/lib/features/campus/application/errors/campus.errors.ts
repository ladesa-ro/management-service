import {
  BaseResourceForbiddenCreateError,
  BaseResourceForbiddenDeleteError,
  BaseResourceForbiddenReadError,
  BaseResourceForbiddenUpdateError,
  BaseResourceNotFoundError
} from "@/shared";

export class CampusNotFoundError extends BaseResourceNotFoundError {
  readonly resource = "campus";
}

export class CampusForbiddenReadError extends BaseResourceForbiddenReadError {
  readonly resource = "campus";
}

export class CampusForbiddenCreateError extends BaseResourceForbiddenCreateError {
  readonly resource = "campus";
}

export class CampusForbiddenUpdateError extends BaseResourceForbiddenUpdateError {
  readonly resource = "campus";
}

export class CampusForbiddenDeleteError extends BaseResourceForbiddenDeleteError {
  readonly resource = "campus";
}
