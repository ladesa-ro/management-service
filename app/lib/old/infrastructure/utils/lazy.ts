const Unfilled = Symbol();

export const lazySync = <T>(fn: () => T) => {
  let cached: T | typeof Unfilled = Unfilled;
  return () => (cached === Unfilled ? (cached = fn()) : cached);
};

export const lazyAsync = <T>(fn: () => Promise<T>) => {
  let cached: Promise<T> | typeof Unfilled = Unfilled;
  return () => (cached === Unfilled ? (cached = fn()) : cached);
};
