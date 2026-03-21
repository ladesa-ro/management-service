import { AsyncLocalStorage } from "node:async_hooks";
import type { EntityManager } from "typeorm";

export const transactionStorage = new AsyncLocalStorage<EntityManager>();

export function getActiveEntityManager(): EntityManager | undefined {
  return transactionStorage.getStore();
}
