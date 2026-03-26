/**
 * Helpers centralizados para obter a data/hora atual.
 *
 * Todo código que depende de "agora" deve usar estes helpers
 * ao invés de `new Date()` diretamente. Isso permite futura
 * injeção de clock para testes determinísticos.
 */

/**
 * Retorna a data/hora atual como Date.
 */

export function getNow(): Date {
  return new Date();
}

/**
 * Retorna a data/hora atual como string ISO 8601.
 */

export function getNowISO(): string {
  return getNow().toISOString();
}

/**
 * Retorna a data/hora atual como timestamp numérico (ms).
 */

export function getNowTime(): number {
  return getNow().getTime();
}
