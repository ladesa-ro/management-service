import type { DataSource, EntityManager, EntityTarget, ObjectLiteral, Repository } from "typeorm";
import type { IAppTypeormConnection } from "./app-typeorm-connection.interface";
import { getActiveEntityManager } from "./transaction-storage";

/**
 * Proxy que delega operações para o EntityManager da transação ativa (via AsyncLocalStorage)
 * ou para o DataSource global quando fora de transação.
 *
 * Isso permite que repositórios injetados participem automaticamente de transações
 * sem precisar receber o EntityManager manualmente.
 */

export class AppTypeormConnectionProxy implements IAppTypeormConnection {
  constructor(private readonly dataSource: DataSource) {}

  getRepository<Entity extends ObjectLiteral>(target: EntityTarget<Entity>): Repository<Entity> {
    const activeManager = getActiveEntityManager();

    if (activeManager) {
      return activeManager.getRepository(target);
    }

    return this.dataSource.getRepository(target);
  }

  async transaction<T>(runInTransaction: (entityManager: EntityManager) => Promise<T>): Promise<T> {
    return this.dataSource.transaction(runInTransaction);
  }

  async query(query: string, parameters?: unknown[]): Promise<unknown> {
    const activeManager = getActiveEntityManager();

    if (activeManager) {
      return activeManager.query(query, parameters);
    }

    return this.dataSource.query(query, parameters);
  }

  get manager(): EntityManager {
    const activeManager = getActiveEntityManager();

    if (activeManager) {
      return activeManager;
    }

    return this.dataSource.manager;
  }

  get isInitialized(): boolean {
    return this.dataSource.isInitialized;
  }

  async destroy(): Promise<void> {
    return this.dataSource.destroy();
  }
}
