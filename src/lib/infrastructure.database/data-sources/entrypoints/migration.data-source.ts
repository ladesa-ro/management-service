import "reflect-metadata";
import { DataSource } from "typeorm";
import { DataSourceMigrationFactory } from "@/infrastructure.database/data-sources/factories/data-source-migration-factory";
import type { IDatabaseOptions } from "@/infrastructure.database/options/database-options.interface";
import { getDataSourceAppConfigService } from "@/modules/@shared/infrastructure/persistence/typeorm/data-sources/utils/getDataSourceEnvironmentConfigService";

export const getMigrationDataSource = async (databaseOptions: IDatabaseOptions | null = null) => {
  const opts = await getDataSourceAppConfigService(databaseOptions);
  return new DataSource(DataSourceMigrationFactory.fromOptions(opts));
};

const migrationDataSource = getMigrationDataSource();

export default migrationDataSource;
