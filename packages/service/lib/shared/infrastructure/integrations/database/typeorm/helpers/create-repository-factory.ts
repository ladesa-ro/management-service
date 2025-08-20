import { DataSource, EntityManager } from "typeorm";

export const createRepositoryFactory = <Repository, Factory extends (ds: DataSource | EntityManager) => Repository>(factory: Factory) => factory;

export type IRepositoryFactoryOutput<Factory extends (ds: DataSource | EntityManager) => any> = ReturnType<Factory>;
