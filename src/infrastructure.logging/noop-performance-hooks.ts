import { Injectable } from "@nestjs/common";
import type { IPerformanceCheckpoint, IPerformanceHooks } from "@/domain/abstractions/logging";

const NOOP_CHECKPOINT: IPerformanceCheckpoint = {
  name: "",
  startedAt: 0,
  end() {},
};

/**
 * Implementação no-op de IPerformanceHooks.
 *
 * Por padrão não coleta dados. Quando listeners são registrados
 * via onCheckpointEnd, os checkpoints passam a medir e notificar.
 */
@Injectable()
export class PerformanceHooksAdapter implements IPerformanceHooks {
  private listeners: Array<
    (checkpoint: { name: string; durationMs: number; meta?: Record<string, unknown> }) => void
  > = [];

  startCheckpoint(name: string, meta?: Record<string, unknown>): IPerformanceCheckpoint {
    if (this.listeners.length === 0) {
      return NOOP_CHECKPOINT;
    }

    const startedAt = performance.now();
    const listeners = this.listeners;

    return {
      name,
      startedAt,
      end() {
        const durationMs = performance.now() - startedAt;
        for (const listener of listeners) {
          listener({ name, durationMs, meta });
        }
      },
    };
  }

  onCheckpointEnd(
    listener: (checkpoint: {
      name: string;
      durationMs: number;
      meta?: Record<string, unknown>;
    }) => void,
  ): () => void {
    this.listeners.push(listener);
    return () => {
      const idx = this.listeners.indexOf(listener);
      if (idx >= 0) this.listeners.splice(idx, 1);
    };
  }
}
