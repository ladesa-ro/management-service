import { Logger } from "@nestjs/common";

const logger = new Logger("OutgoingHTTP");

/**
 * Intercepta `globalThis.fetch` para logar todas as requisições HTTP
 * originadas pelo servidor (Keycloak, OpenID Connect, JWKS, etc.).
 *
 * Deve ser chamado uma única vez no bootstrap da aplicação, antes de
 * qualquer outro código que use fetch.
 */
export function installOutgoingRequestLogger(): void {
  const originalFetch = globalThis.fetch;

  globalThis.fetch = new Proxy(originalFetch, {
    async apply(target, thisArg, args: Parameters<typeof fetch>) {
      const [input, init] = args;

      const url = extractUrl(input);
      const method = extractMethod(input, init);

      const start = performance.now();

      logger.log(`→ ${method} ${url}`);

      try {
        const response = await Reflect.apply(target, thisArg, args);
        const durationMs = (performance.now() - start).toFixed(0);

        const logLine = `← ${method} ${url} ${response.status} (${durationMs}ms)`;

        if (response.ok) {
          logger.log(logLine);
        } else {
          logger.warn(logLine);
        }

        return response;
      } catch (error) {
        const durationMs = (performance.now() - start).toFixed(0);
        const message = error instanceof Error ? error.message : String(error);

        logger.error(`✗ ${method} ${url} (${durationMs}ms) ${message}`);

        throw error;
      }
    },
  });
}

function extractUrl(input: string | URL | Request): string {
  if (typeof input === "string") return input;
  if (input instanceof URL) return input.toString();
  return input.url;
}

function extractMethod(input: string | URL | Request, init?: RequestInit): string {
  if (init?.method) return init.method.toUpperCase();
  if (input instanceof Request && input.method) {
    return input.method.toUpperCase();
  }
  return "GET";
}
