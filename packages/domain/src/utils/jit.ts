const empty = Symbol();

export const jit = <T>(fn: () => T | Promise<T>) => {
  let cache: typeof empty | T = empty;

  return async () => {
    if (cache === empty) cache = await fn();
    return cache;
  }

}