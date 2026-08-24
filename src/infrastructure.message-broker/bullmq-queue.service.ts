import { type OnModuleDestroy, type OnModuleInit } from "@nestjs/common";
import {
  createPostgresBackend,
  type PostgresQueueBackend,
  Queue,
  QueueEvents,
  Worker,
} from "bullmq";
import { ILoggerPort } from "@/domain/abstractions";
import type {
  IEnqueueOptions,
  IJobFailure,
  IJobOutcome,
  IProcessOptions,
  IQueueService,
} from "@/domain/abstractions/message-broker";
import { Dep, Impl } from "@/domain/dependency-injection";
import type { IQueueOptions } from "@/infrastructure.config/options/queue/queue-options.interface";
import { IQueueOptions as IQueueOptionsToken } from "@/infrastructure.config/options/queue/queue-options.interface";
import { IConnectionHealthRegistry } from "@/shared/resilience/connection-health-registry.interface";

type FilaPostgres = Queue<unknown, unknown, string, unknown, unknown, string, PostgresQueueBackend>;
type EventosPostgres = QueueEvents<PostgresQueueBackend>;
type WorkerPostgres = Worker<unknown, unknown, string, PostgresQueueBackend>;

const DEPENDENCY_NAME = "queue";

@Impl()
export class BullMqQueueService implements IQueueService, OnModuleInit, OnModuleDestroy {
  readonly #filas = new Map<string, FilaPostgres>();
  readonly #eventos = new Map<string, EventosPostgres>();
  readonly #workers = new Map<string, WorkerPostgres>();

  constructor(
    @Dep(IQueueOptionsToken)
    private readonly opcoes: IQueueOptions | null,
    @Dep(ILoggerPort)
    private readonly logger: ILoggerPort,
    @Dep(IConnectionHealthRegistry)
    private readonly healthRegistry: IConnectionHealthRegistry,
  ) {}

  onModuleInit(): void {
    this.healthRegistry.register(DEPENDENCY_NAME);

    if (this.opcoes) {
      this.healthRegistry.markHealthy(DEPENDENCY_NAME);
    } else {
      this.healthRegistry.markUnavailable(DEPENDENCY_NAME, "QUEUE_DATABASE_URL não configurada");
    }
  }

  isAvailable(): boolean {
    return this.opcoes !== null;
  }

  async enqueue<TPayload>(
    queue: string,
    payload: TPayload,
    options?: IEnqueueOptions,
  ): Promise<string> {
    const fila = this.#obterFila(queue);

    try {
      const job = await fila.add(queue, payload, {
        jobId: options?.jobId,
        attempts: options?.attempts ?? 1,
        delay: options?.delayMs,
        removeOnComplete: { age: 86400, count: 1000 },
        removeOnFail: { age: 604800 },
      });

      this.healthRegistry.markHealthy(DEPENDENCY_NAME);
      return String(job.id);
    } catch (error) {
      this.healthRegistry.markUnavailable(
        DEPENDENCY_NAME,
        error instanceof Error ? error.message : String(error),
      );
      throw error;
    }
  }

  async request<TPayload, TResult>(
    queue: string,
    payload: TPayload,
    timeoutMs = 60000,
  ): Promise<TResult> {
    const fila = this.#obterFila(queue);
    const eventos = this.#obterEventos(queue);

    let job: Awaited<ReturnType<FilaPostgres["add"]>>;
    try {
      job = await fila.add(queue, payload, {
        attempts: 1,
        removeOnComplete: { age: 86400, count: 1000 },
        removeOnFail: { age: 604800 },
      });
      this.healthRegistry.markHealthy(DEPENDENCY_NAME);
    } catch (error) {
      this.healthRegistry.markUnavailable(
        DEPENDENCY_NAME,
        error instanceof Error ? error.message : String(error),
      );
      throw error;
    }

    return (await job.waitUntilFinished(eventos, timeoutMs)) as TResult;
  }

  async onCompleted<TResult>(
    queue: string,
    handler: (outcome: IJobOutcome<TResult>) => Promise<void>,
  ): Promise<void> {
    const eventos = this.#obterEventos(queue);

    eventos.on("completed", ({ jobId, returnvalue }) => {
      void handler({ jobId, result: returnvalue as TResult }).catch((falha: unknown) => {
        this.#registrarFalha(queue, jobId, falha);
      });
    });

    await eventos.waitUntilReady();
  }

  async onFailed(queue: string, handler: (failure: IJobFailure) => Promise<void>): Promise<void> {
    const eventos = this.#obterEventos(queue);

    eventos.on("failed", ({ jobId, failedReason }) => {
      void handler({ jobId, reason: failedReason }).catch((falha: unknown) => {
        this.#registrarFalha(queue, jobId, falha);
      });
    });

    await eventos.waitUntilReady();
  }

  async process<TPayload, TResult>(
    queue: string,
    handler: (payload: TPayload) => Promise<TResult>,
    options?: IProcessOptions,
  ): Promise<void> {
    if (this.#workers.has(queue)) {
      return;
    }

    const worker: WorkerPostgres = new Worker(
      queue,
      async (job) => handler(job.data as TPayload),
      { ...this.#conexao(), concurrency: options?.concurrency ?? 1 },
      createPostgresBackend,
    );

    worker.on("failed", (job, falha) => {
      this.#registrarFalha(queue, String(job?.id ?? "?"), falha);
    });

    this.#workers.set(queue, worker);
    await worker.waitUntilReady();

    this.logger.log(`Consumindo a fila ${queue}`, "QueueService");
  }

  async onModuleDestroy(): Promise<void> {
    await Promise.all([...this.#workers.values()].map((worker) => worker.close()));
    await Promise.all([...this.#eventos.values()].map((evento) => evento.close()));
    await Promise.all([...this.#filas.values()].map((fila) => fila.close()));
  }

  #conexao() {
    const opcoes = this.#exigirOpcoes();

    return {
      connection: {
        connectionString: opcoes.url,
        schema: opcoes.schema,
      },
    };
  }

  #obterFila(nome: string): FilaPostgres {
    const existente = this.#filas.get(nome);

    if (existente) {
      return existente;
    }

    const fila = new Queue(nome, this.#conexao(), createPostgresBackend);
    this.#filas.set(nome, fila);
    return fila;
  }

  #obterEventos(nome: string): EventosPostgres {
    const existente = this.#eventos.get(nome);

    if (existente) {
      return existente;
    }

    const eventos = new QueueEvents(nome, this.#conexao(), createPostgresBackend);
    this.#eventos.set(nome, eventos);
    return eventos;
  }

  #registrarFalha(fila: string, jobId: string, falha: unknown): void {
    this.logger.error(
      `Falha ao tratar evento do job ${jobId} da fila ${fila}: ${String(falha)}`,
      undefined,
      "QueueService",
    );
  }

  #exigirOpcoes(): IQueueOptions {
    if (!this.opcoes) {
      throw new Error("Fila não configurada: QUEUE_DATABASE_URL ausente");
    }

    return this.opcoes;
  }
}
