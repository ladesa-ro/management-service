import { DataSource, EntityManager } from "typeorm";

export type IAppTypeormConnection = DataSource | EntityManager;
export const IAppTypeormConnection = Symbol();
