import type { EntityManager, EntityTarget, ObjectLiteral, Repository } from "typeorm";

export const IAppTypeormConnection = Symbol();

export interface IAppTypeormConnection {
  getRepository<Entity extends ObjectLiteral>(target: EntityTarget<Entity>): Repository<Entity>;
  transaction<T>(runInTransaction: (entityManager: EntityManager) => Promise<T>): Promise<T>;
  query(query: string, parameters?: unknown[]): Promise<any>;
}
