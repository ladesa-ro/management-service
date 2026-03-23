export function mergeExtra<T extends object>(base?: T, override?: Partial<T>): T | undefined {
  if (!base && !override) {
    return undefined;
  }

  return {
    ...base,
    ...override,
  } as T;
}
