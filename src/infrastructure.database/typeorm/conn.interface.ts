import { DataSource, EntityManager } from "typeorm";

export const IAppTypeormConnection = Symbol();

export type IAppTypeormConnection = DataSource | EntityManager;
