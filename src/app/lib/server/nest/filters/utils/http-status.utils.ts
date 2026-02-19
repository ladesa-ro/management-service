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
  422: "UNPROCESSABLE_ENTITY",
  429: "TOO_MANY_REQUESTS",
  500: "INTERNAL_SERVER_ERROR",
  501: "NOT_IMPLEMENTED",
  502: "BAD_GATEWAY",
  503: "SERVICE_UNAVAILABLE",
  504: "GATEWAY_TIMEOUT",
};

/**
 * Retorna o nome do código de status HTTP.
 */
export function getHttpStatusName(status: number): string {
  return HTTP_STATUS_NAMES[status] ?? "UNKNOWN_ERROR";
}
