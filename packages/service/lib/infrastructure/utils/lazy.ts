const Unfilled = Symbol();

export const lazySync = <T>(fn: () => T) => {
  let cached: T | Unfilled = Unfilled;
  return () => (cached === Unfilled ? (cached = fn()) : cached);
};

export const lazyAsync = <T>(fn: () => Promise<T>) => {
  let cached: Promise<T> | Unfilled = Unfilled;
  return () => (cached === Unfilled ? (cached = fn()) : cached);
};
