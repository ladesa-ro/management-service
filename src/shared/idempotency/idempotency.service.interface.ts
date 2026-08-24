export const IIdempotencyService = Symbol("IIdempotencyService");

export interface IIdempotencyExecuteParams<T> {
  idempotencyKey: string | undefined;

  comando: string;

  run: () => Promise<T>;
}

export interface IIdempotencyService {
  execute<T>(params: IIdempotencyExecuteParams<T>): Promise<T>;
}
