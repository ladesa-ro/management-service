export class PrimitiveError extends Error {
  readonly primitive = true;

  constructor(message: string) {
    super(message);
  }
}
