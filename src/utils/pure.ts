/**
 * Identity function - returns the value as-is.
 * Useful for type inference and functional composition.
 * @param value The value to return
 */
export const pure = <T>(value: T): T => value;
