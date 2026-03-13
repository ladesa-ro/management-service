export const IDatabaseOptions = Symbol();

export interface IDatabaseOptions {
  url: string;
  useSSL: string;

  schema: string | undefined;
}
