/**
 * Registro de idempotência — grava o resultado da primeira execução de um
 * comando de escrita sob uma chave enviada pelo cliente (header
 * `Idempotency-Key`), permitindo devolver o mesmo resultado num reenvio sem
 * reexecutar o comando.
 *
 * `chave` sozinha não é única — o escopo é `(chave, comando)`, a mesma chave
 * só colide dentro do mesmo tipo de comando.
 */
export interface IIdempotencyRecord {
  id: string;
  chave: string;
  comando: string;
  resultado: unknown;
  dateCreated: string;
}
