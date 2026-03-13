import "reflect-metadata";
import { join } from "path";
import { DataSource, type DataSourceOptions } from "typeorm";
import type { IDatabaseOptions } from "@/infrastructure.database/options/database-options.interface";
import { getDataSourceAppConfigService } from "./utils/getDataSourceEnvironmentConfigService";
import {
  buildDataSourceConnectionOptions
} from "@/infrastructure.database/data-sources/helpers/build-data-source-connection-options";

export const getMigrationDataSource = async (databaseOptions: IDatabaseOptions | null = null) => {
  const opts = await getDataSourceAppConfigService(databaseOptions);

  const migrationsPath = join(__dirname, "../../../../../../infrastructure.database/migrations");

  const dataSource = new DataSource({
    ...buildDataSourceConnectionOptions(opts),
    migrations: [`${migrationsPath}/*{.ts,.js}`],
    migrationsTableName: "app_migration_db",
  } as DataSourceOptions);

  return dataSource;
};

const migrationDataSource = getMigrationDataSource();

export default migrationDataSource;
