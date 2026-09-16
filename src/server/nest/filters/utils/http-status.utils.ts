/**
 * Mapeamento de códigos de status HTTP para nomes.
 */

export const HTTP_STATUS_NAMES: Record<number, string> = {
  400: "BAD_REQUEST",
  401: "UNAUTHORIZED",
  403: "FORBIDDEN",
  404: "NOT_FOUND",
  405: "METHOD_NOT_ALLOWED",
  408: "REQUEST_TIMEOUT",
  409: "CONFLICT",
  410: "GONE",
  412: "PRECONDITION_FAILED",
  422: "UNPROCESSABLE_ENTITY",
  429: "TOO_MANY_REQUESTS",
  500: "INTERNAL_SERVER_ERROR",
  501: "NOT_IMPLEMENTED",
  502: "BAD_GATEWAY",
  503: "SERVICE_UNAVAILABLE",
  504: "GATEWAY_TIMEOUT",
};

export const HTTP_STATUS_ERROR_PHRASES: Record<number, string> = {
  400: "Bad Request",
  401: "Unauthorized",
  403: "Forbidden",
  404: "Not Found",
  405: "Method Not Allowed",
  408: "Request Timeout",
  409: "Conflict",
  410: "Gone",
  412: "Precondition Failed",
  422: "Unprocessable Entity",
  429: "Too Many Requests",
  500: "Internal Server Error",
  501: "Not Implemented",
  502: "Bad Gateway",
  503: "Service Unavailable",
  504: "Gateway Timeout",
};

/**
 * Retorna o nome do código de status HTTP.
 */

export function getHttpStatusName(status: number): string {
  return HTTP_STATUS_NAMES[status] ?? "UNKNOWN_ERROR";
}

/**
 * Retorna a frase canônica de erro do código de status HTTP.
 */

export function getHttpStatusErrorPhrase(status: number): string {
  return HTTP_STATUS_ERROR_PHRASES[status] ?? "Error";
}
