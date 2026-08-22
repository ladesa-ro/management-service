export class HorarioEdicaoSessaoPublicarCommand {
  sessaoId!: string;

  /** Header `Idempotency-Key`, opcional — sem ele o comando roda sem proteção contra reenvio. */
  idempotencyKey?: string;
}
