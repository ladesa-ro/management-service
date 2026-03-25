import { GoneError } from "./application.error";

export function ensureActive(
  active: boolean,
  resourceName: string,
  id?: string | number,
): asserts active is true {
  if (!active) {
    throw new GoneError(resourceName, id);
  }
}
