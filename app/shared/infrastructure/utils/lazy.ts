const Unfilled = Symbol();

export const lazySync = <T>(fn: () => T) => {
  let cached: T | typeof Unfilled = Unfilled;

  return () => {
    if (cached === Unfilled) {
      cached = fn();
    }

    return cached;
  };
};

export const lazyAsync = <T>(fn: () => Promise<T>) => {
  let cached: Promise<T> | typeof Unfilled = Unfilled;
  return () => {
    if (cached === Unfilled) {
      cached = fn();
    }

    return cached;
  };
};
