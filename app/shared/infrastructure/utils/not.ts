export const Not = <Args extends any[], Fn extends (...args: Args) => boolean>(fn: Fn) => {
  return (...args: Args) => {
    return !fn(...args);
  };
};
