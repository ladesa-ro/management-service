import { decorate } from "ts-mixer";

/**
 * Wraps a decorator factory so that it automatically calls `decorate()` from ts-mixer.
 * This ensures reflect-metadata is propagated through Mixin() chains.
 */
export const mixable = <
  T extends (...args: any[]) => ClassDecorator | PropertyDecorator | MethodDecorator,
>(
  decorator: T,
): T => ((...args: Parameters<T>) => decorate(decorator(...args))) as unknown as T;
