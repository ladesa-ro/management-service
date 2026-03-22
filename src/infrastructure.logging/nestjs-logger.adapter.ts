import { Injectable, Logger } from "@nestjs/common";
import type { ILoggerPort } from "@/domain/abstractions/logging";

/**
 * Adapter que implementa ILoggerPort usando o Logger nativo do NestJS.
 * Formato estruturado JSON quando em produção.
 */
@Injectable()
export class NestJsLoggerAdapter implements ILoggerPort {
  private readonly logger = new Logger("App");

  debug(message: string, context?: string, meta?: Record<string, unknown>): void {
    this.logger.debug(this.format(message, meta), context);
  }

  log(message: string, context?: string, meta?: Record<string, unknown>): void {
    this.logger.log(this.format(message, meta), context);
  }

  warn(message: string, context?: string, meta?: Record<string, unknown>): void {
    this.logger.warn(this.format(message, meta), context);
  }

  error(message: string, trace?: string, context?: string, meta?: Record<string, unknown>): void {
    this.logger.error(this.format(message, meta), trace, context);
  }

  private format(message: string, meta?: Record<string, unknown>): string {
    if (!meta || Object.keys(meta).length === 0) {
      return message;
    }
    return `${message} ${JSON.stringify(meta)}`;
  }
}
