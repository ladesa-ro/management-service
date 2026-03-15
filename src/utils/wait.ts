/**
 * Returns a Promise that resolves after the specified time.
 * @param ms Time in milliseconds to wait
 */
export const wait = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));
