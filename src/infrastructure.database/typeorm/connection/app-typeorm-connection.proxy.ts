import type { DataSource, EntityManager, EntityTarget, ObjectLiteral, Repository } from "typeorm";
import { ServiceUnavailableError } from "@/application/errors";
import type { ILoggerPort } from "@/domain/abstractions/logging";
import type { IConnectionHealthRegistry } from "@/shared/resilience/connection-health-registry.interface";
import { retryWithBackoff } from "@/shared/resilience/retry-with-backoff";
import type { IAppTypeormConnection } from "./app-typeorm-connection.interface";
import { getActiveEntityManager } from "./transaction-storage";

const DEPENDENCY_NAME = "database";

/**
 * Proxy que delega operações para o EntityManager da transação ativa (via AsyncLocalStorage)
 * ou para o DataSource global quando fora de transação.
 *
 * Isso permite que repositórios injetados participem automaticamente de transações
 * sem precisar receber o EntityManager manualmente.
 *
 * Quando o DataSource não está inicializado (ou não foi configurado), todas as operações
 * lançam ServiceUnavailableError (503) até que a conexão seja estabelecida.
 */
export class AppTypeormConnectionProxy implements IAppTypeormConnection {
  #reconnecting = false;

  constructor(private readonly dataSource: DataSource | null) {}

  startConnectionLoop(registry: IConnectionHealthRegistry, logger: ILoggerPort): void {
    if (this.#reconnecting || !this.dataSource) {
      return;
    }

    this.#reconnecting = true;
    registry.register(DEPENDENCY_NAME);

    const dataSource = this.dataSource;

    retryWithBackoff(
      async () => {
        if (!dataSource.isInitialized) {
          await dataSource.initialize();
        }
      },
      {
        maxRetries: Number.POSITIVE_INFINITY,
        baseDelayMs: 1000,
        maxDelayMs: 30_000,
        jitterFactor: 0.3,
        onRetry: (attempt, error, delayMs) => {
          const message = error instanceof Error ? error.message : String(error);
          registry.markUnavailable(DEPENDENCY_NAME, message);
          logger.warn(
            `Database connection attempt #${attempt} failed. Retrying in ${delayMs}ms: ${message}`,
            "TypeORM",
          );
        },
      },
    )
      .then(() => {
        registry.markHealthy(DEPENDENCY_NAME);
        logger.log("Database connection established.", "TypeORM");
      })
      .catch((err: unknown) => {
        const message = err instanceof Error ? err.message : String(err);
        logger.error(
          `Database connection loop terminated unexpectedly: ${message}`,
          undefined,
          "TypeORM",
        );
      })
      .finally(() => {
        this.#reconnecting = false;
      });
  }

  getRepository<Entity extends ObjectLiteral>(target: EntityTarget<Entity>): Repository<Entity> {
    const ds = this.#ensureConnected();

    const activeManager = getActiveEntityManager();

    if (activeManager) {
      return activeManager.getRepository(target);
    }

    return ds.getRepository(target);
  }

  async transaction<T>(runInTransaction: (entityManager: EntityManager) => Promise<T>): Promise<T> {
    const ds = this.#ensureConnected();
    return ds.transaction(runInTransaction);
  }

  async query(query: string, parameters?: unknown[]): Promise<unknown> {
    const ds = this.#ensureConnected();

    const activeManager = getActiveEntityManager();

    if (activeManager) {
      return activeManager.query(query, parameters);
    }

    return ds.query(query, parameters);
  }

  get manager(): EntityManager {
    const ds = this.#ensureConnected();

    const activeManager = getActiveEntityManager();

    if (activeManager) {
      return activeManager;
    }

    return ds.manager;
  }

  get isInitialized(): boolean {
    return this.dataSource?.isInitialized ?? false;
  }

  async destroy(): Promise<void> {
    return this.dataSource?.destroy();
  }

  #ensureConnected(): DataSource {
    if (!this.dataSource || !this.dataSource.isInitialized) {
      throw new ServiceUnavailableError(undefined, DEPENDENCY_NAME);
    }

    return this.dataSource;
  }
}
