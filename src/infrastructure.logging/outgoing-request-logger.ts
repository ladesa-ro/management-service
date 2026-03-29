import { Inject, Injectable, type OnModuleInit } from "@nestjs/common";
import type { ILoggerPort } from "@/domain/abstractions/logging";
import { ILoggerPort as ILoggerPortToken } from "@/domain/abstractions/logging";

const CONTEXT = "OutgoingHTTP";

/**
 * Intercepta `globalThis.fetch` para logar todas as requisições HTTP
 * originadas pelo servidor (Keycloak, OpenID Connect, JWKS, etc.).
 *
 * Instalado automaticamente via NestJS lifecycle (OnModuleInit),
 * usando o logger principal do projeto (ILoggerPort).
 */
@Injectable()
export class OutgoingRequestLogger implements OnModuleInit {
  constructor(@Inject(ILoggerPortToken) readonly _logger: ILoggerPort) {}

  onModuleInit(): void {
    const logger = this._logger;
    const originalFetch = globalThis.fetch;

    globalThis.fetch = new Proxy(originalFetch, {
      async apply(target, thisArg, args: Parameters<typeof fetch>) {
        const [input, init] = args;

        const url = extractUrl(input);
        const method = extractMethod(input, init);

        const start = performance.now();

        logger.log(`→ ${method} ${url}`, CONTEXT);

        try {
          const response = await Reflect.apply(target, thisArg, args);
          const durationMs = (performance.now() - start).toFixed(0);

          const logLine = `← ${method} ${url} ${response.status} (${durationMs}ms)`;

          if (response.ok) {
            logger.log(logLine, CONTEXT);
          } else {
            logger.warn(logLine, CONTEXT);
          }

          return response;
        } catch (error) {
          const durationMs = (performance.now() - start).toFixed(0);
          const message = error instanceof Error ? error.message : String(error);

          logger.error(`✗ ${method} ${url} (${durationMs}ms) ${message}`, undefined, CONTEXT);

          throw error;
        }
      },
    });
  }
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
