import type { DataSourceOptions } from "typeorm";

/**
 * Port de configuração do TypeORM
 * Define as configurações específicas do TypeORM
 */
export interface IConfigTypeOrmPort {
  getRootSrc(): string;

  getTypeOrmBasePath(): string;

  getTypeOrmPathEntities(): string;

  getTypeOrmPathMigrations(): string;

  getTypeOrmPathSubscribers(): string;

  getTypeOrmLogging(): string | undefined;

  getTypeOrmSharedDataSourceOptions(): Partial<DataSourceOptions>;

  getTypeOrmAppDataSourceOptions(): DataSourceOptions;

  getTypeOrmMigrationDataSourceOptions(): DataSourceOptions;
}
