import { Inject, Injectable, type OnModuleInit } from "@nestjs/common";
import type { ILoggerPort } from "@/domain/abstractions/logging";
import { ILoggerPort as ILoggerPortToken } from "@/domain/abstractions/logging";

const CONTEXT = "Process";

/**
 * Registra handlers para `unhandledRejection` e `uncaughtException`
 * usando o logger principal (ILoggerPort).
 *
 * Proteção contra recursão: se o logger lançar exceção dentro do
 * handler, um flag impede re-entrada e o fallback é `console.error`.
 */
@Injectable()
export class UnhandledErrorLogger implements OnModuleInit {
  constructor(@Inject(ILoggerPortToken) readonly _logger: ILoggerPort) {}

  onModuleInit(): void {
    const logger = this._logger;

    let handling = false;

    process.on("unhandledRejection", (reason) => {
      if (handling) {
        console.error("[fallback] Unhandled Rejection (logger indisponível):", reason);
        return;
      }

      handling = true;

      try {
        const message = reason instanceof Error ? reason.message : String(reason);
        const trace = reason instanceof Error ? reason.stack : undefined;
        logger.error(`Unhandled Rejection: ${message}`, trace, CONTEXT);
      } catch {
        console.error("[fallback] Unhandled Rejection:", reason);
      } finally {
        handling = false;
      }
    });

    process.on("uncaughtException", (err) => {
      if (handling) {
        console.error("[fallback] Uncaught Exception (logger indisponível):", err);
        return;
      }

      handling = true;

      try {
        logger.error(`Uncaught Exception: ${err.message}`, err.stack, CONTEXT);
      } catch {
        console.error("[fallback] Uncaught Exception:", err);
      } finally {
        handling = false;
      }
    });
  }
}
