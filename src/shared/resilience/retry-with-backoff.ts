import { wait } from "@/utils/wait";

export interface RetryOptions {
  /** Número máximo de tentativas. Use Infinity para retry indefinido. */
  maxRetries: number;
  /** Delay base em ms para a primeira tentativa. */
  baseDelayMs: number;
  /** Delay máximo em ms (teto do backoff). */
  maxDelayMs: number;
  /** Fator de jitter (0 a 1). Adiciona aleatoriedade ao delay. */
  jitterFactor: number;
  /** Callback executado antes de cada retry. */
  onRetry?: (attempt: number, error: unknown, delayMs: number) => void;
  /** Predicado para determinar se o erro é retentável. Se omitido, todos os erros são retentáveis. */
  retryableError?: (error: unknown) => boolean;
}

/**
 * Calcula o delay com backoff exponencial e jitter.
 *
 * Fórmula: min(baseDelayMs * 2^attempt, maxDelayMs) * (1 + jitterFactor * random())
 */
export function computeBackoffDelay(
  attempt: number,
  options: Pick<RetryOptions, "baseDelayMs" | "maxDelayMs" | "jitterFactor">,
): number {
  const exponentialDelay = Math.min(options.baseDelayMs * 2 ** attempt, options.maxDelayMs);
  const jitter = 1 + options.jitterFactor * Math.random();
  return Math.floor(exponentialDelay * jitter);
}

/**
 * Executa uma função com retry usando backoff exponencial e jitter.
 *
 * - Se `maxRetries` for `Infinity`, tenta indefinidamente até sucesso.
 * - Se `retryableError` for fornecido, erros que não passarem no predicado são relançados imediatamente.
 * - `onRetry` é chamado antes de cada espera, útil para logging.
 */
export async function retryWithBackoff<T>(fn: () => Promise<T>, options: RetryOptions): Promise<T> {
  let attempt = 0;

  while (true) {
    try {
      return await fn();
    } catch (error) {
      if (options.retryableError && !options.retryableError(error)) {
        throw error;
      }

      attempt++;

      if (attempt > options.maxRetries) {
        throw error;
      }

      const delayMs = computeBackoffDelay(attempt - 1, options);

      options.onRetry?.(attempt, error, delayMs);

      await wait(delayMs);
    }
  }
}
