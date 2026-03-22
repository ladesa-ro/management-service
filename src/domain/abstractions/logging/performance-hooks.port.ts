/**
 * Port de performance hooks neutro de framework.
 *
 * Por padrão NÃO coleta nem salva dados de performance.
 * Expõe pontos de instrumentação para ferramentas externas
 * (OpenTelemetry, Prometheus, etc.) se conectarem.
 *
 * Checkpoints: início/fim de request, execução de handler, queries de repositório.
 */
export const IPerformanceHooks = Symbol("IPerformanceHooks");

export interface IPerformanceCheckpoint {
  readonly name: string;
  readonly startedAt: number;
  end(): void;
}

export interface IPerformanceHooks {
  /**
   * Inicia um checkpoint de performance.
   * Retorna um handle para finalizar a medição.
   *
   * Se nenhum coletor estiver registrado, retorna um no-op.
   */
  startCheckpoint(name: string, meta?: Record<string, unknown>): IPerformanceCheckpoint;

  /**
   * Registra um listener para checkpoints finalizados.
   * Retorna uma função de cleanup para remover o listener.
   */
  onCheckpointEnd(
    listener: (checkpoint: {
      name: string;
      durationMs: number;
      meta?: Record<string, unknown>;
    }) => void,
  ): () => void;
}
