export const IIdempotencyService = Symbol("IIdempotencyService");

export interface IIdempotencyExecuteParams<T> {
  /**
   * Valor do header `Idempotency-Key` enviado pelo cliente. `undefined`
   * significa que o cliente não pediu idempotência — o comando roda normal,
   * sem verificar nem gravar nada.
   */
  idempotencyKey: string | undefined;

  /** Nome do comando, usado para escopar a chave (`(chave, comando)`). */
  comando: string;

  /** Executa o comando de verdade. Só roda se não houver resultado gravado. */
  run: () => Promise<T>;
}

export interface IIdempotencyService {
  /**
   * Executa `run` protegido por idempotência: se `(idempotencyKey, comando)`
   * já tiver um resultado gravado, devolve esse resultado sem reexecutar
   * `run`. Caso contrário, executa `run` e grava o resultado antes de
   * devolvê-lo.
   */
  execute<T>(params: IIdempotencyExecuteParams<T>): Promise<T>;
}
