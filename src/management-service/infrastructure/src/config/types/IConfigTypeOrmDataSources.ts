import { DataSourceOptions } from "typeorm";

export interface IConfigTypeOrmDataSources {
  getTypeOrmSharedDataSourceOptions(): Partial<DataSourceOptions>;
  getTypeOrmAppDataSourceOptions(): DataSourceOptions;
  getTypeOrmMigrationDataSourceOptions(): DataSourceOptions;
}
