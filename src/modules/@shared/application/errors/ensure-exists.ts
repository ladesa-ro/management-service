import { ResourceNotFoundError } from "./application.error";

export function ensureExists<T>(
  value: T | null | undefined,
  resourceName: string,
  id?: string | number,
): asserts value is T {
  if (!value) {
    throw new ResourceNotFoundError(resourceName, id);
  }
}
