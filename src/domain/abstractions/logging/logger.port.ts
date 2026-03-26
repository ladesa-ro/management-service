/**
 * Port de logging neutro de framework.
 *
 * Domain e application NUNCA importam logger concreto.
 * Infrastructure e presentation injetam a implementação.
 */

export const ILoggerPort = Symbol("ILoggerPort");

export interface ILoggerPort {
  debug(message: string, context?: string, meta?: Record<string, unknown>): void;
  log(message: string, context?: string, meta?: Record<string, unknown>): void;
  warn(message: string, context?: string, meta?: Record<string, unknown>): void;
  error(message: string, trace?: string, context?: string, meta?: Record<string, unknown>): void;
}
